(function () {
    if (window.location.hash) {
        window.location.hash = '';
    }

    var frameId = new Date().getTime().toString();
    var loaded = false;
    lyb.initPageManager = function () {
        var pageManager = {
            $container: jQuery('.single-page-container'),
            _pageStack: [{config: {name: "home", url: "#", isBind: true}, dom: jQuery('.home')}],
            _configs: [],
            _pageAppend: function () {
            },
            _defaultPage: {name: "home", url: "#", isBind: true},
            _pageIndex: 1,
            setDefault: function (defaultPage) {
                this._defaultPage = this._find('name', defaultPage);
                return this;
            },
            setPageAppend: function (pageAppend) {
                this._pageAppend = pageAppend;
                return this;
            },
            init: function () {
                var self = this;

                jQuery(window).on('hashchange', function () {
                    var state = history.state || {};
                    var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
                    var page = self._find('url', url) || self._defaultPage;
                    if (state._pageIndex <= self._pageIndex || self._findInStack(url)) {
                        self._back(page);
                    } else {
                        (function (that, _page, callback) {//采用闭包的方式防止快速调用导致callback被修改
                            that._go(_page, callback);
                            that = page = callback = null;
                        })(self, page, self.callback);
                    }
                });

                if (history.state && history.state._pageIndex) {
                    this._pageIndex = history.state._pageIndex;
                }

                this._pageIndex--;

                var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
                var page = self._find('url', url) || self._defaultPage;

                (function (that, _page, callback) {//采用闭包的方式防止快速调用导致callback被修改
                    that._go(_page, callback);
                    that = _page = callback = null;
                })(this, page, this.callback);

                return this;
            },
            push: function (config) {
                this._configs.push(config);
                return this;
            },
            go: function (to, callback) {
                var config = this._find('name', to);
                if (!config) {
                    return;
                }
                this.callback = callback;
                location.hash = config.url;
            },
            show: function (callback, backCallBack) {
                var config = this._find('name', frameId);
                if (!config) {
                    return;
                }
                this.callback = callback;
                config.backCallBack = backCallBack;
                location.hash = config.url;
            },
            _go: function (config, callback) {
                if (!config || config.name === 'home') {//没有config不执行
                    return;
                }
                this._pageIndex++;

                history.replaceState && history.replaceState({_pageIndex: this._pageIndex}, '', location.href);

                var html = jQuery(config.template).html();
                var $html = jQuery(html).addClass('slideIn').addClass(config.name);
                $html.on('animationEnd webkitAnimationEnd', function () {
                    $html.removeClass('slideIn').addClass('js_show');
                });
                this.$container.append($html);
                if (callback) {
                    callback.call(this, $html);
                }

                this._pageStack.push({
                    config: config,
                    dom: $html
                });

                if (!config.isBind) {
                    this._bind(config);
                }

                return this;
            },
            back: function () {
                history.go(-1);
            },
            _back: function (config) {
                if (this._pageIndex <= 0 && (!config || config.name == 'home')) {//没有config不执行
                    return;
                }
                this._pageIndex--;

                var stack = this._pageStack.pop();
                if (!stack) {
                    return;
                }

                var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
                var found = this._findInStack(url);
                if (!found) {
                    var html = jQuery(config.template).html();
                    var $html = jQuery(html).addClass('js_show').addClass(config.name);
                    $html.insertBefore(stack.dom);

                    if (!config.isBind) {
                        this._bind(config);
                    }

                    this._pageStack.push({
                        config: config,
                        dom: $html
                    });
                }

                stack.dom.addClass('slideOut').on('animationEnd webkitAnimationEnd', function () {
                    stack.dom.remove();
                });
                if(stack.config.backCallBack) {
                    stack.config.backCallBack(stack.dom.children().get(0).contentWindow.returnValue);
                }
                return this;
            },
            _findInStack: function (url) {
                var found = null;
                for (var i = 0, len = this._pageStack.length; i < len; i++) {
                    var stack = this._pageStack[i];
                    if (stack.config.url === url) {
                        found = stack;
                        break;
                    }
                }
                return found;
            },
            _find: function (key, value) {
                var page = null;
                for (var i = 0, len = this._configs.length; i < len; i++) {
                    if (this._configs[i][key] === value) {
                        page = this._configs[i];
                        break;
                    }
                }
                return page;
            },
            _bind: function (page) {
                var events = page.events || {};
                for (var t in events) {
                    for (var type in events[t]) {
                        this.$container.on(type, t, events[t][type]);
                    }
                }
                page.isBind = true;
            }
        };

        function androidInputBugFix() {
            // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
            // 相关 issue: https://github.com/weui/weui/issues/15
            // 解决方法:
            // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
            // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
            //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
            if (/Android/gi.test(navigator.userAgent)) {
                window.addEventListener('resize', function () {
                    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                        window.setTimeout(function () {
                            document.activeElement.scrollIntoViewIfNeeded();
                        }, 0);
                    }
                })
            }
        }

        function createFrame() {
            var script = document.createElement('script');
            script.type = 'text/html';
            script.id = frameId + '_tpl';
            var win = jQuery(window);
            // script.textContent = '<div class="page" style="height: '+ win.height() +'px;"><iframe class="selector-frame"></iframe></div>';
            script.textContent = '<div class="page"><iframe class="selector-frame"></iframe></div>';
            if (document.body) {
                document.body.appendChild(script);
            }
        }

        function setPageManager() {
            var pages = {}, tpls = jQuery('script[type="text/html"]');

            for (var i = 0, len = tpls.length; i < len; ++i) {
                var tpl = tpls[i], name = tpl.id.replace('_tpl', '');
                pages[name] = {
                    name: name,
                    url: '#' + name,
                    template: '#' + tpl.id
                };
            }

            for (var page in pages) {
                pageManager.push(pages[page]);
            }
            pageManager.init();
        }

        if (!loaded) {
            createFrame();
            androidInputBugFix();
            setPageManager();
        }
        loaded = true;
        lyb.pageManager = pageManager;
        lyb.pageManager.frameId = frameId;
    };
})();

