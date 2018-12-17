/*
* author: 田鑫龙
* date: 2017-11-02
* description: 覆盖lyb.ajax,如果成功就替换ajax
* */
(function () {
    "use strict";
    window.lyb = window.lyb || {};
    lyb.ajax = function (url, options) {
        options = options || {};
        if (typeof url === 'string') {
            options.url = url;
        } else {
            options = url;
        }
        var _default = {
            dataType: 'json',
            type: 'get',
            cache: false,
            async: true,
            timeout: 120000
        };
        _default = lyb.concat(_default, options);

        var _success = options.success || lyb.noop, _error = options.error || lyb.noop,
            _complete = options.complete || lyb.noop, _timeout = options.timeout || lyb.noop;
        _default.context = _default.context || _default;
        _default.success = function (data, xhr, settings) {
            if (data && data.code === 403) {
                if (lyb.wxBrowser) {
                    history.replaceState('', '', lyb.getWxSignInfo(window.location.href));
                    location.reload();
                    return;
                }
            }else if (data && data.code === 401) {
                var callbackUrl = top.location.href;
                sessionStorage.setItem('callbackUrl', callbackUrl);
                history.replaceState('', '', ctx + 'html/login/login.html');
                window.setTimeout(function () {
                    location.reload();
                }, 200);
                return;
            }
            _success.apply(this, arguments);
        };
        _default.timeout = function () {
            _timeout.apply(this, arguments);
            _complete && _complete.apply(this, arguments);
        };
        _default.complete = function (data, xhr, settings) {
            _complete && _complete.apply(this, arguments);
        };
        _default.error = function (xreq, status) {
            console.log(xreq, status);
            // lyb.error('系统异常，攻城狮们正在全力抢救中...');
            _error && _error.apply(this, arguments);
        };

        //如果支持h5则使用formdata发送数据
        var sendData;
        if (_default.type.toLowerCase() === 'post' && window.FormData) {
            sendData = new FormData();
            var data = {};
            var _params = _default.url.split('?')[1];
            if (_params) {
                _params = _params.split('&');
                for (var i = 0, len = _params.length; i < len; i++) {
                    var item = _params[i];
                    var kv = item.split('=');
                    data[kv[0]] = kv[1];
                }
            }
            data = lyb.concat(data, _default.data || {});
            for (var key in data) {
                sendData.append(key, data[key]);
            }
        } else {
            var p = [];
            var data = _default.data || {};
            for (var key in data) {
                p.push(key + '=' + data[key]);
            }
            sendData = p.join('&');
            if(sendData){
                if (_default.url.indexOf('?') === -1) {
                    _default.url += '?' + sendData;
                } else {
                    _default.url += '&' + sendData;
                }
            }
            sendData = null;
        }

        var xhr = new XMLHttpRequest();
        if(_default.async === true) {
            xhr.responseType = _default.dataType;
        }
        xhr.open(_default.type.toUpperCase(), _default.url, Boolean(_default.async));
        if (Boolean(_default.async)) {
            xhr.timeout = _default.timeout || 0;
        }
        xhr.withCredentials = true;//携带cookie
        xhr.onload = function (e) {
            if (this.status === 200) {
                var res = this.response;
                if(lyb.type(this.response) === 'string') {
                    res = JSON.parse(res);
                }
                _default.success.call(_default.context, res);
                _default.complete.call(_default.context, res);
            }
        };
        xhr.onerror = function (e) {
            var res = this.response;
            if(lyb.type(this.response) === 'string') {
                res = JSON.parse(res);
            }
            _default.error.call(_default.context, e);
            _default.complete.call(_default.context, res);
        };
        xhr.ontimeout = function (e) {
            var res = this.response;
            if(lyb.type(this.response) === 'string') {
                res = JSON.parse(res);
            }
            _default.timeout.call(_default.context);
            _default.complete.call(_default.context, res);
        };
        xhr.send(sendData);
        return xhr;
    }
})();