/**
 * @author 田鑫龙 v2.0
 *
 */
window.firstHost = 'mp';
if (/\w+\.zanchina.com/.test(location.hostname)) {
    window.firstHost = location.hostname.split('.')[0];
} else {
    window.firstHost = 'lyh';
}


window.lyb = window.lyb || {};

//判断浏览器环境
var ua = window.navigator.userAgent.toLowerCase();
var uaArray = ua.match(/MicroMessenger/i);
if (uaArray) {
    uaArray = Array.prototype.slice.call(uaArray);
}
uaArray = uaArray || [];
if (uaArray.indexOf('micromessenger') !== -1) { //微信浏览器
    lyb.wxBrowser = true;
} else {
    lyb.wxBrowser = false;
}

(function() {
    var decode = window.decodeURIComponent;
    decodeURIComponent = function(text) {
        while (/%/g.test(text)) {
            text = decode(text || '');
        }
        return text;
    };
})(window);

// localStorage.setItem('debugMode', 'debug');

(function() {
    //TODO 获取ctx
    window.ctx = location.origin;
    if (!window.ctx) {
        window.ctx = window.location.protocol + '//' + window.location.host
    }
    window.ctx += '/';

    var head = document.head;
    var scripts = document.head.getElementsByTagName("script");
    var position = scripts[0];
    for (var i = 0, len = scripts.length; i < len; i++) {
        var script = scripts[i],
            src = script.src;
        if (src.indexOf('resources/js/') != -1) {
            position = script;
            break;
        }
    }

    //截取 上下文路径和参数
    var url = window.location.href;
    var paramString = url.split('#')[0].split('?')[1];
    window.params = window.params || {};
    params.ctx = ctx;
    if (paramString) {
        paramString = paramString.replace(/\#\w+$/ig, '');
        if (paramString != '') {
            var kvs = paramString.split('&');
            for (var i = 0; i < kvs.length; i++) {
                var kv = kvs[i].split('=');
                params[kv[0]] = kv[1];
            }
        }
    }

    //缓存js和css技术
    var dispatchEvent = 'complete'; //页面初次加载调用complete时间，以后都会触发customloaded事件
    lyb.loadModule = function(config, single) {
        var __config = single ? {} : (window._config || {});
        __config.css = __config.css || [];
        __config.js = __config.js || [];
        for (var key in config) {
            if (key == 'pageUrl') {
                __config.pageUrl = config[key];
            } else {
                __config[key] = (__config[key] || []).concat(config[key]);
            }
        }
        this.config = JSON.parse(JSON.stringify(__config));
        this.cloneConfig = JSON.parse(JSON.stringify(__config));
        this.init();
    };
    lyb.loadModule.prototype = {
        init: function() {
            this.evalResources();
        },
        evalResources: function() {
            var config = this.config,
                that = this;

            var cssArray = config.css;
            for (var i = 0; i < cssArray.length; i++) {
                var url = cssArray[i];
                var style = document.createElement('link');
                style.type = "text/css";
                style.rel = 'styleSheet';
                head.insertBefore(style, scripts[0]);
                style.href = ctx + url;
            }

            var jsArray = config.js,
                loadObj = { index: 0, len: jsArray.length };

            function promiseLoad() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = ctx + jsArray[loadObj.index];
                script.async = false;
                script.onload = function() {
                    loadObj.index++;
                    if (loadObj.index == loadObj.len) {
                        that._loadSuccess();
                    } else if (loadObj.index < loadObj.len) {
                        promiseLoad();
                    }
                }
                head.insertBefore(script, position);
            }

            if (jsArray.length) {
                promiseLoad();
            } else {
                this._loadSuccess();
            }
        },
        _loadSuccess: function() {
            var event = document.createEvent('HTMLEvents');
            event.initEvent(dispatchEvent, true, true);
            dispatchEvent = 'customloaded';
            window.dispatchEvent(event);
        },
        update: function(result) {
            var url = result.url,
                text = result.responseText;
            this.setItem(url.replace(ctx, ''), text);
            this.resourceThread++;
            if (this.resourceThread === this.config.js.length + this.config.css.length) {
                this.evalResources();
            }
        },
        setItem: function(key, value) {
            localStorage.setItem(key, value);
        },
        getItem: function(key) {
            return localStorage.getItem(key);
        },
        request: function(url, callback, asyncType) {
            var that = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, !asyncType);
            xhr.onload = function(e) {
                if (this.status === 200) {
                    if (callback) {
                        callback.call(that, { responseText: this.responseText, url: url });
                    }
                }
            };
            xhr.ontimeout = function(e) {

            };
            xhr.onerror = function(e) {

            };

            xhr.send();
        }
    };


    window.addEventListener('load', function() {
        var result = author();
        if (result) {
            //默认配置
            var config = window.config || {};
            //js和css脚手架
            new lyb.loadModule(config);
        }
    });


    // 动态加载业务模块功能
    var prefix = ctx + 'html/';
    lyb.require = function(key) {
        if (lyb.type(key) === 'object') {
            module = key;
        } else {
            var module = window.business.modules[key];
            if (!key || !module) {
                var url = ctx + location.pathname.replace(/^\/+/, '');
                var path = url.replace(prefix, ctx + 'resources/js/business/');
                path = path.replace(/\.\w+$/ig, '.js');
                var fileName = url.match(/\w+(\.\w+)$/ig)[0].replace(/\.\w+$/ig, '');
                module = window.business.modules[fileName] || { js: [path] };
            }
        }

        return new lyb.loadModule(module);
    }
})();


//获取微信重定向url
lyb.getWxSignInfo = function(url, customHost, redirect) {
    customHost = customHost || window.firstHost;
    redirect = redirect || '';
    var protol = location.protocol,
        root = ctx,
        appId = 'wx6d5e22ce79758540';
    switch (customHost) {
        case 'mp':
            root = 'https://mp.zanchina.com/';
            appId = 'wxda6e1b2c1b561518';
            break;
        case 'testmp':
            root = 'http://testmp.zanchina.com/';
            break;
        case 'lyb':
            appId = 'wx4b0decd67df189f7';
            root = 'https://lyb.zanchina.com/';
            break;
        case 'lyh':
            appId = 'wx39ee46e1eee69f08';
            root = 'http://lyh.zanchina.com/';
            break;
    }
    var ru = root + 'weixin/door/redirect?param=' + encodeURIComponent(url.replace(ctx, redirect));
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(ru) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
};

// TODO 操作cookie
lyb.cookie = {
    // 获取指定名称的cookie值：getCookie(name)
    get: function(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results)
            return (unescape(results[2]));
        else
            return null;
    },
    // 删除指定名称的cookie：deleteCookie(name)
    remove: function(name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=; expire=" + date.toGMTString();
    },
    set: function(name, value, expireHours) {
        var cookieString = name + "=" + escape(value);
        // 判断是否设置过期时间
        if (expireHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expireHours * 3600 * 1000);
            cookieString = cookieString + "; expire=" + date.toGMTString();
        }
        document.cookie = cookieString;
    }
};

//判断是否有openId,没有就走授权
function author() {
    var openId = '';
    if (lyb.wxBrowser) {
        if (/^ly/.test(location.hostname)) {
            openId = lyb.cookie.get('lybOpenId');
        } else {
            openId = lyb.cookie.get('openId');
        }
        if (!openId) {
            top.location.href = lyb.getWxSignInfo(top.location.href);
            return false;
        }
    }

    return true;
}

//诸葛埋点接入
//var zhugeKey = '03929628eca942fa956dfe87d9fc88ca', zhugeDebug = false;
var zhugeKey = '8c28529f25694ae0b89899689588d967',
    zhugeDebug = false;
if (document.location.protocol === 'http:') {
    zhugeKey = 'ff46073faa36473a9dc4153b4137b17c';
    zhugeDebug = true;
}

var text = "window.zhuge = window.zhuge || [];window.zhuge.methods = '_init debug identify track trackLink trackForm page'.split(' ');window.zhuge.factory = function(b) {return function() {var a = Array.prototype.slice.call(arguments);a.unshift(b);window.zhuge.push(a);return window.zhuge;}};for (var i = 0; i < window.zhuge.methods.length; i++) {var key = window.zhuge.methods[i];window.zhuge[key] = window.zhuge.factory(key);}window.zhuge.load = function(b, x) {if (!document.getElementById('zhuge-js')) {var a = document.createElement('script');var verDate = new Date();var verStr = verDate.getFullYear().toString()+ verDate.getMonth().toString() + verDate.getDate().toString();a.type = 'text/javascript';a.id = 'zhuge-js';a.async = !0;a.src = (location.protocol == 'http:' ? 'http://sdk.zhugeio.com/zhuge.min.js?v=' : 'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr;a.onerror = function(){window.zhuge.identify = window.zhuge.track = function(ename, props, callback){if(callback && Object.prototype.toString.call(callback) === '[object Function]')callback();};};var c = document.getElementsByTagName('script')[0];c.parentNode.insertBefore(a, c);window.zhuge._init(b, x)}};window.zhuge.load('" + zhugeKey + "', {debug: " + zhugeDebug + "});//配置应用的AppKey";
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode(text));
document.head.appendChild(script);


window.zhugemaidian = function(text, data, cb) { //打点
    data = data || {};
    cb = cb || function() {};

    zhuge.track(text, data, cb);
};

(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();