/**
 * Created by tianxinlong on 2016-08-02-0002. v1.0
 */
(function() {
    var _lyb = {
        version: 1.0,
        HTML5: !!window['applicationCache'],
        noop: function() {

        },
        _index: 0,
        getUUID: function(prefix) {
            prefix = prefix || 'lyb';
            var id = prefix + '-' + this._index++;
            return id;
        },
        getValid: function() {
            var array = Array.prototype.slice.call(arguments);
            for (var index in array) {
                var o = array[index];
                if (o !== undefined && o !== null || (jQuery.type(o) == "number" && !isNaN(o))) {
                    return o;
                }
            }
        },
        isDate: function(value) {
            return !!(value && value.getTime);
        },
        isArray: function(value) {
            return !!(value && !!value.push);
        },
        isNull: function(value) {
            return value === null || value === undefined;
        },

        isNumber: function(value) {
            return !isNaN(value) && typeof value == 'number';
        },
        formatDate: function(date, format, returnDate) {
            if (date == undefined || date === '') {
                return "";
            }

            function convertToDate(time) {
                if (time instanceof Date) {
                    return time;
                }
                if (jQuery.type(time) === 'string') {
                    if (/^\w+.+\d{4}$/i.test(time)) {
                        time = new Date(time);
                    }
                }

                var __D = new Date();
                if (jQuery.type(time) === 'string') {
                    time = time.replace(/T/i, " "); // 针对date类型查询时间带T
                    time = time.replace(/\.\d+/i, ""); // 针对IE 对应数据库datetime
                    time = time.replace(/-/g, "/");
                    var _T = time.split(" ");
                    var _d = _T[0],
                        _t = _T[1];
                    if (/:/.test(_d)) {
                        _d = undefined;
                        _t = _T[0];
                    }

                    if (_t && _d) {
                        var _ds = _d.split("/"),
                            _ts = _t.split(":");
                        __D = new Date(Number(_ds[0] || __D.getFullYear()), Number(_ds[1] ? _ds[1] - 1 : __D.getMonth()),
                            Number(_ds[2] || __D.getDate()), Number(_ts[0] || __D.getHours()), Number(_ts[1] ||
                                __D.getMinutes()), Number(_ts[2] || __D.getSeconds()));
                    } else if (_d) {
                        var _ds = _d.split("/");
                        __D = new Date(Number(_ds[0] || __D.getFullYear()), Number(_ds[1] ? _ds[1] - 1 : __D.getMonth()),
                            Number(_ds[2] || __D.getDate()), 0, 0, 0);
                    } else if (_t) {
                        var _ts = _t.split(":");
                        __D = new Date(__D.getFullYear(), __D.getMonth(), __D.getDate(), Number(_ts[0] || __D.getHours()),
                            Number(_ts[1] || __D.getMinutes()), Number(_ts[2] || __D.getSeconds()));
                    }
                }
                return __D;
            }

            var _time = convertToDate(date);
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            format = format.replace(/YYYY/i, _time.getFullYear());
            format = format.replace(/YY/i, (_time.getYear() % 100) > 9 ? (_time.getYear() % 100).toString() : '0' +
                (_time.getYear() % 100));
            format = format.replace(/MM/i, (_time.getMonth() + 1) > 9 ? (_time.getMonth() + 1).toString() : '0' +
                (_time.getMonth() + 1));
            format = format.replace(/W/i, Week[_time.getDay()]);
            format = format.replace(/DD/i, _time.getDate() > 9 ? _time.getDate().toString() : '0' + _time.getDate());
            format = format.replace(/HH/i, _time.getHours() > 9 ? _time.getHours().toString() : '0' + _time.getHours());
            format = format.replace(/MI/i, _time.getMinutes() > 9 ? _time.getMinutes().toString() : '0' +
                _time.getMinutes());
            format = format.replace(/SS/i, _time.getSeconds() > 9 ? _time.getSeconds().toString() : '0' +
                _time.getSeconds());

            if (returnDate) {
                return convertToDate(format);
            }
            return format;
        },
        formatDecimal: function(number, formatFixed, backEmpty, spliter) {
            spliter = lyb.getValid(spliter, ',');
            if (backEmpty && number === '') {
                return '';
            }

            if (formatFixed === undefined || formatFixed === null) {
                formatFixed = 2;
            }
            if (jQuery.type(formatFixed) == 'string')
                formatFixed = Number(formatFixed.replace(/[a-zA-Z]/g, ''));

            // 格式化方法
            function _splitByGroup(str) {
                if (str == 0) {
                    return 0;
                }
                var len = str.length,
                    array = [],
                    start = 0,
                    end = len % 3,
                    step = Math.ceil(len / 3);

                for (var i = 0; i <= step; i++) {
                    var subStr = str.substring(start, end);
                    if (subStr != '')
                        array.push(subStr);
                    start = end;
                    end = start + 3;
                }
                return array.join(spliter) || "0";
            }

            number = String(number) || "";
            var clearRegExp = /\D*/ig,
                empty = '';
            var minus = /\-/.test(number) ? -1 : 1;
            var numbers = number.split('.'),
                number0 = numbers[0].replace(clearRegExp, empty),
                number1 = (numbers[1] || "")
                .replace(clearRegExp, empty);

            number0 = _splitByGroup(number0);
            number1 = (Number(number1) * Math.pow(0.1, number1.length)).toFixed(formatFixed) *
                Math.pow(10, formatFixed);
            number1 = parseInt(number1.toFixed(0)); //先四舍五入,防止JS计算错误 如: 0.08084 * 10000

            if (number1 == 0) {
                number1 = new Array(formatFixed + 1).join("0");
            } else if (number1.toString().length < formatFixed) {
                number1 = new Array(formatFixed - number1.toString().length + 1).join("0") + number1;
            }

            if (formatFixed == 0) {
                number = number0;
            } else {
                number = number0 + "." + number1;
            }
            return number;
        },
        /*------------克隆数据---------------*/
        clone: function(object) {
            return eval("(" + JSON.stringify(object) + ")");
        },
        // TODO 通过id属性提取注册的组件
        get: function(id) {
            if (this.components[id]) {
                return this.components[id];
            }
        },
        // TODO Deposit 组件寄存器
        components: {},
        type: function(obj) {
            var class2type = {
                '[object Array]': "array",
                '[object Boolean]': "boolean",
                '[object Date]': "date",
                '[object Error]': "error",
                '[object Function]': "function",
                '[object Number]': "number",
                '[object Object]': "object",
                '[object RegExp]': "regexp",
                '[object String]': "string"
            };

            if (obj == null) {
                return obj + "";
            }
            //'如果是object或者function，先查询集合class2type,如果没有查询到就返回object。
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },

        isPlainObject: function(obj) {
            var proto, Ctor, hasOwn = ({}).hasOwnProperty,
                fnToString = hasOwn.toString,
                getProto = Object.getPrototypeOf,
                ObjectFunctionString = fnToString.call(Object);
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);
            if (!proto) {
                return true;
            }

            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        concat: function() {
            var concat = function(source, target) {
                for (var key in target) {
                    var value = target[key];
                    if (_lyb.type(value) === "array") {
                        concat(source[key] = source[key] || [], value);
                    } else if (_lyb.isPlainObject(value)) {
                        concat(source[key] = source[key] || {}, value);
                    } else {
                        if (_lyb.type(source) === "array") {
                            source.push(value);
                        } else {
                            source[key] = value;
                        }
                    }
                }
                return source;
            };
            try {
                var subObject = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    concat(subObject, arguments[i]);
                }
                return subObject;
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    window.lyb = _lyb.concat(window.lyb || {}, _lyb);

    //销毁组件
    lyb.destroy = function(obj) {
        if (lyb.type(obj) === 'string') {
            delete lyb.components[obj];
        } else if (lyb.type(obj) === 'object') {
            delete lyb.components[obj.id];
        }
    };


    /**
     * @author 田鑫龙
     * @param el dom元素，可以是#id|.class|jQuery|dom
     * @param options 配置参数
     */
    lyb.searchBox = function(el, fn) {
        this.el = el;
        this.submitFn = fn || lyb.noop;
        this._init();
        this._bindEvent();
    };
    lyb.searchBox.prototype = {
        _init: function() {
            this.el = jQuery(this.el);
            this.id = this.el[0].id;
            this.formEl = jQuery('form.weui-search-bar__form', this.el);
            this.textEl = jQuery('input.weui-search-bar__input', this.formEl);
            this.clearEl = jQuery('.weui-icon-clear', this.formEl);
            this.labelEl = jQuery('.weui-search-bar__label', this.formEl);
            this.cancelEl = jQuery('.weui-search-bar__cancel-btn', this.el);
            this.searchBody = jQuery('<div class="search-body his-hide" style="position: fixed;top: 58px;right: 0;left: 0;bottom: 0;z-index: 11;background: #fff;"></div>').appendTo(document.body)[0];
            this.viewBody = jQuery('.view-body')[0];
            this.viewSearchText = jQuery(".weui-search-bar__label>span", this.el);

            if (this.textEl.val().trim()) {
                this.labelEl.removeClass('his-hide');
            }
        },
        _bindEvent: function() {
            var that = this;
            this.el.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            jQuery(document.body).on('click', function(e) {
                if (!that.textEl.val().length) {
                    window.setTimeout(function() {
                        that.el.removeClass('weui-search-bar_focusing');
                        that._empty.call(that, e);
                    }, 200);
                }
            });
            this.textEl.on('focus', function(e) {
                if (this.value) {
                    that.backupText = this.value;
                }
                that.el.addClass('weui-search-bar_focusing');
                that._focus.call(that, e);
                var len = this.value.length;
                if (document.selection) {
                    var sel = this.createTextRange();
                    sel.moveStart('character', len);
                    sel.collapse();
                    sel.select();
                } else if (typeof this.selectionStart === 'number' && typeof this.selectionEnd === 'number') {
                    this.selectionStart = this.selectionEnd = len;
                    /*平时所见的光标其实是由两部分组成的，即selectionStart和selectionEnd，一般时候这两个是想等的，但在选中一段文字，全选时，他们的差值就是所选文字的个数。*/
                }
            });
            this.textEl.on('input', function(e) {
                that._input.call(that, e);
                that.viewSearchText.html(this.value);
                //诸葛打点记录搜索
                zhuge.track('搜索记录', {
                    '内容': this.value,
                    '来源': document.title,
                    '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
                });
            });
            this.textEl.on('blur', function(e) {
                if (!that.cancelEl[0]) {
                    that.el.removeClass('weui-search-bar_focusing');
                }
                var text = this.value;
                that.viewSearchText.html(text);
                if (text) {
                    that.viewSearchText.removeClass('his-hide');
                } else {
                    that.viewSearchText.addClass('his-hide');
                }
            });
            this.labelEl.on('click', function() {
                that.backupText = that.textEl.val();
                that.textEl.val('');
                that.viewSearchText.html('');
                that.textEl.focus();
            });
            this.clearEl.on('click', function(e) {
                that.textEl.val('').focus();
                that.viewSearchText.html('');
                that._input.call(that, e);
            });
            this.formEl.on('submit', function(e) {
                that._submit.call(that, e);
            });
            this.cancelEl.on('click', function(e) {
                that.backupText = that.backupText || '';
                that.textEl.val(that.backupText);
                that.viewSearchText.html(that.backupText);
                if (that.backupText) {
                    that.viewSearchText.removeClass('his-hide');
                } else {
                    that.viewSearchText.addClass('his-hide');
                }
                that.el.removeClass('weui-search-bar_focusing');
                that._cancelSearch.call(that, e);
            });
            jQuery(this.searchBody).on('click', '.search-result', function(e) {
                var el = this;
                var dataSet = el.dataset;
                var type = dataSet.type,
                    text = el.innerHTML,
                    id = dataSet.id;
                that._storeToHistory({ text: text, type: type, id: id });
            }).on('click', '.history-item', function(e) {
                that._itemClick.call(that, e);
            }).on('click', '.common-disease', function(e) {
                that._commonDiseaseClick.call(that, e);
            }).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var target = e.target;
                if (target.tagName === 'A' && target.href) {
                    window.location.href = target.href;
                }
            });
        },
        _commonDiseaseClick: function(e) {
            var dataSet = e.target.dataset;
            var text = this.innerText,
                href = dataSet.href;
            var that = this;
            //诸葛打点记录搜索
            zhuge.track('点击常见病症', {
                '内容': text,
                '来源': '全局搜索',
                '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
            }, function() {
                window.location.href = href;
            });
        },
        _itemClick: function(e) {
            var dataSet = e.target.dataset;
            var text = this.innerText,
                type = dataSet.type,
                href = dataSet.href;
            var that = this;
            //诸葛打点记录搜索
            zhuge.track('搜索界面点击历史记录', {
                '内容': text,
                '类别': type === 'illness' ? '病症' : '医生',
                '来源': document.title,
                '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
            }, function() {
                if (that.itemClickFn) {
                    that.itemClickFn.call(that, { type: type, text: text });
                } else {
                    window.location.href = href;
                }
            });
        },
        _empty: function(e) {
            if (this.searchBody) {
                this.searchBody.classList.add('his-hide');
                this.viewBody && this.viewBody.classList.remove('his-hide');
                // this.cancelEl.addClass('his-hide');
            }
            this.viewSearchText.html(this.textEl.placeholder);
            if (this.cancelFn) {
                this.cancelFn.call(this);
            }
        },
        _cancelSearch: function() {
            this.labelEl.show();
            this.textEl.blur();
            this.textEl.val('');

            this._hideViewBox();
            this.viewSearchText.html(this.textEl[0].placeholder);

            if (this.cancelFn) {
                var text = this.textEl.val();
                this.cancelFn.call(this, text);
            }
        },
        _hideViewBox: function() {
            this.searchBody.classList.add('his-hide');
            this.viewBody && this.viewBody.classList.remove('his-hide');
        },
        _submit: function(e) {
            e.preventDefault();
            this.textEl.blur();
            if (this.submitFn) {
                var text = this.textEl.val();
                // this._storeToHistory({text: text, type: 'common'});
                this.submitFn.call(this, text);
            }
        },
        _focus: function(e) {
            e.preventDefault();
            var text = this.textEl.val();
            if (this.searchBody) {
                this.viewBody && this.viewBody.classList.add('his-hide');
                this.searchBody.classList.remove('his-hide');

                // this.cancelEl.removeClass('his-hide');
                if (text === '') {
                    this._renderHistory();
                }
            }

            if (this.focusFn) {
                this.focusFn.call(this, text);
            }
        },
        _input: function(e) {
            e.preventDefault();
            if (this.inputFn) {
                var text = this.textEl.val();
                this.inputFn.call(this, text);
            }
        },
        _renderHistory: function() {
            var text = this._getFromHistory(),
                html = '';
            if (text) {
                html = '<div class="weui-panel his-nobackground no-after-line no-before-line">' +
                    '<div class="weui-panel__hd his-flex no-after-line" style="padding: 20px 12px 12px;">' +
                    '<span class="font15 middle-color">历史搜索</span> ' +
                    '<div class="" ontouchstart="localStorage.removeItem(\'__searchHistory\');this.parentNode.nextElementSibling.innerHTML = \'\';">' +
                    '<i class="ico-remove font13" style="width: 12px;height: 13px;vertical-align: middle;"></i>' +
                    '<span class="font13 light-color" style="margin-left: 4px;vertical-align: middle;">清空</span> ' +
                    '</div>' +
                    '</div>' +
                    '<div class="weui-panel__bd" style="padding: 0 12px;">' + text + '</div>' +
                    '</div>';
                html += this._renderCommonDisease(true);
            } else {
                html += this._renderCommonDisease(false);
            }
            this.searchBody.innerHTML = html;
        },
        _renderCommonDisease: function(flag) {
            var text = localStorage.getItem('commonDisease');
            if (text) {
                var html = '',
                    list = text.split(','),
                    page = location.pathname.replace(/^\//, '');
                if (/\/index\.html$/.test(page)) {
                    page = 'html/search/index_search.html';
                } else if (/\/lyb_index\.html$/.test(page)) {
                    page = 'html/search/lyb_search.html';
                }
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    html += '<span class="common-disease deep-color" data-href="' + ctx + page + '?condition=' + item + '" style="padding: 8px 12px;background: #f2f2f2;border-radius: 2px;margin-right: 12px;margin-bottom: 12px;display: inline-block;">' + item + '</span>';
                }
                return '<div class="weui-panel his-nobackground no-after-line no-before-line" style="margin-top: ' + (flag ? '8' : '0') + 'px;">' +
                    '<div class="weui-panel__hd his-flex no-after-line" style="padding: 20px 12px 12px;">' +
                    '<span class="font15 middle-color">常见病症</span> ' +
                    '</div>' +
                    '<div class="weui-panel__bd" style="padding: 0 12px;">' + html + '</div>' +
                    '</div>';
            } else {
                var that = this;
                lyb.ajax(ctx + 'sysDiseases/common', {
                    success: function(result) {
                        if (result.success) {
                            var list = result.data || [];
                            localStorage.setItem('commonDisease', list.join(','));
                            that._renderCommonDisease(flag);
                        }
                    }
                })
            }
            return '';
        },
        _getFromHistory: function() {
            var html = '';
            var his = localStorage.getItem('__searchHistory') || '[]';
            if (his) {
                his = JSON.parse(his);
                for (var i = 0, len = his.length; i < len; i++) {
                    html += this.getHistoryItem(his[i]);
                }
            }
            return html;
        },
        getHistoryItem: function(item) {
            var text = item.text,
                type = item.type,
                id = item.id,
                page = location.pathname.replace(/^\//, '');
            if (/\/index\.html$/.test(page)) {
                page = 'html/search/index_search.html';
            } else if (/\/lyb_index\.html$/.test(page)) {
                page = 'html/search/lyb_search.html';
            }
            page += '?condition=' + text;
            if (type === 'doctor' && id) {
                page = 'html/doctor/doctor_detail.html?id=' + id + '&isActiveGF=' + params.isActiveGF;
            }
            return '<span data-type="' + type + '" class="history-item deep-color" data-href="' + ctx + page + '" style="padding: 8px 12px;background: #f2f2f2;border-radius: 2px;margin-right: 12px;margin-bottom: 12px;display: inline-block;">' + text + '</span>'
        },
        hide: function() {
            this._hideViewBox();
        },
        _storeToHistory: function(item) {
            if (item.text.replace(/\s*/g, '') === '') {
                return;
            }
            var his = localStorage.getItem('__searchHistory') || '[]';
            if (his) {
                his = JSON.parse(his);
                if (item) {
                    for (var i = 0, len = his.length; i < len; i++) {
                        var history = his[i];
                        if (history.text === item.text) {
                            return;
                        }
                    }
                    if (his.length >= 10) {
                        his.shift();
                    }
                    if (item.type === 'illness') {
                        delete item.id;
                    }
                    his.unshift(item);
                }
            }
            localStorage.setItem('__searchHistory', JSON.stringify(his));
        },
        renderSearchResult: function(html) {
            this.searchBody.innerHTML = html;
        },
        getValue: function() {
            return this.textEl.val();
        }
    };


    /**
     * @author 田鑫龙
     * @param text 提示文本
     * @param time 消失时间
     * @param callback 回调函数
     */
    lyb.toast = function(text, callback, time) {
        text = text || '操作成功';
        if (jQuery.type(callback) == 'number') {
            time = callback;
        }
        time = time || 2000;
        weui.toast(text, {
            duration: time,
            callback: callback || lyb.noop
        })
    };
    lyb.confirm = weui.confirm;
    lyb.alert = weui.alert;
    lyb.topTips = weui.topTips;
    lyb.error = lyb.topTips;

    //动态替换url
    lyb.updateUrl = function(data, reset) {
            var paramString = '',
                array = [];
            for (var prop in data) {
                var _v = data[prop];
                if (_v === '' || _v === undefined || _v === null) {
                    continue;
                }
                if (prop === 'ctx' || prop === '_') {
                    continue;
                }
                params[prop] = _v;
                if (_v) {
                    array.push(prop + '=' + _v);
                }
            }
            paramString = array.join('&');

            var hash = window.location.hash,
                url = location.href.split('#')[0];
            if (url.indexOf('?') === -1) {
                url += '?' + paramString;
            } else {
                var _params = url.split('?')[1].split('&'),
                    map = {};
                if (!reset) {
                    for (var i = 0, len = _params.length; i < len; i++) {
                        var kv = _params[i].split('=');
                        map[kv[0]] = kv[1];
                    }
                }
                for (var _key in data) {
                    map[_key] = data[_key];
                }
                _params = [];
                for (var _key in map) {
                    if (_key === 'ctx' || _key === '_') {
                        continue;
                    }
                    _v = map[_key];
                    if (_v === '' || _v === undefined || _v === null) {
                        continue;
                    }
                    _params.push(_key + '=' + _v);
                }
                url = url.split('?')[0] + '?' + _params.join('&');
            }
            history.replaceState('', '', url);
        }
        //读取页面
    lyb.getPage = function(url, success) {
        success = success || function() {};
        lyb.ajax(url, { type: 'get', dataType: 'text', success: success });
    }

    /**
     * 加载数据框，常驻页面
     */
    var Mask = function() {
        this.init();
    }
    Mask.prototype = {
        init: function() {
            var el = document.createElement('div');
            el.classList.add('weui-loading_toast');
            el.classList.add('his-hide');

            var mask = document.createElement('div');
            mask.classList.add('weui-mask_transparent');
            mask.style.opacity = 1;

            var loadding = document.createElement('div');
            loadding.classList.add('weui-toast');
            loadding.classList.add('weui-animate-fade-in');

            var icon = document.createElement('i');
            icon.classList.add('weui-loading');
            icon.classList.add('weui-icon_toast');

            var text = document.createElement('p');
            text.classList.add('weui-toast__content');
            text.innerHTML = '加载中...';

            el.appendChild(mask);
            el.appendChild(loadding);
            loadding.appendChild(icon);
            loadding.appendChild(text);

            this.el = el;
            this.iconEl = icon;
            this.textEl = text;

            document.body.appendChild(el);
        },
        show: function(text) {
            this.update(text);
            this.el.classList.remove('his-hide');
        },
        update: function(text) {
            this.textEl.innerHTML = text || '加载中...';
        },
        success: function(text, callback) {
            text = text || '操作成功';
            if (typeof text === 'function') {
                callback = text;
                text = '操作成功';
            }
            this.iconEl.classList.remove('weui-loading');
            this.iconEl.classList.add('weui-icon-success-no-circle');
            this.update(text);
            var that = this;
            that.close(callback, 2000);
        },
        close: function(cb, time) {
            if (time) {
                var that = this;
                window.setTimeout(function() {
                    that.el.classList.add('his-hide');
                    if (cb) {
                        cb();
                    }
                }, time || 1000);
            } else {
                this.el.classList.add('his-hide');
                if (cb) {
                    cb();
                }
            }
        },
        finish: function(cb, time) {
            this.iconEl.classList.remove('weui-loading');
            this.iconEl.classList.add('weui-icon-success-no-circle');
            this.textEl.innerHTML = '已完成';
            this.close(cb, time);
        }
    };
    var mask = null;
    lyb.showMask = function() {
        mask = mask || new Mask();
        return mask;
    }

    //修正时间字符串
    lyb.fixDateString = function(string, format) {
        var array = string.match(/\d+/g),
            format = format || 'yyyy-mm-dd';
        for (var i = 0, len = array.length; i < len; i++) {
            array[i] = Number(array[i]);
        }
        format = format.replace(/YYYY/i, array[0]);
        array[1] && (format = format.replace(/MM/i, array[1] > 9 ? array[1] : '0' + array[1]));
        array[2] && (format = format.replace(/DD/i, array[2] > 9 ? array[2] : '0' + array[2]));
        array[3] && (format = format.replace(/HH/i, array[3] > 9 ? array[2] : '0' + array[3]));
        array[4] && (format = format.replace(/MI/i, array[4] > 9 ? array[2] : '0' + array[4]));
        array[5] && (format = format.replace(/SS/i, array[5] > 9 ? array[2] : '0' + array[5]));
        return format;
    }

    //封装多文件
    lyb.multiImages = function(el) {
        this.el = el;
        this.init();
        this.initEvent();
        this.fileList = [];

        var scrollerEl = jQuery('.scroll-wrapper')[0];
        if (scrollerEl) {
            this.scrollerId = scrollerEl.id;
            this.scrollerId && lyb.scroll('#' + this.scrollerId);
        }

    };
    lyb.multiImages.prototype = {
        init: function() {
            if (typeof this.el == 'string' || !(this.el instanceof jQuery)) {
                this.el = jQuery(this.el);
            }
            this.maxSize = this.el[0].dataset.maxSize || 6;
            this.uploadMode = this.el[0].dataset.uploadMode;
            this.fileBorderEl = jQuery('<ul class="weui-uploader__files"></ul>');
            this.btnBorderEl = jQuery('<div class="weui-uploader__input-box"></div>');
            this.fileEl = jQuery('<input class="weui-uploader__input" type="file" accept="image/*">');

            this.fileBorderEl.appendTo(this.el);
            this.btnBorderEl.appendTo(this.el);
            this.fileEl.appendTo(this.btnBorderEl);

            this.imgWidth = (this.fileBorderEl.width() - 24) / 4;
            this.btnBorderEl.css({
                width: this.imgWidth,
                height: this.imgWidth,
                margin: '0 0 8px 0'
            })
        },
        updateImgSize: function() {
            this.fileBorderEl.children().css({
                width: this.imgWidth,
                height: this.imgWidth,
                margin: '0 8px 8px 0',
                'vertical-align': 'top'
            })
        },
        initEvent: function() {
            var that = this;
            this.uploader = weui.uploader('#' + this.el[0].id, {
                auto: false,
                compress: false,
                onQueued: function() {
                    that.fileList.push(this);
                    if (that.onPush) {
                        that.onPush();
                    }
                    if (that.onQueueChange) {
                        that.onQueueChange();
                    }

                    that.scrollerId && lyb.scroll('#' + that.scrollerId);
                    that.updateImgSize();
                },
                onBeforeQueued: function(files) {
                    var len = that.fileList.length,
                        size = 0;
                    for (var i = 0; i < len; i++) {
                        size += that.fileList[i].size;
                    }
                    var oLen = that.el.find('li').length;
                    if (oLen >= parseInt(that.maxSize) - 1) {
                        that.btnBorderEl.addClass('his-hide');
                        if (oLen >= parseInt(that.maxSize)) {
                            if (that.uploadMode === 'photo') {
                                that.fileList = [];
                                that.fileBorderEl.empty();
                            } else {
                                weui.alert('最多上传' + that.maxSize + '张图片！');
                                return false;
                            }
                        }
                    } else {
                        that.btnBorderEl.removeClass('his-hide');
                    }
                    if (size > 100 * 1024 * 1024) {
                        weui.alert('请上传不超过100M的图片！');
                        return false;
                    }
                }
            });
            this.fileBorderEl.on('click', function(e) {
                if (that.uploadMode === 'photo') {
                    jQuery('.weui-uploader__input').trigger('click');
                    return;
                }
                var target = e.target;

                while (!target.classList.contains('weui-uploader__file_img') && target) {
                    target = target.parentNode;
                }
                if (!target) return;

                var url = target.src || '';
                var id = target.dataset.id;

                // if (url) {
                //     url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
                // }
                var gallery = weui.gallery(url, {
                    onDelete: function onDelete() {
                        weui.confirm('确定删除该图片？', function() {
                            var index, list = that.fileList;
                            for (var i = 0, len = list.length; i < len; ++i) {
                                var file = list[i];
                                if (file.id.toString() === id) {
                                    index = i;
                                    break;
                                }
                            }
                            if (index !== undefined) list.splice(index, 1);

                            target.parentNode.remove();
                            gallery.hide();
                            if (that.onShift) {
                                that.onShift();
                            }
                            if (that.onQueueChange) {
                                that.onQueueChange();
                            }
                            if (that.el.find('li').length < parseInt(that.maxSize)) {
                                that.btnBorderEl.removeClass('his-hide');
                            }
                            this.scrollerId && lyb.scroll('#' + this.scrollerId);
                        });
                    }
                });
            });
        },
        setValue: function(url) {
            this.fileBorderEl.append('<li class="weui-uploader__file"><img style="width: 100%;height: 100%;" class="weui-uploader__file_img" src="' + url + '"/></li>');
            this.btnBorderEl.addClass('his-hide');
        },
        getFiles: function() {
            return this.fileList;
        }
    };

    //封装多页签
    lyb.Tabs = function(selector) {
        this.init(selector);
        this.bindEvent();
    };
    lyb.Tabs.prototype = {
        init: function(selector) {
            var id = typeof selector == 'string' ? '#' + selector : selector;
            this.el = jQuery(id);
            var children = this.el.children();
            this.tabEls = this.el.children('.weui-tab-titles').children();
            this.panelEls = this.el.children('.weui-tab-contents').children();
        },
        bindEvent: function() {
            var that = this;
            this.el.on('click', '.weui-navbar__item', function(e) {
                that.onItemClick.call(that, this, e);
            });
        },
        onItemClick: function(el, e) {
            var index = jQuery(el).index();
            this.tabEls.removeClass('lyb-active');
            el.classList.add('lyb-active');
            if (this.panelEls[0]) {
                this.panelEls.removeClass('lyb-active');
                this.panelEls.eq(index).addClass('lyb-active');
            }

            var detail = JSON.parse(JSON.stringify(el.dataset));
            detail._index = index;

            var event = new CustomEvent('change', { detail: detail });
            event.initEvent('change', true, true);
            el.dispatchEvent(event);
        }
    }
})();

;
(function() {
    /**
     * 2017-09-21
     * 倒计时
     **/
    lyb.countDown = function(options) {
        this.init(options);
        this.write();
        this.start();
    };
    lyb.countDown.prototype = {
        init: function(options) {
            this.endTime = options.endTime || this.now;
            this.el = document.getElementById(options.el);
            this.callback = options.callback || function() {};
        },
        start: function() {
            var that = this;
            if (this.interval != undefined) {
                window.clearInterval(this.interval);
            }
            this.interval = window.setInterval(function() {
                that.write();
            }, 1000);
        },
        write: function() {
            var endTime = this.endTime
            var leftTime = endTime - new Date().getTime();

            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;

            if (leftTime > 0) {
                var leftSecond = parseInt(leftTime / 1000);
                day = Math.floor(leftSecond / (60 * 60 * 24));
                hour = Math.floor((leftSecond - day * 24 * 60 * 60) / 3600);
                minute = Math.floor((leftSecond - day * 24 * 60 * 60 - hour * 3600) / 60);
                second = Math.floor(leftSecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
            }
            var array = [second + ' 秒'];
            if (minute >= 1) {
                array.unshift(minute + " 分 ");
            }
            if (hour >= 1) {
                array.unshift(hour + " 时 ");
            }
            if (day >= 1) {
                array.unshift(day + " 天 ");
            }
            this.el.innerHTML = array.join('');

            var event = { day: day, hour: hour, minute: minute, second: second };
            if (day == 0 && hour == 0 && minute == 0 && second == 0) {
                if (this.interval != undefined) {
                    window.clearInterval(this.interval);
                }
                if (this.callback) {
                    var e = JSON.parse(JSON.stringify(event));
                    e.status = 'finish';
                    this.callback();
                }
            }
            if (this.event) {
                var e = JSON.parse(JSON.stringify(event));
                e.status = 'running';
                this.event(e);
            }
        }
    };
})();

(function() {
    /**
     * 文本框根据输入内容自适应高度
     * {HTMLElement}   输入框元素
     * {Number}        设置光标与输入框保持的距离(默认0)
     * {Number}        设置最大高度(可选)
     */
    var autoTextarea = function(elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function(type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ?
            function(name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function(name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));
        elem.style.resize = 'both'; //如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

        var change = function() {
            var scrollTop, height,
                padding = 0,
                style = elem.style;

            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                };
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            };
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    };

    lyb.autoHeightTextarea = function(id) {
        var textList = [];
        if (id) {
            textList.push(document.querySelector('#' + id))
        } else {
            textList = document.querySelectorAll('textarea');
        }
        for (var i = 0, len = textList.length; i < len; i++) {
            var el = textList[i];
            autoTextarea(el);
        }
    }
})();
(function() {
    lyb.replaceText = function(html, obj) {
        obj = obj || params;
        var matchers = html.match(/\$\{.+?\}/g);
        if (matchers) {
            for (var i = 0; i < matchers.length; i++) {
                var matcher = matchers[i];
                var _cloneMatcher = matcher;
                var _vars = matcher.match(/params.\w+/igm) || [];
                for (var j = 0; j < _vars.length; j++) {
                    var _var = _vars[j].replace(/params\./g, '');
                    var value = obj[_var] || '';
                    if (value === 'undefined' || value === 'null') {
                        value = '';
                    }
                    matcher = matcher.replace('params.' + _var, '"' + value + '"');
                }
                var result = matcher.replace(/\$\{:*|\}/g, '');
                result = new Function('return ' + result)();
                html = html.replace(_cloneMatcher, result);
            }
        }
        return html;
    };

    lyb.parse = function() {
        //TODO replace params
        var body = document.body,
            html = body.innerHTML;
        body.classList.add(lyb.os.ios ? 'ios' : lyb.os.android ? 'android' : 'pc');
        html = lyb.replaceText(html, window.params);
        html = html.replace(/data\-src/ig, 'src');
        body.innerHTML = html;
        //显示数据
        body.style.visibility = 'visible';

        //待转换对象
        var array = [{ express: '.weui-tab', fn: lyb.Tabs }, {
            express: '.scroll-wrapper',
            fn: lyb.scroll
        }, { express: '.multi-image', fn: lyb.multiImages }, { express: '.weui-search-bar', fn: lyb.searchBox }];
        for (var i = 0, len = array.length; i < len; i++) {
            var comp = array[i];
            var els = document.querySelectorAll(comp.express);
            for (var j = 0, length = els.length; j < length; j++) {
                var el = els[j];
                if (!el.id) {
                    el.id = lyb.getUUID('lyb');
                }
                var result = new comp.fn(el);
                if (!lyb.components[el.id])
                    lyb.components[el.id] = result;
            }
        }
        //如果使用了侧滑页面，就初始化
        lyb.initPageManager && lyb.initPageManager();

        //判断浏览器环境
        var ua = window.navigator.userAgent.toLowerCase();
        var uaArray = ua.match(/MicroMessenger/i);
        if (uaArray) {
            uaArray = Array.prototype.slice.call(uaArray);
        }
        uaArray = uaArray || [];
        if (uaArray.indexOf('micromessenger') !== -1 && !window.lybMp && params && params.fromWhere !== 'lyb' && params.fromWhere !== 'lyh') { //微信浏览器 TODO 良医帮公众号隐藏快速导航
            lyb.fastNav();
        }


        //TODO   判断是否有微信分享功能， 没有就分享主页
        window.setTimeout(function() {
            if (!window.wx) {
                var wxShareScript = document.createElement('script');
                wxShareScript.type = 'text/javascript';
                wxShareScript.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
                wxShareScript.addEventListener('load', function() {
                    var wxSign = document.createElement('script');
                    wxSign.type = 'text/javascript';
                    wxSign.src = ctx + 'resources/js/commons/wxSign.js';
                    wxSign.addEventListener('load', function() {
                        var shareIndex = document.createElement('script');
                        shareIndex.type = 'text/javascript';
                        shareIndex.src = ctx + 'resources/js/commons/share_index.js';
                        document.body.appendChild(shareIndex);
                    });
                    document.body.appendChild(wxSign);
                }, false);
                document.body.appendChild(wxShareScript);
            }
        }, 0);

        //TODO 处理ios 11.4 坑货导航条
        window.setTimeout(function() {
            var scroll = jQuery('.scroll-wrapper')[0];
            var border = jQuery('.scroll-border')[0];
            if (scroll && border) {
                var id = scroll.id;
                lyb.scroll('#' + id);
                console.log('reset scroll after 0.3 second later')
            }
        }, 300);

        jQuery(window).resize(function() {
            var wrapper = jQuery('.scroll-wrapper')[0];
            if (wrapper) {
                var id = wrapper.id;
                if (id) {
                    lyb.get(id).refresh();
                }
            }
        })
    }
})();
/**
 * @author tianxinlong
 * @date 2017-11-25
 * @description promise的简单实现
 * */
(function() {
    var Promise = function(fn) {
        this.doneQueue = [];
        this.exceptionQueue = [];
        this.status = 'pending';
        var that = this;
        window.setTimeout(function() {
            that._init(fn);
        }, 0);
    };

    Promise.all = function() {
        var array = Array.prototype.slice.call(arguments);
        var count = 0,
            len = array.length,
            result = [];

        return new Promise(function(resolve, reject) {
            for (var i = 0; i < len; i++) {
                var fn = array[i];
                new Promise(fn).then(function(value) {
                    result.push(value);
                    count++;
                    if (count === len) {
                        resolve(result);
                    }
                })
            }
        });
    };
    Promise.race = function() {
        var array = Array.prototype.slice.call(arguments);
        return new Promise(function(resolve, reject) {
            for (var i = 0, len = array.length; i < len; i++) {
                var fn = array[i];
                new Promise(fn).then(function(value) {
                    resolve(result);
                });
            }
        });
    };

    Promise.prototype = {
        _init: function(fn) {
            var that = this;
            fn = fn || lyb.noop;
            fn.call(this, function(value) {
                that.status = 'resolve';
                that._fireThen(value);
            }, function(value) {
                that.status = 'reject';
                that._fireThen(value);
            });
        },
        then: function(done, fail) {
            this.status = 'pending';
            this.doneQueue.push({ done: done, fail: fail });
            return this;
        },
        catch: function(exception) {
            this.status = 'pending';
            this.exceptionQueue.push(exception);
            return this;
        },
        finally: function(fn) {
            this.status = 'pending';
            this._finally = fn || lyb.noop;
            return this;
        },
        _fireThen: function(value) {
            var fnKV = this.doneQueue.shift();
            do {
                try {
                    if (fnKV) {
                        var fn;
                        if (this.status === 'resolve' && fnKV.done) {
                            // this.status = 'pending';
                            fn = fnKV.done.call(this, value);
                        } else if (this.status === 'reject' && fnKV.fail) {
                            // this.status = 'pending';
                            fn = fnKV.fail.call(this, value);
                        }
                        // if (fn && fn instanceof Promise) {
                        //     fn.finally = this._finally;
                        // }
                    } else {
                        this._fireFinally();
                    }
                } catch (e) {
                    this._fireCatch(e);
                }
            } while (fnKV = this.doneQueue.shift());
        },
        _fireFinally: function() {
            if (this.doneQueue.length === 0 && this.exceptionQueue.length === 0) {
                this._finally && this._finally.call(this);
            }
        },
        _fireCatch: function(e) {
            var except = this.exceptionQueue.shift();
            try {
                if (except) {
                    except.call(this, value);
                    this._fireFinally();
                }
            } catch (e) {
                this._fireCatch(e);
            }
        }
    };
    lyb.Promise = Promise;
})();

window.Cookie = {
    getExpiresDate: function(days, hours, minutes) {
        var ExpiresDate = new Date();
        if (typeof days == "number" && typeof hours == "number" &&
            typeof hours == "number") {
            ExpiresDate.setDate(ExpiresDate.getDate() + parseInt(days));
            ExpiresDate.setHours(ExpiresDate.getHours() + parseInt(hours));
            ExpiresDate.setMinutes(ExpiresDate.getMinutes() + parseInt(minutes));
            return ExpiresDate.toGMTString();
        }
    },
    _getValue: function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    },
    get: function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return this._getValue(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return "";
    },
    set: function(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    },
    remove: function(name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    },
    clear: function() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++)
            var cookieName = cookies[i].split('=')[0];
        if (cookieName == 'ProductListIds') {
            this.remove(cookieName);
        }
    }
};
//快速导航
lyb.fastNav = function() {
    var id = lyb.getUUID(),
        _position = localStorage.getItem('_FASTBUTTON'),
        winHeight = jQuery(window).height();
    if (!_position) {
        _position = 90;
        localStorage.setItem('_FASTBUTTON', _position);
    }

    var html = '<div id="' + id + '" class="lyb_aside" style="bottom: ' + _position + 'px;right: 0;">' +
        '<div class="lyb-mask_transparent"></div> ' +
        '<div class="lyb_aside_nav">' +
        '<div class="lyb_aside_nav_btn">' +
        '<i class="nav-text">快速导航</i>' +
        '</div> ' +
        '<div class="his-flex">' +
        '<a href="' + ctx + 'html/index.html" class="weui-tabbar__item"><i class="icon-home weui-tabbar__icon"></i><p class="weui-tabbar__label">首页</p></a>' +
        '<a href="' + ctx + 'html/chat/chat_list.html" class="weui-tabbar__item"><i class=" icon-comments weui-tabbar__icon"></i><p class="weui-tabbar__label">咨询</p></a>' +
        '<a href="' + ctx + 'html/discovery/discovery.html" class="weui-tabbar__item"><i class="icon-globe weui-tabbar__icon"></i><p class="weui-tabbar__label">发现</p></a>' +
        '<a href="' + ctx + 'html/personal/personal.html" class="weui-tabbar__item"><i class="icon-user weui-tabbar__icon"></i><p class="weui-tabbar__label">我的</p></a>' +
        '</div>' +
        '</div>' +
        '</div>';
    var url = window.location.href;
    var uri = url.split('?')[0].split('#')[0];
    if (/\/index.html$/.test(uri) || /\/chat_list.html$/.test(uri) || /\/personal.html$/.test(uri) ||
        /\/discovery.html$/.test(uri) || /\/phone_pay.html$/.test(uri) || /\/bind.html$/.test(uri) || /\/add_info.html$/.test(uri) ||
        /\/selector\/\w+.html$/.test(uri) || /\/activities\/\w*_*\w+\/\w+.html$/.test(uri)) {
        return;
    }

    jQuery(document.body).append(html);
    var nav = jQuery('#' + id);
    var textEl = jQuery('.nav-text', nav);

    var allowMove = false,
        _btnPosition = 0,
        _start = 0,
        _move = 0,
        stopExpend = false;

    var toggleFastNav = function() {
        if (!stopExpend) {
            if (nav[0].classList.contains('show')) {
                textEl.html('快速导航');
            } else {
                textEl.html('收起');
            }
            nav.toggleClass('show');
        }
    };
    var moveBtn = nav.find('.lyb_aside_nav_btn')[0],
        background = nav.find('.lyb-mask_transparent')[0];
    background.addEventListener('click', toggleFastNav);
    background.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });
    moveBtn.addEventListener('click', toggleFastNav);
    moveBtn.addEventListener('touchstart', function(e) {
        allowMove = true;
        _btnPosition = jQuery(window) - jQuery(this).offset().top;
        _start = e.touches[0].clientY;
    });
    moveBtn.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (allowMove) {
            _move = e.touches[0].clientY - _start;
            if (_position - _move <= 5) {
                nav.css('bottom', 5);
            } else if (_position - _move >= winHeight - 65) {
                nav.css('bottom', winHeight - 65);
            } else {
                nav.css('bottom', _position - _move);
            }
            stopExpend = true;
        }
    });
    moveBtn.addEventListener('touchend', function(e) {
        if (allowMove) {
            window.setTimeout(function() {
                stopExpend = false;
            }, 100);
        }
        allowMove = false;

        if (_position - _move <= 5) {
            _position = 5;
        } else if (_position - _move >= winHeight - 65) {
            _position = winHeight - 65;
        } else {
            _position -= _move;
        }

        _move = _start = _btnPosition = 0;
        localStorage.setItem('_FASTBUTTON', _position);
    });
};

//更新滑动页面数据
window.updateSliderData = function(cbFn, data, times) {
    history.go(-(times || 1));
    window.setTimeout(function() { //必须用延时加载，否则url设置太快，导致单页面失效
        lyb.updateUrl(data);
        if (cbFn) {
            cbFn(data);
        }
    }, 200);
};

//图片加载成功
(function() {
    lyb.imgLoaded = function(list, callback) {
        var count = 0,
            finished = 0,
            len = list.length;
        if (list instanceof jQuery) {
            list = list.toArray();
        }
        for (var i = 0; i < len; i++) {
            var el = list[i];
            if (jQuery(el).height() !== 0) {
                finished++;
                continue;
            }
            el.addEventListener('load', function() {
                count++;
                if ((count + finished) >= len) {
                    callback();
                }
            });
        }

    }
})();

//客户端机型检测
(function($, window) {
    function detect(ua) {
        this.os = {};
        var funcs = [

            function() { //wechat
                var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
                if (wechat) { //wechat
                    this.os.wechat = {
                        version: wechat[2].replace(/_/g, '.')
                    };
                }
                return false;
            },
            function() { //android
                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                if (android) {
                    this.os.android = true;
                    this.os.version = android[2];

                    this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
                }
                return this.os.android === true;
            },
            function() { //ios
                var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
                if (iphone) { //iphone
                    this.os.ios = this.os.iphone = true;
                    this.os.version = iphone[2].replace(/_/g, '.');
                } else {
                    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                    if (ipad) { //ipad
                        this.os.ios = this.os.ipad = true;
                        this.os.version = ipad[2].replace(/_/g, '.');
                    }
                }
                return this.os.ios === true;
            }
        ];
        [].every.call(funcs, function(func) {
            return !func.call($);
        });
    }

    detect.call($, navigator.userAgent);

    if (lyb.os.ios) {
        var num = lyb.os.version.split('.')[0];
        if (Number(num) < 11) {
            try {
                localStorage.setItem('noShadow', 'true');
            } catch (e) {
                alert('当前系统版本是' + lyb.os.version + '，我站暂不支持该系统版本的无痕模式，为了不影响您的使用，请切换正常模式或升级最新版本（iphone6+）。');
            }

        }
    }
})(lyb, window);

//actionsheet
(function($) {
    var actionSheet = function(options) {
        this.options = options || {};
        this._init();
        this._bindEvents();
        this.render();
    };
    actionSheet.prototype = {
        _init: function() {
            this.textField = this.options.textField || 'text';
            this.valueField = this.options.valueField || 'id';
            this.el = $('<div></div>').appendTo(document.body);
        },
        render: function(array) {
            array = array || this.options.data || [];
            var height = array.length * 41,
                flag = false;
            if (height > 300) {
                height = 300;
                flag = true;
            }

            var html = '<div class="weui-mask weui-animate-fade-in"></div>' +
                '<div class="weui-actionsheet weui-animate-slide-up">' +
                '<div class="weui-actionsheet__menu">';
            if (flag) { //超过预设高度
                html = '<div class="weui-mask weui-animate-fade-in"></div>' +
                    '<div class="weui-actionsheet weui-animate-slide-up">' +
                    '<div class="weui-actionsheet__menu" style="position: relative;height: ' + height + 'px;overflow: auto;">' +
                    '<div class="weui-actionsheet__menu">';
            }

            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                html += '<div class="weui-actionsheet__cell item" data-value="' + (item[this.valueField] || '') + '" style="height: 41px;">' + (item[this.textField] || '') + '</div>';
            }
            if (flag) { //超过预设高度
                html += '</div>';
            }
            html += '</div>' +
                '<div class="weui-actionsheet__action">' +
                '    <div class="weui-actionsheet__cell red-color close">关闭</div>' +
                '</div>' +
                '</div>';
            this.el.html(html);
        },
        _bindEvents: function() {
            var that = this;
            this.el.on('click', '.close,.weui-mask', function(e) {
                that._closeActionSheet.call(that, e);
            });

            this.el.on('click', '.weui-actionsheet__cell.item', function(e) {
                that._itemClick.call(that, e);
            });
        },
        _itemClick: function(e) {
            var el = e.target;
            var dataSet = el.dataset;
            if (this.options.onclick) {
                this.options.onclick({ text: el.innerText, value: dataSet.value });
            }
            this._closeActionSheet();
        },
        _closeActionSheet: function(e) {
            var that = this;
            if (this.options.onclose) {
                this.options.onclose();
            }
            this.el.children('.weui-animate-slide-up').addClass('weui-animate-slide-down');
            this.el.children('.weui-animate-fade-in').removeClass('weui-animate-fade-in');
            window.setTimeout(function() {
                that.el.off('click');
                that.el.remove();
            }, 300);
        }
    };

    lyb.actionSheet = function(options) {
        return new actionSheet(options);
    };
})(jQuery);

//根据生日算年龄 小于1岁显示月
lyb.getAge = function(birthday, endDay) {
    if (!birthday) {
        return ''
    }
    if (typeof birthday === 'string') {
        birthday = birthday.replace(/-/g, '\/');
    }

    var date = new Date(birthday);
    var yearBirthday = date.getFullYear();
    var monthBirthday = date.getMonth();
    var dayBirthday = date.getDate();

    var today = endDay ? new Date(endDay.replace(/-/g, '\/')) : new Date();
    var yearNow = today.getFullYear();
    var monthNow = today.getMonth();
    var dayNow = today.getDate();

    var age = yearNow - yearBirthday;

    if (monthNow <= monthBirthday) {
        if (monthNow === monthBirthday) {
            if (dayNow < dayBirthday) {
                age--;
            }
        } else {
            age--;
        }
    }
    if (age < 0) {
        return 0 + "岁";
    }
    var months = Math.floor(monthNow - monthBirthday);
    if (months < 0) {
        months = 12 + months;
    }
    if (age === 0) {
        if (months === 0) {
            months = 1;
        }
        return months + "个月";
    }
    return age + "岁";
};


//公众号跳转页面执行诸葛打点，判断是否是来自公众号,跳转url参数需携带publicSource参数
lyb.doPublicSourceZhugeTrack = function() {
    var pathMap = {
        '/html/illness/illness_list.html': '点此找明医',
        '/html/activities/tjyl/get_coupon.html': '拆新人福利',
        '/html/personal/personal.html': '开启健康档案',
        '/html/patient/patient_list.html': '查看健康档案',
        '/html/doctor/doctor_recently_list.html': '点此快速复诊',
        '/html/login/login.html': '注册登录页',
        '/html/doctor/doctor_detail.html': '医生主页'
    };
    if (params.publicSource) {
        var source = pathMap[window.location.pathname];
        if (window.location.pathname === '/html/article/art_detail.html') {
            if (params.artId === 'a427050745c24d77a3811efe9e5222a3') {
                source = '正安中医介绍(公众号顶部banner)'
            } else if (params.artId === '28230309554442209c0ad8aefed0b8c3') {
                source = '预约指南'
            }
        }
        zhuge.track('关注公众号', { '来源': decodeURIComponent(params.publicSource) + source });
    }
};

//记录登录人给诸葛
(function() {
    var user = JSON.parse(localStorage.getItem('userInfo') || '{}'),
        status = localStorage.getItem('zhugeIdentify');
    if (!jQuery.isEmptyObject(user) && user.nickName && user.memberId && status !== "1") {
        zhuge.identify(user.memberId, {
            '姓名': user.memeberName,
            '手机号': user.mobile
        });
        localStorage.setItem('zhugeIdentify', '1');
    } else {
        jQuery.ajax(ctx + 'member/info/personal', {
            type: 'get',
            dataType: 'json',
            success: function(result) {
                var data = result.data;
                var obj = {
                    nickName: data.nickname
                };
                if (result.success) {
                    obj.name = data.name;
                    obj.memberId = data.memberId;
                    obj.id = data.memberId;
                    obj.mobile = data.mobile;
                    localStorage.setItem('userInfo', JSON.stringify(obj));
                    zhuge.identify(data.memberId, {
                        '姓名': data.name,
                        '手机号': data.mobile
                    });
                    localStorage.setItem('zhugeIdentify', '1');
                } else {
                    localStorage.setItem('userInfo', JSON.stringify(obj));
                }
            }
        });
    }
})();

(function() {
    /**
     * @Description:
     * @Author:         create by 田鑫龙
     * @Email:          tiantian010110@126.com
     * @CreateDate:     2018-7-6 下午 06:13
     * @Version:        1.0
     */
    var pullToLoading = function(options) {
        this.type = 'pullLoad';
        this._init(options);
        this._bindEvent();
        this._prepare();
    };
    pullToLoading.prototype = {
        _init: function(options) {
            lyb.concat(this, options);
            this.auto = options.auto === undefined || Boolean(options.auto) === true;
            this.direction = this.direction || 'up';
            this.pageNum = this.pageNum || options.pageNum || 1;
            this.pageSize = this.pageSize || options.pageSize || 15;
            this.success = options.success;
            this.reference = options.reference || document.scrollingElement || this.el;
            this.url = options.url;
            this.params = options.params || options.data || {};
            this.noMoreText = options.noMoreText || '没有更多了';
            this.loadingText = options.loadingText || '正在努力的加载';
            this.upMoreText = options.upMoreText || '上拉显示更多';
            this.downMoreText = options.downMoreText || '下拉显示更多';
            this.emptyText = options.emptyText || '没有找到相关数据';
            this.allowPager = options.allowPager === undefined || Boolean(options.allowPager) === true;
            this.el = lyb.type(options.el) === 'string' ? document.querySelector(options.el) : options.el;
            this.id = this.el.id;
            this.borderEl = this.el.querySelector('.pull-border');
            this.upStatusEl = this.borderEl.querySelector('.up');
            this.downStatusEl = this.borderEl.querySelector('.down');
            if (!this.upStatusEl) {
                this.upStatusEl = document.createElement('div');
                this.upStatusEl.classList.add('pull-load-block');
                this.upStatusEl.classList.add('up');
                this.upStatusEl.classList.add('his-hide');
                this.el.appendChild(this.upStatusEl);
            }
            if (!this.downStatusEl) {
                this.downStatusEl = document.createElement('div');
                this.downStatusEl.classList.add('pull-load-block');
                this.downStatusEl.classList.add('down');
                this.downStatusEl.classList.add('his-hide');
                this.el.insertBefore(this.downStatusEl, this.borderEl);
            }
            this._calculate();
            this.direction === 'up' ? this.upStatusEl.classList.remove('his-hide') : this.downStatusEl.classList.remove('his-hide');
        },
        _calculate: function() {
            this.scroll = {
                wrapperHeight: Number(window.getComputedStyle(this.el).getPropertyValue('height').replace(/px/i, '')),
                scrollHeight: document.body.scrollHeight,
                clientHeight: document.body.clientHeight,
                scrollY: 0
            };
        },
        _prepare: function() {
            this.auto && this.load();
        },
        load: function(flag) {
            if (this.preventLoad === true) {
                return;
            }
            var data = this.params;
            if (this.allowPager) {
                data.pageNum = this.pageNum;
                data.pageSize = this.pageSize;
            }
            this.showLoading();
            if (this.request) {
                if (!flag) { //通过flag判断是否为滑动请求 true
                    this.request.abort();
                    delete this.request;
                }
                return;
            }
            this.request = lyb.ajax({
                url: this.url,
                data: data,
                type: 'get',
                dataType: 'json',
                context: this,
                success: this._success
            });
        },
        _success: function(result) {
            result.data = result.data || [];
            if (result.data) {
                if (result.data.length < this.pageSize) {
                    this.setPreventLoad(true);
                    if (this.pageNum === 1 && !result.data.length) {
                        this.showFirstNoMore();
                    } else {
                        this.showNoMore();
                    }
                } else {
                    this.showLoadMore();
                }
            }
            if (this.success) {
                this.success.call(this, result);
            }
            this.pageNum++;
            this.refresh();

            delete this.request;
        },
        setPreventLoad: function(flag) {
            this.preventLoad = flag;
        },
        showFirstNoMore: function() {
            var html = '<div class="no-record padding-20-0" style="margin-top: 100px;">' +
                '<img src="//image-1252304461.file.myqcloud.com/image/no_record.png" alt="" style="height: 100px;"/>' +
                '<div class="light-color font12 padding-0-5">' + this.emptyText + '</div>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.style.height = 'auto';
                this.upStatusEl.style.lineHeight = 'initial';
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.showNoMore();
            }
        },
        showNoMore: function() {
            var html = '<div class="his-title-line">' +
                '<span class="light-color font12 padding-0-5">' + this.noMoreText + '</span>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.downStatusEl.innerHTML = html;
                this.downStatusEl.classList.remove('his-hide');
            }
        },
        showLoadMore: function() {
            var text = this.upMoreText;
            if (this.direction === 'down') {
                text = this.downMoreText;
            }
            var html = '<div class="his-title-line">' +
                '        <span class="light-color font12 padding-0-5">' + text + '</span>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.downStatusEl.innerHTML = html;
                this.upStatusEl.classList.remove('his-hide');
            }
        },
        showLoading: function() {
            var html = '<div class="his-title-line">' +
                '<span class="light-color font12 padding-0-5">' +
                '<i class="weui-loading"></i>' +
                '<span style="vertical-align: middle;">' + this.loadingText + '</span>' +
                '</span>' +
                '</div>';
            if (this.direction === 'up') {
                this.upStatusEl.innerHTML = html;
            } else if (this.direction === 'down') {
                this.downStatusEl.innerHTML = html;
                this.downStatusEl.classList.remove('his-hide');
            }
        },
        _bindEvent: function() {
            var that = this;
            window.addEventListener('scroll', function(e) {
                that._scroll(e);
            });
        },
        _scroll: function(e) {
            if (this.reference.offsetHeight > window.screen.availHeight && window.scrollY + window.screen.availHeight >= this.reference.offsetHeight - 150) {
                this.pullUpFlag = true;
                this.load(true); //传参true代表滑动请求
                this.pullUpFlag = false;
            } else if (this.reference.offsetHeight > window.screen.availHeight && window.scrollY < 100) {
                this.pullDownFlag = true;
                this.load(true); //传参true代表滑动请求
                this.pullDownFlag = false;
            }
        },
        refresh: function() {
            this.scroll.clientHeight = document.body.clientHeight;
            this.scroll.scrollHeight = document.body.scrollHeight;
            this.scroll.wrapperHeight = Number(window.getComputedStyle(this.el).getPropertyValue('height').replace(/px/i, ''));
        },
        scrollToBottom: function() {
            var hegith = this.borderEl.scrollHeight;
            window.scrollTo(0, hegith);
        },
        reset: function(callback) {
            this.data = {};
            this.pageNum = 1;
            this.__array = [];
            if (callback) {
                callback.call(this);
            }
            this.setPreventLoad(false);
            this.showLoadMore();
        }
    };

    lyb.pullUpLoading = function(options) {
        return new pullToLoading(options);
    };
    lyb.pullDownLoading = function(options) {
        options.direction = 'down';
        return lyb.pullUpLoading(options);
    };

})();