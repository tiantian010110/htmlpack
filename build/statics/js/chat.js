/*****************************************************
 * info：微信授权
 * author：田鑫龙
 * date：2017-05-10
 */

(function(){
	window.lyb = window.lyb || {};
	lyb.wxSign = function(apiList, callback){
		if(apiList.indexOf('chooseWXPay') === -1) {
			apiList.push('chooseWXPay');
		}
		if(apiList.indexOf('openLocation') === -1) {
            apiList.push('openLocation');
		}
		// 微信签名
		lyb.ajax(ctx + 'weixin/jsSignature', {
		    dataType: 'json',
		    type: 'get',
		    data:{
		        url: encodeURIComponent(location.href.split('#')[0])
		    },
		    success: function (result) {
		    	var data = result.data;
		        wx.config({
					// debug: true,
		            appId: data.appId, // 必填，公众号的唯一标识
		            timestamp: data.timestamp, // 必填，生成签名的时间戳
		            nonceStr: data.nonceStr, // 必填，生成签名的随机串
		            signature: data.signature,// 必填，签名，见附录1
		            jsApiList: apiList || ['checkJsApi'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        });
					        
		        wx.ready(function(){
		        	window.wxSDK = true;
		        	callback && callback.call(wx, data);
				});
							
				wx.error(function(res){
					// lyb.error('系统异常，稍后重试!');
				});
		    }
		});
	};
})();
/*****************************************************
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */
var WebIM = {};
WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.easemob.com',
    /*
     * Backend REST API URL
     */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    /*
     * Application AppKey
     */
    appkey: '1165170425178109#liangyibang' + (location.hostname === 'mp.zanchina.com' || location.hostname === 'lyb.zanchina.com' ? '' : 'test'),
    /*
     * Whether to use wss
     * @parameter {Boolean} true or false
     */
    https: false,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /*
     * Set to auto sign-in
     */
    isAutoLogin: true,
    /**
     * Whether to use window.doQuery()
     * @parameter {Boolean} true or false
     */
    isWindowSDK: false,
    /**
     * isSandBox=true:  xmppURL: 'im-api-sandbox.easemob.com',  apiURL: '//a1-sdb.easemob.com',
     * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
     * @parameter {Boolean} true or false
     */
    isSandBox: false,
    /**
     * Whether to console.log in strophe.log()
     * @parameter {Boolean} true or false
     */
    isDebug: false,
    /**
     * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 5,
    /**
     * the interval secons between each atuo reconnectting.
     * works only if autoReconnectMaxNum >= 2.
     */
    autoReconnectInterval: 2,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: /WebKit/.test(navigator.userAgent) && /^https\:$/.test(window.location.protocol),
    /**
     * after login, send empty message to xmpp server like heartBeat every 45s, to keep the ws connection alive.
     */
    heartBeatWait: 4500,
    /**
     * while http access,use ip directly,instead of ServerName,avoiding DNS problem.
     */
    isHttpDNS: false
};

/*****************************************************
 *  A JavaScript library for XMPP BOSH/XMPP over Websocket.
 *
 *  This is the JavaScript version of the Strophe library.  Since JavaScript
 *  had no facilities for persistent TCP connections, this library uses
 *  Bidirectional-streams Over Synchronous HTTP (BOSH) to emulate
 *  a persistent, stateful, two-way connection to an XMPP server.  More
 *  information on BOSH can be found in XEP 124.
 *
 *  This version of Strophe also works with WebSockets.
 *  For more information on XMPP-over WebSocket see this RFC:
 *  http://tools.ietf.org/html/rfc7395
 */

/* All of the Strophe globals are defined in this special function below so
 * that references to the globals become closures.  This will ensure that
 * on page reload, these references will still be available to callbacks
 * that are still executing.
 */

/* jshint ignore:start */
(function (callback) {
    /* jshint ignore:end */

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-base64', function () {
                return factory();
            });
        } else {
            // Browser globals
            root.Base64 = factory();
        }
    }(this, function () {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var obj = {
            /**
             * Encodes a string in base64
             * @param {String} input The string to encode in base64.
             */
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc2 = ((chr1 & 3) << 4);
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) + keyStr.charAt(enc4);
                } while (i < input.length);

                return output;
            },

            /**
             * Decodes a base64 string.
             * @param {String} input The string to decode.
             */
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                } while (i < input.length);

                return output;
            }
        };
        return obj;
    }));

    /*
     * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
     * in FIPS PUB 180-1
     * Version 2.1a Copyright Paul Johnston 2000 - 2002.
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for details.
     */

    /* jshint undef: true, unused: true:, noarg: true, latedef: true */
    /* global define */

    /* Some functions and variables have been stripped for use with Strophe */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-sha1', function () {
                return factory();
            });
        } else {
            // Browser globals
            root.SHA1 = factory();
        }
    }(this, function () {

        /*
         * Calculate the SHA-1 of an array of big-endian words, and a bit length
         */
        function core_sha1(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;

            var w = new Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;

            var i, j, t, olda, oldb, oldc, oldd, olde;
            for (i = 0; i < x.length; i += 16) {
                olda = a;
                oldb = b;
                oldc = c;
                oldd = d;
                olde = e;

                for (j = 0; j < 80; j++) {
                    if (j < 16) {
                        w[j] = x[i + j];
                    }
                    else {
                        w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    }
                    t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                        safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t;
                }

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return [a, b, c, d, e];
        }

        /*
         * Perform the appropriate triplet combination function for the current
         * iteration
         */
        function sha1_ft(t, b, c, d) {
            if (t < 20) {
                return (b & c) | ((~b) & d);
            }
            if (t < 40) {
                return b ^ c ^ d;
            }
            if (t < 60) {
                return (b & c) | (b & d) | (c & d);
            }
            return b ^ c ^ d;
        }

        /*
         * Determine the appropriate additive constant for the current iteration
         */
        function sha1_kt(t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
                (t < 60) ? -1894007588 : -899497514;
        }

        /*
         * Calculate the HMAC-SHA1 of a key and some data
         */
        function core_hmac_sha1(key, data) {
            var bkey = str2binb(key);
            if (bkey.length > 16) {
                bkey = core_sha1(bkey, key.length * 8);
            }

            var ipad = new Array(16), opad = new Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }

            var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * 8);
            return core_sha1(opad.concat(hash), 512 + 160);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        /*
         * Convert an 8-bit or 16-bit string to an array of big-endian words
         * In 8-bit function, characters >255 have their hi-byte silently ignored.
         */
        function str2binb(str) {
            var bin = [];
            var mask = 255;
            for (var i = 0; i < str.length * 8; i += 8) {
                bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (24 - i % 32);
            }
            return bin;
        }

        /*
         * Convert an array of big-endian words to a string
         */
        function binb2str(bin) {
            var str = "";
            var mask = 255;
            for (var i = 0; i < bin.length * 32; i += 8) {
                str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
            }
            return str;
        }

        /*
         * Convert an array of big-endian words to a base-64 string
         */
        function binb2b64(binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var str = "";
            var triplet, j;
            for (var i = 0; i < binarray.length * 4; i += 3) {
                triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) |
                    (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8 ) |
                    ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
                for (j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) {
                        str += "=";
                    }
                    else {
                        str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                    }
                }
            }
            return str;
        }

        /*
         * These are the functions you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        return {
            b64_hmac_sha1: function (key, data) {
                return binb2b64(core_hmac_sha1(key, data));
            },
            b64_sha1: function (s) {
                return binb2b64(core_sha1(str2binb(s), s.length * 8));
            },
            binb2str: binb2str,
            core_hmac_sha1: core_hmac_sha1,
            str_hmac_sha1: function (key, data) {
                return binb2str(core_hmac_sha1(key, data));
            },
            str_sha1: function (s) {
                return binb2str(core_sha1(str2binb(s), s.length * 8));
            },
        };
    }));

    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    /*
     * Everything that isn't used by Strophe has been stripped here!
     */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-md5', function () {
                return factory();
            });
        } else {
            // Browser globals
            root.MD5 = factory();
        }
    }(this, function (b) {
        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        var safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        var bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        };

        /*
         * Convert a string to an array of little-endian words
         */
        var str2binl = function (str) {
            var bin = [];
            for (var i = 0; i < str.length * 8; i += 8) {
                bin[i >> 5] |= (str.charCodeAt(i / 8) & 255) << (i % 32);
            }
            return bin;
        };

        /*
         * Convert an array of little-endian words to a string
         */
        var binl2str = function (bin) {
            var str = "";
            for (var i = 0; i < bin.length * 32; i += 8) {
                str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & 255);
            }
            return str;
        };

        /*
         * Convert an array of little-endian words to a hex string.
         */
        var binl2hex = function (binarray) {
            var hex_tab = "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8  )) & 0xF);
            }
            return str;
        };

        /*
         * These functions implement the four basic operations the algorithm uses.
         */
        var md5_cmn = function (q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        };

        var md5_ff = function (a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };

        var md5_gg = function (a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };

        var md5_hh = function (a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        };

        var md5_ii = function (a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        };

        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length
         */
        var core_md5 = function (x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;

            var olda, oldb, oldc, oldd;
            for (var i = 0; i < x.length; i += 16) {
                olda = a;
                oldb = b;
                oldc = c;
                oldd = d;

                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return [a, b, c, d];
        };

        var obj = {
            /*
             * These are the functions you'll usually want to call.
             * They take string arguments and return either hex or base-64 encoded
             * strings.
             */
            hexdigest: function (s) {
                return binl2hex(core_md5(str2binl(s), s.length * 8));
            },

            hash: function (s) {
                return binl2str(core_md5(str2binl(s), s.length * 8));
            }
        };
        return obj;
    }));

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-utils', function () {
                return factory();
            });
        } else {
            // Browser globals
            root.stropheUtils = factory();
        }
    }(this, function () {

        var utils = {

            utf16to8: function (str) {
                var i, c;
                var out = "";
                var len = str.length;
                for (i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0000) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    } else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    } else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
            },

            addCookies: function (cookies) {
                /* Parameters:
                 *  (Object) cookies - either a map of cookie names
                 *    to string values or to maps of cookie values.
                 *
                 * For example:
                 * { "myCookie": "1234" }
                 *
                 * or:
                 * { "myCookie": {
                 *      "value": "1234",
                 *      "domain": ".example.org",
                 *      "path": "/",
                 *      "expires": expirationDate
                 *      }
                 *  }
                 *
                 *  These values get passed to Strophe.Connection via
                 *   options.cookies
                 */
                var cookieName, cookieObj, isObj, cookieValue, expires, domain, path;
                for (cookieName in (cookies || {})) {
                    expires = '';
                    domain = '';
                    path = '';
                    cookieObj = cookies[cookieName];
                    isObj = typeof cookieObj == "object";
                    cookieValue = escape(unescape(isObj ? cookieObj.value : cookieObj));
                    if (isObj) {
                        expires = cookieObj.expires ? ";expires=" + cookieObj.expires : '';
                        domain = cookieObj.domain ? ";domain=" + cookieObj.domain : '';
                        path = cookieObj.path ? ";path=" + cookieObj.path : '';
                    }
                    document.cookie =
                        cookieName + '=' + cookieValue + expires + domain + path;
                }
            }
        };
        return utils;
    }));

    /*
     This program is distributed under the terms of the MIT license.
     Please see the LICENSE file for details.

     Copyright 2006-2008, OGG, LLC
     */

    /* jshint undef: true, unused: true:, noarg: true, latedef: true */
    /* global define */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-polyfill', [], function () {
                return factory();
            });
        } else {
            // Browser globals
            return factory();
        }
    }(this, function () {

        /** PrivateFunction: Function.prototype.bind
         *  Bind a function to an instance.
         *
         *  This Function object extension method creates a bound method similar
         *  to those in Python.  This means that the 'this' object will point
         *  to the instance you want.  See
         *  <a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind'>MDC's bind() documentation</a> and
         *  <a href='http://benjamin.smedbergs.us/blog/2007-01-03/bound-functions-and-function-imports-in-javascript/'>Bound Functions and Function Imports in JavaScript</a>
         *  for a complete explanation.
         *
         *  This extension already exists in some browsers (namely, Firefox 3), but
         *  we provide it to support those that don't.
         *
         *  Parameters:
         *    (Object) obj - The object that will become 'this' in the bound function.
         *    (Object) argN - An option argument that will be prepended to the
         *      arguments given for the function call
         *
         *  Returns:
         *    The bound function.
         */
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (obj /*, arg1, arg2, ... */) {
                var func = this;
                var _slice = Array.prototype.slice;
                var _concat = Array.prototype.concat;
                var _args = _slice.call(arguments, 1);

                return function () {
                    return func.apply(obj ? obj : this,
                        _concat.call(_args,
                            _slice.call(arguments, 0)));
                };
            };
        }

        /** PrivateFunction: Array.isArray
         *  This is a polyfill for the ES5 Array.isArray method.
         */
        if (!Array.isArray) {
            Array.isArray = function (arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }

        /** PrivateFunction: Array.prototype.indexOf
         *  Return the index of an object in an array.
         *
         *  This function is not supplied by some JavaScript implementations, so
         *  we provide it if it is missing.  This code is from:
         *  http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Objects:Array:indexOf
         *
         *  Parameters:
         *    (Object) elt - The object to look for.
         *    (Integer) from - The index from which to start looking. (optional).
         *
         *  Returns:
         *    The index of elt in the array or -1 if not found.
         */
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (elt /*, from*/) {
                var len = this.length;

                var from = Number(arguments[1]) || 0;
                from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                if (from < 0) {
                    from += len;
                }

                for (; from < len; from++) {
                    if (from in this && this[from] === elt) {
                        return from;
                    }
                }

                return -1;
            };
        }
    }));

    /*
     This program is distributed under the terms of the MIT license.
     Please see the LICENSE file for details.

     Copyright 2006-2008, OGG, LLC
     */

    /* jshint undef: true, unused: true:, noarg: true, latedef: true */
    /*global define, document, window, setTimeout, clearTimeout, console, ActiveXObject, DOMParser */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-core', [
                'strophe-sha1',
                'strophe-base64',
                'strophe-md5',
                'strophe-utils',
                "strophe-polyfill"
            ], function () {
                return factory.apply(this, arguments);
            });
        } else {
            // Browser globals
            var o = factory(root.SHA1, root.Base64, root.MD5, root.stropheUtils);
            window.Strophe = o.Strophe;
            window.$build = o.$build;
            window.$iq = o.$iq;
            window.$msg = o.$msg;
            window.$pres = o.$pres;
            window.SHA1 = o.SHA1;
            window.Base64 = o.Base64;
            window.MD5 = o.MD5;
            window.b64_hmac_sha1 = o.SHA1.b64_hmac_sha1;
            window.b64_sha1 = o.SHA1.b64_sha1;
            window.str_hmac_sha1 = o.SHA1.str_hmac_sha1;
            window.str_sha1 = o.SHA1.str_sha1;
        }
    }(this, function (SHA1, Base64, MD5, utils) {

        var Strophe;

        /** Function: $build
         *  Create a Strophe.Builder.
         *  This is an alias for 'new Strophe.Builder(name, attrs)'.
         *
         *  Parameters:
         *    (String) name - The root element name.
         *    (Object) attrs - The attributes for the root element in object notation.
         *
         *  Returns:
         *    A new Strophe.Builder object.
         */
        function $build(name, attrs) {
            return new Strophe.Builder(name, attrs);
        }

        /** Function: $msg
         *  Create a Strophe.Builder with a <message/> element as the root.
         *
         *  Parameters:
         *    (Object) attrs - The <message/> element attributes in object notation.
         *
         *  Returns:
         *    A new Strophe.Builder object.
         */
        function $msg(attrs) {
            return new Strophe.Builder("message", attrs);
        }

        /** Function: $iq
         *  Create a Strophe.Builder with an <iq/> element as the root.
         *
         *  Parameters:
         *    (Object) attrs - The <iq/> element attributes in object notation.
         *
         *  Returns:
         *    A new Strophe.Builder object.
         */
        function $iq(attrs) {
            return new Strophe.Builder("iq", attrs);
        }

        /** Function: $pres
         *  Create a Strophe.Builder with a <presence/> element as the root.
         *
         *  Parameters:
         *    (Object) attrs - The <presence/> element attributes in object notation.
         *
         *  Returns:
         *    A new Strophe.Builder object.
         */
        function $pres(attrs) {
            return new Strophe.Builder("presence", attrs);
        }

        /** Class: Strophe
         *  An object container for all Strophe library functions.
         *
         *  This class is just a container for all the objects and constants
         *  used in the library.  It is not meant to be instantiated, but to
         *  provide a namespace for library objects, constants, and functions.
         */
        Strophe = {
            /** Constant: VERSION
             *  The version of the Strophe library. Unreleased builds will have
             *  a version of head-HASH where HASH is a partial revision.
             */
            VERSION: "1.2.8",

            /** Constants: XMPP Namespace Constants
             *  Common namespace constants from the XMPP RFCs and XEPs.
             *
             *  NS.HTTPBIND - HTTP BIND namespace from XEP 124.
             *  NS.BOSH - BOSH namespace from XEP 206.
             *  NS.CLIENT - Main XMPP client namespace.
             *  NS.AUTH - Legacy authentication namespace.
             *  NS.ROSTER - Roster operations namespace.
             *  NS.PROFILE - Profile namespace.
             *  NS.DISCO_INFO - Service discovery info namespace from XEP 30.
             *  NS.DISCO_ITEMS - Service discovery items namespace from XEP 30.
             *  NS.MUC - Multi-User Chat namespace from XEP 45.
             *  NS.SASL - XMPP SASL namespace from RFC 3920.
             *  NS.STREAM - XMPP Streams namespace from RFC 3920.
             *  NS.BIND - XMPP Binding namespace from RFC 3920.
             *  NS.SESSION - XMPP Session namespace from RFC 3920.
             *  NS.XHTML_IM - XHTML-IM namespace from XEP 71.
             *  NS.XHTML - XHTML body namespace from XEP 71.
             */
            NS: {
                HTTPBIND: "http://jabber.org/protocol/httpbind",
                BOSH: "urn:xmpp:xbosh",
                CLIENT: "jabber:client",
                AUTH: "jabber:iq:auth",
                ROSTER: "jabber:iq:roster",
                PROFILE: "jabber:iq:profile",
                DISCO_INFO: "http://jabber.org/protocol/disco#info",
                DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
                MUC: "http://jabber.org/protocol/muc",
                SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
                STREAM: "http://etherx.jabber.org/streams",
                FRAMING: "urn:ietf:params:xml:ns:xmpp-framing",
                BIND: "urn:ietf:params:xml:ns:xmpp-bind",
                SESSION: "urn:ietf:params:xml:ns:xmpp-session",
                VERSION: "jabber:iq:version",
                STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas",
                XHTML_IM: "http://jabber.org/protocol/xhtml-im",
                XHTML: "http://www.w3.org/1999/xhtml"
            },

            /** Constants: XHTML_IM Namespace
             *  contains allowed tags, tag attributes, and css properties.
             *  Used in the createHtml function to filter incoming html into the allowed XHTML-IM subset.
             *  See http://xmpp.org/extensions/xep-0071.html#profile-summary for the list of recommended
             *  allowed tags and their attributes.
             */
            XHTML: {
                tags: ['a', 'blockquote', 'br', 'cite', 'em', 'img', 'li', 'ol', 'p', 'span', 'strong', 'ul', 'body'],
                attributes: {
                    'a': ['href'],
                    'blockquote': ['style'],
                    'br': [],
                    'cite': ['style'],
                    'em': [],
                    'img': ['src', 'alt', 'style', 'height', 'width'],
                    'li': ['style'],
                    'ol': ['style'],
                    'p': ['style'],
                    'span': ['style'],
                    'strong': [],
                    'ul': ['style'],
                    'body': []
                },
                css: ['background-color', 'color', 'font-family', 'font-size', 'font-style', 'font-weight', 'margin-left', 'margin-right', 'text-align', 'text-decoration'],
                /** Function: XHTML.validTag
                 *
                 * Utility method to determine whether a tag is allowed
                 * in the XHTML_IM namespace.
                 *
                 * XHTML tag names are case sensitive and must be lower case.
                 */
                validTag: function (tag) {
                    for (var i = 0; i < Strophe.XHTML.tags.length; i++) {
                        if (tag == Strophe.XHTML.tags[i]) {
                            return true;
                        }
                    }
                    return false;
                },
                /** Function: XHTML.validAttribute
                 *
                 * Utility method to determine whether an attribute is allowed
                 * as recommended per XEP-0071
                 *
                 * XHTML attribute names are case sensitive and must be lower case.
                 */
                validAttribute: function (tag, attribute) {
                    if (typeof Strophe.XHTML.attributes[tag] !== 'undefined' && Strophe.XHTML.attributes[tag].length > 0) {
                        for (var i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
                            if (attribute == Strophe.XHTML.attributes[tag][i]) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                validCSS: function (style) {
                    for (var i = 0; i < Strophe.XHTML.css.length; i++) {
                        if (style == Strophe.XHTML.css[i]) {
                            return true;
                        }
                    }
                    return false;
                }
            },

            /** Constants: Connection Status Constants
             *  Connection status constants for use by the connection handler
             *  callback.
             *
             *  Status.ERROR - An error has occurred
             *  Status.CONNECTING - The connection is currently being made
             *  Status.CONNFAIL - The connection attempt failed
             *  Status.AUTHENTICATING - The connection is authenticating
             *  Status.AUTHFAIL - The authentication attempt failed
             *  Status.CONNECTED - The connection has succeeded
             *  Status.DISCONNECTED - The connection has been terminated
             *  Status.DISCONNECTING - The connection is currently being terminated
             *  Status.ATTACHED - The connection has been attached
             *  Status.CONNTIMEOUT - The connection has timed out
             */
            Status: {
                ERROR: 0,
                CONNECTING: 1,
                CONNFAIL: 2,
                AUTHENTICATING: 3,
                AUTHFAIL: 4,
                CONNECTED: 5,
                DISCONNECTED: 6,
                DISCONNECTING: 7,
                ATTACHED: 8,
                REDIRECT: 9,
                CONNTIMEOUT: 10
            },

            /** Constants: Log Level Constants
             *  Logging level indicators.
             *
             *  LogLevel.DEBUG - Debug output
             *  LogLevel.INFO - Informational output
             *  LogLevel.WARN - Warnings
             *  LogLevel.ERROR - Errors
             *  LogLevel.FATAL - Fatal errors
             */
            LogLevel: {
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                FATAL: 4
            },

            /** PrivateConstants: DOM Element Type Constants
             *  DOM element types.
             *
             *  ElementType.NORMAL - Normal element.
             *  ElementType.TEXT - Text data element.
             *  ElementType.FRAGMENT - XHTML fragment element.
             */
            ElementType: {
                NORMAL: 1,
                TEXT: 3,
                CDATA: 4,
                FRAGMENT: 11
            },

            /** PrivateConstants: Timeout Values
             *  Timeout values for error states.  These values are in seconds.
             *  These should not be changed unless you know exactly what you are
             *  doing.
             *
             *  TIMEOUT - Timeout multiplier. A waiting request will be considered
             *      failed after Math.floor(TIMEOUT * wait) seconds have elapsed.
             *      This defaults to 1.1, and with default wait, 66 seconds.
             *  SECONDARY_TIMEOUT - Secondary timeout multiplier. In cases where
             *      Strophe can detect early failure, it will consider the request
             *      failed if it doesn't return after
             *      Math.floor(SECONDARY_TIMEOUT * wait) seconds have elapsed.
             *      This defaults to 0.1, and with default wait, 6 seconds.
             */
            TIMEOUT: 1.1,
            SECONDARY_TIMEOUT: 0.1,

            /** Function: addNamespace
             *  This function is used to extend the current namespaces in
             *  Strophe.NS.  It takes a key and a value with the key being the
             *  name of the new namespace, with its actual value.
             *  For example:
             *  Strophe.addNamespace('PUBSUB', "http://jabber.org/protocol/pubsub");
             *
             *  Parameters:
             *    (String) name - The name under which the namespace will be
             *      referenced under Strophe.NS
             *    (String) value - The actual namespace.
             */
            addNamespace: function (name, value) {
                Strophe.NS[name] = value;
            },

            /** Function: forEachChild
             *  Map a function over some or all child elements of a given element.
             *
             *  This is a small convenience function for mapping a function over
             *  some or all of the children of an element.  If elemName is null, all
             *  children will be passed to the function, otherwise only children
             *  whose tag names match elemName will be passed.
             *
             *  Parameters:
             *    (XMLElement) elem - The element to operate on.
             *    (String) elemName - The child element tag name filter.
             *    (Function) func - The function to apply to each child.  This
             *      function should take a single argument, a DOM element.
             */
            forEachChild: function (elem, elemName, func) {
                var i, childNode;

                for (i = 0; i < elem.childNodes.length; i++) {
                    childNode = elem.childNodes[i];
                    if (childNode.nodeType == Strophe.ElementType.NORMAL &&
                        (!elemName || this.isTagEqual(childNode, elemName))) {
                        func(childNode);
                    }
                }
            },

            /** Function: isTagEqual
             *  Compare an element's tag name with a string.
             *
             *  This function is case sensitive.
             *
             *  Parameters:
             *    (XMLElement) el - A DOM element.
             *    (String) name - The element name.
             *
             *  Returns:
             *    true if the element's tag name matches _el_, and false
             *    otherwise.
             */
            isTagEqual: function (el, name) {
                return el.tagName == name;
            },

            /** PrivateVariable: _xmlGenerator
             *  _Private_ variable that caches a DOM document to
             *  generate elements.
             */
            _xmlGenerator: null,

            /** PrivateFunction: _makeGenerator
             *  _Private_ function that creates a dummy XML DOM document to serve as
             *  an element and text node generator.
             */
            _makeGenerator: function () {
                var doc;

                // IE9 does implement createDocument(); however, using it will cause the browser to leak memory on page unload.
                // Here, we test for presence of createDocument() plus IE's proprietary documentMode attribute, which would be
                // less than 10 in the case of IE9 and below.
                if (document.implementation.createDocument === undefined ||
                    document.implementation.createDocument && document.documentMode && document.documentMode < 10) {
                    doc = this._getIEXmlDom();
                    doc.appendChild(doc.createElement('strophe'));
                } else {
                    doc = document.implementation
                        .createDocument('jabber:client', 'strophe', null);
                }

                return doc;
            },

            /** Function: xmlGenerator
             *  Get the DOM document to generate elements.
             *
             *  Returns:
             *    The currently used DOM document.
             */
            xmlGenerator: function () {
                if (!Strophe._xmlGenerator) {
                    Strophe._xmlGenerator = Strophe._makeGenerator();
                }
                return Strophe._xmlGenerator;
            },

            /** PrivateFunction: _getIEXmlDom
             *  Gets IE xml doc object
             *
             *  Returns:
             *    A Microsoft XML DOM Object
             *  See Also:
             *    http://msdn.microsoft.com/en-us/library/ms757837%28VS.85%29.aspx
             */
            _getIEXmlDom: function () {
                var doc = null;
                var docStrings = [
                    "Msxml2.DOMDocument.6.0",
                    "Msxml2.DOMDocument.5.0",
                    "Msxml2.DOMDocument.4.0",
                    "MSXML2.DOMDocument.3.0",
                    "MSXML2.DOMDocument",
                    "MSXML.DOMDocument",
                    "Microsoft.XMLDOM"
                ];

                for (var d = 0; d < docStrings.length; d++) {
                    if (doc === null) {
                        try {
                            doc = new ActiveXObject(docStrings[d]);
                        } catch (e) {
                            doc = null;
                        }
                    } else {
                        break;
                    }
                }

                return doc;
            },

            /** Function: xmlElement
             *  Create an XML DOM element.
             *
             *  This function creates an XML DOM element correctly across all
             *  implementations. Note that these are not HTML DOM elements, which
             *  aren't appropriate for XMPP stanzas.
             *
             *  Parameters:
             *    (String) name - The name for the element.
             *    (Array|Object) attrs - An optional array or object containing
             *      key/value pairs to use as element attributes. The object should
             *      be in the format {'key': 'value'} or {key: 'value'}. The array
             *      should have the format [['key1', 'value1'], ['key2', 'value2']].
             *    (String) text - The text child data for the element.
             *
             *  Returns:
             *    A new XML DOM element.
             */
            xmlElement: function (name) {
                if (!name) {
                    return null;
                }

                var node = Strophe.xmlGenerator().createElement(name);

                // FIXME: this should throw errors if args are the wrong type or
                // there are more than two optional args
                var a, i, k;
                for (a = 1; a < arguments.length; a++) {
                    var arg = arguments[a];
                    if (!arg) {
                        continue;
                    }
                    if (typeof(arg) == "string" ||
                        typeof(arg) == "number") {
                        node.appendChild(Strophe.xmlTextNode(arg));
                    } else if (typeof(arg) == "object" &&
                        typeof(arg.sort) == "function") {
                        for (i = 0; i < arg.length; i++) {
                            var attr = arg[i];
                            if (typeof(attr) == "object" &&
                                typeof(attr.sort) == "function" &&
                                attr[1] !== undefined &&
                                attr[1] !== null) {
                                node.setAttribute(attr[0], attr[1]);
                            }
                        }
                    } else if (typeof(arg) == "object") {
                        for (k in arg) {
                            if (arg.hasOwnProperty(k)) {
                                if (arg[k] !== undefined &&
                                    arg[k] !== null) {
                                    node.setAttribute(k, arg[k]);
                                }
                            }
                        }
                    }
                }

                return node;
            },

            /*  Function: xmlescape
             *  Excapes invalid xml characters.
             *
             *  Parameters:
             *     (String) text - text to escape.
             *
             *  Returns:
             *      Escaped text.
             */
            xmlescape: function (text) {
                text = text.replace(/\&/g, "&amp;");
                text = text.replace(/</g, "&lt;");
                text = text.replace(/>/g, "&gt;");
                text = text.replace(/'/g, "&apos;");
                text = text.replace(/"/g, "&quot;");
                return text;
            },

            /*  Function: xmlunescape
             *  Unexcapes invalid xml characters.
             *
             *  Parameters:
             *     (String) text - text to unescape.
             *
             *  Returns:
             *      Unescaped text.
             */
            xmlunescape: function (text) {
                text = text.replace(/\&amp;/g, "&");
                text = text.replace(/&lt;/g, "<");
                text = text.replace(/&gt;/g, ">");
                text = text.replace(/&apos;/g, "'");
                text = text.replace(/&quot;/g, "\"");
                return text;
            },

            /** Function: xmlTextNode
             *  Creates an XML DOM text node.
             *
             *  Provides a cross implementation version of document.createTextNode.
             *
             *  Parameters:
             *    (String) text - The content of the text node.
             *
             *  Returns:
             *    A new XML DOM text node.
             */
            xmlTextNode: function (text) {
                return Strophe.xmlGenerator().createTextNode(text);
            },

            /** Function: xmlHtmlNode
             *  Creates an XML DOM html node.
             *
             *  Parameters:
             *    (String) html - The content of the html node.
             *
             *  Returns:
             *    A new XML DOM text node.
             */
            xmlHtmlNode: function (html) {
                var node;
                //ensure text is escaped
                if (window.DOMParser) {
                    var parser = new DOMParser();
                    node = parser.parseFromString(html, "text/xml");
                } else {
                    node = new ActiveXObject("Microsoft.XMLDOM");
                    node.async = "false";
                    node.loadXML(html);
                }
                return node;
            },

            /** Function: getText
             *  Get the concatenation of all text children of an element.
             *
             *  Parameters:
             *    (XMLElement) elem - A DOM element.
             *
             *  Returns:
             *    A String with the concatenated text of all text element children.
             */
            getText: function (elem) {
                if (!elem) {
                    return null;
                }

                var str = "";
                if (elem.childNodes.length === 0 && elem.nodeType ==
                    Strophe.ElementType.TEXT) {
                    str += elem.nodeValue;
                }

                for (var i = 0; i < elem.childNodes.length; i++) {
                    if (elem.childNodes[i].nodeType == Strophe.ElementType.TEXT) {
                        str += elem.childNodes[i].nodeValue;
                    }
                }

                return Strophe.xmlescape(str);
            },

            /** Function: copyElement
             *  Copy an XML DOM element.
             *
             *  This function copies a DOM element and all its descendants and returns
             *  the new copy.
             *
             *  Parameters:
             *    (XMLElement) elem - A DOM element.
             *
             *  Returns:
             *    A new, copied DOM element tree.
             */
            copyElement: function (elem) {
                var i, el;
                if (elem.nodeType == Strophe.ElementType.NORMAL) {
                    el = Strophe.xmlElement(elem.tagName);

                    for (i = 0; i < elem.attributes.length; i++) {
                        el.setAttribute(elem.attributes[i].nodeName,
                            elem.attributes[i].value);
                    }

                    for (i = 0; i < elem.childNodes.length; i++) {
                        el.appendChild(Strophe.copyElement(elem.childNodes[i]));
                    }
                } else if (elem.nodeType == Strophe.ElementType.TEXT) {
                    el = Strophe.xmlGenerator().createTextNode(elem.nodeValue);
                }

                return el;
            },


            /** Function: createHtml
             *  Copy an HTML DOM element into an XML DOM.
             *
             *  This function copies a DOM element and all its descendants and returns
             *  the new copy.
             *
             *  Parameters:
             *    (HTMLElement) elem - A DOM element.
             *
             *  Returns:
             *    A new, copied DOM element tree.
             */
            createHtml: function (elem) {
                var i, el, j, tag, attribute, value, css, cssAttrs, attr, cssName, cssValue;
                if (elem.nodeType == Strophe.ElementType.NORMAL) {
                    tag = elem.nodeName.toLowerCase(); // XHTML tags must be lower case.
                    if (Strophe.XHTML.validTag(tag)) {
                        try {
                            el = Strophe.xmlElement(tag);
                            for (i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
                                attribute = Strophe.XHTML.attributes[tag][i];
                                value = elem.getAttribute(attribute);
                                if (typeof value == 'undefined' || value === null || value === '' || value === false || value === 0) {
                                    continue;
                                }
                                if (attribute == 'style' && typeof value == 'object') {
                                    if (typeof value.cssText != 'undefined') {
                                        value = value.cssText; // we're dealing with IE, need to get CSS out
                                    }
                                }
                                // filter out invalid css styles
                                if (attribute == 'style') {
                                    css = [];
                                    cssAttrs = value.split(';');
                                    for (j = 0; j < cssAttrs.length; j++) {
                                        attr = cssAttrs[j].split(':');
                                        cssName = attr[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();
                                        if (Strophe.XHTML.validCSS(cssName)) {
                                            cssValue = attr[1].replace(/^\s*/, "").replace(/\s*$/, "");
                                            css.push(cssName + ': ' + cssValue);
                                        }
                                    }
                                    if (css.length > 0) {
                                        value = css.join('; ');
                                        el.setAttribute(attribute, value);
                                    }
                                } else {
                                    el.setAttribute(attribute, value);
                                }
                            }

                            for (i = 0; i < elem.childNodes.length; i++) {
                                el.appendChild(Strophe.createHtml(elem.childNodes[i]));
                            }
                        } catch (e) { // invalid elements
                            el = Strophe.xmlTextNode('');
                        }
                    } else {
                        el = Strophe.xmlGenerator().createDocumentFragment();
                        for (i = 0; i < elem.childNodes.length; i++) {
                            el.appendChild(Strophe.createHtml(elem.childNodes[i]));
                        }
                    }
                } else if (elem.nodeType == Strophe.ElementType.FRAGMENT) {
                    el = Strophe.xmlGenerator().createDocumentFragment();
                    for (i = 0; i < elem.childNodes.length; i++) {
                        el.appendChild(Strophe.createHtml(elem.childNodes[i]));
                    }
                } else if (elem.nodeType == Strophe.ElementType.TEXT) {
                    el = Strophe.xmlTextNode(elem.nodeValue);
                }

                return el;
            },

            /** Function: escapeNode
             *  Escape the node part (also called local part) of a JID.
             *
             *  Parameters:
             *    (String) node - A node (or local part).
             *
             *  Returns:
             *    An escaped node (or local part).
             */
            escapeNode: function (node) {
                if (typeof node !== "string") {
                    return node;
                }
                return node.replace(/^\s+|\s+$/g, '')
                    .replace(/\\/g, "\\5c")
                    .replace(/ /g, "\\20")
                    .replace(/\"/g, "\\22")
                    .replace(/\&/g, "\\26")
                    .replace(/\'/g, "\\27")
                    .replace(/\//g, "\\2f")
                    .replace(/:/g, "\\3a")
                    .replace(/</g, "\\3c")
                    .replace(/>/g, "\\3e")
                    .replace(/@/g, "\\40");
            },

            /** Function: unescapeNode
             *  Unescape a node part (also called local part) of a JID.
             *
             *  Parameters:
             *    (String) node - A node (or local part).
             *
             *  Returns:
             *    An unescaped node (or local part).
             */
            unescapeNode: function (node) {
                if (typeof node !== "string") {
                    return node;
                }
                return node.replace(/\\20/g, " ")
                    .replace(/\\22/g, '"')
                    .replace(/\\26/g, "&")
                    .replace(/\\27/g, "'")
                    .replace(/\\2f/g, "/")
                    .replace(/\\3a/g, ":")
                    .replace(/\\3c/g, "<")
                    .replace(/\\3e/g, ">")
                    .replace(/\\40/g, "@")
                    .replace(/\\5c/g, "\\");
            },

            /** Function: getNodeFromJid
             *  Get the node portion of a JID String.
             *
             *  Parameters:
             *    (String) jid - A JID.
             *
             *  Returns:
             *    A String containing the node.
             */
            getNodeFromJid: function (jid) {
                if (jid.indexOf("@") < 0) {
                    return null;
                }
                return jid.split("@")[0];
            },

            /** Function: getDomainFromJid
             *  Get the domain portion of a JID String.
             *
             *  Parameters:
             *    (String) jid - A JID.
             *
             *  Returns:
             *    A String containing the domain.
             */
            getDomainFromJid: function (jid) {
                var bare = Strophe.getBareJidFromJid(jid);
                if (bare.indexOf("@") < 0) {
                    return bare;
                } else {
                    var parts = bare.split("@");
                    parts.splice(0, 1);
                    return parts.join('@');
                }
            },

            /** Function: getResourceFromJid
             *  Get the resource portion of a JID String.
             *
             *  Parameters:
             *    (String) jid - A JID.
             *
             *  Returns:
             *    A String containing the resource.
             */
            getResourceFromJid: function (jid) {
                var s = jid.split("/");
                if (s.length < 2) {
                    return null;
                }
                s.splice(0, 1);
                return s.join('/');
            },

            /** Function: getBareJidFromJid
             *  Get the bare JID from a JID String.
             *
             *  Parameters:
             *    (String) jid - A JID.
             *
             *  Returns:
             *    A String containing the bare JID.
             */
            getBareJidFromJid: function (jid) {
                return jid ? jid.split("/")[0] : null;
            },

            /** Function: log
             *  User overrideable logging function.
             *
             *  This function is called whenever the Strophe library calls any
             *  of the logging functions.  The default implementation of this
             *  function does nothing.  If client code wishes to handle the logging
             *  messages, it should override this with
             *  > Strophe.log = function (level, msg) {
     *  >   (user code here)
     *  > };
             *
             *  Please note that data sent and received over the wire is logged
             *  via Strophe.Connection.rawInput() and Strophe.Connection.rawOutput().
             *
             *  The different levels and their meanings are
             *
             *    DEBUG - Messages useful for debugging purposes.
             *    INFO - Informational messages.  This is mostly information like
             *      'disconnect was called' or 'SASL auth succeeded'.
             *    WARN - Warnings about potential problems.  This is mostly used
             *      to report transient connection errors like request timeouts.
             *    ERROR - Some error occurred.
             *    FATAL - A non-recoverable fatal error occurred.
             *
             *  Parameters:
             *    (Integer) level - The log level of the log message.  This will
             *      be one of the values in Strophe.LogLevel.
             *    (String) msg - The log message.
             */
            /* jshint ignore:start */
            log: function (level, msg) {
                return;
            },
            /* jshint ignore:end */

            /** Function: debug
             *  Log a message at the Strophe.LogLevel.DEBUG level.
             *
             *  Parameters:
             *    (String) msg - The log message.
             */
            debug: function (msg) {
                this.log(this.LogLevel.DEBUG, msg);
            },

            /** Function: info
             *  Log a message at the Strophe.LogLevel.INFO level.
             *
             *  Parameters:
             *    (String) msg - The log message.
             */
            info: function (msg) {
                this.log(this.LogLevel.INFO, msg);
            },

            /** Function: warn
             *  Log a message at the Strophe.LogLevel.WARN level.
             *
             *  Parameters:
             *    (String) msg - The log message.
             */
            warn: function (msg) {
                this.log(this.LogLevel.WARN, msg);
            },

            /** Function: error
             *  Log a message at the Strophe.LogLevel.ERROR level.
             *
             *  Parameters:
             *    (String) msg - The log message.
             */
            error: function (msg) {
                this.log(this.LogLevel.ERROR, msg);
            },

            /** Function: fatal
             *  Log a message at the Strophe.LogLevel.FATAL level.
             *
             *  Parameters:
             *    (String) msg - The log message.
             */
            fatal: function (msg) {
                this.log(this.LogLevel.FATAL, msg);
            },

            /** Function: serialize
             *  Render a DOM element and all descendants to a String.
             *
             *  Parameters:
             *    (XMLElement) elem - A DOM element.
             *
             *  Returns:
             *    The serialized element tree as a String.
             */
            serialize: function (elem) {
                var result;

                if (!elem) {
                    return null;
                }

                if (typeof(elem.tree) === "function") {
                    elem = elem.tree();
                }

                var nodeName = elem.nodeName;
                var i, child;

                if (elem.getAttribute("_realname")) {
                    nodeName = elem.getAttribute("_realname");
                }

                result = "<" + nodeName;
                for (i = 0; i < elem.attributes.length; i++) {
                    if (elem.attributes[i].nodeName != "_realname") {
                        result += " " + elem.attributes[i].nodeName +
                            "='" + Strophe.xmlescape(elem.attributes[i].value) + "'";
                    }
                }

                if (elem.childNodes.length > 0) {
                    result += ">";
                    for (i = 0; i < elem.childNodes.length; i++) {
                        child = elem.childNodes[i];
                        switch (child.nodeType) {
                            case Strophe.ElementType.NORMAL:
                                // normal element, so recurse
                                result += Strophe.serialize(child);
                                break;
                            case Strophe.ElementType.TEXT:
                                // text element to escape values
                                result += Strophe.xmlescape(child.nodeValue);
                                break;
                            case Strophe.ElementType.CDATA:
                                // cdata section so don't escape values
                                result += "<![CDATA[" + child.nodeValue + "]]>";
                        }
                    }
                    result += "</" + nodeName + ">";
                } else {
                    result += "/>";
                }

                return result;
            },

            /** PrivateVariable: _requestId
             *  _Private_ variable that keeps track of the request ids for
             *  connections.
             */
            _requestId: 0,

            /** PrivateVariable: Strophe.connectionPlugins
             *  _Private_ variable Used to store plugin names that need
             *  initialization on Strophe.Connection construction.
             */
            _connectionPlugins: {},

            /** Function: addConnectionPlugin
             *  Extends the Strophe.Connection object with the given plugin.
             *
             *  Parameters:
             *    (String) name - The name of the extension.
             *    (Object) ptype - The plugin's prototype.
             */
            addConnectionPlugin: function (name, ptype) {
                Strophe._connectionPlugins[name] = ptype;
            }
        };

        /** Class: Strophe.Builder
         *  XML DOM builder.
         *
         *  This object provides an interface similar to JQuery but for building
         *  DOM elements easily and rapidly.  All the functions except for toString()
         *  and tree() return the object, so calls can be chained.  Here's an
         *  example using the $iq() builder helper.
         *  > $iq({to: 'you', from: 'me', type: 'get', id: '1'})
         *  >     .c('query', {xmlns: 'strophe:example'})
         *  >     .c('example')
         *  >     .toString()
         *  The above generates this XML fragment
         *  > <iq to='you' from='me' type='get' id='1'>
         *  >   <query xmlns='strophe:example'>
         *  >     <example/>
         *  >   </query>
         *  > </iq>
         *  The corresponding DOM manipulations to get a similar fragment would be
         *  a lot more tedious and probably involve several helper variables.
         *
         *  Since adding children makes new operations operate on the child, up()
         *  is provided to traverse up the tree.  To add two children, do
         *  > builder.c('child1', ...).up().c('child2', ...)
         *  The next operation on the Builder will be relative to the second child.
         */

        /** Constructor: Strophe.Builder
         *  Create a Strophe.Builder object.
         *
         *  The attributes should be passed in object notation.  For example
         *  > var b = new Builder('message', {to: 'you', from: 'me'});
         *  or
         *  > var b = new Builder('messsage', {'xml:lang': 'en'});
         *
         *  Parameters:
         *    (String) name - The name of the root element.
         *    (Object) attrs - The attributes for the root element in object notation.
         *
         *  Returns:
         *    A new Strophe.Builder.
         */
        Strophe.Builder = function (name, attrs) {
            // Set correct namespace for jabber:client elements
            if (name == "presence" || name == "message" || name == "iq") {
                if (attrs && !attrs.xmlns) {
                    attrs.xmlns = Strophe.NS.CLIENT;
                } else if (!attrs) {
                    attrs = {xmlns: Strophe.NS.CLIENT};
                }
            }

            // Holds the tree being built.
            this.nodeTree = Strophe.xmlElement(name, attrs);

            // Points to the current operation node.
            this.node = this.nodeTree;
        };

        Strophe.Builder.prototype = {
            /** Function: tree
             *  Return the DOM tree.
             *
             *  This function returns the current DOM tree as an element object.  This
             *  is suitable for passing to functions like Strophe.Connection.send().
             *
             *  Returns:
             *    The DOM tree as a element object.
             */
            tree: function () {
                return this.nodeTree;
            },

            /** Function: toString
             *  Serialize the DOM tree to a String.
             *
             *  This function returns a string serialization of the current DOM
             *  tree.  It is often used internally to pass data to a
             *  Strophe.Request object.
             *
             *  Returns:
             *    The serialized DOM tree in a String.
             */
            toString: function () {
                return Strophe.serialize(this.nodeTree);
            },

            /** Function: up
             *  Make the current parent element the new current element.
             *
             *  This function is often used after c() to traverse back up the tree.
             *  For example, to add two children to the same element
             *  > builder.c('child1', {}).up().c('child2', {});
             *
             *  Returns:
             *    The Stophe.Builder object.
             */
            up: function () {
                this.node = this.node.parentNode;
                return this;
            },

            /** Function: attrs
             *  Add or modify attributes of the current element.
             *
             *  The attributes should be passed in object notation.  This function
             *  does not move the current element pointer.
             *
             *  Parameters:
             *    (Object) moreattrs - The attributes to add/modify in object notation.
             *
             *  Returns:
             *    The Strophe.Builder object.
             */
            attrs: function (moreattrs) {
                for (var k in moreattrs) {
                    if (moreattrs.hasOwnProperty(k)) {
                        if (moreattrs[k] === undefined) {
                            this.node.removeAttribute(k);
                        } else {
                            this.node.setAttribute(k, moreattrs[k]);
                        }
                    }
                }
                return this;
            },

            /** Function: c
             *  Add a child to the current element and make it the new current
             *  element.
             *
             *  This function moves the current element pointer to the child,
             *  unless text is provided.  If you need to add another child, it
             *  is necessary to use up() to go back to the parent in the tree.
             *
             *  Parameters:
             *    (String) name - The name of the child.
             *    (Object) attrs - The attributes of the child in object notation.
             *    (String) text - The text to add to the child.
             *
             *  Returns:
             *    The Strophe.Builder object.
             */
            c: function (name, attrs, text) {
                var child = Strophe.xmlElement(name, attrs, text);
                this.node.appendChild(child);
                if (typeof text !== "string" && typeof text !== "number") {
                    this.node = child;
                }
                return this;
            },

            /** Function: cnode
             *  Add a child to the current element and make it the new current
             *  element.
             *
             *  This function is the same as c() except that instead of using a
             *  name and an attributes object to create the child it uses an
             *  existing DOM element object.
             *
             *  Parameters:
             *    (XMLElement) elem - A DOM element.
             *
             *  Returns:
             *    The Strophe.Builder object.
             */
            cnode: function (elem) {
                var impNode;
                var xmlGen = Strophe.xmlGenerator();
                try {
                    impNode = (xmlGen.importNode !== undefined);
                }
                catch (e) {
                    impNode = false;
                }
                var newElem = impNode ?
                    xmlGen.importNode(elem, true) :
                    Strophe.copyElement(elem);
                this.node.appendChild(newElem);
                this.node = newElem;
                return this;
            },

            /** Function: t
             *  Add a child text element.
             *
             *  This *does not* make the child the new current element since there
             *  are no children of text elements.
             *
             *  Parameters:
             *    (String) text - The text data to append to the current element.
             *
             *  Returns:
             *    The Strophe.Builder object.
             */
            t: function (text) {
                var child = Strophe.xmlTextNode(text);
                this.node.appendChild(child);
                return this;
            },

            /** Function: h
             *  Replace current element contents with the HTML passed in.
             *
             *  This *does not* make the child the new current element
             *
             *  Parameters:
             *    (String) html - The html to insert as contents of current element.
             *
             *  Returns:
             *    The Strophe.Builder object.
             */
            h: function (html) {
                var fragment = document.createElement('body');

                // force the browser to try and fix any invalid HTML tags
                fragment.innerHTML = html;

                // copy cleaned html into an xml dom
                var xhtml = Strophe.createHtml(fragment);

                while (xhtml.childNodes.length > 0) {
                    this.node.appendChild(xhtml.childNodes[0]);
                }
                return this;
            }
        };

        /** PrivateClass: Strophe.Handler
         *  _Private_ helper class for managing stanza handlers.
         *
         *  A Strophe.Handler encapsulates a user provided callback function to be
         *  executed when matching stanzas are received by the connection.
         *  Handlers can be either one-off or persistant depending on their
         *  return value. Returning true will cause a Handler to remain active, and
         *  returning false will remove the Handler.
         *
         *  Users will not use Strophe.Handler objects directly, but instead they
         *  will use Strophe.Connection.addHandler() and
         *  Strophe.Connection.deleteHandler().
         */

        /** PrivateConstructor: Strophe.Handler
         *  Create and initialize a new Strophe.Handler.
         *
         *  Parameters:
         *    (Function) handler - A function to be executed when the handler is run.
         *    (String) ns - The namespace to match.
         *    (String) name - The element name to match.
         *    (String) type - The element type to match.
         *    (String) id - The element id attribute to match.
         *    (String) from - The element from attribute to match.
         *    (Object) options - Handler options
         *
         *  Returns:
         *    A new Strophe.Handler object.
         */
        Strophe.Handler = function (handler, ns, name, type, id, from, options) {
            this.handler = handler;
            this.ns = ns;
            this.name = name;
            this.type = type;
            this.id = id;
            this.options = options || {matchBare: false};

            // default matchBare to false if undefined
            if (!this.options.matchBare) {
                this.options.matchBare = false;
            }

            if (this.options.matchBare) {
                this.from = from ? Strophe.getBareJidFromJid(from) : null;
            } else {
                this.from = from;
            }

            // whether the handler is a user handler or a system handler
            this.user = true;
        };

        Strophe.Handler.prototype = {
            /** PrivateFunction: isMatch
             *  Tests if a stanza matches the Strophe.Handler.
             *
             *  Parameters:
             *    (XMLElement) elem - The XML element to test.
             *
             *  Returns:
             *    true if the stanza matches and false otherwise.
             */
            isMatch: function (elem) {
                var nsMatch;
                var from = null;

                if (this.options.matchBare) {
                    from = Strophe.getBareJidFromJid(elem.getAttribute('from'));
                } else {
                    from = elem.getAttribute('from');
                }

                nsMatch = false;
                if (!this.ns) {
                    nsMatch = true;
                } else {
                    var that = this;
                    Strophe.forEachChild(elem, null, function (elem) {
                        if (elem.getAttribute("xmlns") == that.ns) {
                            nsMatch = true;
                        }
                    });

                    nsMatch = nsMatch || elem.getAttribute("xmlns") == this.ns;
                }

                var elem_type = elem.getAttribute("type");
                if (nsMatch &&
                    (!this.name || Strophe.isTagEqual(elem, this.name)) &&
                    (!this.type || (Array.isArray(this.type) ? this.type.indexOf(elem_type) != -1 : elem_type == this.type)) &&
                    (!this.id || elem.getAttribute("id") == this.id) &&
                    (!this.from || from == this.from)) {
                    return true;
                }

                return false;
            },

            /** PrivateFunction: run
             *  Run the callback on a matching stanza.
             *
             *  Parameters:
             *    (XMLElement) elem - The DOM element that triggered the
             *      Strophe.Handler.
             *
             *  Returns:
             *    A boolean indicating if the handler should remain active.
             */
            run: function (elem) {
                var result = null;
                try {
                    result = this.handler(elem);
                } catch (e) {
                    if (e.sourceURL) {
                        Strophe.fatal("error: " + this.handler +
                            " " + e.sourceURL + ":" +
                            e.line + " - " + e.name + ": " + e.message);
                    } else if (e.fileName) {
                        if (typeof(console) != "undefined") {
                            console.trace();
                            console.error(this.handler, " - error - ", e, e.message);
                        }
                        Strophe.fatal("error: " + this.handler + " " +
                            e.fileName + ":" + e.lineNumber + " - " +
                            e.name + ": " + e.message);
                    } else {
                        Strophe.fatal("error: " + e.message + "\n" + e.stack);
                    }

                    throw e;
                }

                return result;
            },

            /** PrivateFunction: toString
             *  Get a String representation of the Strophe.Handler object.
             *
             *  Returns:
             *    A String.
             */
            toString: function () {
                return "{Handler: " + this.handler + "(" + this.name + "," +
                    this.id + "," + this.ns + ")}";
            }
        };

        /** PrivateClass: Strophe.TimedHandler
         *  _Private_ helper class for managing timed handlers.
         *
         *  A Strophe.TimedHandler encapsulates a user provided callback that
         *  should be called after a certain period of time or at regular
         *  intervals.  The return value of the callback determines whether the
         *  Strophe.TimedHandler will continue to fire.
         *
         *  Users will not use Strophe.TimedHandler objects directly, but instead
         *  they will use Strophe.Connection.addTimedHandler() and
         *  Strophe.Connection.deleteTimedHandler().
         */

        /** PrivateConstructor: Strophe.TimedHandler
         *  Create and initialize a new Strophe.TimedHandler object.
         *
         *  Parameters:
         *    (Integer) period - The number of milliseconds to wait before the
         *      handler is called.
         *    (Function) handler - The callback to run when the handler fires.  This
         *      function should take no arguments.
         *
         *  Returns:
         *    A new Strophe.TimedHandler object.
         */
        Strophe.TimedHandler = function (period, handler) {
            this.period = period;
            this.handler = handler;

            this.lastCalled = new Date().getTime();
            this.user = true;
        };

        Strophe.TimedHandler.prototype = {
            /** PrivateFunction: run
             *  Run the callback for the Strophe.TimedHandler.
             *
             *  Returns:
             *    true if the Strophe.TimedHandler should be called again, and false
             *      otherwise.
             */
            run: function () {
                this.lastCalled = new Date().getTime();
                return this.handler();
            },

            /** PrivateFunction: reset
             *  Reset the last called time for the Strophe.TimedHandler.
             */
            reset: function () {
                this.lastCalled = new Date().getTime();
            },

            /** PrivateFunction: toString
             *  Get a string representation of the Strophe.TimedHandler object.
             *
             *  Returns:
             *    The string representation.
             */
            toString: function () {
                return "{TimedHandler: " + this.handler + "(" + this.period + ")}";
            }
        };

        /** Class: Strophe.Connection
         *  XMPP Connection manager.
         *
         *  This class is the main part of Strophe.  It manages a BOSH or websocket
         *  connection to an XMPP server and dispatches events to the user callbacks
         *  as data arrives. It supports SASL PLAIN, SASL DIGEST-MD5, SASL SCRAM-SHA1
         *  and legacy authentication.
         *
         *  After creating a Strophe.Connection object, the user will typically
         *  call connect() with a user supplied callback to handle connection level
         *  events like authentication failure, disconnection, or connection
         *  complete.
         *
         *  The user will also have several event handlers defined by using
         *  addHandler() and addTimedHandler().  These will allow the user code to
         *  respond to interesting stanzas or do something periodically with the
         *  connection. These handlers will be active once authentication is
         *  finished.
         *
         *  To send data to the connection, use send().
         */

        /** Constructor: Strophe.Connection
         *  Create and initialize a Strophe.Connection object.
         *
         *  The transport-protocol for this connection will be chosen automatically
         *  based on the given service parameter. URLs starting with "ws://" or
         *  "wss://" will use WebSockets, URLs starting with "http://", "https://"
         *  or without a protocol will use BOSH.
         *
         *  To make Strophe connect to the current host you can leave out the protocol
         *  and host part and just pass the path, e.g.
         *
         *  > var conn = new Strophe.Connection("/http-bind/");
         *
         *  Options common to both Websocket and BOSH:
         *  ------------------------------------------
         *
         *  The "cookies" option allows you to pass in cookies to be added to the
         *  document. These cookies will then be included in the BOSH XMLHttpRequest
         *  or in the websocket connection.
         *
         *  The passed in value must be a map of cookie names and string values:
         *
         * { "myCookie": {
 *      "value": "1234",
 *      "domain": ".example.org",
 *      "path": "/",
 *      "expires": expirationDate
 *      }
 *  }
         *
         *  Note that cookies can't be set in this way for other domains (i.e. cross-domain).
         *  Those cookies need to be set under those domains, for example they can be
         *  set server-side by making a XHR call to that domain to ask it to set any
         *  necessary cookies.
         *
         *  WebSocket options:
         *  ------------------
         *
         *  If you want to connect to the current host with a WebSocket connection you
         *  can tell Strophe to use WebSockets through a "protocol" attribute in the
         *  optional options parameter. Valid values are "ws" for WebSocket and "wss"
         *  for Secure WebSocket.
         *  So to connect to "wss://CURRENT_HOSTNAME/xmpp-websocket" you would call
         *
         *  > var conn = new Strophe.Connection("/xmpp-websocket/", {protocol: "wss"});
         *
         *  Note that relative URLs _NOT_ starting with a "/" will also include the path
         *  of the current site.
         *
         *  Also because downgrading security is not permitted by browsers, when using
         *  relative URLs both BOSH and WebSocket connections will use their secure
         *  variants if the current connection to the site is also secure (https).
         *
         *  BOSH options:
         *  -------------
         *
         *  By adding "sync" to the options, you can control if requests will
         *  be made synchronously or not. The default behaviour is asynchronous.
         *  If you want to make requests synchronous, make "sync" evaluate to true:
         *  > var conn = new Strophe.Connection("/http-bind/", {sync: true});
         *
         *  You can also toggle this on an already established connection:
         *  > conn.options.sync = true;
         *
         *  The "customHeaders" option can be used to provide custom HTTP headers to be
         *  included in the XMLHttpRequests made.
         *
         *  The "keepalive" option can be used to instruct Strophe to maintain the
         *  current BOSH session across interruptions such as webpage reloads.
         *
         *  It will do this by caching the sessions tokens in sessionStorage, and when
         *  "restore" is called it will check whether there are cached tokens with
         *  which it can resume an existing session.
         *
         *  The "withCredentials" option should receive a Boolean value and is used to
         *  indicate wether cookies should be included in ajax requests (by default
         *  they're not).
         *  Set this value to true if you are connecting to a BOSH service
         *  and for some reason need to send cookies to it.
         *  In order for this to work cross-domain, the server must also enable
         *  credentials by setting the Access-Control-Allow-Credentials response header
         *  to "true". For most usecases however this setting should be false (which
         *  is the default).
         *  Additionally, when using Access-Control-Allow-Credentials, the
         *  Access-Control-Allow-Origin header can't be set to the wildcard "*", but
         *  instead must be restricted to actual domains.
         *
         *  The "contentType" option can be set to change the default Content-Type
         *  of "text/xml; charset=utf-8", which can be useful to reduce the amount of
         *  CORS preflight requests that are sent to the server.
         *
         *  Parameters:
         *    (String) service - The BOSH or WebSocket service URL.
         *    (Object) options - A hash of configuration options
         *
         *  Returns:
         *    A new Strophe.Connection object.
         */
        Strophe.Connection = function (service, options) {
            // The service URL
            this.service = service;
            // Configuration options
            this.options = options || {};
            var proto = this.options.protocol || "";

            // Select protocal based on service or options
            if (service.indexOf("ws:") === 0 || service.indexOf("wss:") === 0 ||
                proto.indexOf("ws") === 0) {
                this._proto = new Strophe.Websocket(this);
            } else {
                this._proto = new Strophe.Bosh(this);
            }

            /* The connected JID. */
            this.jid = "";
            /* the JIDs domain */
            this.domain = null;
            /* stream:features */
            this.features = null;

            // SASL
            this._sasl_data = {};
            this.do_session = false;
            this.do_bind = false;

            // handler lists
            this.timedHandlers = [];
            this.handlers = [];
            this.removeTimeds = [];
            this.removeHandlers = [];
            this.addTimeds = [];
            this.addHandlers = [];

            this._authentication = {};
            this._idleTimeout = null;
            this._disconnectTimeout = null;

            this.authenticated = false;
            this.connected = false;
            this.disconnecting = false;
            this.do_authentication = true;
            this.paused = false;
            this.restored = false;

            this._data = [];
            this._uniqueId = 0;

            this._sasl_success_handler = null;
            this._sasl_failure_handler = null;
            this._sasl_challenge_handler = null;

            // Max retries before disconnecting
            this.maxRetries = 5;

            // Call onIdle callback every 1/10th of a second
            // XXX: setTimeout should be called only with function expressions (23974bc1)
            this._idleTimeout = setTimeout(function () {
                this._onIdle();
            }.bind(this), 100);

            utils.addCookies(this.options.cookies);

            // initialize plugins
            for (var k in Strophe._connectionPlugins) {
                if (Strophe._connectionPlugins.hasOwnProperty(k)) {
                    var ptype = Strophe._connectionPlugins[k];
                    // jslint complaints about the below line, but this is fine
                    var F = function () {
                    }; // jshint ignore:line
                    F.prototype = ptype;
                    this[k] = new F();
                    this[k].init(this);
                }
            }
        };

        Strophe.Connection.prototype = {
            /** Function: reset
             *  Reset the connection.
             *
             *  This function should be called after a connection is disconnected
             *  before that connection is reused.
             */
            reset: function () {
                this._proto._reset();

                // SASL
                this.do_session = false;
                this.do_bind = false;

                // handler lists
                this.timedHandlers = [];
                this.handlers = [];
                this.removeTimeds = [];
                this.removeHandlers = [];
                this.addTimeds = [];
                this.addHandlers = [];
                this._authentication = {};

                this.authenticated = false;
                this.connected = false;
                this.disconnecting = false;
                this.restored = false;

                this._data = [];
                this._requests = [];
                this._uniqueId = 0;
            },

            /** Function: pause
             *  Pause the request manager.
             *
             *  This will prevent Strophe from sending any more requests to the
             *  server.  This is very useful for temporarily pausing
             *  BOSH-Connections while a lot of send() calls are happening quickly.
             *  This causes Strophe to send the data in a single request, saving
             *  many request trips.
             */
            pause: function () {
                this.paused = true;
            },

            /** Function: resume
             *  Resume the request manager.
             *
             *  This resumes after pause() has been called.
             */
            resume: function () {
                this.paused = false;
            },

            /** Function: getUniqueId
             *  Generate a unique ID for use in <iq/> elements.
             *
             *  All <iq/> stanzas are required to have unique id attributes.  This
             *  function makes creating these easy.  Each connection instance has
             *  a counter which starts from zero, and the value of this counter
             *  plus a colon followed by the suffix becomes the unique id. If no
             *  suffix is supplied, the counter is used as the unique id.
             *
             *  Suffixes are used to make debugging easier when reading the stream
             *  data, and their use is recommended.  The counter resets to 0 for
             *  every new connection for the same reason.  For connections to the
             *  same server that authenticate the same way, all the ids should be
             *  the same, which makes it easy to see changes.  This is useful for
             *  automated testing as well.
             *
             *  Parameters:
             *    (String) suffix - A optional suffix to append to the id.
             *
             *  Returns:
             *    A unique string to be used for the id attribute.
             */
            getUniqueId: function (suffix) {
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : r & 0x3 | 0x8;
                    return v.toString(16);
                });
                if (typeof(suffix) == "string" || typeof(suffix) == "number") {
                    return uuid + ":" + suffix;
                } else {
                    return uuid + "";
                }
            },

            /** Function: connect
             *  Starts the connection process.
             *
             *  As the connection process proceeds, the user supplied callback will
             *  be triggered multiple times with status updates.  The callback
             *  should take two arguments - the status code and the error condition.
             *
             *  The status code will be one of the values in the Strophe.Status
             *  constants.  The error condition will be one of the conditions
             *  defined in RFC 3920 or the condition 'strophe-parsererror'.
             *
             *  The Parameters _wait_, _hold_ and _route_ are optional and only relevant
             *  for BOSH connections. Please see XEP 124 for a more detailed explanation
             *  of the optional parameters.
             *
             *  Parameters:
             *    (String) jid - The user's JID.  This may be a bare JID,
             *      or a full JID.  If a node is not supplied, SASL ANONYMOUS
             *      authentication will be attempted.
             *    (String) pass - The user's password.
             *    (Function) callback - The connect callback function.
             *    (Integer) wait - The optional HTTPBIND wait value.  This is the
             *      time the server will wait before returning an empty result for
             *      a request.  The default setting of 60 seconds is recommended.
             *    (Integer) hold - The optional HTTPBIND hold value.  This is the
             *      number of connections the server will hold at one time.  This
             *      should almost always be set to 1 (the default).
             *    (String) route - The optional route value.
             *    (String) authcid - The optional alternative authentication identity
             *      (username) if intending to impersonate another user.
             *      When using the SASL-EXTERNAL authentication mechanism, for example
             *      with client certificates, then the authcid value is used to
             *      determine whether an authorization JID (authzid) should be sent to
             *      the server. The authzid should not be sent to the server if the
             *      authzid and authcid are the same. So to prevent it from being sent
             *      (for example when the JID is already contained in the client
             *      certificate), set authcid to that same JID. See XEP-178 for more
             *      details.
             */
            connect: function (jid, pass, callback, wait, hold, route, authcid) {
                this.jid = jid;
                /** Variable: authzid
                 *  Authorization identity.
                 */
                this.authzid = Strophe.getBareJidFromJid(this.jid);

                /** Variable: authcid
                 *  Authentication identity (User name).
                 */
                this.authcid = authcid || Strophe.getNodeFromJid(this.jid);

                /** Variable: pass
                 *  Authentication identity (User password).
                 */
                this.pass = pass;

                /** Variable: servtype
                 *  Digest MD5 compatibility.
                 */
                this.servtype = "xmpp";

                this.connect_callback = callback;
                this.disconnecting = false;
                this.connected = false;
                this.authenticated = false;
                this.restored = false;

                // parse jid for domain
                this.domain = Strophe.getDomainFromJid(this.jid);

                this._changeConnectStatus(Strophe.Status.CONNECTING, null);

                this._proto._connect(wait, hold, route);
            },

            /** Function: attach
             *  Attach to an already created and authenticated BOSH session.
             *
             *  This function is provided to allow Strophe to attach to BOSH
             *  sessions which have been created externally, perhaps by a Web
             *  application.  This is often used to support auto-login type features
             *  without putting user credentials into the page.
             *
             *  Parameters:
             *    (String) jid - The full JID that is bound by the session.
             *    (String) sid - The SID of the BOSH session.
             *    (String) rid - The current RID of the BOSH session.  This RID
             *      will be used by the next request.
             *    (Function) callback The connect callback function.
             *    (Integer) wait - The optional HTTPBIND wait value.  This is the
             *      time the server will wait before returning an empty result for
             *      a request.  The default setting of 60 seconds is recommended.
             *      Other settings will require tweaks to the Strophe.TIMEOUT value.
             *    (Integer) hold - The optional HTTPBIND hold value.  This is the
             *      number of connections the server will hold at one time.  This
             *      should almost always be set to 1 (the default).
             *    (Integer) wind - The optional HTTBIND window value.  This is the
             *      allowed range of request ids that are valid.  The default is 5.
             */
            attach: function (jid, sid, rid, callback, wait, hold, wind) {
                if (this._proto instanceof Strophe.Bosh) {
                    this._proto._attach(jid, sid, rid, callback, wait, hold, wind);
                } else {
                    throw {
                        name: 'StropheSessionError',
                        message: 'The "attach" method can only be used with a BOSH connection.'
                    };
                }
            },

            /** Function: restore
             *  Attempt to restore a cached BOSH session.
             *
             *  This function is only useful in conjunction with providing the
             *  "keepalive":true option when instantiating a new Strophe.Connection.
             *
             *  When "keepalive" is set to true, Strophe will cache the BOSH tokens
             *  RID (Request ID) and SID (Session ID) and then when this function is
             *  called, it will attempt to restore the session from those cached
             *  tokens.
             *
             *  This function must therefore be called instead of connect or attach.
             *
             *  For an example on how to use it, please see examples/restore.js
             *
             *  Parameters:
             *    (String) jid - The user's JID.  This may be a bare JID or a full JID.
             *    (Function) callback - The connect callback function.
             *    (Integer) wait - The optional HTTPBIND wait value.  This is the
             *      time the server will wait before returning an empty result for
             *      a request.  The default setting of 60 seconds is recommended.
             *    (Integer) hold - The optional HTTPBIND hold value.  This is the
             *      number of connections the server will hold at one time.  This
             *      should almost always be set to 1 (the default).
             *    (Integer) wind - The optional HTTBIND window value.  This is the
             *      allowed range of request ids that are valid.  The default is 5.
             */
            restore: function (jid, callback, wait, hold, wind) {
                if (this._sessionCachingSupported()) {
                    this._proto._restore(jid, callback, wait, hold, wind);
                } else {
                    throw {
                        name: 'StropheSessionError',
                        message: 'The "restore" method can only be used with a BOSH connection.'
                    };
                }
            },

            /** PrivateFunction: _sessionCachingSupported
             * Checks whether sessionStorage and JSON are supported and whether we're
             * using BOSH.
             */
            _sessionCachingSupported: function () {
                if (this._proto instanceof Strophe.Bosh) {
                    if (!JSON) {
                        return false;
                    }
                    try {
                        window.sessionStorage.setItem('_strophe_', '_strophe_');
                        window.sessionStorage.removeItem('_strophe_');
                    } catch (e) {
                        return false;
                    }
                    return true;
                }
                return false;
            },

            /** Function: xmlInput
             *  User overrideable function that receives XML data coming into the
             *  connection.
             *
             *  The default function does nothing.  User code can override this with
             *  > Strophe.Connection.xmlInput = function (elem) {
     *  >   (user code)
     *  > };
             *
             *  Due to limitations of current Browsers' XML-Parsers the opening and closing
             *  <stream> tag for WebSocket-Connoctions will be passed as selfclosing here.
             *
             *  BOSH-Connections will have all stanzas wrapped in a <body> tag. See
             *  <Strophe.Bosh.strip> if you want to strip this tag.
             *
             *  Parameters:
             *    (XMLElement) elem - The XML data received by the connection.
             */
            /* jshint unused:false */
            xmlInput: function (elem) {
                return;
            },
            /* jshint unused:true */

            /** Function: xmlOutput
             *  User overrideable function that receives XML data sent to the
             *  connection.
             *
             *  The default function does nothing.  User code can override this with
             *  > Strophe.Connection.xmlOutput = function (elem) {
     *  >   (user code)
     *  > };
             *
             *  Due to limitations of current Browsers' XML-Parsers the opening and closing
             *  <stream> tag for WebSocket-Connoctions will be passed as selfclosing here.
             *
             *  BOSH-Connections will have all stanzas wrapped in a <body> tag. See
             *  <Strophe.Bosh.strip> if you want to strip this tag.
             *
             *  Parameters:
             *    (XMLElement) elem - The XMLdata sent by the connection.
             */
            /* jshint unused:false */
            xmlOutput: function (elem) {
                return;
            },
            /* jshint unused:true */

            /** Function: rawInput
             *  User overrideable function that receives raw data coming into the
             *  connection.
             *
             *  The default function does nothing.  User code can override this with
             *  > Strophe.Connection.rawInput = function (data) {
     *  >   (user code)
     *  > };
             *
             *  Parameters:
             *    (String) data - The data received by the connection.
             */
            /* jshint unused:false */
            rawInput: function (data) {
                return;
            },
            /* jshint unused:true */

            /** Function: rawOutput
             *  User overrideable function that receives raw data sent to the
             *  connection.
             *
             *  The default function does nothing.  User code can override this with
             *  > Strophe.Connection.rawOutput = function (data) {
     *  >   (user code)
     *  > };
             *
             *  Parameters:
             *    (String) data - The data sent by the connection.
             */
            /* jshint unused:false */
            rawOutput: function (data) {
                return;
            },
            /* jshint unused:true */

            /** Function: nextValidRid
             *  User overrideable function that receives the new valid rid.
             *
             *  The default function does nothing. User code can override this with
             *  > Strophe.Connection.nextValidRid = function (rid) {
     *  >    (user code)
     *  > };
             *
             *  Parameters:
             *    (Number) rid - The next valid rid
             */
            /* jshint unused:false */
            nextValidRid: function (rid) {
                return;
            },
            /* jshint unused:true */

            /** Function: send
             *  Send a stanza.
             *
             *  This function is called to push data onto the send queue to
             *  go out over the wire.  Whenever a request is sent to the BOSH
             *  server, all pending data is sent and the queue is flushed.
             *
             *  Parameters:
             *    (XMLElement |
             *     [XMLElement] |
             *     Strophe.Builder) elem - The stanza to send.
             */
            send: function (elem) {
                if (elem === null) {
                    return;
                }
                if (typeof(elem.sort) === "function") {
                    for (var i = 0; i < elem.length; i++) {
                        this._queueData(elem[i]);
                    }
                } else if (typeof(elem.tree) === "function") {
                    this._queueData(elem.tree());
                } else {
                    this._queueData(elem);
                }

                this._proto._send();
            },

            /** Function: flush
             *  Immediately send any pending outgoing data.
             *
             *  Normally send() queues outgoing data until the next idle period
             *  (100ms), which optimizes network use in the common cases when
             *  several send()s are called in succession. flush() can be used to
             *  immediately send all pending data.
             */
            flush: function () {
                // cancel the pending idle period and run the idle function
                // immediately
                clearTimeout(this._idleTimeout);
                this._onIdle();
            },

            /** Function: sendIQ
             *  Helper function to send IQ stanzas.
             *
             *  Parameters:
             *    (XMLElement) elem - The stanza to send.
             *    (Function) callback - The callback function for a successful request.
             *    (Function) errback - The callback function for a failed or timed
             *      out request.  On timeout, the stanza will be null.
             *    (Integer) timeout - The time specified in milliseconds for a
             *      timeout to occur.
             *
             *  Returns:
             *    The id used to send the IQ.
             */
            sendIQ: function (elem, callback, errback, timeout) {
                var timeoutHandler = null;
                var that = this;

                if (typeof(elem.tree) === "function") {
                    elem = elem.tree();
                }
                var id = elem.getAttribute('id');

                // inject id if not found
                if (!id) {
                    id = this.getUniqueId("sendIQ");
                    elem.setAttribute("id", id);
                }

                var expectedFrom = elem.getAttribute("to");
                var fulljid = this.jid;

                var handler = this.addHandler(function (stanza) {
                    // remove timeout handler if there is one
                    if (timeoutHandler) {
                        that.deleteTimedHandler(timeoutHandler);
                    }

                    var acceptable = false;
                    var from = stanza.getAttribute("from");
                    if (from === expectedFrom ||
                        (!expectedFrom &&
                        (from === Strophe.getBareJidFromJid(fulljid) ||
                        from === Strophe.getDomainFromJid(fulljid) ||
                        from === fulljid))) {
                        acceptable = true;
                    }

                    if (!acceptable) {
                        throw {
                            name: "StropheError",
                            message: "Got answer to IQ from wrong jid:" + from +
                            "\nExpected jid: " + expectedFrom
                        };
                    }

                    var iqtype = stanza.getAttribute('type');
                    if (iqtype == 'result') {
                        if (callback) {
                            callback(stanza);
                        }
                    } else if (iqtype == 'error') {
                        if (errback) {
                            errback(stanza);
                        }
                    } else {
                        throw {
                            name: "StropheError",
                            message: "Got bad IQ type of " + iqtype
                        };
                    }
                }, null, 'iq', ['error', 'result'], id);

                // if timeout specified, setup timeout handler.
                if (timeout) {
                    timeoutHandler = this.addTimedHandler(timeout, function () {
                        // get rid of normal handler
                        that.deleteHandler(handler);
                        // call errback on timeout with null stanza
                        if (errback) {
                            errback(null);
                        }
                        return false;
                    });
                }
                this.send(elem);
                return id;
            },

            /** PrivateFunction: _queueData
             *  Queue outgoing data for later sending.  Also ensures that the data
             *  is a DOMElement.
             */
            _queueData: function (element) {
                if (element === null || !element.tagName || !element.childNodes) {
                    throw {
                        name: "StropheError",
                        message: "Cannot queue non-DOMElement."
                    };
                }
                this._data.push(element);
            },

            /** PrivateFunction: _sendRestart
             *  Send an xmpp:restart stanza.
             */
            _sendRestart: function () {
                this._data.push("restart");
                this._proto._sendRestart();
                // XXX: setTimeout should be called only with function expressions (23974bc1)
                this._idleTimeout = setTimeout(function () {
                    this._onIdle();
                }.bind(this), 100);
            },

            /** Function: addTimedHandler
             *  Add a timed handler to the connection.
             *
             *  This function adds a timed handler.  The provided handler will
             *  be called every period milliseconds until it returns false,
             *  the connection is terminated, or the handler is removed.  Handlers
             *  that wish to continue being invoked should return true.
             *
             *  Because of method binding it is necessary to save the result of
             *  this function if you wish to remove a handler with
             *  deleteTimedHandler().
             *
             *  Note that user handlers are not active until authentication is
             *  successful.
             *
             *  Parameters:
             *    (Integer) period - The period of the handler.
             *    (Function) handler - The callback function.
             *
             *  Returns:
             *    A reference to the handler that can be used to remove it.
             */
            addTimedHandler: function (period, handler) {
                var thand = new Strophe.TimedHandler(period, handler);
                this.addTimeds.push(thand);
                return thand;
            },

            /** Function: deleteTimedHandler
             *  Delete a timed handler for a connection.
             *
             *  This function removes a timed handler from the connection.  The
             *  handRef parameter is *not* the function passed to addTimedHandler(),
             *  but is the reference returned from addTimedHandler().
             *
             *  Parameters:
             *    (Strophe.TimedHandler) handRef - The handler reference.
             */
            deleteTimedHandler: function (handRef) {
                // this must be done in the Idle loop so that we don't change
                // the handlers during iteration
                this.removeTimeds.push(handRef);
            },

            /** Function: addHandler
             *  Add a stanza handler for the connection.
             *
             *  This function adds a stanza handler to the connection.  The
             *  handler callback will be called for any stanza that matches
             *  the parameters.  Note that if multiple parameters are supplied,
             *  they must all match for the handler to be invoked.
             *
             *  The handler will receive the stanza that triggered it as its argument.
             *  *The handler should return true if it is to be invoked again;
             *  returning false will remove the handler after it returns.*
             *
             *  As a convenience, the ns parameters applies to the top level element
             *  and also any of its immediate children.  This is primarily to make
             *  matching /iq/query elements easy.
             *
             *  The options argument contains handler matching flags that affect how
             *  matches are determined. Currently the only flag is matchBare (a
             *  boolean). When matchBare is true, the from parameter and the from
             *  attribute on the stanza will be matched as bare JIDs instead of
             *  full JIDs. To use this, pass {matchBare: true} as the value of
             *  options. The default value for matchBare is false.
             *
             *  The return value should be saved if you wish to remove the handler
             *  with deleteHandler().
             *
             *  Parameters:
             *    (Function) handler - The user callback.
             *    (String) ns - The namespace to match.
             *    (String) name - The stanza name to match.
             *    (String) type - The stanza type attribute to match.
             *    (String) id - The stanza id attribute to match.
             *    (String) from - The stanza from attribute to match.
             *    (String) options - The handler options
             *
             *  Returns:
             *    A reference to the handler that can be used to remove it.
             */
            addHandler: function (handler, ns, name, type, id, from, options) {
                var hand = new Strophe.Handler(handler, ns, name, type, id, from, options);
                this.addHandlers.push(hand);
                return hand;
            },

            /** Function: deleteHandler
             *  Delete a stanza handler for a connection.
             *
             *  This function removes a stanza handler from the connection.  The
             *  handRef parameter is *not* the function passed to addHandler(),
             *  but is the reference returned from addHandler().
             *
             *  Parameters:
             *    (Strophe.Handler) handRef - The handler reference.
             */
            deleteHandler: function (handRef) {
                // this must be done in the Idle loop so that we don't change
                // the handlers during iteration
                this.removeHandlers.push(handRef);
                // If a handler is being deleted while it is being added,
                // prevent it from getting added
                var i = this.addHandlers.indexOf(handRef);
                if (i >= 0) {
                    this.addHandlers.splice(i, 1);
                }
            },

            /** Function: disconnect
             *  Start the graceful disconnection process.
             *
             *  This function starts the disconnection process.  This process starts
             *  by sending unavailable presence and sending BOSH body of type
             *  terminate.  A timeout handler makes sure that disconnection happens
             *  even if the BOSH server does not respond.
             *  If the Connection object isn't connected, at least tries to abort all pending requests
             *  so the connection object won't generate successful requests (which were already opened).
             *
             *  The user supplied connection callback will be notified of the
             *  progress as this process happens.
             *
             *  Parameters:
             *    (String) reason - The reason the disconnect is occuring.
             */
            disconnect: function (reason) {
                this._changeConnectStatus(Strophe.Status.DISCONNECTING, reason);

                Strophe.info("Disconnect was called because: " + reason);
                if (this.connected) {
                    var pres = false;
                    this.disconnecting = true;
                    if (this.authenticated) {
                        pres = $pres({
                            xmlns: Strophe.NS.CLIENT,
                            type: 'unavailable'
                        });
                    }
                    // setup timeout handler
                    this._disconnectTimeout = this._addSysTimedHandler(
                        3000, this._onDisconnectTimeout.bind(this));
                    this._proto._disconnect(pres);
                } else {
                    Strophe.info("Disconnect was called before Strophe connected to the server");
                    this._proto._abortAllRequests();
                }
            },

            /** PrivateFunction: _changeConnectStatus
             *  _Private_ helper function that makes sure plugins and the user's
             *  callback are notified of connection status changes.
             *
             *  Parameters:
             *    (Integer) status - the new connection status, one of the values
             *      in Strophe.Status
             *    (String) condition - the error condition or null
             */
            _changeConnectStatus: function (status, condition) {
                // notify all plugins listening for status changes
                for (var k in Strophe._connectionPlugins) {
                    if (Strophe._connectionPlugins.hasOwnProperty(k)) {
                        var plugin = this[k];
                        if (plugin.statusChanged) {
                            try {
                                plugin.statusChanged(status, condition);
                            } catch (err) {
                                Strophe.error("" + k + " plugin caused an exception " +
                                    "changing status: " + err);
                            }
                        }
                    }
                }

                // notify the user's callback
                if (this.connect_callback) {
                    try {
                        this.connect_callback(status, condition);
                    } catch (e) {
                        Strophe.error("User connection callback caused an " +
                            "exception: " + e);
                    }
                }
            },

            /** PrivateFunction: _doDisconnect
             *  _Private_ function to disconnect.
             *
             *  This is the last piece of the disconnection logic.  This resets the
             *  connection and alerts the user's connection callback.
             */
            _doDisconnect: function (condition) {
                if (typeof this._idleTimeout == "number") {
                    clearTimeout(this._idleTimeout);
                }

                // Cancel Disconnect Timeout
                if (this._disconnectTimeout !== null) {
                    this.deleteTimedHandler(this._disconnectTimeout);
                    this._disconnectTimeout = null;
                }

                Strophe.info("_doDisconnect was called");
                this._proto._doDisconnect();

                this.authenticated = false;
                this.disconnecting = false;
                this.restored = false;

                // delete handlers
                this.handlers = [];
                this.timedHandlers = [];
                this.removeTimeds = [];
                this.removeHandlers = [];
                this.addTimeds = [];
                this.addHandlers = [];

                // tell the parent we disconnected
                this._changeConnectStatus(Strophe.Status.DISCONNECTED, condition);
                this.connected = false;
            },

            /** PrivateFunction: _dataRecv
             *  _Private_ handler to processes incoming data from the the connection.
             *
             *  Except for _connect_cb handling the initial connection request,
             *  this function handles the incoming data for all requests.  This
             *  function also fires stanza handlers that match each incoming
             *  stanza.
             *
             *  Parameters:
             *    (Strophe.Request) req - The request that has data ready.
             *    (string) req - The stanza a raw string (optiona).
             */
            _dataRecv: function (req, raw) {
                Strophe.info("_dataRecv called");
                WebIM && WebIM.config.isDebug && Strophe.info(JSON.stringify(req));
                var elem = this._proto._reqToData(req);
                if (elem === null) {
                    return;
                }

                if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
                    if (elem.nodeName === this._proto.strip && elem.childNodes.length) {
                        this.xmlInput(elem.childNodes[0]);
                    } else {
                        this.xmlInput(elem);
                    }
                }
                if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
                    if (raw) {
                        this.rawInput(raw);
                    } else {
                        this.rawInput(Strophe.serialize(elem));
                    }
                }

                // remove handlers scheduled for deletion
                var i, hand;
                while (this.removeHandlers.length > 0) {
                    hand = this.removeHandlers.pop();
                    i = this.handlers.indexOf(hand);
                    if (i >= 0) {
                        this.handlers.splice(i, 1);
                    }
                }

                // add handlers scheduled for addition
                while (this.addHandlers.length > 0) {
                    this.handlers.push(this.addHandlers.pop());
                }

                // handle graceful disconnect
                if (this.disconnecting && this._proto._emptyQueue()) {
                    this._doDisconnect();
                    return;
                }

                var type = elem.getAttribute("type");
                var cond, conflict;
                if (type !== null && type == "terminate") {
                    // Don't process stanzas that come in after disconnect
                    if (this.disconnecting) {
                        return;
                    }

                    // an error occurred
                    cond = elem.getAttribute("condition");
                    conflict = elem.getElementsByTagName("conflict");
                    if (cond !== null) {
                        if (cond == "remote-stream-error" && conflict.length > 0) {
                            cond = "conflict";
                        }
                        this._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
                    } else {
                        this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
                    }
                    this._doDisconnect(cond);
                    return;
                }

                // send each incoming stanza through the handler chain
                var that = this;
                Strophe.forEachChild(elem, null, function (child) {
                    var i, newList;
                    // process handlers
                    newList = that.handlers;
                    that.handlers = [];
                    for (i = 0; i < newList.length; i++) {
                        var hand = newList[i];
                        // encapsulate 'handler.run' not to lose the whole handler list if
                        // one of the handlers throws an exception
                        try {
                            if (hand.isMatch(child) &&
                                (that.authenticated || !hand.user)) {
                                if (hand.run(child)) {
                                    that.handlers.push(hand);
                                }
                            } else {
                                that.handlers.push(hand);
                            }
                        } catch (e) {
                            // if the handler throws an exception, we consider it as false
                            Strophe.warn('Removing Strophe handlers due to uncaught exception: ' + e.message);
                        }
                    }
                });
            },


            /** Attribute: mechanisms
             *  SASL Mechanisms available for Conncection.
             */
            mechanisms: {},

            /** PrivateFunction: _connect_cb
             *  _Private_ handler for initial connection request.
             *
             *  This handler is used to process the initial connection request
             *  response from the BOSH server. It is used to set up authentication
             *  handlers and start the authentication process.
             *
             *  SASL authentication will be attempted if available, otherwise
             *  the code will fall back to legacy authentication.
             *
             *  Parameters:
             *    (Strophe.Request) req - The current request.
             *    (Function) _callback - low level (xmpp) connect callback function.
             *      Useful for plugins with their own xmpp connect callback (when their)
             *      want to do something special).
             */
            _connect_cb: function (req, _callback, raw) {
                Strophe.info("_connect_cb was called");

                this.connected = true;

                var bodyWrap;
                try {
                    bodyWrap = this._proto._reqToData(req);
                } catch (e) {
                    if (e != "badformat") {
                        throw e;
                    }
                    this._changeConnectStatus(Strophe.Status.CONNFAIL, 'bad-format');
                    this._doDisconnect('bad-format');
                }
                if (!bodyWrap) {
                    return;
                }

                if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
                    if (bodyWrap.nodeName === this._proto.strip && bodyWrap.childNodes.length) {
                        this.xmlInput(bodyWrap.childNodes[0]);
                    } else {
                        this.xmlInput(bodyWrap);
                    }
                }
                if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
                    if (raw) {
                        this.rawInput(raw);
                    } else {
                        this.rawInput(Strophe.serialize(bodyWrap));
                    }
                }

                var conncheck = this._proto._connect_cb(bodyWrap);
                if (conncheck === Strophe.Status.CONNFAIL) {
                    return;
                }

                this._authentication.sasl_scram_sha1 = false;
                this._authentication.sasl_plain = false;
                this._authentication.sasl_digest_md5 = false;
                this._authentication.sasl_anonymous = false;
                this._authentication.legacy_auth = false;

                // Check for the stream:features tag
                var hasFeatures;
                if (bodyWrap.getElementsByTagNameNS) {
                    hasFeatures = bodyWrap.getElementsByTagNameNS(Strophe.NS.STREAM, "features").length > 0;
                } else {
                    hasFeatures = bodyWrap.getElementsByTagName("stream:features").length > 0 || bodyWrap.getElementsByTagName("features").length > 0;
                }
                var mechanisms = bodyWrap.getElementsByTagName("mechanism");
                var matched = [];
                var i, mech, found_authentication = false;
                if (!hasFeatures) {
                    this._proto._no_auth_received(_callback);
                    return;
                }
                if (mechanisms.length > 0) {
                    for (i = 0; i < mechanisms.length; i++) {
                        mech = Strophe.getText(mechanisms[i]);
                        if (this.mechanisms[mech]) matched.push(this.mechanisms[mech]);
                    }
                }
                this._authentication.legacy_auth =
                    bodyWrap.getElementsByTagName("auth").length > 0;
                found_authentication = this._authentication.legacy_auth ||
                    matched.length > 0;
                if (!found_authentication) {
                    this._proto._no_auth_received(_callback);
                    return;
                }
                if (this.do_authentication !== false)
                    this.authenticate(matched);
            },

            /** Function: authenticate
             * Set up authentication
             *
             *  Contiunues the initial connection request by setting up authentication
             *  handlers and start the authentication process.
             *
             *  SASL authentication will be attempted if available, otherwise
             *  the code will fall back to legacy authentication.
             *
             */
            authenticate: function (matched) {
                var i;
                // Sorting matched mechanisms according to priority.
                for (i = 0; i < matched.length - 1; ++i) {
                    var higher = i;
                    for (var j = i + 1; j < matched.length; ++j) {
                        if (matched[j].prototype.priority > matched[higher].prototype.priority) {
                            higher = j;
                        }
                    }
                    if (higher != i) {
                        var swap = matched[i];
                        matched[i] = matched[higher];
                        matched[higher] = swap;
                    }
                }

                // run each mechanism
                var mechanism_found = false;
                for (i = 0; i < matched.length; ++i) {
                    if (!matched[i].prototype.test(this)) continue;

                    this._sasl_success_handler = this._addSysHandler(
                        this._sasl_success_cb.bind(this), null,
                        "success", null, null);
                    this._sasl_failure_handler = this._addSysHandler(
                        this._sasl_failure_cb.bind(this), null,
                        "failure", null, null);
                    this._sasl_challenge_handler = this._addSysHandler(
                        this._sasl_challenge_cb.bind(this), null,
                        "challenge", null, null);

                    this._sasl_mechanism = new matched[i]();
                    this._sasl_mechanism.onStart(this);

                    var request_auth_exchange = $build("auth", {
                        xmlns: Strophe.NS.SASL,
                        mechanism: this._sasl_mechanism.name
                    });

                    if (this._sasl_mechanism.isClientFirst) {
                        var response = this._sasl_mechanism.onChallenge(this, null);
                        request_auth_exchange.t(Base64.encode(response));
                    }
                    this.send(request_auth_exchange.tree());
                    mechanism_found = true;
                    break;
                }

                if (!mechanism_found) {
                    // if none of the mechanism worked
                    if (Strophe.getNodeFromJid(this.jid) === null) {
                        // we don't have a node, which is required for non-anonymous
                        // client connections
                        this._changeConnectStatus(Strophe.Status.CONNFAIL,
                            'x-strophe-bad-non-anon-jid');
                        this.disconnect('x-strophe-bad-non-anon-jid');
                    } else {
                        // fall back to legacy authentication
                        this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
                        this._addSysHandler(this._auth1_cb.bind(this), null, null,
                            null, "_auth_1");
                        this.send($iq({
                            type: "get",
                            to: this.domain,
                            id: "_auth_1"
                        }).c("query", {
                            xmlns: Strophe.NS.AUTH
                        }).c("username", {}).t(Strophe.getNodeFromJid(this.jid)).tree());
                    }
                }
            },

            _sasl_challenge_cb: function (elem) {
                var challenge = Base64.decode(Strophe.getText(elem));
                var response = this._sasl_mechanism.onChallenge(this, challenge);
                var stanza = $build('response', {
                    xmlns: Strophe.NS.SASL
                });
                if (response !== "") {
                    stanza.t(Base64.encode(response));
                }
                this.send(stanza.tree());
                return true;
            },

            /** PrivateFunction: _auth1_cb
             *  _Private_ handler for legacy authentication.
             *
             *  This handler is called in response to the initial <iq type='get'/>
             *  for legacy authentication.  It builds an authentication <iq/> and
             *  sends it, creating a handler (calling back to _auth2_cb()) to
             *  handle the result
             *
             *  Parameters:
             *    (XMLElement) elem - The stanza that triggered the callback.
             *
             *  Returns:
             *    false to remove the handler.
             */
            /* jshint unused:false */
            _auth1_cb: function (elem) {
                // build plaintext auth iq
                var iq = $iq({type: "set", id: "_auth_2"})
                    .c('query', {xmlns: Strophe.NS.AUTH})
                    .c('username', {}).t(Strophe.getNodeFromJid(this.jid))
                    .up()
                    .c('password').t(this.pass);

                if (!Strophe.getResourceFromJid(this.jid)) {
                    // since the user has not supplied a resource, we pick
                    // a default one here.  unlike other auth methods, the server
                    // cannot do this for us.
                    this.jid = Strophe.getBareJidFromJid(this.jid) + '/strophe';
                }
                iq.up().c('resource', {}).t(Strophe.getResourceFromJid(this.jid));

                this._addSysHandler(this._auth2_cb.bind(this), null,
                    null, null, "_auth_2");
                this.send(iq.tree());
                return false;
            },
            /* jshint unused:true */

            /** PrivateFunction: _sasl_success_cb
             *  _Private_ handler for succesful SASL authentication.
             *
             *  Parameters:
             *    (XMLElement) elem - The matching stanza.
             *
             *  Returns:
             *    false to remove the handler.
             */
            _sasl_success_cb: function (elem) {
                if (this._sasl_data["server-signature"]) {
                    var serverSignature;
                    var success = Base64.decode(Strophe.getText(elem));
                    var attribMatch = /([a-z]+)=([^,]+)(,|$)/;
                    var matches = success.match(attribMatch);
                    if (matches[1] == "v") {
                        serverSignature = matches[2];
                    }

                    if (serverSignature != this._sasl_data["server-signature"]) {
                        // remove old handlers
                        this.deleteHandler(this._sasl_failure_handler);
                        this._sasl_failure_handler = null;
                        if (this._sasl_challenge_handler) {
                            this.deleteHandler(this._sasl_challenge_handler);
                            this._sasl_challenge_handler = null;
                        }

                        this._sasl_data = {};
                        return this._sasl_failure_cb(null);
                    }
                }

                Strophe.info("SASL authentication succeeded.");

                if (this._sasl_mechanism) {
                    this._sasl_mechanism.onSuccess();
                }

                // remove old handlers
                this.deleteHandler(this._sasl_failure_handler);
                this._sasl_failure_handler = null;
                if (this._sasl_challenge_handler) {
                    this.deleteHandler(this._sasl_challenge_handler);
                    this._sasl_challenge_handler = null;
                }

                var streamfeature_handlers = [];
                var wrapper = function (handlers, elem) {
                    while (handlers.length) {
                        this.deleteHandler(handlers.pop());
                    }
                    this._sasl_auth1_cb.bind(this)(elem);
                    return false;
                };
                streamfeature_handlers.push(this._addSysHandler(function (elem) {
                    wrapper.bind(this)(streamfeature_handlers, elem);
                }.bind(this), null, "stream:features", null, null));
                streamfeature_handlers.push(this._addSysHandler(function (elem) {
                    wrapper.bind(this)(streamfeature_handlers, elem);
                }.bind(this), Strophe.NS.STREAM, "features", null, null));

                // we must send an xmpp:restart now
                this._sendRestart();

                return false;
            },

            /** PrivateFunction: _sasl_auth1_cb
             *  _Private_ handler to start stream binding.
             *
             *  Parameters:
             *    (XMLElement) elem - The matching stanza.
             *
             *  Returns:
             *    false to remove the handler.
             */
            _sasl_auth1_cb: function (elem) {
                // save stream:features for future usage
                this.features = elem;
                var i, child;
                for (i = 0; i < elem.childNodes.length; i++) {
                    child = elem.childNodes[i];
                    if (child.nodeName == 'bind') {
                        this.do_bind = true;
                    }

                    if (child.nodeName == 'session') {
                        this.do_session = true;
                    }
                }

                if (!this.do_bind) {
                    this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                    return false;
                } else {
                    this._addSysHandler(this._sasl_bind_cb.bind(this), null, null,
                        null, "_bind_auth_2");

                    var resource = Strophe.getResourceFromJid(this.jid);
                    if (resource) {
                        this.send($iq({type: "set", id: "_bind_auth_2"})
                            .c('bind', {xmlns: Strophe.NS.BIND})
                            .c('resource', {}).t(resource).tree());
                    } else {
                        this.send($iq({type: "set", id: "_bind_auth_2"})
                            .c('bind', {xmlns: Strophe.NS.BIND})
                            .tree());
                    }
                }
                return false;
            },

            /** PrivateFunction: _sasl_bind_cb
             *  _Private_ handler for binding result and session start.
             *
             *  Parameters:
             *    (XMLElement) elem - The matching stanza.
             *
             *  Returns:
             *    false to remove the handler.
             */
            _sasl_bind_cb: function (elem) {
                if (elem.getAttribute("type") == "error") {
                    Strophe.info("SASL binding failed.");
                    var conflict = elem.getElementsByTagName("conflict"), condition;
                    if (conflict.length > 0) {
                        condition = 'conflict';
                    }
                    this._changeConnectStatus(Strophe.Status.AUTHFAIL, condition);
                    return false;
                }

                // TODO - need to grab errors
                var bind = elem.getElementsByTagName("bind");
                var jidNode;
                if (bind.length > 0) {
                    // Grab jid
                    jidNode = bind[0].getElementsByTagName("jid");
                    if (jidNode.length > 0) {
                        this.jid = Strophe.getText(jidNode[0]);

                        if (this.do_session) {
                            this._addSysHandler(this._sasl_session_cb.bind(this),
                                null, null, null, "_session_auth_2");

                            this.send($iq({type: "set", id: "_session_auth_2"})
                                .c('session', {xmlns: Strophe.NS.SESSION})
                                .tree());
                        } else {
                            this.authenticated = true;
                            this._changeConnectStatus(Strophe.Status.CONNECTED, null);
                        }
                    }
                } else {
                    Strophe.info("SASL binding failed.");
                    this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                    return false;
                }
            },

            /** PrivateFunction: _sasl_session_cb
             *  _Private_ handler to finish successful SASL connection.
             *
             *  This sets Connection.authenticated to true on success, which
             *  starts the processing of user handlers.
             *
             *  Parameters:
             *    (XMLElement) elem - The matching stanza.
             *
             *  Returns:
             *    false to remove the handler.
             */
            _sasl_session_cb: function (elem) {
                if (elem.getAttribute("type") == "result") {
                    this.authenticated = true;
                    this._changeConnectStatus(Strophe.Status.CONNECTED, null);
                } else if (elem.getAttribute("type") == "error") {
                    Strophe.info("Session creation failed.");
                    this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                    return false;
                }
                return false;
            },

            /** PrivateFunction: _sasl_failure_cb
             *  _Private_ handler for SASL authentication failure.
             *
             *  Parameters:
             *    (XMLElement) elem - The matching stanza.
             *
             *  Returns:
             *    false to remove the handler.
             */
            /* jshint unused:false */
            _sasl_failure_cb: function (elem) {
                // delete unneeded handlers
                if (this._sasl_success_handler) {
                    this.deleteHandler(this._sasl_success_handler);
                    this._sasl_success_handler = null;
                }
                if (this._sasl_challenge_handler) {
                    this.deleteHandler(this._sasl_challenge_handler);
                    this._sasl_challenge_handler = null;
                }

                if (this._sasl_mechanism)
                    this._sasl_mechanism.onFailure();
                this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                return false;
            },
            /* jshint unused:true */

            /** PrivateFunction: _auth2_cb
             *  _Private_ handler to finish legacy authentication.
             *
             *  This handler is called when the result from the jabber:iq:auth
             *  <iq/> stanza is returned.
             *
             *  Parameters:
             *    (XMLElement) elem - The stanza that triggered the callback.
             *
             *  Returns:
             *    false to remove the handler.
             */
            _auth2_cb: function (elem) {
                if (elem.getAttribute("type") == "result") {
                    this.authenticated = true;
                    this._changeConnectStatus(Strophe.Status.CONNECTED, null);
                } else if (elem.getAttribute("type") == "error") {
                    this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
                    this.disconnect('authentication failed');
                }
                return false;
            },

            /** PrivateFunction: _addSysTimedHandler
             *  _Private_ function to add a system level timed handler.
             *
             *  This function is used to add a Strophe.TimedHandler for the
             *  library code.  System timed handlers are allowed to run before
             *  authentication is complete.
             *
             *  Parameters:
             *    (Integer) period - The period of the handler.
             *    (Function) handler - The callback function.
             */
            _addSysTimedHandler: function (period, handler) {
                var thand = new Strophe.TimedHandler(period, handler);
                thand.user = false;
                this.addTimeds.push(thand);
                return thand;
            },

            /** PrivateFunction: _addSysHandler
             *  _Private_ function to add a system level stanza handler.
             *
             *  This function is used to add a Strophe.Handler for the
             *  library code.  System stanza handlers are allowed to run before
             *  authentication is complete.
             *
             *  Parameters:
             *    (Function) handler - The callback function.
             *    (String) ns - The namespace to match.
             *    (String) name - The stanza name to match.
             *    (String) type - The stanza type attribute to match.
             *    (String) id - The stanza id attribute to match.
             */
            _addSysHandler: function (handler, ns, name, type, id) {
                var hand = new Strophe.Handler(handler, ns, name, type, id);
                hand.user = false;
                this.addHandlers.push(hand);
                return hand;
            },

            /** PrivateFunction: _onDisconnectTimeout
             *  _Private_ timeout handler for handling non-graceful disconnection.
             *
             *  If the graceful disconnect process does not complete within the
             *  time allotted, this handler finishes the disconnect anyway.
             *
             *  Returns:
             *    false to remove the handler.
             */
            _onDisconnectTimeout: function () {
                Strophe.info("_onDisconnectTimeout was called");
                this._changeConnectStatus(Strophe.Status.CONNTIMEOUT, null);
                this._proto._onDisconnectTimeout();
                // actually disconnect
                this._doDisconnect();
                return false;
            },

            /** PrivateFunction: _onIdle
             *  _Private_ handler to process events during idle cycle.
             *
             *  This handler is called every 100ms to fire timed handlers that
             *  are ready and keep poll requests going.
             */
            _onIdle: function () {
                var i, thand, since, newList;

                // add timed handlers scheduled for addition
                // NOTE: we add before remove in the case a timed handler is
                // added and then deleted before the next _onIdle() call.
                while (this.addTimeds.length > 0) {
                    this.timedHandlers.push(this.addTimeds.pop());
                }

                // remove timed handlers that have been scheduled for deletion
                while (this.removeTimeds.length > 0) {
                    thand = this.removeTimeds.pop();
                    i = this.timedHandlers.indexOf(thand);
                    if (i >= 0) {
                        this.timedHandlers.splice(i, 1);
                    }
                }

                // call ready timed handlers
                var now = new Date().getTime();
                newList = [];
                for (i = 0; i < this.timedHandlers.length; i++) {
                    thand = this.timedHandlers[i];
                    if (this.authenticated || !thand.user) {
                        since = thand.lastCalled + thand.period;
                        if (since - now <= 0) {
                            if (thand.run()) {
                                newList.push(thand);
                            }
                        } else {
                            newList.push(thand);
                        }
                    }
                }
                this.timedHandlers = newList;

                clearTimeout(this._idleTimeout);

                this._proto._onIdle();

                // reactivate the timer only if connected
                if (this.connected) {
                    // XXX: setTimeout should be called only with function expressions (23974bc1)
                    this._idleTimeout = setTimeout(function () {
                        this._onIdle();
                    }.bind(this), 100);
                }
            }
        };

        /** Class: Strophe.SASLMechanism
         *
         *  encapsulates SASL authentication mechanisms.
         *
         *  User code may override the priority for each mechanism or disable it completely.
         *  See <priority> for information about changing priority and <test> for informatian on
         *  how to disable a mechanism.
         *
         *  By default, all mechanisms are enabled and the priorities are
         *
         *  EXTERNAL - 60
         *  OAUTHBEARER - 50
         *  SCRAM-SHA1 - 40
         *  DIGEST-MD5 - 30
         *  PLAIN - 20
         *  ANONYMOUS - 10
         */

        /**
         * PrivateConstructor: Strophe.SASLMechanism
         * SASL auth mechanism abstraction.
         *
         *  Parameters:
         *    (String) name - SASL Mechanism name.
         *    (Boolean) isClientFirst - If client should send response first without challenge.
         *    (Number) priority - Priority.
         *
         *  Returns:
         *    A new Strophe.SASLMechanism object.
         */
        Strophe.SASLMechanism = function (name, isClientFirst, priority) {
            /** PrivateVariable: name
             *  Mechanism name.
             */
            this.name = name;
            /** PrivateVariable: isClientFirst
             *  If client sends response without initial server challenge.
             */
            this.isClientFirst = isClientFirst;
            /** Variable: priority
             *  Determines which <SASLMechanism> is chosen for authentication (Higher is better).
             *  Users may override this to prioritize mechanisms differently.
             *
             *  In the default configuration the priorities are
             *
             *  SCRAM-SHA1 - 40
             *  DIGEST-MD5 - 30
             *  Plain - 20
             *
             *  Example: (This will cause Strophe to choose the mechanism that the server sent first)
             *
             *  > Strophe.SASLMD5.priority = Strophe.SASLSHA1.priority;
             *
             *  See <SASL mechanisms> for a list of available mechanisms.
             *
             */
            this.priority = priority;
        };

        Strophe.SASLMechanism.prototype = {
            /**
             *  Function: test
             *  Checks if mechanism able to run.
             *  To disable a mechanism, make this return false;
             *
             *  To disable plain authentication run
             *  > Strophe.SASLPlain.test = function() {
   *  >   return false;
   *  > }
             *
             *  See <SASL mechanisms> for a list of available mechanisms.
             *
             *  Parameters:
             *    (Strophe.Connection) connection - Target Connection.
             *
             *  Returns:
             *    (Boolean) If mechanism was able to run.
             */
            /* jshint unused:false */
            test: function (connection) {
                return true;
            },
            /* jshint unused:true */

            /** PrivateFunction: onStart
             *  Called before starting mechanism on some connection.
             *
             *  Parameters:
             *    (Strophe.Connection) connection - Target Connection.
             */
            onStart: function (connection) {
                this._connection = connection;
            },

            /** PrivateFunction: onChallenge
             *  Called by protocol implementation on incoming challenge. If client is
             *  first (isClientFirst == true) challenge will be null on the first call.
             *
             *  Parameters:
             *    (Strophe.Connection) connection - Target Connection.
             *    (String) challenge - current challenge to handle.
             *
             *  Returns:
             *    (String) Mechanism response.
             */
            /* jshint unused:false */
            onChallenge: function (connection, challenge) {
                throw new Error("You should implement challenge handling!");
            },
            /* jshint unused:true */

            /** PrivateFunction: onFailure
             *  Protocol informs mechanism implementation about SASL failure.
             */
            onFailure: function () {
                this._connection = null;
            },

            /** PrivateFunction: onSuccess
             *  Protocol informs mechanism implementation about SASL success.
             */
            onSuccess: function () {
                this._connection = null;
            }
        };

        /** Constants: SASL mechanisms
         *  Available authentication mechanisms
         *
         *  Strophe.SASLAnonymous - SASL ANONYMOUS authentication.
         *  Strophe.SASLPlain - SASL PLAIN authentication.
         *  Strophe.SASLMD5 - SASL DIGEST-MD5 authentication
         *  Strophe.SASLSHA1 - SASL SCRAM-SHA1 authentication
         *  Strophe.SASLOAuthBearer - SASL OAuth Bearer authentication
         *  Strophe.SASLExternal - SASL EXTERNAL authentication
         */

// Building SASL callbacks

        /** PrivateConstructor: SASLAnonymous
         *  SASL ANONYMOUS authentication.
         */
        Strophe.SASLAnonymous = function () {
        };

        Strophe.SASLAnonymous.prototype = new Strophe.SASLMechanism("ANONYMOUS", false, 10);

        Strophe.SASLAnonymous.prototype.test = function (connection) {
            return connection.authcid === null;
        };

        Strophe.Connection.prototype.mechanisms[Strophe.SASLAnonymous.prototype.name] = Strophe.SASLAnonymous;

        /** PrivateConstructor: SASLPlain
         *  SASL PLAIN authentication.
         */
        Strophe.SASLPlain = function () {
        };

        Strophe.SASLPlain.prototype = new Strophe.SASLMechanism("PLAIN", true, 20);

        Strophe.SASLPlain.prototype.test = function (connection) {
            return connection.authcid !== null;
        };

        Strophe.SASLPlain.prototype.onChallenge = function (connection) {
            var auth_str = connection.authzid;
            auth_str = auth_str + "\u0000";
            auth_str = auth_str + connection.authcid;
            auth_str = auth_str + "\u0000";
            auth_str = auth_str + connection.pass;
            return utils.utf16to8(auth_str);
        };

        Strophe.Connection.prototype.mechanisms[Strophe.SASLPlain.prototype.name] = Strophe.SASLPlain;

        /** PrivateConstructor: SASLSHA1
         *  SASL SCRAM SHA 1 authentication.
         */
        Strophe.SASLSHA1 = function () {
        };

        Strophe.SASLSHA1.prototype = new Strophe.SASLMechanism("SCRAM-SHA-1", true, 40);

        Strophe.SASLSHA1.prototype.test = function (connection) {
            return connection.authcid !== null;
        };

        Strophe.SASLSHA1.prototype.onChallenge = function (connection, challenge, test_cnonce) {
            var cnonce = test_cnonce || MD5.hexdigest(Math.random() * 1234567890);
            var auth_str = "n=" + utils.utf16to8(connection.authcid);
            auth_str += ",r=";
            auth_str += cnonce;

            connection._sasl_data.cnonce = cnonce;
            connection._sasl_data["client-first-message-bare"] = auth_str;

            auth_str = "n,," + auth_str;

            this.onChallenge = function (connection, challenge) {
                var nonce, salt, iter, Hi, U, U_old, i, k, pass;
                var clientKey, serverKey, clientSignature;
                var responseText = "c=biws,";
                var authMessage = connection._sasl_data["client-first-message-bare"] + "," +
                    challenge + ",";
                var cnonce = connection._sasl_data.cnonce;
                var attribMatch = /([a-z]+)=([^,]+)(,|$)/;

                while (challenge.match(attribMatch)) {
                    var matches = challenge.match(attribMatch);
                    challenge = challenge.replace(matches[0], "");
                    switch (matches[1]) {
                        case "r":
                            nonce = matches[2];
                            break;
                        case "s":
                            salt = matches[2];
                            break;
                        case "i":
                            iter = matches[2];
                            break;
                    }
                }

                if (nonce.substr(0, cnonce.length) !== cnonce) {
                    connection._sasl_data = {};
                    return connection._sasl_failure_cb();
                }

                responseText += "r=" + nonce;
                authMessage += responseText;

                salt = Base64.decode(salt);
                salt += "\x00\x00\x00\x01";

                pass = utils.utf16to8(connection.pass);
                Hi = U_old = SHA1.core_hmac_sha1(pass, salt);
                for (i = 1; i < iter; i++) {
                    U = SHA1.core_hmac_sha1(pass, SHA1.binb2str(U_old));
                    for (k = 0; k < 5; k++) {
                        Hi[k] ^= U[k];
                    }
                    U_old = U;
                }
                Hi = SHA1.binb2str(Hi);

                clientKey = SHA1.core_hmac_sha1(Hi, "Client Key");
                serverKey = SHA1.str_hmac_sha1(Hi, "Server Key");
                clientSignature = SHA1.core_hmac_sha1(SHA1.str_sha1(SHA1.binb2str(clientKey)), authMessage);
                connection._sasl_data["server-signature"] = SHA1.b64_hmac_sha1(serverKey, authMessage);

                for (k = 0; k < 5; k++) {
                    clientKey[k] ^= clientSignature[k];
                }

                responseText += ",p=" + Base64.encode(SHA1.binb2str(clientKey));
                return responseText;
            }.bind(this);

            return auth_str;
        };

        Strophe.Connection.prototype.mechanisms[Strophe.SASLSHA1.prototype.name] = Strophe.SASLSHA1;

        /** PrivateConstructor: SASLMD5
         *  SASL DIGEST MD5 authentication.
         */
        Strophe.SASLMD5 = function () {
        };

        Strophe.SASLMD5.prototype = new Strophe.SASLMechanism("DIGEST-MD5", false, 30);

        Strophe.SASLMD5.prototype.test = function (connection) {
            return connection.authcid !== null;
        };

        /** PrivateFunction: _quote
         *  _Private_ utility function to backslash escape and quote strings.
         *
         *  Parameters:
         *    (String) str - The string to be quoted.
         *
         *  Returns:
         *    quoted string
         */
        Strophe.SASLMD5.prototype._quote = function (str) {
            return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
            //" end string workaround for emacs
        };


        Strophe.SASLMD5.prototype.onChallenge = function (connection, challenge, test_cnonce) {
            var attribMatch = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
            var cnonce = test_cnonce || MD5.hexdigest("" + (Math.random() * 1234567890));
            var realm = "";
            var host = null;
            var nonce = "";
            var qop = "";
            var matches;

            while (challenge.match(attribMatch)) {
                matches = challenge.match(attribMatch);
                challenge = challenge.replace(matches[0], "");
                matches[2] = matches[2].replace(/^"(.+)"$/, "$1");
                switch (matches[1]) {
                    case "realm":
                        realm = matches[2];
                        break;
                    case "nonce":
                        nonce = matches[2];
                        break;
                    case "qop":
                        qop = matches[2];
                        break;
                    case "host":
                        host = matches[2];
                        break;
                }
            }

            var digest_uri = connection.servtype + "/" + connection.domain;
            if (host !== null) {
                digest_uri = digest_uri + "/" + host;
            }

            var cred = utils.utf16to8(connection.authcid + ":" + realm + ":" + this._connection.pass);
            var A1 = MD5.hash(cred) + ":" + nonce + ":" + cnonce;
            var A2 = 'AUTHENTICATE:' + digest_uri;

            var responseText = "";
            responseText += 'charset=utf-8,';
            responseText += 'username=' + this._quote(utils.utf16to8(connection.authcid)) + ',';
            responseText += 'realm=' + this._quote(realm) + ',';
            responseText += 'nonce=' + this._quote(nonce) + ',';
            responseText += 'nc=00000001,';
            responseText += 'cnonce=' + this._quote(cnonce) + ',';
            responseText += 'digest-uri=' + this._quote(digest_uri) + ',';
            responseText += 'response=' + MD5.hexdigest(MD5.hexdigest(A1) + ":" +
                    nonce + ":00000001:" +
                    cnonce + ":auth:" +
                    MD5.hexdigest(A2)) + ",";
            responseText += 'qop=auth';

            this.onChallenge = function () {
                return "";
            };

            return responseText;
        };

        Strophe.Connection.prototype.mechanisms[Strophe.SASLMD5.prototype.name] = Strophe.SASLMD5;

        /** PrivateConstructor: SASLOAuthBearer
         *  SASL OAuth Bearer authentication.
         */
        Strophe.SASLOAuthBearer = function () {
        };

        Strophe.SASLOAuthBearer.prototype = new Strophe.SASLMechanism("OAUTHBEARER", true, 50);

        Strophe.SASLOAuthBearer.prototype.test = function (connection) {
            return connection.authcid !== null;
        };

        Strophe.SASLOAuthBearer.prototype.onChallenge = function (connection) {
            var auth_str = 'n,a=';
            auth_str = auth_str + connection.authzid;
            auth_str = auth_str + ',';
            auth_str = auth_str + "\u0001";
            auth_str = auth_str + 'auth=Bearer ';
            auth_str = auth_str + connection.pass;
            auth_str = auth_str + "\u0001";
            auth_str = auth_str + "\u0001";
            return utils.utf16to8(auth_str);
        };

        Strophe.Connection.prototype.mechanisms[Strophe.SASLOAuthBearer.prototype.name] = Strophe.SASLOAuthBearer;


        /** PrivateConstructor: SASLExternal
         *  SASL EXTERNAL authentication.
         *
         *  The EXTERNAL mechanism allows a client to request the server to use
         *  credentials established by means external to the mechanism to
         *  authenticate the client. The external means may be, for instance,
         *  TLS services.
         */
        Strophe.SASLExternal = function () {
        };
        Strophe.SASLExternal.prototype = new Strophe.SASLMechanism("EXTERNAL", true, 60);

        Strophe.SASLExternal.prototype.onChallenge = function (connection) {
            /** According to XEP-178, an authzid SHOULD NOT be presented when the
             * authcid contained or implied in the client certificate is the JID (i.e.
             * authzid) with which the user wants to log in as.
             *
             * To NOT send the authzid, the user should therefore set the authcid equal
             * to the JID when instantiating a new Strophe.Connection object.
             */
            return connection.authcid === connection.authzid ? '' : connection.authzid;
        };

        Strophe.Connection.prototype.mechanisms[Strophe.SASLExternal.prototype.name] = Strophe.SASLExternal;

        return {
            Strophe: Strophe,
            $build: $build,
            $msg: $msg,
            $iq: $iq,
            $pres: $pres,
            SHA1: SHA1,
            Base64: Base64,
            MD5: MD5,
        };
    }));

    /*
     This program is distributed under the terms of the MIT license.
     Please see the LICENSE file for details.

     Copyright 2006-2008, OGG, LLC
     */

    /* jshint undef: true, unused: true:, noarg: true, latedef: true */
    /* global define, window, setTimeout, clearTimeout, XMLHttpRequest, ActiveXObject, Strophe, $build */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-bosh', ['strophe-core'], function (core) {
                return factory(
                    core.Strophe,
                    core.$build
                );
            });
        } else {
            // Browser globals
            return factory(Strophe, $build);
        }
    }(this, function (Strophe, $build) {

        /** PrivateClass: Strophe.Request
         *  _Private_ helper class that provides a cross implementation abstraction
         *  for a BOSH related XMLHttpRequest.
         *
         *  The Strophe.Request class is used internally to encapsulate BOSH request
         *  information.  It is not meant to be used from user's code.
         */

        /** PrivateConstructor: Strophe.Request
         *  Create and initialize a new Strophe.Request object.
         *
         *  Parameters:
         *    (XMLElement) elem - The XML data to be sent in the request.
         *    (Function) func - The function that will be called when the
         *      XMLHttpRequest readyState changes.
         *    (Integer) rid - The BOSH rid attribute associated with this request.
         *    (Integer) sends - The number of times this same request has been
         *      sent.
         */
        Strophe.Request = function (elem, func, rid, sends) {
            this.id = ++Strophe._requestId;
            this.xmlData = elem;
            this.data = Strophe.serialize(elem);
            // save original function in case we need to make a new request
            // from this one.
            this.origFunc = func;
            this.func = func;
            this.rid = rid;
            this.date = NaN;
            this.sends = sends || 0;
            this.abort = false;
            this.dead = null;

            this.age = function () {
                if (!this.date) {
                    return 0;
                }
                var now = new Date();
                return (now - this.date) / 1000;
            };
            this.timeDead = function () {
                if (!this.dead) {
                    return 0;
                }
                var now = new Date();
                return (now - this.dead) / 1000;
            };
            this.xhr = this._newXHR();
        };

        Strophe.Request.prototype = {
            /** PrivateFunction: getResponse
             *  Get a response from the underlying XMLHttpRequest.
             *
             *  This function attempts to get a response from the request and checks
             *  for errors.
             *
             *  Throws:
             *    "parsererror" - A parser error occured.
             *    "badformat" - The entity has sent XML that cannot be processed.
             *
             *  Returns:
             *    The DOM element tree of the response.
             */
            getResponse: function () {
                var node = null;
                if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
                    node = this.xhr.responseXML.documentElement;
                    if (node.tagName == "parsererror") {
                        Strophe.error("invalid response received");
                        Strophe.error("responseText: " + this.xhr.responseText);
                        Strophe.error("responseXML: " +
                            Strophe.serialize(this.xhr.responseXML));
                        throw "parsererror";
                    }
                } else if (this.xhr.responseText) {
                    Strophe.error("invalid response received");
                    Strophe.error("responseText: " + this.xhr.responseText);
                    throw "badformat";
                }

                return node;
            },

            /** PrivateFunction: _newXHR
             *  _Private_ helper function to create XMLHttpRequests.
             *
             *  This function creates XMLHttpRequests across all implementations.
             *
             *  Returns:
             *    A new XMLHttpRequest.
             */
            _newXHR: function () {
                var xhr = null;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("text/xml; charset=utf-8");
                    }
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                // use Function.bind() to prepend ourselves as an argument
                xhr.onreadystatechange = this.func.bind(null, this);
                return xhr;
            }
        };

        /** Class: Strophe.Bosh
         *  _Private_ helper class that handles BOSH Connections
         *
         *  The Strophe.Bosh class is used internally by Strophe.Connection
         *  to encapsulate BOSH sessions. It is not meant to be used from user's code.
         */

        /** File: bosh.js
         *  A JavaScript library to enable BOSH in Strophejs.
         *
         *  this library uses Bidirectional-streams Over Synchronous HTTP (BOSH)
         *  to emulate a persistent, stateful, two-way connection to an XMPP server.
         *  More information on BOSH can be found in XEP 124.
         */

        /** PrivateConstructor: Strophe.Bosh
         *  Create and initialize a Strophe.Bosh object.
         *
         *  Parameters:
         *    (Strophe.Connection) connection - The Strophe.Connection that will use BOSH.
         *
         *  Returns:
         *    A new Strophe.Bosh object.
         */
        Strophe.Bosh = function (connection) {
            this._conn = connection;
            /* request id for body tags */
            this.rid = Math.floor(Math.random() * 4294967295);
            /* The current session ID. */
            this.sid = null;

            // default BOSH values
            this.hold = 1;
            this.wait = 60;
            this.window = 5;
            this.errors = 0;

            this._requests = [];
        };

        Strophe.Bosh.prototype = {
            /** Variable: strip
             *
             *  BOSH-Connections will have all stanzas wrapped in a <body> tag when
             *  passed to <Strophe.Connection.xmlInput> or <Strophe.Connection.xmlOutput>.
             *  To strip this tag, User code can set <Strophe.Bosh.strip> to "body":
             *
             *  > Strophe.Bosh.prototype.strip = "body";
             *
             *  This will enable stripping of the body tag in both
             *  <Strophe.Connection.xmlInput> and <Strophe.Connection.xmlOutput>.
             */
            strip: null,

            /** PrivateFunction: _buildBody
             *  _Private_ helper function to generate the <body/> wrapper for BOSH.
             *
             *  Returns:
             *    A Strophe.Builder with a <body/> element.
             */
            _buildBody: function () {
                var bodyWrap = $build('body', {
                    rid: this.rid++,
                    xmlns: Strophe.NS.HTTPBIND
                });
                if (this.sid !== null) {
                    bodyWrap.attrs({sid: this.sid});
                }
                if (this._conn.options.keepalive && this._conn._sessionCachingSupported()) {
                    this._cacheSession();
                }
                return bodyWrap;
            },

            /** PrivateFunction: _reset
             *  Reset the connection.
             *
             *  This function is called by the reset function of the Strophe Connection
             */
            _reset: function () {
                this.rid = Math.floor(Math.random() * 4294967295);
                this.sid = null;
                this.errors = 0;
                if (this._conn._sessionCachingSupported()) {
                    window.sessionStorage.removeItem('strophe-bosh-session');
                }

                this._conn.nextValidRid(this.rid);
            },

            /** PrivateFunction: _connect
             *  _Private_ function that initializes the BOSH connection.
             *
             *  Creates and sends the Request that initializes the BOSH connection.
             */
            _connect: function (wait, hold, route) {
                this.wait = wait || this.wait;
                this.hold = hold || this.hold;
                this.errors = 0;

                // build the body tag
                var body = this._buildBody().attrs({
                    to: this._conn.domain,
                    "xml:lang": "en",
                    wait: this.wait,
                    hold: this.hold,
                    content: "text/xml; charset=utf-8",
                    ver: "1.6",
                    "xmpp:version": "1.0",
                    "xmlns:xmpp": Strophe.NS.BOSH
                });

                if (route) {
                    body.attrs({
                        route: route
                    });
                }

                var _connect_cb = this._conn._connect_cb;

                this._requests.push(
                    new Strophe.Request(body.tree(),
                        this._onRequestStateChange.bind(
                            this, _connect_cb.bind(this._conn)),
                        body.tree().getAttribute("rid")));
                this._throttledRequestHandler();
            },

            /** PrivateFunction: _attach
             *  Attach to an already created and authenticated BOSH session.
             *
             *  This function is provided to allow Strophe to attach to BOSH
             *  sessions which have been created externally, perhaps by a Web
             *  application.  This is often used to support auto-login type features
             *  without putting user credentials into the page.
             *
             *  Parameters:
             *    (String) jid - The full JID that is bound by the session.
             *    (String) sid - The SID of the BOSH session.
             *    (String) rid - The current RID of the BOSH session.  This RID
             *      will be used by the next request.
             *    (Function) callback The connect callback function.
             *    (Integer) wait - The optional HTTPBIND wait value.  This is the
             *      time the server will wait before returning an empty result for
             *      a request.  The default setting of 60 seconds is recommended.
             *      Other settings will require tweaks to the Strophe.TIMEOUT value.
             *    (Integer) hold - The optional HTTPBIND hold value.  This is the
             *      number of connections the server will hold at one time.  This
             *      should almost always be set to 1 (the default).
             *    (Integer) wind - The optional HTTBIND window value.  This is the
             *      allowed range of request ids that are valid.  The default is 5.
             */
            _attach: function (jid, sid, rid, callback, wait, hold, wind) {
                this._conn.jid = jid;
                this.sid = sid;
                this.rid = rid;

                this._conn.connect_callback = callback;

                this._conn.domain = Strophe.getDomainFromJid(this._conn.jid);

                this._conn.authenticated = true;
                this._conn.connected = true;

                this.wait = wait || this.wait;
                this.hold = hold || this.hold;
                this.window = wind || this.window;

                this._conn._changeConnectStatus(Strophe.Status.ATTACHED, null);
            },

            /** PrivateFunction: _restore
             *  Attempt to restore a cached BOSH session
             *
             *  Parameters:
             *    (String) jid - The full JID that is bound by the session.
             *      This parameter is optional but recommended, specifically in cases
             *      where prebinded BOSH sessions are used where it's important to know
             *      that the right session is being restored.
             *    (Function) callback The connect callback function.
             *    (Integer) wait - The optional HTTPBIND wait value.  This is the
             *      time the server will wait before returning an empty result for
             *      a request.  The default setting of 60 seconds is recommended.
             *      Other settings will require tweaks to the Strophe.TIMEOUT value.
             *    (Integer) hold - The optional HTTPBIND hold value.  This is the
             *      number of connections the server will hold at one time.  This
             *      should almost always be set to 1 (the default).
             *    (Integer) wind - The optional HTTBIND window value.  This is the
             *      allowed range of request ids that are valid.  The default is 5.
             */
            _restore: function (jid, callback, wait, hold, wind) {
                var session = JSON.parse(window.sessionStorage.getItem('strophe-bosh-session'));
                if (typeof session !== "undefined" &&
                    session !== null &&
                    session.rid &&
                    session.sid &&
                    session.jid &&
                    (typeof jid === "undefined" || jid === null || Strophe.getBareJidFromJid(session.jid) == Strophe.getBareJidFromJid(jid))) {
                    this._conn.restored = true;
                    this._attach(session.jid, session.sid, session.rid, callback, wait, hold, wind);
                } else {
                    throw {name: "StropheSessionError", message: "_restore: no restoreable session."};
                }
            },

            /** PrivateFunction: _cacheSession
             *  _Private_ handler for the beforeunload event.
             *
             *  This handler is used to process the Bosh-part of the initial request.
             *  Parameters:
             *    (Strophe.Request) bodyWrap - The received stanza.
             */
            _cacheSession: function () {
                if (this._conn.authenticated) {
                    if (this._conn.jid && this.rid && this.sid) {
                        window.sessionStorage.setItem('strophe-bosh-session', JSON.stringify({
                            'jid': this._conn.jid,
                            'rid': this.rid,
                            'sid': this.sid
                        }));
                    }
                } else {
                    window.sessionStorage.removeItem('strophe-bosh-session');
                }
            },

            /** PrivateFunction: _connect_cb
             *  _Private_ handler for initial connection request.
             *
             *  This handler is used to process the Bosh-part of the initial request.
             *  Parameters:
             *    (Strophe.Request) bodyWrap - The received stanza.
             */
            _connect_cb: function (bodyWrap) {
                var typ = bodyWrap.getAttribute("type");
                var cond, conflict;
                if (typ !== null && typ == "terminate") {
                    // an error occurred
                    cond = bodyWrap.getAttribute("condition");
                    Strophe.error("BOSH-Connection failed: " + cond);
                    conflict = bodyWrap.getElementsByTagName("conflict");
                    if (cond !== null) {
                        if (cond == "remote-stream-error" && conflict.length > 0) {
                            cond = "conflict";
                        }
                        this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
                    } else {
                        this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
                    }
                    this._conn._doDisconnect(cond);
                    return Strophe.Status.CONNFAIL;
                }

                // check to make sure we don't overwrite these if _connect_cb is
                // called multiple times in the case of missing stream:features
                if (!this.sid) {
                    this.sid = bodyWrap.getAttribute("sid");
                }
                var wind = bodyWrap.getAttribute('requests');
                if (wind) {
                    this.window = parseInt(wind, 10);
                }
                var hold = bodyWrap.getAttribute('hold');
                if (hold) {
                    this.hold = parseInt(hold, 10);
                }
                var wait = bodyWrap.getAttribute('wait');
                if (wait) {
                    this.wait = parseInt(wait, 10);
                }
            },

            /** PrivateFunction: _disconnect
             *  _Private_ part of Connection.disconnect for Bosh
             *
             *  Parameters:
             *    (Request) pres - This stanza will be sent before disconnecting.
             */
            _disconnect: function (pres) {
                this._sendTerminate(pres);
            },

            /** PrivateFunction: _doDisconnect
             *  _Private_ function to disconnect.
             *
             *  Resets the SID and RID.
             */
            _doDisconnect: function () {
                this.sid = null;
                this.rid = Math.floor(Math.random() * 4294967295);
                if (this._conn._sessionCachingSupported()) {
                    window.sessionStorage.removeItem('strophe-bosh-session');
                }

                this._conn.nextValidRid(this.rid);
            },

            /** PrivateFunction: _emptyQueue
             * _Private_ function to check if the Request queue is empty.
             *
             *  Returns:
             *    True, if there are no Requests queued, False otherwise.
             */
            _emptyQueue: function () {
                return this._requests.length === 0;
            },

            /** PrivateFunction: _hitError
             *  _Private_ function to handle the error count.
             *
             *  Requests are resent automatically until their error count reaches
             *  5.  Each time an error is encountered, this function is called to
             *  increment the count and disconnect if the count is too high.
             *
             *  Parameters:
             *    (Integer) reqStatus - The request status.
             */
            _hitError: function (reqStatus) {
                this.errors++;
                Strophe.warn("request errored, status: " + reqStatus +
                    ", number of errors: " + this.errors);
                if (this.errors > 4) {
                    this._conn._onDisconnectTimeout();
                }
            },

            /** PrivateFunction: _no_auth_received
             *
             * Called on stream start/restart when no stream:features
             * has been received and sends a blank poll request.
             */
            _no_auth_received: function (_callback) {
                if (_callback) {
                    _callback = _callback.bind(this._conn);
                } else {
                    _callback = this._conn._connect_cb.bind(this._conn);
                }
                var body = this._buildBody();
                this._requests.push(
                    new Strophe.Request(body.tree(),
                        this._onRequestStateChange.bind(
                            this, _callback.bind(this._conn)),
                        body.tree().getAttribute("rid")));
                this._throttledRequestHandler();
            },

            /** PrivateFunction: _onDisconnectTimeout
             *  _Private_ timeout handler for handling non-graceful disconnection.
             *
             *  Cancels all remaining Requests and clears the queue.
             */
            _onDisconnectTimeout: function () {
                this._abortAllRequests();
            },

            /** PrivateFunction: _abortAllRequests
             *  _Private_ helper function that makes sure all pending requests are aborted.
             */
            _abortAllRequests: function _abortAllRequests() {
                var req;
                while (this._requests.length > 0) {
                    req = this._requests.pop();
                    req.abort = true;
                    req.xhr.abort();
                    // jslint complains, but this is fine. setting to empty func
                    // is necessary for IE6
                    req.xhr.onreadystatechange = function () {
                    }; // jshint ignore:line
                }
            },

            /** PrivateFunction: _onIdle
             *  _Private_ handler called by Strophe.Connection._onIdle
             *
             *  Sends all queued Requests or polls with empty Request if there are none.
             */
            _onIdle: function () {
                var data = this._conn._data;

                // if no requests are in progress, poll
                if (this._conn.authenticated && this._requests.length === 0 &&
                    data.length === 0 && !this._conn.disconnecting) {
                    Strophe.info("no requests during idle cycle, sending " +
                        "blank request");
                    data.push(null);
                }

                if (this._conn.paused) {
                    return;
                }

                if (this._requests.length < 2 && data.length > 0) {
                    var body = this._buildBody();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] !== null) {
                            if (data[i] === "restart") {
                                body.attrs({
                                    to: this._conn.domain,
                                    "xml:lang": "en",
                                    "xmpp:restart": "true",
                                    "xmlns:xmpp": Strophe.NS.BOSH
                                });
                            } else {
                                body.cnode(data[i]).up();
                            }
                        }
                    }
                    delete this._conn._data;
                    this._conn._data = [];
                    this._requests.push(
                        new Strophe.Request(body.tree(),
                            this._onRequestStateChange.bind(
                                this, this._conn._dataRecv.bind(this._conn)),
                            body.tree().getAttribute("rid")));
                    this._throttledRequestHandler();
                }

                if (this._requests.length > 0) {
                    var time_elapsed = this._requests[0].age();
                    if (this._requests[0].dead !== null) {
                        if (this._requests[0].timeDead() >
                            Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
                            this._throttledRequestHandler();
                        }
                    }

                    if (time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait)) {
                        Strophe.warn("Request " +
                            this._requests[0].id +
                            " timed out, over " + Math.floor(Strophe.TIMEOUT * this.wait) +
                            " seconds since last activity");
                        this._throttledRequestHandler();
                    }
                }
            },

            /** PrivateFunction: _onRequestStateChange
             *  _Private_ handler for Strophe.Request state changes.
             *
             *  This function is called when the XMLHttpRequest readyState changes.
             *  It contains a lot of error handling logic for the many ways that
             *  requests can fail, and calls the request callback when requests
             *  succeed.
             *
             *  Parameters:
             *    (Function) func - The handler for the request.
             *    (Strophe.Request) req - The request that is changing readyState.
             */
            _onRequestStateChange: function (func, req) {
                Strophe.debug("request id " + req.id +
                    "." + req.sends + " state changed to " +
                    req.xhr.readyState);

                if (req.abort) {
                    req.abort = false;
                    return;
                }

                // request complete
                var reqStatus;
                if (req.xhr.readyState == 4) {
                    reqStatus = 0;
                    try {
                        reqStatus = req.xhr.status;
                    } catch (e) {
                        // ignore errors from undefined status attribute.  works
                        // around a browser bug
                    }

                    if (typeof(reqStatus) == "undefined") {
                        reqStatus = 0;
                    }

                    if (this.disconnecting) {
                        if (reqStatus >= 400) {
                            this._hitError(reqStatus);
                            return;
                        }
                    }

                    var reqIs0 = (this._requests[0] == req);
                    var reqIs1 = (this._requests[1] == req);

                    if ((reqStatus > 0 && reqStatus < 500) || req.sends > 5) {
                        // remove from internal queue
                        this._removeRequest(req);
                        Strophe.debug("request id " +
                            req.id +
                            " should now be removed");
                    }

                    // request succeeded
                    if (reqStatus == 200) {
                        // if request 1 finished, or request 0 finished and request
                        // 1 is over Strophe.SECONDARY_TIMEOUT seconds old, we need to
                        // restart the other - both will be in the first spot, as the
                        // completed request has been removed from the queue already
                        if (reqIs1 ||
                            (reqIs0 && this._requests.length > 0 &&
                            this._requests[0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait))) {
                            this._restartRequest(0);
                        }

                        this._conn.nextValidRid(Number(req.rid) + 1);

                        // call handler
                        Strophe.debug("request id " +
                            req.id + "." +
                            req.sends + " got 200");
                        func(req);
                        this.errors = 0;
                    } else {
                        Strophe.error("request id " +
                            req.id + "." +
                            req.sends + " error " + reqStatus +
                            " happened");
                        if (reqStatus === 0 ||
                            (reqStatus >= 400 && reqStatus < 600) ||
                            reqStatus >= 12000) {
                            this._hitError(reqStatus);
                            if (reqStatus >= 400 && reqStatus < 500) {
                                this._conn._changeConnectStatus(Strophe.Status.DISCONNECTING, null);
                                this._conn._doDisconnect();
                            }
                        }
                    }

                    if (!((reqStatus > 0 && reqStatus < 500) ||
                        req.sends > 5)) {
                        this._throttledRequestHandler();
                    }
                }
            },

            /** PrivateFunction: _processRequest
             *  _Private_ function to process a request in the queue.
             *
             *  This function takes requests off the queue and sends them and
             *  restarts dead requests.
             *
             *  Parameters:
             *    (Integer) i - The index of the request in the queue.
             */
            _processRequest: function (i) {
                var self = this;
                var req = this._requests[i];
                var reqStatus = -1;

                try {
                    if (req.xhr.readyState == 4) {
                        reqStatus = req.xhr.status;
                    }
                } catch (e) {
                    Strophe.error("caught an error in _requests[" + i +
                        "], reqStatus: " + reqStatus);
                }

                if (typeof(reqStatus) == "undefined") {
                    reqStatus = -1;
                }

                // make sure we limit the number of retries
                if (req.sends > this._conn.maxRetries) {
                    this._conn._onDisconnectTimeout();
                    return;
                }

                var time_elapsed = req.age();
                var primaryTimeout = (!isNaN(time_elapsed) &&
                time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait));
                var secondaryTimeout = (req.dead !== null &&
                req.timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait));
                var requestCompletedWithServerError = (req.xhr.readyState == 4 &&
                (reqStatus < 1 ||
                reqStatus >= 500));
                if (primaryTimeout || secondaryTimeout ||
                    requestCompletedWithServerError) {
                    if (secondaryTimeout) {
                        Strophe.error("Request " +
                            this._requests[i].id +
                            " timed out (secondary), restarting");
                    }
                    req.abort = true;
                    req.xhr.abort();
                    // setting to null fails on IE6, so set to empty function
                    req.xhr.onreadystatechange = function () {
                    };
                    this._requests[i] = new Strophe.Request(req.xmlData,
                        req.origFunc,
                        req.rid,
                        req.sends);
                    req = this._requests[i];
                }

                if (req.xhr.readyState === 0) {
                    Strophe.debug("request id " + req.id +
                        "." + req.sends + " posting");

                    try {
                        var contentType = this._conn.options.contentType || "text/xml; charset=utf-8";
                        req.xhr.open("POST", this._conn.service, this._conn.options.sync ? false : true);
                        req.xhr.setRequestHeader && req.xhr.setRequestHeader("Content-Type", contentType);
                        if (this._conn.options.withCredentials) {
                            req.xhr.withCredentials = true;
                        }
                    } catch (e2) {
                        Strophe.error("XHR open failed.");
                        if (!this._conn.connected) {
                            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,
                                "bad-service");
                        }
                        this._conn.disconnect();
                        return;
                    }

                    // Fires the XHR request -- may be invoked immediately
                    // or on a gradually expanding retry window for reconnects
                    var sendFunc = function () {
                        req.date = new Date();
                        if (self._conn.options.customHeaders) {
                            var headers = self._conn.options.customHeaders;
                            for (var header in headers) {
                                if (headers.hasOwnProperty(header)) {
                                    req.xhr.setRequestHeader(header, headers[header]);
                                }
                            }
                        }
                        req.xhr.send(req.data);
                    };

                    // Implement progressive backoff for reconnects --
                    // First retry (send == 1) should also be instantaneous
                    if (req.sends > 1) {
                        // Using a cube of the retry number creates a nicely
                        // expanding retry window
                        var backoff = Math.min(Math.floor(Strophe.TIMEOUT * this.wait),
                                Math.pow(req.sends, 3)) * 1000;

                        // XXX: setTimeout should be called only with function expressions (23974bc1)
                        setTimeout(function () {
                            sendFunc();
                        }, backoff);
                    } else {
                        sendFunc();
                    }

                    req.sends++;

                    if (this._conn.xmlOutput !== Strophe.Connection.prototype.xmlOutput) {
                        if (req.xmlData.nodeName === this.strip && req.xmlData.childNodes.length) {
                            this._conn.xmlOutput(req.xmlData.childNodes[0]);
                        } else {
                            this._conn.xmlOutput(req.xmlData);
                        }
                    }
                    if (this._conn.rawOutput !== Strophe.Connection.prototype.rawOutput) {
                        this._conn.rawOutput(req.data);
                    }
                } else {
                    Strophe.debug("_processRequest: " +
                        (i === 0 ? "first" : "second") +
                        " request has readyState of " +
                        req.xhr.readyState);
                }
            },

            /** PrivateFunction: _removeRequest
             *  _Private_ function to remove a request from the queue.
             *
             *  Parameters:
             *    (Strophe.Request) req - The request to remove.
             */
            _removeRequest: function (req) {
                Strophe.debug("removing request");

                var i;
                for (i = this._requests.length - 1; i >= 0; i--) {
                    if (req == this._requests[i]) {
                        this._requests.splice(i, 1);
                    }
                }

                // IE6 fails on setting to null, so set to empty function
                req.xhr.onreadystatechange = function () {
                };

                this._throttledRequestHandler();
            },

            /** PrivateFunction: _restartRequest
             *  _Private_ function to restart a request that is presumed dead.
             *
             *  Parameters:
             *    (Integer) i - The index of the request in the queue.
             */
            _restartRequest: function (i) {
                var req = this._requests[i];
                if (req.dead === null) {
                    req.dead = new Date();
                }

                this._processRequest(i);
            },

            /** PrivateFunction: _reqToData
             * _Private_ function to get a stanza out of a request.
             *
             * Tries to extract a stanza out of a Request Object.
             * When this fails the current connection will be disconnected.
             *
             *  Parameters:
             *    (Object) req - The Request.
             *
             *  Returns:
             *    The stanza that was passed.
             */
            _reqToData: function (req) {
                try {
                    return req.getResponse();
                } catch (e) {
                    if (e != "parsererror") {
                        throw e;
                    }
                    this._conn.disconnect("strophe-parsererror");
                }
            },

            /** PrivateFunction: _sendTerminate
             *  _Private_ function to send initial disconnect sequence.
             *
             *  This is the first step in a graceful disconnect.  It sends
             *  the BOSH server a terminate body and includes an unavailable
             *  presence if authentication has completed.
             */
            _sendTerminate: function (pres) {
                Strophe.info("_sendTerminate was called");
                var body = this._buildBody().attrs({type: "terminate"});

                if (pres) {
                    body.cnode(pres.tree());
                }

                var req = new Strophe.Request(body.tree(),
                    this._onRequestStateChange.bind(
                        this, this._conn._dataRecv.bind(this._conn)),
                    body.tree().getAttribute("rid"));

                this._requests.push(req);
                this._throttledRequestHandler();
            },

            /** PrivateFunction: _send
             *  _Private_ part of the Connection.send function for BOSH
             *
             * Just triggers the RequestHandler to send the messages that are in the queue
             */
            _send: function () {
                clearTimeout(this._conn._idleTimeout);
                this._throttledRequestHandler();

                // XXX: setTimeout should be called only with function expressions (23974bc1)
                this._conn._idleTimeout = setTimeout(function () {
                    this._onIdle();
                }.bind(this._conn), 100);
            },

            /** PrivateFunction: _sendRestart
             *
             *  Send an xmpp:restart stanza.
             */
            _sendRestart: function () {
                this._throttledRequestHandler();
                clearTimeout(this._conn._idleTimeout);
            },

            /** PrivateFunction: _throttledRequestHandler
             *  _Private_ function to throttle requests to the connection window.
             *
             *  This function makes sure we don't send requests so fast that the
             *  request ids overflow the connection window in the case that one
             *  request died.
             */
            _throttledRequestHandler: function () {
                if (!this._requests) {
                    Strophe.debug("_throttledRequestHandler called with " +
                        "undefined requests");
                } else {
                    Strophe.debug("_throttledRequestHandler called with " +
                        this._requests.length + " requests");
                }

                if (!this._requests || this._requests.length === 0) {
                    return;
                }

                if (this._requests.length > 0) {
                    this._processRequest(0);
                }

                if (this._requests.length > 1 &&
                    Math.abs(this._requests[0].rid -
                        this._requests[1].rid) < this.window) {
                    this._processRequest(1);
                }
            }
        };
        return Strophe;
    }));

    /*
     This program is distributed under the terms of the MIT license.
     Please see the LICENSE file for details.

     Copyright 2006-2008, OGG, LLC
     */

    /* jshint undef: true, unused: true:, noarg: true, latedef: true */
    /* global define, window, clearTimeout, WebSocket, DOMParser, Strophe, $build */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define('strophe-websocket', ['strophe-core'], function (core) {
                return factory(
                    core.Strophe,
                    core.$build
                );
            });
        } else {
            // Browser globals
            return factory(Strophe, $build);
        }
    }(this, function (Strophe, $build) {

        /** Class: Strophe.WebSocket
         *  _Private_ helper class that handles WebSocket Connections
         *
         *  The Strophe.WebSocket class is used internally by Strophe.Connection
         *  to encapsulate WebSocket sessions. It is not meant to be used from user's code.
         */

        /** File: websocket.js
         *  A JavaScript library to enable XMPP over Websocket in Strophejs.
         *
         *  This file implements XMPP over WebSockets for Strophejs.
         *  If a Connection is established with a Websocket url (ws://...)
         *  Strophe will use WebSockets.
         *  For more information on XMPP-over-WebSocket see RFC 7395:
         *  http://tools.ietf.org/html/rfc7395
         *
         *  WebSocket support implemented by Andreas Guth (andreas.guth@rwth-aachen.de)
         */

        /** PrivateConstructor: Strophe.Websocket
         *  Create and initialize a Strophe.WebSocket object.
         *  Currently only sets the connection Object.
         *
         *  Parameters:
         *    (Strophe.Connection) connection - The Strophe.Connection that will use WebSockets.
         *
         *  Returns:
         *    A new Strophe.WebSocket object.
         */
        Strophe.Websocket = function (connection) {
            this._conn = connection;
            this.strip = "wrapper";

            var service = connection.service;
            if (service.indexOf("ws:") !== 0 && service.indexOf("wss:") !== 0) {
                // If the service is not an absolute URL, assume it is a path and put the absolute
                // URL together from options, current URL and the path.
                var new_service = "";

                if (connection.options.protocol === "ws" && window.location.protocol !== "https:") {
                    new_service += "ws";
                } else {
                    new_service += "wss";
                }

                new_service += "://" + window.location.host;

                if (service.indexOf("/") !== 0) {
                    new_service += window.location.pathname + service;
                } else {
                    new_service += service;
                }

                connection.service = new_service;
            }
        };

        Strophe.Websocket.prototype = {
            /** PrivateFunction: _buildStream
             *  _Private_ helper function to generate the <stream> start tag for WebSockets
             *
             *  Returns:
             *    A Strophe.Builder with a <stream> element.
             */
            _buildStream: function () {
                return $build("open", {
                    "xmlns": Strophe.NS.FRAMING,
                    "to": this._conn.domain,
                    "version": '1.0'
                });
            },

            /** PrivateFunction: _check_streamerror
             * _Private_ checks a message for stream:error
             *
             *  Parameters:
             *    (Strophe.Request) bodyWrap - The received stanza.
             *    connectstatus - The ConnectStatus that will be set on error.
             *  Returns:
             *     true if there was a streamerror, false otherwise.
             */
            _check_streamerror: function (bodyWrap, connectstatus) {
                var errors;
                if (bodyWrap.getElementsByTagNameNS) {
                    errors = bodyWrap.getElementsByTagNameNS(Strophe.NS.STREAM, "error");
                } else {
                    errors = bodyWrap.getElementsByTagName("stream:error");
                }
                if (errors.length === 0) {
                    return false;
                }
                var error = errors[0];

                var condition = "";
                var text = "";

                var ns = "urn:ietf:params:xml:ns:xmpp-streams";
                for (var i = 0; i < error.childNodes.length; i++) {
                    var e = error.childNodes[i];
                    if (e.getAttribute("xmlns") !== ns) {
                        break;
                    }
                    if (e.nodeName === "text") {
                        text = e.textContent;
                    } else {
                        condition = e.nodeName;
                    }
                }

                var errorString = "WebSocket stream error: ";

                if (condition) {
                    errorString += condition;
                } else {
                    errorString += "unknown";
                }

                if (text) {
                    errorString += " - " + condition;
                }

                Strophe.error(errorString);

                // close the connection on stream_error
                this._conn._changeConnectStatus(connectstatus, condition);
                this._conn._doDisconnect();
                return true;
            },

            /** PrivateFunction: _reset
             *  Reset the connection.
             *
             *  This function is called by the reset function of the Strophe Connection.
             *  Is not needed by WebSockets.
             */
            _reset: function () {
                return;
            },

            /** PrivateFunction: _connect
             *  _Private_ function called by Strophe.Connection.connect
             *
             *  Creates a WebSocket for a connection and assigns Callbacks to it.
             *  Does nothing if there already is a WebSocket.
             */
            _connect: function () {
                // Ensure that there is no open WebSocket from a previous Connection.
                this._closeSocket();

                // Create the new WobSocket
                this.socket = new WebSocket(this._conn.service, "xmpp");
                this.socket.onopen = this._onOpen.bind(this);
                this.socket.onerror = this._onError.bind(this);
                this.socket.onclose = this._onClose.bind(this);
                this.socket.onmessage = this._connect_cb_wrapper.bind(this);
            },

            /** PrivateFunction: _connect_cb
             *  _Private_ function called by Strophe.Connection._connect_cb
             *
             * checks for stream:error
             *
             *  Parameters:
             *    (Strophe.Request) bodyWrap - The received stanza.
             */
            _connect_cb: function (bodyWrap) {
                var error = this._check_streamerror(bodyWrap, Strophe.Status.CONNFAIL);
                if (error) {
                    return Strophe.Status.CONNFAIL;
                }
            },

            /** PrivateFunction: _handleStreamStart
             * _Private_ function that checks the opening <open /> tag for errors.
             *
             * Disconnects if there is an error and returns false, true otherwise.
             *
             *  Parameters:
             *    (Node) message - Stanza containing the <open /> tag.
             */
            _handleStreamStart: function (message) {
                var error = false;

                // Check for errors in the <open /> tag
                var ns = message.getAttribute("xmlns");
                if (typeof ns !== "string") {
                    error = "Missing xmlns in <open />";
                } else if (ns !== Strophe.NS.FRAMING) {
                    error = "Wrong xmlns in <open />: " + ns;
                }

                var ver = message.getAttribute("version");
                if (typeof ver !== "string") {
                    error = "Missing version in <open />";
                } else if (ver !== "1.0") {
                    error = "Wrong version in <open />: " + ver;
                }

                if (error) {
                    this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, error);
                    this._conn._doDisconnect();
                    return false;
                }

                return true;
            },

            /** PrivateFunction: _connect_cb_wrapper
             * _Private_ function that handles the first connection messages.
             *
             * On receiving an opening stream tag this callback replaces itself with the real
             * message handler. On receiving a stream error the connection is terminated.
             */
            _connect_cb_wrapper: function (message) {
                if (message.data.indexOf("<open ") === 0 || message.data.indexOf("<?xml") === 0) {

                    // Strip the XML Declaration, if there is one
                    var data = message.data.replace(/^(<\?.*?\?>\s*)*/, "");
                    if (data === '') return;

                    var streamStart = new DOMParser().parseFromString(data, "text/xml").documentElement;
                    this._conn.xmlInput(streamStart);
                    this._conn.rawInput(message.data);

                    //_handleStreamSteart will check for XML errors and disconnect on error
                    if (this._handleStreamStart(streamStart)) {
                        //_connect_cb will check for stream:error and disconnect on error
                        this._connect_cb(streamStart);
                    }
                } else if (message.data.indexOf("<close ") === 0) { //'<close xmlns="urn:ietf:params:xml:ns:xmpp-framing />') {
                    this._conn.rawInput(message.data);
                    this._conn.xmlInput(message);
                    var see_uri = message.getAttribute("see-other-uri");
                    if (see_uri) {
                        this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
                        this._conn.reset();
                        this._conn.service = see_uri;
                        this._connect();
                    } else {
                        this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "Received closing stream");
                        this._conn._doDisconnect();
                    }
                } else {
                    var string = this._streamWrap(message.data);
                    var elem = new DOMParser().parseFromString(string, "text/xml").documentElement;
                    this.socket.onmessage = this._onMessage.bind(this);
                    this._conn._connect_cb(elem, null, message.data);
                }
            },

            /** PrivateFunction: _disconnect
             *  _Private_ function called by Strophe.Connection.disconnect
             *
             *  Disconnects and sends a last stanza if one is given
             *
             *  Parameters:
             *    (Request) pres - This stanza will be sent before disconnecting.
             */
            _disconnect: function (pres) {
                if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
                    if (pres) {
                        this._conn.send(pres);
                    }
                    var close = $build("close", {"xmlns": Strophe.NS.FRAMING});
                    this._conn.xmlOutput(close);
                    var closeString = Strophe.serialize(close);
                    this._conn.rawOutput(closeString);
                    try {
                        this.socket.send(closeString);
                    } catch (e) {
                        Strophe.info("Couldn't send <close /> tag.");
                    }
                }
                this._conn._doDisconnect();
            },

            /** PrivateFunction: _doDisconnect
             *  _Private_ function to disconnect.
             *
             *  Just closes the Socket for WebSockets
             */
            _doDisconnect: function () {
                Strophe.info("WebSockets _doDisconnect was called");
                this._closeSocket();
            },

            /** PrivateFunction _streamWrap
             *  _Private_ helper function to wrap a stanza in a <stream> tag.
             *  This is used so Strophe can process stanzas from WebSockets like BOSH
             */
            _streamWrap: function (stanza) {
                return "<wrapper>" + stanza + '</wrapper>';
            },


            /** PrivateFunction: _closeSocket
             *  _Private_ function to close the WebSocket.
             *
             *  Closes the socket if it is still open and deletes it
             */
            _closeSocket: function () {
                if (this.socket) {
                    try {
                        this.socket.close();
                    } catch (e) {
                    }
                }
                this.socket = null;
            },

            /** PrivateFunction: _emptyQueue
             * _Private_ function to check if the message queue is empty.
             *
             *  Returns:
             *    True, because WebSocket messages are send immediately after queueing.
             */
            _emptyQueue: function () {
                return true;
            },

            /** PrivateFunction: _onClose
             * _Private_ function to handle websockets closing.
             *
             * Nothing to do here for WebSockets
             */
            _onClose: function () {
                if (this._conn.connected && !this._conn.disconnecting) {
                    Strophe.error("Websocket closed unexpectedly");
                    this._conn._doDisconnect();
                } else {
                    Strophe.info("Websocket closed");
                }
            },

            /** PrivateFunction: _no_auth_received
             *
             * Called on stream start/restart when no stream:features
             * has been received.
             */
            _no_auth_received: function (_callback) {
                Strophe.error("Server did not send any auth methods");
                this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "Server did not send any auth methods");
                if (_callback) {
                    _callback = _callback.bind(this._conn);
                    _callback();
                }
                this._conn._doDisconnect();
            },

            /** PrivateFunction: _onDisconnectTimeout
             *  _Private_ timeout handler for handling non-graceful disconnection.
             *
             *  This does nothing for WebSockets
             */
            _onDisconnectTimeout: function () {
            },

            /** PrivateFunction: _abortAllRequests
             *  _Private_ helper function that makes sure all pending requests are aborted.
             */
            _abortAllRequests: function () {
            },

            /** PrivateFunction: _onError
             * _Private_ function to handle websockets errors.
             *
             * Parameters:
             * (Object) error - The websocket error.
             */
            _onError: function (error) {
                Strophe.error("Websocket error " + error);
                this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "The WebSocket connection could not be established or was disconnected.");
                this._disconnect();
            },

            /** PrivateFunction: _onIdle
             *  _Private_ function called by Strophe.Connection._onIdle
             *
             *  sends all queued stanzas
             */
            _onIdle: function () {
                var data = this._conn._data;
                if (data.length > 0 && !this._conn.paused) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] !== null) {
                            var stanza, rawStanza;
                            if (data[i] === "restart") {
                                stanza = this._buildStream().tree();
                            } else {
                                stanza = data[i];
                            }
                            rawStanza = Strophe.serialize(stanza);
                            this._conn.xmlOutput(stanza);
                            this._conn.rawOutput(rawStanza);
                            this.socket.send(rawStanza);
                        }
                    }
                    this._conn._data = [];
                }
            },

            /** PrivateFunction: _onMessage
             * _Private_ function to handle websockets messages.
             *
             * This function parses each of the messages as if they are full documents.
             * [TODO : We may actually want to use a SAX Push parser].
             *
             * Since all XMPP traffic starts with
             *  <stream:stream version='1.0'
             *                 xml:lang='en'
             *                 xmlns='jabber:client'
             *                 xmlns:stream='http://etherx.jabber.org/streams'
             *                 id='3697395463'
             *                 from='SERVER'>
             *
             * The first stanza will always fail to be parsed.
             *
             * Additionally, the seconds stanza will always be <stream:features> with
             * the stream NS defined in the previous stanza, so we need to 'force'
             * the inclusion of the NS in this stanza.
             *
             * Parameters:
             * (string) message - The websocket message.
             */
            _onMessage: function (message) {
                WebIM && WebIM.config.isDebug && Strophe.info(WebIM.utils.ts() + 'recv:', message.data);

                var elem, data;
                // check for closing stream
                var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
                if (message.data === close) {
                    this._conn.rawInput(close);
                    this._conn.xmlInput(message);
                    if (!this._conn.disconnecting) {
                        this._conn._doDisconnect();
                    }
                    return;
                } else if (message.data.search("<open ") === 0) {
                    // This handles stream restarts
                    elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
                    if (!this._handleStreamStart(elem)) {
                        return;
                    }
                } else {
                    data = this._streamWrap(message.data);
                    elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
                }

                if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
                    return;
                }

                //handle unavailable presence stanza before disconnecting
                if (this._conn.disconnecting &&
                    elem.firstChild.nodeName === "presence" &&
                    elem.firstChild.getAttribute("type") === "unavailable") {
                    this._conn.xmlInput(elem);
                    this._conn.rawInput(Strophe.serialize(elem));
                    // if we are already disconnecting we will ignore the unavailable stanza and
                    // wait for the </stream:stream> tag before we close the connection
                    return;
                }
                this._conn._dataRecv(elem, message.data);
            },

            /** PrivateFunction: _onOpen
             * _Private_ function to handle websockets connection setup.
             *
             * The opening stream tag is sent here.
             */
            _onOpen: function () {
                Strophe.info("Websocket open");
                var start = this._buildStream();
                this._conn.xmlOutput(start.tree());

                var startString = Strophe.serialize(start);
                this._conn.rawOutput(startString);
                this.socket.send(startString);
            },

            /** PrivateFunction: _reqToData
             * _Private_ function to get a stanza out of a request.
             *
             * WebSockets don't use requests, so the passed argument is just returned.
             *
             *  Parameters:
             *    (Object) stanza - The stanza.
             *
             *  Returns:
             *    The stanza that was passed.
             */
            _reqToData: function (stanza) {
                return stanza;
            },

            /** PrivateFunction: _send
             *  _Private_ part of the Connection.send function for WebSocket
             *
             * Just flushes the messages that are in the queue
             */
            _send: function () {
                this._conn.flush();
            },

            /** PrivateFunction: _sendRestart
             *
             *  Send an xmpp:restart stanza.
             */
            _sendRestart: function () {
                clearTimeout(this._conn._idleTimeout);
                this._conn._onIdle.bind(this._conn)();
            }
        };
        return Strophe;
    }));

    (function (root) {
        if (typeof define === 'function' && define.amd) {
            define("strophe", [
                "strophe-core",
                "strophe-bosh",
                "strophe-websocket"
            ], function (wrapper) {
                return wrapper;
            });
        }
    })(this);

    /* jshint ignore:start */
    if (callback) {
        if (typeof define === 'function' && define.amd) {
            //For backwards compatability
            var n_callback = callback;
            if (typeof requirejs === 'function') {
                requirejs(["strophe"], function (o) {
                    n_callback(o.Strophe, o.$build, o.$msg, o.$iq, o.$pres);
                });
            } else {
                require(["strophe"], function (o) {
                    n_callback(o.Strophe, o.$build, o.$msg, o.$iq, o.$pres);
                });
            }
        } else {
            return callback(Strophe, $build, $msg, $iq, $pres);
        }
    }


})(function (Strophe, build, msg, iq, pres) {
    window.Strophe = Strophe;
    window.$build = build;
    window.$msg = msg;
    window.$iq = iq;
    window.$pres = pres;
});
/* jshint ignore:end */

/*****************************************************
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(224);


/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	;
	(function () {

	    var EMPTYFN = function EMPTYFN() {};
	    var _code = __webpack_require__(218).code;
	    var WEBIM_FILESIZE_LIMIT = 10485760;

	    var _createStandardXHR = function _createStandardXHR() {
	        try {
	            return new window.XMLHttpRequest();
	        } catch (e) {
	            return false;
	        }
	    };

	    var _createActiveXHR = function _createActiveXHR() {
	        try {
	            return new window.ActiveXObject('Microsoft.XMLHTTP');
	        } catch (e) {
	            return false;
	        }
	    };

	    var _xmlrequest = function _xmlrequest(crossDomain) {
	        crossDomain = crossDomain || true;
	        var temp = _createStandardXHR() || _createActiveXHR();

	        if ('withCredentials' in temp) {
	            return temp;
	        }
	        if (!crossDomain) {
	            return temp;
	        }
	        if (typeof window.XDomainRequest === 'undefined') {
	            return temp;
	        }
	        var xhr = new XDomainRequest();
	        xhr.readyState = 0;
	        xhr.status = 100;
	        xhr.onreadystatechange = EMPTYFN;
	        xhr.onload = function () {
	            xhr.readyState = 4;
	            xhr.status = 200;

	            var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
	            xmlDoc.async = 'false';
	            xmlDoc.loadXML(xhr.responseText);
	            xhr.responseXML = xmlDoc;
	            xhr.response = xhr.responseText;
	            xhr.onreadystatechange();
	        };
	        xhr.ontimeout = xhr.onerror = function () {
	            xhr.readyState = 4;
	            xhr.status = 500;
	            xhr.onreadystatechange();
	        };
	        return xhr;
	    };

	    var _hasFlash = function () {
	        if ('ActiveXObject' in window) {
	            try {
	                return new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	            } catch (ex) {
	                return 0;
	            }
	        } else {
	            if (navigator.plugins && navigator.plugins.length > 0) {
	                return navigator.plugins['Shockwave Flash'];
	            }
	        }
	        return 0;
	    }();

	    var _base64 = function _base64() {

	        var self = this;

	        // private property
	        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	        // public method for encoding
	        this.encode = function (input) {
	            var output = "";
	            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	            var i = 0;
	            input = self._utf8_encode(input);
	            while (i < input.length) {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);
	                enc1 = chr1 >> 2;
	                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	                enc4 = chr3 & 63;
	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }
	                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	            }
	            return output;
	        };

	        // public method for decoding
	        this.decode = function (input) {
	            var output = "";
	            var chr1, chr2, chr3;
	            var enc1, enc2, enc3, enc4;
	            var i = 0;
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	            while (i < input.length) {
	                enc1 = _keyStr.indexOf(input.charAt(i++));
	                enc2 = _keyStr.indexOf(input.charAt(i++));
	                enc3 = _keyStr.indexOf(input.charAt(i++));
	                enc4 = _keyStr.indexOf(input.charAt(i++));
	                chr1 = enc1 << 2 | enc2 >> 4;
	                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
	                chr3 = (enc3 & 3) << 6 | enc4;
	                output = output + String.fromCharCode(chr1);
	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }
	            }
	            output = self._utf8_decode(output);
	            return output;
	        };

	        // private method for UTF-8 encoding
	        this._utf8_encode = function (string) {
	            string = string.replace(/\r\n/g, "\n");
	            var utftext = "";
	            for (var n = 0; n < string.length; n++) {
	                var c = string.charCodeAt(n);
	                if (c < 128) {
	                    utftext += String.fromCharCode(c);
	                } else if (c > 127 && c < 2048) {
	                    utftext += String.fromCharCode(c >> 6 | 192);
	                    utftext += String.fromCharCode(c & 63 | 128);
	                } else {
	                    utftext += String.fromCharCode(c >> 12 | 224);
	                    utftext += String.fromCharCode(c >> 6 & 63 | 128);
	                    utftext += String.fromCharCode(c & 63 | 128);
	                }
	            }
	            return utftext;
	        };

	        // private method for UTF-8 decoding
	        this._utf8_decode = function (utftext) {
	            var string = "";
	            var i = 0;
	            var c = 0;
	            var c1 = 0;
	            var c2 = 0;
	            var c3 = 0;
	            while (i < utftext.length) {
	                c = utftext.charCodeAt(i);
	                if (c < 128) {
	                    string += String.fromCharCode(c);
	                    i++;
	                } else if (c > 191 && c < 224) {
	                    c2 = utftext.charCodeAt(i + 1);
	                    string += String.fromCharCode((c & 31) << 6 | c2 & 63);
	                    i += 2;
	                } else {
	                    c2 = utftext.charCodeAt(i + 1);
	                    c3 = utftext.charCodeAt(i + 2);
	                    string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
	                    i += 3;
	                }
	            }
	            return string;
	        };
	    };

	    var _tmpUtilXHR = _xmlrequest(),
	        _hasFormData = typeof FormData !== 'undefined',
	        _hasBlob = typeof Blob !== 'undefined',
	        _isCanSetRequestHeader = _tmpUtilXHR.setRequestHeader || false,
	        _hasOverrideMimeType = _tmpUtilXHR.overrideMimeType || false,
	        _isCanUploadFileAsync = _isCanSetRequestHeader && _hasFormData,
	        _isCanUploadFile = _isCanUploadFileAsync || _hasFlash,
	        _isCanDownLoadFile = _isCanSetRequestHeader && (_hasBlob || _hasOverrideMimeType);

	    if (!Object.keys) {
	        Object.keys = function () {
	            'use strict';

	            var hasOwnProperty = Object.prototype.hasOwnProperty,
	                hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
	                dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
	                dontEnumsLength = dontEnums.length;

	            return function (obj) {
	                if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
	                    throw new TypeError('Object.keys called on non-object');
	                }

	                var result = [],
	                    prop,
	                    i;

	                for (prop in obj) {
	                    if (hasOwnProperty.call(obj, prop)) {
	                        result.push(prop);
	                    }
	                }

	                if (hasDontEnumBug) {
	                    for (i = 0; i < dontEnumsLength; i++) {
	                        if (hasOwnProperty.call(obj, dontEnums[i])) {
	                            result.push(dontEnums[i]);
	                        }
	                    }
	                }
	                return result;
	            };
	        }();
	    }

	    var utils = {
	        hasFormData: _hasFormData,

	        hasBlob: _hasBlob,

	        emptyfn: EMPTYFN,

	        isCanSetRequestHeader: _isCanSetRequestHeader,

	        hasOverrideMimeType: _hasOverrideMimeType,

	        isCanUploadFileAsync: _isCanUploadFileAsync,

	        isCanUploadFile: _isCanUploadFile,

	        isCanDownLoadFile: _isCanDownLoadFile,

	        isSupportWss: function () {
	            var notSupportList = [
	            //1: QQ browser X5 core
	            /MQQBrowser[\/]5([.]\d+)?\sTBS/

	            //2: etc.
	            //...
	            ];

	            if (!window.WebSocket) {
	                return false;
	            }

	            var ua = window.navigator.userAgent;
	            for (var i = 0, l = notSupportList.length; i < l; i++) {
	                if (notSupportList[i].test(ua)) {
	                    return false;
	                }
	            }
	            return true;
	        }(),

	        getIEVersion: function () {
	            var ua = navigator.userAgent,
	                matches,
	                tridentMap = { '4': 8, '5': 9, '6': 10, '7': 11 };

	            matches = ua.match(/MSIE (\d+)/i);

	            if (matches && matches[1]) {
	                return +matches[1];
	            }
	            matches = ua.match(/Trident\/(\d+)/i);
	            if (matches && matches[1]) {
	                return tridentMap[matches[1]] || null;
	            }
	            return null;
	        }(),

	        stringify: function stringify(json) {
	            if (typeof JSON !== 'undefined' && JSON.stringify) {
	                return JSON.stringify(json);
	            } else {
	                var s = '',
	                    arr = [];

	                var iterate = function iterate(json) {
	                    var isArr = false;

	                    if (Object.prototype.toString.call(json) === '[object Array]') {
	                        arr.push(']', '[');
	                        isArr = true;
	                    } else if (Object.prototype.toString.call(json) === '[object Object]') {
	                        arr.push('}', '{');
	                    }

	                    for (var o in json) {
	                        if (Object.prototype.toString.call(json[o]) === '[object Null]') {
	                            json[o] = 'null';
	                        } else if (Object.prototype.toString.call(json[o]) === '[object Undefined]') {
	                            json[o] = 'undefined';
	                        }

	                        if (json[o] && _typeof(json[o]) === 'object') {
	                            s += ',' + (isArr ? '' : '"' + o + '":' + (isArr ? '"' : '')) + iterate(json[o]) + '';
	                        } else {
	                            s += ',"' + (isArr ? '' : o + '":"') + json[o] + '"';
	                        }
	                    }

	                    if (s != '') {
	                        s = s.slice(1);
	                    }

	                    return arr.pop() + s + arr.pop();
	                };
	                return iterate(json);
	            }
	        },
	        login: function login(options) {
	            var options = options || {};
	            var suc = options.success || EMPTYFN;
	            var err = options.error || EMPTYFN;

	            var appKey = options.appKey || '';
	            var devInfos = appKey.split('#');
	            if (devInfos.length !== 2) {
	                err({
	                    type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	                });
	                return false;
	            }

	            var orgName = devInfos[0];
	            var appName = devInfos[1];
	            var https = https || options.https;
	            var user = options.user || '';
	            var pwd = options.pwd || '';

	            var apiUrl = options.apiUrl;

	            var loginJson = {
	                grant_type: 'password',
	                username: user,
	                password: pwd,
	                timestamp: +new Date()
	            };
	            var loginfo = utils.stringify(loginJson);

	            var options = {
	                url: apiUrl + '/' + orgName + '/' + appName + '/token',
	                dataType: 'json',
	                data: loginfo,
	                success: suc,
	                error: err
	            };
	            return utils.ajax(options);
	        },

	        getFileUrl: function getFileUrl(fileInputId) {
	            var uri = {
	                url: '',
	                filename: '',
	                filetype: '',
	                data: ''
	            };

	            var fileObj = typeof fileInputId === 'string' ? document.getElementById(fileInputId) : fileInputId;

	            if (!utils.isCanUploadFileAsync || !fileObj) {
	                return uri;
	            }
	            try {
	                if (window.URL.createObjectURL) {
	                    var fileItems = fileObj.files;
	                    if (fileItems.length > 0) {
	                        var u = fileItems.item(0);
	                        uri.data = u;
	                        uri.url = window.URL.createObjectURL(u);
	                        uri.filename = u.name || '';
	                    }
	                } else {
	                    // IE
	                    var u = document.getElementById(fileInputId).value;
	                    uri.url = u;
	                    var pos1 = u.lastIndexOf('/');
	                    var pos2 = u.lastIndexOf('\\');
	                    var pos = Math.max(pos1, pos2);
	                    if (pos < 0) uri.filename = u;else uri.filename = u.substring(pos + 1);
	                }
	                var index = uri.filename.lastIndexOf('.');
	                if (index != -1) {
	                    uri.filetype = uri.filename.substring(index + 1).toLowerCase();
	                }
	                return uri;
	            } catch (e) {
	                throw e;
	            }
	        },

	        getFileSize: function getFileSize(file) {
	            var fileSize = 0;
	            if (file) {
	                if (file.files) {
	                    if (file.files.length > 0) {
	                        fileSize = file.files[0].size;
	                    }
	                } else if (file.select && 'ActiveXObject' in window) {
	                    file.select();
	                    var fileobject = new ActiveXObject('Scripting.FileSystemObject');
	                    var file = fileobject.GetFile(file.value);
	                    fileSize = file.Size;
	                }
	            }
	            console.log('fileSize: ', fileSize);
	            if (fileSize > 10000000) {
	                return false;
	            }
	            var kb = Math.round(fileSize / 1000);
	            if (kb < 1000) {
	                fileSize = kb + ' KB';
	            } else if (kb >= 1000) {
	                var mb = kb / 1000;
	                if (mb < 1000) {
	                    fileSize = mb.toFixed(1) + ' MB';
	                } else {
	                    var gb = mb / 1000;
	                    fileSize = gb.toFixed(1) + ' GB';
	                }
	            }
	            return fileSize;
	        },

	        hasFlash: _hasFlash,

	        trim: function trim(str) {

	            str = typeof str === 'string' ? str : '';

	            return str.trim ? str.trim() : str.replace(/^\s|\s$/g, '');
	        },

	        parseEmoji: function parseEmoji(msg) {
	            if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
	                return msg;
	            } else {
	                var emoji = WebIM.Emoji,
	                    reg = null;

	                for (var face in emoji.map) {
	                    if (emoji.map.hasOwnProperty(face)) {
	                        while (msg.indexOf(face) > -1) {
	                            msg = msg.replace(face, '<img class="emoji" src="' + emoji.path + emoji.map[face] + '" />');
	                        }
	                    }
	                }
	                return msg;
	            }
	        },

	        parseLink: function parseLink(msg) {

	            var reg = /(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;

	            msg = msg.replace(reg, function (v) {

	                var prefix = /^https?/gm.test(v);

	                return "<a href='" + (prefix ? v : '//' + v) + "' target='_blank'>" + v + "</a>";
	            });

	            return msg;
	        },

	        parseJSON: function parseJSON(data) {

	            if (window.JSON && window.JSON.parse) {
	                return window.JSON.parse(data + '');
	            }

	            var requireNonComma,
	                depth = null,
	                str = utils.trim(data + '');

	            return str && !utils.trim(str.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, function (token, comma, open, close) {

	                if (requireNonComma && comma) {
	                    depth = 0;
	                }

	                if (depth === 0) {
	                    return token;
	                }

	                requireNonComma = open || comma;
	                depth += !close - !open;
	                return '';
	            })) ? Function('return ' + str)() : Function('Invalid JSON: ' + data)();
	        },

	        parseUploadResponse: function parseUploadResponse(response) {
	            return response.indexOf('callback') > -1 ? //lte ie9
	            response.slice(9, -1) : response;
	        },

	        parseDownloadResponse: function parseDownloadResponse(response) {
	            return response && response.type && response.type === 'application/json' || 0 > Object.prototype.toString.call(response).indexOf('Blob') ? this.url + '?token=' : window.URL.createObjectURL(response);
	        },

	        uploadFile: function uploadFile(options) {
	            var options = options || {};
	            options.onFileUploadProgress = options.onFileUploadProgress || EMPTYFN;
	            options.onFileUploadComplete = options.onFileUploadComplete || EMPTYFN;
	            options.onFileUploadError = options.onFileUploadError || EMPTYFN;
	            options.onFileUploadCanceled = options.onFileUploadCanceled || EMPTYFN;

	            var acc = options.accessToken || this.context.accessToken;
	            if (!acc) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_NO_LOGIN,
	                    id: options.id
	                });
	                return;
	            }

	            var orgName, appName, devInfos;
	            var appKey = options.appKey || this.context.appKey || '';

	            if (appKey) {
	                devInfos = appKey.split('#');
	                orgName = devInfos[0];
	                appName = devInfos[1];
	            }

	            if (!orgName && !appName) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id
	                });
	                return;
	            }

	            var apiUrl = options.apiUrl;
	            var uploadUrl = apiUrl + '/' + orgName + '/' + appName + '/chatfiles';

	            if (!utils.isCanUploadFileAsync) {
	                if (utils.hasFlash && typeof options.flashUpload === 'function') {
	                    options.flashUpload && options.flashUpload(uploadUrl, options);
	                } else {
	                    options.onFileUploadError({
	                        type: _code.WEBIM_UPLOADFILE_BROWSER_ERROR,
	                        id: options.id
	                    });
	                }
	                return;
	            }

	            var fileSize = options.file.data ? options.file.data.size : undefined;
	            if (fileSize > WEBIM_FILESIZE_LIMIT) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id
	                });
	                return;
	            } else if (fileSize <= 0) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id
	                });
	                return;
	            }

	            var xhr = utils.xmlrequest();
	            var onError = function onError(e) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id,
	                    xhr: xhr
	                });
	            };
	            if (xhr.upload) {
	                xhr.upload.addEventListener('progress', options.onFileUploadProgress, false);
	            }
	            if (xhr.addEventListener) {
	                xhr.addEventListener('abort', options.onFileUploadCanceled, false);
	                xhr.addEventListener('load', function (e) {
	                    try {
	                        var json = utils.parseJSON(xhr.responseText);
	                        try {
	                            options.onFileUploadComplete(json);
	                        } catch (e) {
	                            options.onFileUploadError({
	                                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	                                data: e
	                            });
	                        }
	                    } catch (e) {
	                        options.onFileUploadError({
	                            type: _code.WEBIM_UPLOADFILE_ERROR,
	                            data: xhr.responseText,
	                            id: options.id,
	                            xhr: xhr
	                        });
	                    }
	                }, false);
	                xhr.addEventListener('error', onError, false);
	            } else if (xhr.onreadystatechange) {
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState === 4) {
	                        if (ajax.status === 200) {
	                            try {
	                                var json = utils.parseJSON(xhr.responseText);
	                                options.onFileUploadComplete(json);
	                            } catch (e) {
	                                options.onFileUploadError({
	                                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                                    data: xhr.responseText,
	                                    id: options.id,
	                                    xhr: xhr
	                                });
	                            }
	                        } else {
	                            options.onFileUploadError({
	                                type: _code.WEBIM_UPLOADFILE_ERROR,
	                                data: xhr.responseText,
	                                id: options.id,
	                                xhr: xhr
	                            });
	                        }
	                    } else {
	                        xhr.abort();
	                        options.onFileUploadCanceled();
	                    }
	                };
	            }

	            xhr.open('POST', uploadUrl);

	            xhr.setRequestHeader('restrict-access', 'true');
	            xhr.setRequestHeader('Accept', '*/*'); // Android QQ browser has some problem with this attribute.
	            xhr.setRequestHeader('Authorization', 'Bearer ' + acc);

	            var formData = new FormData();
	            formData.append('file', options.file.data);
	            xhr.send(formData);
	        },

	        download: function download(options) {
	            options.onFileDownloadComplete = options.onFileDownloadComplete || EMPTYFN;
	            options.onFileDownloadError = options.onFileDownloadError || EMPTYFN;

	            var accessToken = options.accessToken || this.context.accessToken;
	            if (!accessToken) {
	                options.onFileDownloadError({
	                    type: _code.WEBIM_DOWNLOADFILE_NO_LOGIN,
	                    id: options.id
	                });
	                return;
	            }

	            var onError = function onError(e) {
	                options.onFileDownloadError({
	                    type: _code.WEBIM_DOWNLOADFILE_ERROR,
	                    id: options.id,
	                    xhr: xhr
	                });
	            };

	            if (!utils.isCanDownLoadFile) {
	                options.onFileDownloadComplete();
	                return;
	            }
	            var xhr = utils.xmlrequest();
	            if ('addEventListener' in xhr) {
	                xhr.addEventListener('load', function (e) {
	                    options.onFileDownloadComplete(xhr.response, xhr);
	                }, false);
	                xhr.addEventListener('error', onError, false);
	            } else if ('onreadystatechange' in xhr) {
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState === 4) {
	                        if (ajax.status === 200) {
	                            options.onFileDownloadComplete(xhr.response, xhr);
	                        } else {
	                            options.onFileDownloadError({
	                                type: _code.WEBIM_DOWNLOADFILE_ERROR,
	                                id: options.id,
	                                xhr: xhr
	                            });
	                        }
	                    } else {
	                        xhr.abort();
	                        options.onFileDownloadError({
	                            type: _code.WEBIM_DOWNLOADFILE_ERROR,
	                            id: options.id,
	                            xhr: xhr
	                        });
	                    }
	                };
	            }

	            var method = options.method || 'GET';
	            var resType = options.responseType || 'blob';
	            var mimeType = options.mimeType || 'text/plain; charset=x-user-defined';
	            xhr.open(method, options.url);
	            if (typeof Blob !== 'undefined') {
	                xhr.responseType = resType;
	            } else {
	                xhr.overrideMimeType(mimeType);
	            }

	            var innerHeaer = {
	                'X-Requested-With': 'XMLHttpRequest',
	                'Accept': 'application/octet-stream',
	                'share-secret': options.secret,
	                'Authorization': 'Bearer ' + accessToken
	            };
	            var headers = options.headers || {};
	            for (var key in headers) {
	                innerHeaer[key] = headers[key];
	            }
	            for (var key in innerHeaer) {
	                if (innerHeaer[key]) {
	                    xhr.setRequestHeader(key, innerHeaer[key]);
	                }
	            }
	            xhr.send(null);
	        },

	        parseTextMessage: function parseTextMessage(message, faces) {
	            if (typeof message !== 'string') {
	                return;
	            }

	            if (Object.prototype.toString.call(faces) !== '[object Object]') {
	                return {
	                    isemoji: false,
	                    body: [{
	                        type: 'txt',
	                        data: message
	                    }]
	                };
	            }

	            var receiveMsg = message;
	            var emessage = [];
	            var expr = /\[[^[\]]{2,3}\]/mg;
	            var emoji = receiveMsg.match(expr);

	            if (!emoji || emoji.length < 1) {
	                return {
	                    isemoji: false,
	                    body: [{
	                        type: 'txt',
	                        data: message
	                    }]
	                };
	            }
	            var isemoji = false;
	            for (var i = 0; i < emoji.length; i++) {
	                var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
	                    existEmoji = WebIM.Emoji.map[emoji[i]];

	                if (tmsg) {
	                    emessage.push({
	                        type: 'txt',
	                        data: tmsg
	                    });
	                }
	                if (!existEmoji) {
	                    emessage.push({
	                        type: 'txt',
	                        data: emoji[i]
	                    });
	                    continue;
	                }
	                var emojiStr = WebIM.Emoji.map ? WebIM.Emoji.path + existEmoji : null;

	                if (emojiStr) {
	                    isemoji = true;
	                    emessage.push({
	                        type: 'emoji',
	                        data: emojiStr
	                    });
	                } else {
	                    emessage.push({
	                        type: 'txt',
	                        data: emoji[i]
	                    });
	                }
	                var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
	                receiveMsg = receiveMsg.substring(restMsgIndex);
	            }
	            if (receiveMsg) {
	                emessage.push({
	                    type: 'txt',
	                    data: receiveMsg
	                });
	            }
	            if (isemoji) {
	                return {
	                    isemoji: isemoji,
	                    body: emessage
	                };
	            }
	            return {
	                isemoji: false,
	                body: [{
	                    type: 'txt',
	                    data: message
	                }]
	            };
	        },

	        xmlrequest: _xmlrequest,

	        getXmlFirstChild: function getXmlFirstChild(data, tagName) {
	            var children = data.getElementsByTagName(tagName);
	            if (children.length == 0) {
	                return null;
	            } else {
	                return children[0];
	            }
	        },
	        ajax: function ajax(options) {
	            var dataType = options.dataType || 'text';
	            var suc = options.success || EMPTYFN;
	            var error = options.error || EMPTYFN;
	            var xhr = utils.xmlrequest();

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4) {
	                    var status = xhr.status || 0;
	                    if (status === 200) {
	                        try {
	                            switch (dataType) {
	                                case 'text':
	                                    suc(xhr.responseText);
	                                    return;
	                                case 'json':
	                                    var json = utils.parseJSON(xhr.responseText);
	                                    suc(json, xhr);
	                                    return;
	                                case 'xml':
	                                    if (xhr.responseXML && xhr.responseXML.documentElement) {
	                                        suc(xhr.responseXML.documentElement, xhr);
	                                    } else {
	                                        error({
	                                            type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                                            data: xhr.responseText
	                                        });
	                                    }
	                                    return;
	                            }
	                            suc(xhr.response || xhr.responseText, xhr);
	                        } catch (e) {
	                            error({
	                                type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                                data: e
	                            });
	                        }
	                        return;
	                    } else {
	                        error({
	                            type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                            data: xhr.responseText
	                        });
	                        return;
	                    }
	                }
	                if (xhr.readyState === 0) {
	                    error({
	                        type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                        data: xhr.responseText
	                    });
	                }
	            };

	            if (options.responseType) {
	                if (xhr.responseType) {
	                    xhr.responseType = options.responseType;
	                }
	            }
	            if (options.mimeType) {
	                if (utils.hasOverrideMimeType) {
	                    xhr.overrideMimeType(options.mimeType);
	                }
	            }

	            var type = options.type || 'POST',
	                data = options.data || null,
	                tempData = '';

	            if (type.toLowerCase() === 'get' && data) {
	                for (var o in data) {
	                    if (data.hasOwnProperty(o)) {
	                        tempData += o + '=' + data[o] + '&';
	                    }
	                }
	                tempData = tempData ? tempData.slice(0, -1) : tempData;
	                options.url += (options.url.indexOf('?') > 0 ? '&' : '?') + (tempData ? tempData + '&' : tempData) + '_v=' + new Date().getTime();
	                data = null;
	                tempData = null;
	            }
	            xhr.open(type, options.url);

	            if (utils.isCanSetRequestHeader) {
	                var headers = options.headers || {};
	                for (var key in headers) {
	                    if (headers.hasOwnProperty(key)) {
	                        xhr.setRequestHeader(key, headers[key]);
	                    }
	                }
	            }

	            xhr.send(data);
	            return xhr;
	        },
	        ts: function ts() {
	            var d = new Date();
	            var Hours = d.getHours(); //获取当前小时数(0-23)
	            var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
	            var Seconds = d.getSeconds(); //获取当前秒数(0-59)
	            var Milliseconds = d.getMilliseconds(); //获取当前毫秒
	            return (Hours < 10 ? "0" + Hours : Hours) + ':' + (Minutes < 10 ? "0" + Minutes : Minutes) + ':' + (Seconds < 10 ? "0" + Seconds : Seconds) + ':' + Milliseconds + ' ';
	        },

	        getObjectKey: function getObjectKey(obj, val) {
	            for (var key in obj) {
	                if (obj[key] == val) {
	                    return key;
	                }
	            }
	            return '';
	        },

	        sprintf: function sprintf() {
	            var arg = arguments,
	                str = arg[0] || '',
	                i,
	                len;
	            for (i = 1, len = arg.length; i < len; i++) {
	                str = str.replace(/%s/, arg[i]);
	            }
	            return str;
	        },

	        encrypt: function encrypt(str) {
	            var base64 = new _base64();
	            var encrypt = base64.encode(str);
	            return encrypt;
	        },

	        decrypt: function decrypt(str) {
	            var base64 = new _base64();
	            var decrypt = base64.decode(str);
	            decrypt = escape(decrypt);
	            decrypt = decrypt.replace(/%00/g, '');
	            decrypt = unescape(decrypt);
	            return decrypt;
	        },

	        setCookie: function setCookie(name, value, days) {
	            var cookie = name + '=' + encodeURIComponent(value);
	            if (typeof days == 'number') {
	                cookie += '; max-age: ' + days * 60 * 60 * 24;
	            }
	            document.cookie = cookie;
	        },

	        getCookie: function getCookie() {
	            var allCookie = {};
	            var all = document.cookie;
	            if (all === "") {
	                return allCookie;
	            }
	            var list = all.split("; ");
	            for (var i = 0; i < list.length; i++) {
	                var cookie = list[i];
	                var p = cookie.indexOf('=');
	                var name = cookie.substring(0, p);
	                var value = cookie.substring(p + 1);
	                value = decodeURIComponent(value);
	                allCookie[name] = value;
	            }
	            return allCookie;
	        }
	    };

	    exports.utils = utils;
	})();

/***/ },

/***/ 218:
/***/ function(module, exports) {

	"use strict";

	;
	(function () {

	    exports.code = {
	        WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: 0,
	        WEBIM_CONNCTION_OPEN_ERROR: 1,
	        WEBIM_CONNCTION_AUTH_ERROR: 2,
	        WEBIM_CONNCTION_OPEN_USERGRID_ERROR: 3,
	        WEBIM_CONNCTION_ATTACH_ERROR: 4,
	        WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: 5,
	        WEBIM_CONNCTION_REOPEN_ERROR: 6,
	        WEBIM_CONNCTION_SERVER_CLOSE_ERROR: 7, //7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
	        WEBIM_CONNCTION_SERVER_ERROR: 8, //8: offline by multi login
	        WEBIM_CONNCTION_IQ_ERROR: 9,

	        WEBIM_CONNCTION_PING_ERROR: 10,
	        WEBIM_CONNCTION_NOTIFYVERSION_ERROR: 11,
	        WEBIM_CONNCTION_GETROSTER_ERROR: 12,
	        WEBIM_CONNCTION_CROSSDOMAIN_ERROR: 13,
	        WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: 14,
	        WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: 15,
	        WEBIM_CONNCTION_DISCONNECTED: 16, //16: server-side close the websocket connection
	        WEBIM_CONNCTION_AJAX_ERROR: 17,
	        WEBIM_CONNCTION_JOINROOM_ERROR: 18,
	        WEBIM_CONNCTION_GETROOM_ERROR: 19,

	        WEBIM_CONNCTION_GETROOMINFO_ERROR: 20,
	        WEBIM_CONNCTION_GETROOMMEMBER_ERROR: 21,
	        WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: 22,
	        WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: 23,
	        WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: 24,
	        WEBIM_CONNCTION_JOINCHATROOM_ERROR: 25,
	        WEBIM_CONNCTION_QUITCHATROOM_ERROR: 26,
	        WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: 27,
	        WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: 28,
	        WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: 29,

	        WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: 30,
	        WEBIM_CONNCTION_CALLBACK_INNER_ERROR: 31, //31: 处理下行消息出错 try/catch抛出异常
	        WEBIM_CONNCTION_CLIENT_OFFLINE: 32, //32: client offline
	        WEBIM_CONNCTION_CLIENT_LOGOUT: 33, //33: client logout
	        WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR: 34, // 34: Over amount of the tabs a user opened in the same browser
	        WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP: 35,
	        WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP: 36,
	        WEBIM_CONNECTION_ACCEPT_JOIN_GROUP: 37,
	        WEBIM_CONNECTION_DECLINE_JOIN_GROUP: 38,
	        WEBIM_CONNECTION_CLOSED: 39,

	        WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
	        WEBIM_UPLOADFILE_ERROR: 101,
	        WEBIM_UPLOADFILE_NO_LOGIN: 102,
	        WEBIM_UPLOADFILE_NO_FILE: 103,

	        WEBIM_DOWNLOADFILE_ERROR: 200,
	        WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
	        WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,

	        WEBIM_MESSAGE_REC_TEXT: 300,
	        WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
	        WEBIM_MESSAGE_REC_EMOTION: 302,
	        WEBIM_MESSAGE_REC_PHOTO: 303,
	        WEBIM_MESSAGE_REC_AUDIO: 304,
	        WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
	        WEBIM_MESSAGE_REC_VEDIO: 306,
	        WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
	        WEBIM_MESSAGE_REC_FILE: 308,
	        WEBIM_MESSAGE_SED_TEXT: 309,
	        WEBIM_MESSAGE_SED_EMOTION: 310,
	        WEBIM_MESSAGE_SED_PHOTO: 311,
	        WEBIM_MESSAGE_SED_AUDIO: 312,
	        WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
	        WEBIM_MESSAGE_SED_VEDIO: 314,
	        WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
	        WEBIM_MESSAGE_SED_FILE: 316,
	        WEBIM_MESSAGE_SED_ERROR: 317,

	        STATUS_INIT: 400,
	        STATUS_DOLOGIN_USERGRID: 401,
	        STATUS_DOLOGIN_IM: 402,
	        STATUS_OPENED: 403,
	        STATUS_CLOSING: 404,
	        STATUS_CLOSED: 405,
	        STATUS_ERROR: 406
	    };
	})();

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(225);

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _version = '1.4.2';
	var _code = __webpack_require__(218).code;
	var _utils = __webpack_require__(217).utils;
	var _msg = __webpack_require__(226);
	var _message = _msg._msg;
	var _msgHash = {};
	var Queue = __webpack_require__(227).Queue;

	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

	if (window.XDomainRequest) {
	    XDomainRequest.prototype.oldsend = XDomainRequest.prototype.send;
	    XDomainRequest.prototype.send = function () {
	        XDomainRequest.prototype.oldsend.apply(this, arguments);
	        this.readyState = 2;
	    };
	}

	Strophe.Request.prototype._newXHR = function () {
	    var xhr = _utils.xmlrequest(true);
	    if (xhr.overrideMimeType) {
	        xhr.overrideMimeType('text/xml');
	    }
	    // use Function.bind() to prepend ourselves as an argument
	    xhr.onreadystatechange = this.func.bind(null, this);
	    return xhr;
	};

	Strophe.Websocket.prototype._closeSocket = function () {
	    if (this.socket) {
	        var me = this;
	        setTimeout(function () {
	            try {
	                me.socket.close();
	            } catch (e) {}
	        }, 0);
	    } else {
	        this.socket = null;
	    }
	};

	/**
	 *
	 * Strophe.Websocket has a bug while logout:
	 * 1.send: <presence xmlns='jabber:client' type='unavailable'/> is ok;
	 * 2.send: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/> will cause a problem,log as follows:
	 * WebSocket connection to 'ws://im-api.easemob.com/ws/' failed: Data frame received after close_connect @ strophe.js:5292connect @ strophe.js:2491_login @ websdk-1.1.2.js:278suc @ websdk-1.1.2.js:636xhr.onreadystatechange @ websdk-1.1.2.js:2582
	 * 3 "Websocket error [object Event]"
	 * _changeConnectStatus
	 * onError Object {type: 7, msg: "The WebSocket connection could not be established or was disconnected.", reconnect: true}
	 *
	 * this will trigger socket.onError, therefore _doDisconnect again.
	 * Fix it by overide  _onMessage
	 */
	Strophe.Websocket.prototype._onMessage = function (message) {
	    WebIM && WebIM.config.isDebug && console.log(WebIM.utils.ts() + 'recv:', message.data);
	    var elem, data;
	    // check for closing stream
	    // var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
	    // if (message.data === close) {
	    //     this._conn.rawInput(close);
	    //     this._conn.xmlInput(message);
	    //     if (!this._conn.disconnecting) {
	    //         this._conn._doDisconnect();
	    //     }
	    //     return;
	    //
	    // send and receive close xml: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/>
	    // so we can't judge whether message.data equals close by === simply.
	    if (message.data.indexOf("<close ") === 0) {
	        elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
	        var see_uri = elem.getAttribute("see-other-uri");
	        if (see_uri) {
	            this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
	            this._conn.reset();
	            this._conn.service = see_uri;
	            this._connect();
	        } else {
	            // if (!this._conn.disconnecting) {
	            this._conn._doDisconnect("receive <close> from server");
	            // }
	        }
	        return;
	    } else if (message.data.search("<open ") === 0) {
	        // This handles stream restarts
	        elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
	        if (!this._handleStreamStart(elem)) {
	            return;
	        }
	    } else {
	        data = this._streamWrap(message.data);
	        elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
	    }

	    if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
	        return;
	    }

	    //handle unavailable presence stanza before disconnecting
	    if (this._conn.disconnecting && elem.firstChild.nodeName === "presence" && elem.firstChild.getAttribute("type") === "unavailable") {
	        this._conn.xmlInput(elem);
	        this._conn.rawInput(Strophe.serialize(elem));
	        // if we are already disconnecting we will ignore the unavailable stanza and
	        // wait for the </stream:stream> tag before we close the connection
	        return;
	    }
	    this._conn._dataRecv(elem, message.data);
	};

	var _listenNetwork = function _listenNetwork(onlineCallback, offlineCallback) {

	    if (window.addEventListener) {
	        window.addEventListener('online', onlineCallback);
	        window.addEventListener('offline', offlineCallback);
	    } else if (window.attachEvent) {
	        if (document.body) {
	            document.body.attachEvent('ononline', onlineCallback);
	            document.body.attachEvent('onoffline', offlineCallback);
	        } else {
	            window.attachEvent('load', function () {
	                document.body.attachEvent('ononline', onlineCallback);
	                document.body.attachEvent('onoffline', offlineCallback);
	            });
	        }
	    } else {
	        /*var onlineTmp = window.ononline;
	         var offlineTmp = window.onoffline;
	          window.attachEvent('ononline', function () {
	         try {
	         typeof onlineTmp === 'function' && onlineTmp();
	         } catch ( e ) {}
	         onlineCallback();
	         });
	         window.attachEvent('onoffline', function () {
	         try {
	         typeof offlineTmp === 'function' && offlineTmp();
	         } catch ( e ) {}
	         offlineCallback();
	         });*/
	    }
	};

	var _parseRoom = function _parseRoom(result) {
	    var rooms = [];
	    var items = result.getElementsByTagName('item');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var roomJid = item.getAttribute('jid');
	            var tmp = roomJid.split('@')[0];
	            var room = {
	                jid: roomJid,
	                name: item.getAttribute('name'),
	                roomId: tmp.split('_')[1]
	            };
	            rooms.push(room);
	        }
	    }
	    return rooms;
	};

	var _parseRoomOccupants = function _parseRoomOccupants(result) {
	    var occupants = [];
	    var items = result.getElementsByTagName('item');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var room = {
	                jid: item.getAttribute('jid'),
	                name: item.getAttribute('name')
	            };
	            occupants.push(room);
	        }
	    }
	    return occupants;
	};

	var _parseResponseMessage = function _parseResponseMessage(msginfo) {
	    var parseMsgData = { errorMsg: true, data: [] };

	    var msgBodies = msginfo.getElementsByTagName('body');
	    if (msgBodies) {
	        for (var i = 0; i < msgBodies.length; i++) {
	            var msgBody = msgBodies[i];
	            var childNodes = msgBody.childNodes;
	            if (childNodes && childNodes.length > 0) {
	                var childNode = msgBody.childNodes[0];
	                if (childNode.nodeType == Strophe.ElementType.TEXT) {
	                    var jsondata = childNode.wholeText || childNode.nodeValue;
	                    jsondata = jsondata.replace('\n', '<br>');
	                    try {
	                        var data = eval('(' + jsondata + ')');
	                        parseMsgData.errorMsg = false;
	                        parseMsgData.data = [data];
	                    } catch (e) {}
	                }
	            }
	        }

	        var delayTags = msginfo.getElementsByTagName('delay');
	        if (delayTags && delayTags.length > 0) {
	            var delayTag = delayTags[0];
	            var delayMsgTime = delayTag.getAttribute('stamp');
	            if (delayMsgTime) {
	                parseMsgData.delayTimeStamp = delayMsgTime;
	            }
	        }
	    } else {
	        var childrens = msginfo.childNodes;
	        if (childrens && childrens.length > 0) {
	            var child = msginfo.childNodes[0];
	            if (child.nodeType == Strophe.ElementType.TEXT) {
	                try {
	                    var data = eval('(' + child.nodeValue + ')');
	                    parseMsgData.errorMsg = false;
	                    parseMsgData.data = [data];
	                } catch (e) {}
	            }
	        }
	    }
	    return parseMsgData;
	};

	var _parseNameFromJidFn = function _parseNameFromJidFn(jid, domain) {
	    domain = domain || '';
	    var tempstr = jid;
	    var findex = tempstr.indexOf('_');

	    if (findex !== -1) {
	        tempstr = tempstr.substring(findex + 1);
	    }
	    var atindex = tempstr.indexOf('@' + domain);
	    if (atindex !== -1) {
	        tempstr = tempstr.substring(0, atindex);
	    }
	    return tempstr;
	};

	var _parseFriend = function _parseFriend(queryTag, conn, from) {
	    var rouster = [];
	    var items = queryTag.getElementsByTagName('item');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var jid = item.getAttribute('jid');
	            if (!jid) {
	                continue;
	            }
	            var subscription = item.getAttribute('subscription');
	            var friend = {
	                subscription: subscription,
	                jid: jid
	            };
	            var ask = item.getAttribute('ask');
	            if (ask) {
	                friend.ask = ask;
	            }
	            var name = item.getAttribute('name');
	            if (name) {
	                friend.name = name;
	            } else {
	                var n = _parseNameFromJidFn(jid);
	                friend.name = n;
	            }
	            var groups = [];
	            Strophe.forEachChild(item, 'group', function (group) {
	                groups.push(Strophe.getText(group));
	            });
	            friend.groups = groups;
	            rouster.push(friend);
	            // B同意之后 -> B订阅A
	            if (conn && subscription == 'from') {
	                conn.subscribe({
	                    toJid: jid
	                });
	            }

	            if (conn && subscription == 'to') {
	                conn.subscribed({
	                    toJid: jid
	                });
	            }
	        }
	    }
	    return rouster;
	};

	var _login = function _login(options, conn) {
	    var accessToken = options.access_token || '';
	    if (accessToken == '') {
	        var loginfo = _utils.stringify(options);
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
	            data: options
	        });
	        return;
	    }
	    conn.context.accessToken = options.access_token;
	    conn.context.accessTokenExpires = options.expires_in;
	    var stropheConn = null;
	    if (conn.isOpening() && conn.context.stropheConn) {
	        stropheConn = conn.context.stropheConn;
	    } else if (conn.isOpened() && conn.context.stropheConn) {
	        // return;
	        stropheConn = conn.getStrophe();
	    } else {
	        stropheConn = conn.getStrophe();
	    }
	    var callback = function callback(status, msg) {
	        _loginCallback(status, msg, conn);
	    };

	    conn.context.stropheConn = stropheConn;
	    if (conn.route) {
	        stropheConn.connect(conn.context.jid, '$t$' + accessToken, callback, conn.wait, conn.hold, conn.route);
	    } else {
	        stropheConn.connect(conn.context.jid, '$t$' + accessToken, callback, conn.wait, conn.hold);
	    }
	};

	var _parseMessageType = function _parseMessageType(msginfo) {
	    var msgtype = 'normal';
	    var receiveinfo = msginfo.getElementsByTagName('received');
	    if (receiveinfo && receiveinfo.length > 0 && receiveinfo[0].namespaceURI === 'urn:xmpp:receipts') {
	        msgtype = 'received';
	    } else {
	        var inviteinfo = msginfo.getElementsByTagName('invite');
	        if (inviteinfo && inviteinfo.length > 0) {
	            msgtype = 'invite';
	        }
	    }
	    return msgtype;
	};

	var _handleMessageQueue = function _handleMessageQueue(conn) {
	    for (var i in _msgHash) {
	        if (_msgHash.hasOwnProperty(i)) {
	            _msgHash[i].send(conn);
	        }
	    }
	};

	var _loginCallback = function _loginCallback(status, msg, conn) {
	    var conflict, error;

	    if (msg === 'conflict') {
	        conflict = true;
	    }

	    if (status == Strophe.Status.CONNFAIL) {
	        //client offline, ping/pong timeout, server quit, server offline
	        error = {
	            type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
	            msg: msg,
	            reconnect: true
	        };

	        conflict && (error.conflict = true);
	        conn.onError(error);
	    } else if (status == Strophe.Status.ATTACHED || status == Strophe.Status.CONNECTED) {
	        // client should limit the speed of sending ack messages  up to 5/s
	        conn.autoReconnectNumTotal = 0;
	        conn.intervalId = setInterval(function () {
	            conn.handelSendQueue();
	        }, 200);
	        var handleMessage = function handleMessage(msginfo) {
	            var type = _parseMessageType(msginfo);

	            if ('received' === type) {
	                conn.handleReceivedMessage(msginfo);
	                return true;
	            } else if ('invite' === type) {
	                conn.handleInviteMessage(msginfo);
	                return true;
	            } else {
	                conn.handleMessage(msginfo);
	                return true;
	            }
	        };
	        var handlePresence = function handlePresence(msginfo) {
	            conn.handlePresence(msginfo);
	            return true;
	        };
	        var handlePing = function handlePing(msginfo) {
	            conn.handlePing(msginfo);
	            return true;
	        };
	        var handleIqRoster = function handleIqRoster(msginfo) {
	            conn.handleIqRoster(msginfo);
	            return true;
	        };
	        var handleIqPrivacy = function handleIqPrivacy(msginfo) {
	            conn.handleIqPrivacy(msginfo);
	            return true;
	        };
	        var handleIq = function handleIq(msginfo) {
	            conn.handleIq(msginfo);
	            return true;
	        };

	        conn.addHandler(handleMessage, null, 'message', null, null, null);
	        conn.addHandler(handlePresence, null, 'presence', null, null, null);
	        conn.addHandler(handlePing, 'urn:xmpp:ping', 'iq', 'get', null, null);
	        conn.addHandler(handleIqRoster, 'jabber:iq:roster', 'iq', 'set', null, null);
	        conn.addHandler(handleIqPrivacy, 'jabber:iq:privacy', 'iq', 'set', null, null);
	        conn.addHandler(handleIq, null, 'iq', null, null, null);

	        conn.registerConfrIQHandler && conn.registerConfrIQHandler();

	        conn.context.status = _code.STATUS_OPENED;

	        var supportRecMessage = [_code.WEBIM_MESSAGE_REC_TEXT, _code.WEBIM_MESSAGE_REC_EMOJI];

	        if (_utils.isCanDownLoadFile) {
	            supportRecMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
	            supportRecMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
	        }
	        var supportSedMessage = [_code.WEBIM_MESSAGE_SED_TEXT];
	        if (_utils.isCanUploadFile) {
	            supportSedMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
	            supportSedMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
	        }
	        conn.notifyVersion();
	        conn.retry && _handleMessageQueue(conn);
	        conn.heartBeat();
	        conn.isAutoLogin && conn.setPresence();
	        conn.onOpened({
	            canReceive: supportRecMessage,
	            canSend: supportSedMessage,
	            accessToken: conn.context.accessToken
	        });
	    } else if (status == Strophe.Status.DISCONNECTING) {
	        if (conn.isOpened()) {
	            conn.stopHeartBeat();
	            conn.context.status = _code.STATUS_CLOSING;

	            error = {
	                type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
	                msg: msg,
	                reconnect: true
	            };

	            conflict && (error.conflict = true);
	            conn.onError(error);
	        }
	    } else if (status == Strophe.Status.DISCONNECTED) {
	        if (conn.isOpened()) {
	            if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
	                conn.reconnect();
	                return;
	            } else {
	                error = {
	                    type: _code.WEBIM_CONNCTION_DISCONNECTED
	                };
	                conn.onError(error);
	            }
	        }
	        conn.context.status = _code.STATUS_CLOSED;
	        conn.clear();
	        conn.onClosed();
	    } else if (status == Strophe.Status.AUTHFAIL) {
	        error = {
	            type: _code.WEBIM_CONNCTION_AUTH_ERROR
	        };

	        conflict && (error.conflict = true);
	        conn.onError(error);
	        conn.clear();
	    } else if (status == Strophe.Status.ERROR) {
	        conn.context.status = _code.STATUS_ERROR;
	        error = {
	            type: _code.WEBIM_CONNCTION_SERVER_ERROR
	        };

	        conflict && (error.conflict = true);
	        conn.onError(error);
	    }
	    conn.context.status_now = status;
	};

	var _getJid = function _getJid(options, conn) {
	    var jid = options.toJid || '';

	    if (jid === '') {
	        var appKey = conn.context.appKey || '';
	        var toJid = appKey + '_' + options.to + '@' + conn.domain;

	        if (options.resource) {
	            toJid = toJid + '/' + options.resource;
	        }
	        jid = toJid;
	    }
	    return jid;
	};

	var _getJidByName = function _getJidByName(name, conn) {
	    var options = {
	        to: name
	    };
	    return _getJid(options, conn);
	};

	var _validCheck = function _validCheck(options, conn) {
	    options = options || {};

	    if (options.user == '') {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }

	    var user = options.user + '' || '';
	    var appKey = options.appKey || '';
	    var devInfos = appKey.split('#');

	    if (devInfos.length !== 2) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }
	    var orgName = devInfos[0];
	    var appName = devInfos[1];

	    if (!orgName) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }
	    if (!appName) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }

	    var jid = appKey + '_' + user.toLowerCase() + '@' + conn.domain,
	        resource = options.resource || 'webim';

	    if (conn.isMultiLoginSessions) {
	        resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
	    }
	    conn.context.jid = jid + '/' + resource;
	    /*jid: {appkey}_{username}@domain/resource*/
	    conn.context.userId = user;
	    conn.context.appKey = appKey;
	    conn.context.appName = appName;
	    conn.context.orgName = orgName;

	    return true;
	};

	var _getXmppUrl = function _getXmppUrl(baseUrl, https) {
	    if (/^(ws|http)s?:\/\/?/.test(baseUrl)) {
	        return baseUrl;
	    }

	    var url = {
	        prefix: 'http',
	        base: '://' + baseUrl,
	        suffix: '/http-bind/'
	    };

	    if (https && _utils.isSupportWss) {
	        url.prefix = 'wss';
	        url.suffix = '/ws/';
	    } else {
	        if (https) {
	            url.prefix = 'https';
	        } else if (window.WebSocket) {
	            url.prefix = 'ws';
	            url.suffix = '/ws/';
	        }
	    }

	    return url.prefix + url.base + url.suffix;
	};

	//class
	var connection = function connection(options) {
	    if (!this instanceof connection) {
	        return new connection(options);
	    }

	    var options = options || {};

	    this.isHttpDNS = options.isHttpDNS || false;
	    this.isMultiLoginSessions = options.isMultiLoginSessions || false;
	    this.wait = options.wait || 30;
	    this.retry = options.retry || false;
	    this.https = options.https || location.protocol === 'https:';
	    this.url = _getXmppUrl(options.url, this.https) + '?' + new Date().getTime();
	    this.hold = options.hold || 1;
	    this.route = options.route || null;
	    this.domain = options.domain || 'easemob.com';
	    this.inactivity = options.inactivity || 30;
	    this.heartBeatWait = options.heartBeatWait || 4500;
	    this.maxRetries = options.maxRetries || 5;
	    this.isAutoLogin = options.isAutoLogin === false ? false : true;
	    this.pollingTime = options.pollingTime || 800;
	    this.stropheConn = false;
	    this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
	    this.autoReconnectNumTotal = 0;
	    this.autoReconnectInterval = options.autoReconnectInterval || 0;
	    this.context = { status: _code.STATUS_INIT };
	    this.sendQueue = new Queue(); //instead of sending message immediately,cache them in this queue
	    this.intervalId = null; //clearInterval return value
	    this.apiUrl = options.apiUrl || '';
	    this.isWindowSDK = options.isWindowSDK || false;

	    this.dnsArr = ['https://rs.easemob.com', 'https://rsbak.easemob.com', 'http://182.92.174.78', 'http://112.126.66.111']; //http dns server hosts
	    this.dnsIndex = 0; //the dns ip used in dnsArr currently
	    this.dnsTotal = this.dnsArr.length; //max number of getting dns retries
	    this.restHosts = null; //rest server ips
	    this.restIndex = 0; //the rest ip used in restHosts currently
	    this.restTotal = 0; //max number of getting rest token retries
	    this.xmppHosts = null; //xmpp server ips
	    this.xmppIndex = 0; //the xmpp ip used in xmppHosts currently
	    this.xmppTotal = 0; //max number of creating xmpp server connection(ws/bosh) retries

	    this.groupOption = {};
	};

	connection.prototype.registerUser = function (options) {
	    if (location.protocol != 'https:' && this.isHttpDNS) {
	        this.dnsIndex = 0;
	        this.getHttpDNS(options, 'signup');
	    } else {
	        this.signup(options);
	    }
	};

	connection.prototype.handelSendQueue = function () {
	    var options = this.sendQueue.pop();
	    if (options !== null) {
	        this.sendReceiptsMessage(options);
	    }
	};
	connection.prototype.listen = function (options) {
	    this.onOpened = options.onOpened || _utils.emptyfn;
	    this.onClosed = options.onClosed || _utils.emptyfn;
	    this.onTextMessage = options.onTextMessage || _utils.emptyfn;
	    this.onEmojiMessage = options.onEmojiMessage || _utils.emptyfn;
	    this.onPictureMessage = options.onPictureMessage || _utils.emptyfn;
	    this.onAudioMessage = options.onAudioMessage || _utils.emptyfn;
	    this.onVideoMessage = options.onVideoMessage || _utils.emptyfn;
	    this.onFileMessage = options.onFileMessage || _utils.emptyfn;
	    this.onLocationMessage = options.onLocationMessage || _utils.emptyfn;
	    this.onCmdMessage = options.onCmdMessage || _utils.emptyfn;
	    this.onPresence = options.onPresence || _utils.emptyfn;
	    this.onRoster = options.onRoster || _utils.emptyfn;
	    this.onError = options.onError || _utils.emptyfn;
	    this.onReceivedMessage = options.onReceivedMessage || _utils.emptyfn;
	    this.onInviteMessage = options.onInviteMessage || _utils.emptyfn;
	    this.onOffline = options.onOffline || _utils.emptyfn;
	    this.onOnline = options.onOnline || _utils.emptyfn;
	    this.onConfirmPop = options.onConfirmPop || _utils.emptyfn;
	    //for WindowSDK start
	    this.onUpdateMyGroupList = options.onUpdateMyGroupList || _utils.emptyfn;
	    this.onUpdateMyRoster = options.onUpdateMyRoster || _utils.emptyfn;
	    //for WindowSDK end
	    this.onBlacklistUpdate = options.onBlacklistUpdate || _utils.emptyfn;

	    _listenNetwork(this.onOnline, this.onOffline);
	};

	//webrtc需要强制心跳，加个默认为false的参数 向下兼容
	connection.prototype.heartBeat = function () {
	    var forcing = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	    var me = this;
	    //IE8: strophe auto switch from ws to BOSH, need heartbeat
	    var isNeed = !/^ws|wss/.test(me.url) || /mobile/.test(navigator.userAgent);

	    if (this.heartBeatID || !forcing && !isNeed) {
	        return;
	    }

	    var options = {
	        toJid: this.domain,
	        type: 'normal'
	    };
	    this.heartBeatID = setInterval(function () {
	        me.ping(options);
	    }, this.heartBeatWait);
	};

	connection.prototype.stopHeartBeat = function () {
	    if (typeof this.heartBeatID == "number") {
	        this.heartBeatID = clearInterval(this.heartBeatID);
	    }
	};

	connection.prototype.sendReceiptsMessage = function (options) {
	    var dom = $msg({
	        from: this.context.jid || '',
	        to: this.domain,
	        id: options.id || ''
	    }).c('received', {
	        xmlns: 'urn:xmpp:receipts',
	        id: options.id || ''
	    });
	    this.sendCommand(dom.tree());
	};

	connection.prototype.cacheReceiptsMessage = function (options) {
	    this.sendQueue.push(options);
	};

	connection.prototype.getStrophe = function () {
	    if (location.protocol != 'https:' && this.isHttpDNS) {
	        //TODO: try this.xmppTotal times on fail
	        var url = '';
	        var host = this.xmppHosts[this.xmppIndex];
	        var domain = _utils.getXmlFirstChild(host, 'domain');
	        var ip = _utils.getXmlFirstChild(host, 'ip');
	        if (ip) {
	            url = ip.textContent;
	            var port = _utils.getXmlFirstChild(host, 'port');
	            if (port.textContent != '80') {
	                url += ':' + port.textContent;
	            }
	        } else {
	            url = domain.textContent;
	        }

	        if (url != '') {
	            var parter = /(.+\/\/).+(\/.+)/;
	            this.url = this.url.replace(parter, "$1" + url + "$2");
	        }
	    }

	    var stropheConn = new Strophe.Connection(this.url, {
	        inactivity: this.inactivity,
	        maxRetries: this.maxRetries,
	        pollingTime: this.pollingTime
	    });
	    return stropheConn;
	};
	connection.prototype.getHostsByTag = function (data, tagName) {
	    var tag = _utils.getXmlFirstChild(data, tagName);
	    if (!tag) {
	        console.log(tagName + ' hosts error');
	        return null;
	    }
	    var hosts = tag.getElementsByTagName('hosts');
	    if (hosts.length == 0) {
	        console.log(tagName + ' hosts error2');
	        return null;
	    }
	    return hosts[0].getElementsByTagName('host');
	};
	connection.prototype.getRestFromHttpDNS = function (options, type) {
	    if (this.restIndex > this.restTotal) {
	        console.log('rest hosts all tried,quit');
	        return;
	    }
	    var url = '';
	    var host = this.restHosts[this.restIndex];
	    var domain = _utils.getXmlFirstChild(host, 'domain');
	    var ip = _utils.getXmlFirstChild(host, 'ip');
	    if (ip) {
	        var port = _utils.getXmlFirstChild(host, 'port');
	        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + ip.textContent + ':' + port.textContent;
	    } else {
	        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + domain.textContent;
	    }

	    if (url != '') {
	        this.apiUrl = url;
	        options.apiUrl = url;
	    }

	    if (type == 'login') {
	        this.login(options);
	    } else {
	        this.signup(options);
	    }
	};

	connection.prototype.getHttpDNS = function (options, type) {
	    if (this.restHosts) {
	        this.getRestFromHttpDNS(options, type);
	        return;
	    }
	    var self = this;
	    var suc = function suc(data, xhr) {
	        data = new DOMParser().parseFromString(data, "text/xml").documentElement;
	        //get rest ips
	        var restHosts = self.getHostsByTag(data, 'rest');
	        if (!restHosts) {
	            console.log('rest hosts error3');
	            return;
	        }
	        self.restHosts = restHosts;
	        self.restTotal = restHosts.length;

	        //get xmpp ips
	        var xmppHosts = self.getHostsByTag(data, 'xmpp');
	        if (!xmppHosts) {
	            console.log('xmpp hosts error3');
	            return;
	        }
	        self.xmppHosts = xmppHosts;
	        self.xmppTotal = xmppHosts.length;

	        self.getRestFromHttpDNS(options, type);
	    };
	    var error = function error(res, xhr, msg) {

	        console.log('getHttpDNS error', res, msg);
	        self.dnsIndex++;
	        if (self.dnsIndex < self.dnsTotal) {
	            self.getHttpDNS(options, type);
	        }
	    };
	    var options2 = {
	        url: this.dnsArr[this.dnsIndex] + '/easemob/server.xml',
	        dataType: 'text',
	        type: 'GET',

	        // url: 'http://www.easemob.com/easemob/server.xml',
	        // dataType: 'xml',
	        data: { app_key: encodeURIComponent(options.appKey) },
	        success: suc || _utils.emptyfn,
	        error: error || _utils.emptyfn
	    };
	    _utils.ajax(options2);
	};

	connection.prototype.signup = function (options) {
	    var self = this;
	    var orgName = options.orgName || '';
	    var appName = options.appName || '';
	    var appKey = options.appKey || '';
	    var suc = options.success || EMPTYFN;
	    var err = options.error || EMPTYFN;

	    if (!orgName && !appName && appKey) {
	        var devInfos = appKey.split('#');
	        if (devInfos.length === 2) {
	            orgName = devInfos[0];
	            appName = devInfos[1];
	        }
	    }
	    if (!orgName && !appName) {
	        err({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var error = function error(res, xhr, msg) {
	        if (location.protocol != 'https:' && self.isHttpDNS) {
	            if (self.restIndex + 1 < self.restTotal) {
	                self.restIndex++;
	                self.getRestFromHttpDNS(options, 'signup');
	                return;
	            }
	        }
	        self.clear();
	        err(res);
	    };
	    var https = options.https || https;
	    var apiUrl = options.apiUrl;
	    var restUrl = apiUrl + '/' + orgName + '/' + appName + '/users';

	    var userjson = {
	        username: options.username,
	        password: options.password,
	        nickname: options.nickname || ''
	    };

	    var userinfo = _utils.stringify(userjson);
	    var options2 = {
	        url: restUrl,
	        dataType: 'json',
	        data: userinfo,
	        success: suc,
	        error: error
	    };
	    _utils.ajax(options2);
	};

	connection.prototype.open = function (options) {
	    if (location.protocol != 'https:' && this.isHttpDNS) {
	        this.dnsIndex = 0;
	        this.getHttpDNS(options, 'login');
	    } else {
	        this.login(options);
	    }
	};

	connection.prototype.login = function (options) {
	    var pass = _validCheck(options, this);

	    if (!pass) {
	        return;
	    }

	    var conn = this;

	    if (conn.isOpened()) {
	        return;
	    }

	    if (options.accessToken) {
	        options.access_token = options.accessToken;
	        conn.context.restTokenData = options;
	        _login(options, conn);
	    } else {
	        var apiUrl = options.apiUrl;
	        var userId = this.context.userId;
	        var pwd = options.pwd || '';
	        var appName = this.context.appName;
	        var orgName = this.context.orgName;

	        var suc = function suc(data, xhr) {
	            conn.context.status = _code.STATUS_DOLOGIN_IM;
	            conn.context.restTokenData = data;
	            if (options.success) options.success(data);
	            _login(data, conn);
	        };
	        var error = function error(res, xhr, msg) {
	            if (options.error) options.error();
	            if (location.protocol != 'https:' && conn.isHttpDNS) {
	                if (conn.restIndex + 1 < conn.restTotal) {
	                    conn.restIndex++;
	                    conn.getRestFromHttpDNS(options, 'login');
	                    return;
	                }
	            }
	            conn.clear();
	            if (res.error && res.error_description) {
	                conn.onError({
	                    type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
	                    data: res,
	                    xhr: xhr
	                });
	            } else {
	                conn.onError({
	                    type: _code.WEBIM_CONNCTION_OPEN_ERROR,
	                    data: res,
	                    xhr: xhr
	                });
	            }
	        };

	        this.context.status = _code.STATUS_DOLOGIN_USERGRID;

	        var loginJson = {
	            grant_type: 'password',
	            username: userId,
	            password: pwd,
	            timestamp: +new Date()
	        };
	        var loginfo = _utils.stringify(loginJson);

	        var options2 = {
	            url: apiUrl + '/' + orgName + '/' + appName + '/token',
	            dataType: 'json',
	            data: loginfo,
	            success: suc || _utils.emptyfn,
	            error: error || _utils.emptyfn
	        };
	        _utils.ajax(options2);
	    }
	};

	// attach to xmpp server for BOSH
	connection.prototype.attach = function (options) {
	    var pass = _validCheck(options, this);

	    if (!pass) {
	        return;
	    }

	    options = options || {};

	    var accessToken = options.accessToken || '';
	    if (accessToken == '') {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var sid = options.sid || '';
	    if (sid === '') {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var rid = options.rid || '';
	    if (rid === '') {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var stropheConn = this.getStrophe();

	    this.context.accessToken = accessToken;
	    this.context.stropheConn = stropheConn;
	    this.context.status = _code.STATUS_DOLOGIN_IM;

	    var conn = this;
	    var callback = function callback(status, msg) {
	        _loginCallback(status, msg, conn);
	    };

	    var jid = this.context.jid;
	    var wait = this.wait;
	    var hold = this.hold;
	    var wind = this.wind || 5;
	    stropheConn.attach(jid, sid, rid, callback, wait, hold, wind);
	};

	connection.prototype.close = function (reason) {
	    this.stopHeartBeat();

	    var status = this.context.status;
	    if (status == _code.STATUS_INIT) {
	        return;
	    }

	    if (this.isClosed() || this.isClosing()) {
	        return;
	    }

	    this.context.status = _code.STATUS_CLOSING;
	    this.context.stropheConn.disconnect(reason);
	};

	connection.prototype.addHandler = function (handler, ns, name, type, id, from, options) {
	    this.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
	};

	connection.prototype.notifyVersion = function (suc, fail) {
	    var jid = _getJid({}, this);
	    var dom = $iq({
	        from: this.context.jid || '',
	        to: this.domain,
	        type: 'result'
	    }).c('query', { xmlns: 'jabber:iq:version' }).c('name').t('easemob').up().c('version').t(_version).up().c('os').t('webim');

	    var suc = suc || _utils.emptyfn;
	    var error = fail || this.onError;
	    var failFn = function failFn(ele) {
	        error({
	            type: _code.WEBIM_CONNCTION_NOTIFYVERSION_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
	    return;
	};

	// handle all types of presence message
	connection.prototype.handlePresence = function (msginfo) {
	    if (this.isClosed()) {
	        return;
	    }
	    var from = msginfo.getAttribute('from') || '';
	    var to = msginfo.getAttribute('to') || '';
	    var type = msginfo.getAttribute('type') || '';
	    var presence_type = msginfo.getAttribute('presence_type') || '';
	    var fromUser = _parseNameFromJidFn(from);
	    var toUser = _parseNameFromJidFn(to);
	    var isCreate = false;
	    var info = {
	        from: fromUser,
	        to: toUser,
	        fromJid: from,
	        toJid: to,
	        type: type,
	        chatroom: msginfo.getElementsByTagName('roomtype').length ? true : false
	    };

	    var showTags = msginfo.getElementsByTagName('show');
	    if (showTags && showTags.length > 0) {
	        var showTag = showTags[0];
	        info.show = Strophe.getText(showTag);
	    }
	    var statusTags = msginfo.getElementsByTagName('status');
	    if (statusTags && statusTags.length > 0) {
	        var statusTag = statusTags[0];
	        info.status = Strophe.getText(statusTag);
	        info.code = statusTag.getAttribute('code');
	    }

	    var priorityTags = msginfo.getElementsByTagName('priority');
	    if (priorityTags && priorityTags.length > 0) {
	        var priorityTag = priorityTags[0];
	        info.priority = Strophe.getText(priorityTag);
	    }

	    var error = msginfo.getElementsByTagName('error');
	    if (error && error.length > 0) {
	        var error = error[0];
	        info.error = {
	            code: error.getAttribute('code')
	        };
	    }

	    var destroy = msginfo.getElementsByTagName('destroy');
	    if (destroy && destroy.length > 0) {
	        var destroy = destroy[0];
	        info.destroy = true;

	        var reason = destroy.getElementsByTagName('reason');
	        if (reason && reason.length > 0) {
	            info.reason = Strophe.getText(reason[0]);
	        }
	    }

	    var members = msginfo.getElementsByTagName('item');
	    if (members && members.length > 0) {
	        var member = members[0];
	        var role = member.getAttribute('role');
	        var jid = member.getAttribute('jid');
	        var affiliation = member.getAttribute('affiliation');
	        // dismissed by group
	        if (role == 'none' && jid) {
	            var kickedMember = _parseNameFromJidFn(jid);
	            var actor = member.getElementsByTagName('actor')[0];
	            var actorNick = actor.getAttribute('nick');
	            info.actor = actorNick;
	            info.kicked = kickedMember;
	        }
	        // Service Acknowledges Room Creation `createGroupACK`
	        if (role == 'moderator' && info.code == '201') {
	            if (affiliation === 'owner') {
	                info.type = 'createGroupACK';
	                isCreate = true;
	            } else info.type = 'joinPublicGroupSuccess';
	        }
	    }

	    var apply = msginfo.getElementsByTagName('apply');
	    if (apply && apply.length > 0) {
	        apply = apply[0];
	        var toNick = apply.getAttribute('toNick');
	        var groupJid = apply.getAttribute('to');
	        var userJid = apply.getAttribute('from');
	        var groupName = _parseNameFromJidFn(groupJid);
	        var userName = _parseNameFromJidFn(userJid);
	        info.toNick = toNick;
	        info.groupName = groupName;
	        info.type = 'joinGroupNotifications';
	        var reason = apply.getElementsByTagName('reason');
	        if (reason && reason.length > 0) {
	            info.reason = Strophe.getText(reason[0]);
	        }
	    }

	    if (info.chatroom) {
	        // diff the
	        info.presence_type = presence_type;
	        info.original_type = info.type;
	        var reflectUser = from.slice(from.lastIndexOf('/') + 1);

	        if (reflectUser === this.context.userId) {
	            if (info.type === '' && !info.code) {
	                info.type = 'joinChatRoomSuccess';
	            } else if (presence_type === 'unavailable' || info.type === 'unavailable') {
	                if (!info.status) {
	                    // logout successfully.
	                    info.type = 'leaveChatRoom';
	                } else if (info.code == 110) {
	                    // logout or dismissied by admin.
	                    info.type = 'leaveChatRoom';
	                } else if (info.error && info.error.code == 406) {
	                    // The chat room is full.
	                    info.type = 'reachChatRoomCapacity';
	                }
	            }
	        }
	    } else {
	        info.presence_type = presence_type;
	        info.original_type = type;

	        if (/subscribe/.test(info.type)) {
	            //subscribe | subscribed | unsubscribe | unsubscribed
	        } else if (type == "" && !info.status && !info.error && !isCreate) {
	            info.type = 'joinPublicGroupSuccess';
	        } else if (presence_type === 'unavailable' || type === 'unavailable') {
	            // There is no roomtype when a chat room is deleted.
	            if (info.destroy) {
	                // Group or Chat room Deleted.
	                info.type = 'deleteGroupChat';
	            } else if (info.code == 307 || info.code == 321) {
	                // Dismissed by group.
	                var nick = msginfo.getAttribute('nick');
	                if (!nick) info.type = 'leaveGroup';else info.type = 'removedFromGroup';
	            }
	        }
	    }
	    this.onPresence(info, msginfo);
	};

	connection.prototype.handlePing = function (e) {
	    if (this.isClosed()) {
	        return;
	    }
	    var id = e.getAttribute('id');
	    var from = e.getAttribute('from');
	    var to = e.getAttribute('to');
	    var dom = $iq({
	        from: to,
	        to: from,
	        id: id,
	        type: 'result'
	    });
	    this.sendCommand(dom.tree());
	};

	connection.prototype.handleIq = function (iq) {
	    return true;
	};

	connection.prototype.handleIqPrivacy = function (msginfo) {
	    var list = msginfo.getElementsByTagName('list');
	    if (list.length == 0) {
	        return;
	    }
	    this.getBlacklist();
	};

	connection.prototype.handleIqRoster = function (e) {
	    var id = e.getAttribute('id');
	    var from = e.getAttribute('from') || '';
	    var name = _parseNameFromJidFn(from);
	    var curJid = this.context.jid;
	    var curUser = this.context.userId;

	    var iqresult = $iq({ type: 'result', id: id, from: curJid });
	    this.sendCommand(iqresult.tree());

	    var msgBodies = e.getElementsByTagName('query');
	    if (msgBodies && msgBodies.length > 0) {
	        var queryTag = msgBodies[0];
	        var rouster = _parseFriend(queryTag, this, from);
	        this.onRoster(rouster);
	    }
	    return true;
	};

	connection.prototype.handleMessage = function (msginfo) {
	    var self = this;
	    if (this.isClosed()) {
	        return;
	    }

	    var id = msginfo.getAttribute('id') || '';

	    // cache ack into sendQueue first , handelSendQueue will do the send thing with the speed of  5/s
	    this.cacheReceiptsMessage({
	        id: id
	    });
	    var parseMsgData = _parseResponseMessage(msginfo);
	    if (parseMsgData.errorMsg) {
	        this.handlePresence(msginfo);
	        return;
	    }
	    // send error
	    var error = msginfo.getElementsByTagName('error');
	    var errorCode = '';
	    var errorText = '';
	    var errorBool = false;
	    if (error.length > 0) {
	        errorBool = true;
	        errorCode = error[0].getAttribute('code');
	        var textDOM = error[0].getElementsByTagName('text');
	        errorText = textDOM[0].textContent || textDOM[0].text;
	        log('handle error', errorCode, errorText);
	    }

	    var msgDatas = parseMsgData.data;
	    for (var i in msgDatas) {
	        if (!msgDatas.hasOwnProperty(i)) {
	            continue;
	        }
	        var msg = msgDatas[i];
	        if (!msg.from || !msg.to) {
	            continue;
	        }

	        var from = (msg.from + '').toLowerCase();
	        var too = (msg.to + '').toLowerCase();
	        var extmsg = msg.ext || {};
	        var chattype = '';
	        var typeEl = msginfo.getElementsByTagName('roomtype');
	        if (typeEl.length) {
	            chattype = typeEl[0].getAttribute('type') || 'chat';
	        } else {
	            chattype = msginfo.getAttribute('type') || 'chat';
	        }

	        var msgBodies = msg.bodies;
	        if (!msgBodies || msgBodies.length == 0) {
	            continue;
	        }
	        var msgBody = msg.bodies[0];
	        var type = msgBody.type;

	        try {
	            switch (type) {
	                case 'txt':
	                    var receiveMsg = msgBody.msg;
	                    var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
	                    if (emojibody.isemoji) {
	                        var msg = {
	                            id: id,
	                            type: chattype,
	                            from: from,
	                            to: too,
	                            delay: parseMsgData.delayTimeStamp,
	                            data: emojibody.body,
	                            ext: extmsg
	                        };
	                        !msg.delay && delete msg.delay;
	                        msg.error = errorBool;
	                        msg.errorText = errorText;
	                        msg.errorCode = errorCode;
	                        this.onEmojiMessage(msg);
	                    } else {
	                        var msg = {
	                            id: id,
	                            type: chattype,
	                            from: from,
	                            to: too,
	                            delay: parseMsgData.delayTimeStamp,
	                            data: receiveMsg,
	                            ext: extmsg
	                        };
	                        !msg.delay && delete msg.delay;
	                        msg.error = errorBool;
	                        msg.errorText = errorText;
	                        msg.errorCode = errorCode;
	                        this.onTextMessage(msg);
	                    }
	                    break;
	                case 'img':
	                    var rwidth = 0;
	                    var rheight = 0;
	                    if (msgBody.size) {
	                        rwidth = msgBody.size.width;
	                        rheight = msgBody.size.height;
	                    }
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && self.isHttpDNS ? self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        thumb: msgBody.thumb,
	                        thumb_secret: msgBody.thumb_secret,
	                        file_length: msgBody.file_length || '',
	                        width: rwidth,
	                        height: rheight,
	                        filetype: msgBody.filetype || '',
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onPictureMessage(msg);
	                    break;
	                case 'audio':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && self.isHttpDNS ? self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        length: msgBody.length || '',
	                        file_length: msgBody.file_length || '',
	                        filetype: msgBody.filetype || '',
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onAudioMessage(msg);
	                    break;
	                case 'file':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && self.isHttpDNS ? self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        file_length: msgBody.file_length,
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onFileMessage(msg);
	                    break;
	                case 'loc':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,
	                        addr: msgBody.addr,
	                        lat: msgBody.lat,
	                        lng: msgBody.lng,
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onLocationMessage(msg);
	                    break;
	                case 'video':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && self.isHttpDNS ? self.apiUrl + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        file_length: msgBody.file_length,
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onVideoMessage(msg);
	                    break;
	                case 'cmd':
	                    var msg = {
	                        id: id,
	                        from: from,
	                        to: too,
	                        action: msgBody.action,
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onCmdMessage(msg);
	                    break;
	            }
	            ;
	        } catch (e) {
	            this.onError({
	                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	                data: e
	            });
	        }
	    }
	};

	connection.prototype.handleReceivedMessage = function (message) {
	    try {
	        this.onReceivedMessage(message);
	    } catch (e) {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	            data: e
	        });
	    }

	    var rcv = message.getElementsByTagName('received'),
	        id,
	        mid;

	    if (rcv.length > 0) {
	        if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
	            id = rcv[0].childNodes[0].nodeValue;
	        } else {
	            id = rcv[0].innerHTML || rcv[0].innerText;
	        }
	        mid = rcv[0].getAttribute('mid');
	    }

	    if (_msgHash[id]) {
	        try {
	            _msgHash[id].msg.success instanceof Function && _msgHash[id].msg.success(id, mid);
	        } catch (e) {
	            this.onError({
	                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	                data: e
	            });
	        }
	        delete _msgHash[id];
	    }
	};

	connection.prototype.handleInviteMessage = function (message) {
	    var form = null;
	    var invitemsg = message.getElementsByTagName('invite');
	    var reasonDom = message.getElementsByTagName('reason')[0];
	    var reasonMsg = reasonDom.textContent;
	    var id = message.getAttribute('id') || '';
	    this.sendReceiptsMessage({
	        id: id
	    });

	    if (invitemsg && invitemsg.length > 0) {
	        var fromJid = invitemsg[0].getAttribute('from');
	        form = _parseNameFromJidFn(fromJid);
	    }
	    var xmsg = message.getElementsByTagName('x');
	    var roomid = null;
	    if (xmsg && xmsg.length > 0) {
	        for (var i = 0; i < xmsg.length; i++) {
	            if ('jabber:x:conference' === xmsg[i].namespaceURI) {
	                var roomjid = xmsg[i].getAttribute('jid');
	                roomid = _parseNameFromJidFn(roomjid);
	            }
	        }
	    }
	    this.onInviteMessage({
	        type: 'invite',
	        from: form,
	        roomid: roomid,
	        reason: reasonMsg
	    });
	};

	connection.prototype.sendCommand = function (dom, id) {
	    if (this.isOpened()) {
	        this.context.stropheConn.send(dom);
	    } else {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_DISCONNECTED,
	            reconnect: true
	        });
	    }
	};

	connection.prototype.getUniqueId = function (prefix) {
	    var cdate = new Date();
	    var offdate = new Date(2010, 1, 1);
	    var offset = cdate.getTime() - offdate.getTime();
	    var hexd = parseInt(offset).toString(16);

	    if (typeof prefix === 'string' || typeof prefix === 'number') {
	        return prefix + '_' + hexd;
	    } else {
	        return 'WEBIM_' + hexd;
	    }
	};

	connection.prototype.send = function (message) {
	    var self = this;
	    if (this.isWindowSDK) {
	        WebIM.doQuery('{"type":"sendMessage","to":"' + message.to + '","message_type":"' + message.type + '","msg":"' + encodeURI(message.msg) + '","chatType":"' + message.chatType + '"}', function (response) {}, function (code, msg) {
	            var message = {
	                data: {
	                    data: "send"
	                },
	                type: _code.WEBIM_MESSAGE_SED_ERROR
	            };
	            self.onError(message);
	        });
	    } else {
	        if (Object.prototype.toString.call(message) === '[object Object]') {
	            var appKey = this.context.appKey || '';
	            var toJid = appKey + '_' + message.to + '@' + this.domain;

	            if (message.group) {
	                toJid = appKey + '_' + message.to + '@conference.' + this.domain;
	            }
	            if (message.resource) {
	                toJid = toJid + '/' + message.resource;
	            }

	            message.toJid = toJid;
	            message.id = message.id || this.getUniqueId();
	            _msgHash[message.id] = new _message(message);
	            _msgHash[message.id].send(this);
	        } else if (typeof message === 'string') {
	            _msgHash[message] && _msgHash[message].send(this);
	        }
	    }
	};

	connection.prototype.addRoster = function (options) {
	    var jid = _getJid(options, this);
	    var name = options.name || '';
	    var groups = options.groups || '';

	    var iq = $iq({ type: 'set' });
	    iq.c('query', { xmlns: 'jabber:iq:roster' });
	    iq.c('item', { jid: jid, name: name });

	    if (groups) {
	        for (var i = 0; i < groups.length; i++) {
	            iq.c('group').t(groups[i]).up();
	        }
	    }
	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || _utils.emptyfn;
	    this.context.stropheConn.sendIQ(iq.tree(), suc, error);
	};

	connection.prototype.removeRoster = function (options) {
	    var jid = _getJid(options, this);
	    var iq = $iq({ type: 'set' }).c('query', { xmlns: 'jabber:iq:roster' }).c('item', {
	        jid: jid,
	        subscription: 'remove'
	    });

	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || _utils.emptyfn;
	    this.context.stropheConn.sendIQ(iq, suc, error);
	};

	connection.prototype.getRoster = function (options) {
	    var conn = this;
	    var dom = $iq({
	        type: 'get'
	    }).c('query', { xmlns: 'jabber:iq:roster' });

	    var options = options || {};
	    var suc = options.success || this.onRoster;
	    var completeFn = function completeFn(ele) {
	        var rouster = [];
	        var msgBodies = ele.getElementsByTagName('query');
	        if (msgBodies && msgBodies.length > 0) {
	            var queryTag = msgBodies[0];
	            rouster = _parseFriend(queryTag);
	        }
	        suc(rouster, ele);
	    };
	    var error = options.error || this.onError;
	    var failFn = function failFn(ele) {
	        error({
	            type: _code.WEBIM_CONNCTION_GETROSTER_ERROR,
	            data: ele
	        });
	    };
	    if (this.isOpened()) {
	        this.context.stropheConn.sendIQ(dom.tree(), completeFn, failFn);
	    } else {
	        error({
	            type: _code.WEBIM_CONNCTION_DISCONNECTED
	        });
	    }
	};

	connection.prototype.subscribe = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'subscribe' });
	    if (options.message) {
	        pres.c('status').t(options.message).up();
	    }
	    if (options.nick) {
	        pres.c('nick', { 'xmlns': 'http://jabber.org/protocol/nick' }).t(options.nick);
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.subscribed = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'subscribed' });

	    if (options.message) {
	        pres.c('status').t(options.message).up();
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.unsubscribe = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'unsubscribe' });

	    if (options.message) {
	        pres.c('status').t(options.message);
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.unsubscribed = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'unsubscribed' });

	    if (options.message) {
	        pres.c('status').t(options.message).up();
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.joinPublicGroup = function (options) {
	    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
	    var room_nick = roomJid + '/' + this.context.userId;
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_JOINROOM_ERROR,
	            data: ele
	        });
	    };
	    var iq = $pres({
	        from: this.context.jid,
	        to: room_nick
	    }).c('x', { xmlns: Strophe.NS.MUC });

	    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
	};

	connection.prototype.listRooms = function (options) {
	    var iq = $iq({
	        to: options.server || 'conference.' + this.domain,
	        from: this.context.jid,
	        type: 'get'
	    }).c('query', { xmlns: Strophe.NS.DISCO_ITEMS });

	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || this.onError;
	    var completeFn = function completeFn(result) {
	        var rooms = [];
	        rooms = _parseRoom(result);
	        try {
	            suc(rooms);
	        } catch (e) {
	            error({
	                type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
	                data: e
	            });
	        }
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
	};

	connection.prototype.queryRoomMember = function (options) {
	    var domain = this.domain;
	    var members = [];
	    var iq = $iq({
	        to: this.context.appKey + '_' + options.roomId + '@conference.' + this.domain,
	        type: 'get'
	    }).c('query', { xmlns: Strophe.NS.MUC + '#admin' }).c('item', { affiliation: 'member' });

	    var suc = options.success || _utils.emptyfn;
	    var completeFn = function completeFn(result) {
	        var items = result.getElementsByTagName('item');

	        if (items) {
	            for (var i = 0; i < items.length; i++) {
	                var item = items[i];
	                var mem = {
	                    jid: item.getAttribute('jid'),
	                    affiliation: 'member'
	                };
	                members.push(mem);
	            }
	        }
	        suc(members);
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOMMEMBER_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
	};

	connection.prototype.queryRoomInfo = function (options) {
	    var domain = this.domain;
	    var iq = $iq({
	        to: this.context.appKey + '_' + options.roomId + '@conference.' + domain,
	        type: 'get'
	    }).c('query', { xmlns: Strophe.NS.DISCO_INFO });

	    var suc = options.success || _utils.emptyfn;
	    var members = [];

	    var completeFn = function completeFn(result) {
	        var settings = '';
	        var features = result.getElementsByTagName('feature');
	        if (features) {
	            settings = features[1].getAttribute('var') + '|' + features[3].getAttribute('var') + '|' + features[4].getAttribute('var');
	        }
	        switch (settings) {
	            case 'muc_public|muc_membersonly|muc_notallowinvites':
	                settings = 'PUBLIC_JOIN_APPROVAL';
	                break;
	            case 'muc_public|muc_open|muc_notallowinvites':
	                settings = 'PUBLIC_JOIN_OPEN';
	                break;
	            case 'muc_hidden|muc_membersonly|muc_allowinvites':
	                settings = 'PRIVATE_MEMBER_INVITE';
	                break;
	            case 'muc_hidden|muc_membersonly|muc_notallowinvites':
	                settings = 'PRIVATE_OWNER_INVITE';
	                break;
	        }
	        var owner = '';
	        var fields = result.getElementsByTagName('field');
	        var fieldValues = {};
	        if (fields) {
	            for (var i = 0; i < fields.length; i++) {
	                var field = fields[i];
	                var fieldVar = field.getAttribute('var');
	                var fieldSimplify = fieldVar.split('_')[1];
	                switch (fieldVar) {
	                    case 'muc#roominfo_occupants':
	                    case 'muc#roominfo_maxusers':
	                    case 'muc#roominfo_affiliations':
	                    case 'muc#roominfo_description':
	                        fieldValues[fieldSimplify] = field.textContent || field.text || '';
	                        break;
	                    case 'muc#roominfo_owner':
	                        var mem = {
	                            jid: (field.textContent || field.text) + '@' + domain,
	                            affiliation: 'owner'
	                        };
	                        members.push(mem);
	                        fieldValues[fieldSimplify] = field.textContent || field.text;
	                        break;
	                }

	                // if (field.getAttribute('label') === 'owner') {
	                //     var mem = {
	                //         jid: (field.textContent || field.text) + '@' + domain
	                //         , affiliation: 'owner'
	                //     };
	                //     members.push(mem);
	                //     break;
	                // }
	            }
	            fieldValues['name'] = result.getElementsByTagName('identity')[0].getAttribute('name');
	        }
	        log(settings, members, fieldValues);
	        suc(settings, members, fieldValues);
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOMINFO_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
	};

	connection.prototype.queryRoomOccupants = function (options) {
	    var suc = options.success || _utils.emptyfn;
	    var completeFn = function completeFn(result) {
	        var occupants = [];
	        occupants = _parseRoomOccupants(result);
	        suc(occupants);
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR,
	            data: ele
	        });
	    };
	    var attrs = {
	        xmlns: Strophe.NS.DISCO_ITEMS
	    };
	    var info = $iq({
	        from: this.context.jid,
	        to: this.context.appKey + '_' + options.roomId + '@conference.' + this.domain,
	        type: 'get'
	    }).c('query', attrs);
	    this.context.stropheConn.sendIQ(info.tree(), completeFn, errorFn);
	};

	connection.prototype.setUserSig = function (desc) {
	    var dom = $pres({ xmlns: 'jabber:client' });
	    desc = desc || '';
	    dom.c('status').t(desc);
	    this.sendCommand(dom.tree());
	};

	connection.prototype.setPresence = function (type, status) {
	    var dom = $pres({ xmlns: 'jabber:client' });
	    if (type) {
	        if (status) {
	            dom.c('show').t(type);
	            dom.up().c('status').t(status);
	        } else {
	            dom.c('show').t(type);
	        }
	    }
	    this.sendCommand(dom.tree());
	};

	connection.prototype.getPresence = function () {
	    var dom = $pres({ xmlns: 'jabber:client' });
	    var conn = this;
	    this.sendCommand(dom.tree());
	};

	connection.prototype.ping = function (options) {
	    var options = options || {};
	    var jid = _getJid(options, this);

	    var dom = $iq({
	        from: this.context.jid || '',
	        to: jid,
	        type: 'get'
	    }).c('ping', { xmlns: 'urn:xmpp:ping' });

	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || this.onError;
	    var failFn = function failFn(ele) {
	        error({
	            type: _code.WEBIM_CONNCTION_PING_ERROR,
	            data: ele
	        });
	    };
	    if (this.isOpened()) {
	        this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
	    } else {
	        error({
	            type: _code.WEBIM_CONNCTION_DISCONNECTED
	        });
	    }
	    return;
	};

	connection.prototype.isOpened = function () {
	    return this.context.status == _code.STATUS_OPENED;
	};

	connection.prototype.isOpening = function () {
	    var status = this.context.status;
	    return status == _code.STATUS_DOLOGIN_USERGRID || status == _code.STATUS_DOLOGIN_IM;
	};

	connection.prototype.isClosing = function () {
	    return this.context.status == _code.STATUS_CLOSING;
	};

	connection.prototype.isClosed = function () {
	    return this.context.status == _code.STATUS_CLOSED;
	};

	connection.prototype.clear = function () {
	    var key = this.context.appKey;
	    if (this.errorType != _code.WEBIM_CONNCTION_DISCONNECTED) {
	        this.context = {
	            status: _code.STATUS_INIT,
	            appKey: key
	        };
	    }
	    if (this.intervalId) {
	        clearInterval(this.intervalId);
	    }
	    this.restIndex = 0;
	    this.xmppIndex = 0;

	    if (this.errorType == _code.WEBIM_CONNCTION_CLIENT_LOGOUT || this.errorType == -1) {
	        var message = {
	            data: {
	                data: "logout"
	            },
	            type: _code.WEBIM_CONNCTION_CLIENT_LOGOUT
	        };
	        this.onError(message);
	    }
	};

	connection.prototype.getChatRooms = function (options) {

	    if (!_utils.isCanSetRequestHeader) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
	        });
	        return;
	    }

	    var conn = this,
	        token = options.accessToken || this.context.accessToken;

	    if (token) {
	        var apiUrl = options.apiUrl;
	        var appName = this.context.appName;
	        var orgName = this.context.orgName;

	        if (!appName || !orgName) {
	            conn.onError({
	                type: _code.WEBIM_CONNCTION_AUTH_ERROR
	            });
	            return;
	        }

	        var suc = function suc(data, xhr) {
	            typeof options.success === 'function' && options.success(data);
	        };

	        var error = function error(res, xhr, msg) {
	            if (res.error && res.error_description) {
	                conn.onError({
	                    type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
	                    msg: res.error_description,
	                    data: res,
	                    xhr: xhr
	                });
	            }
	        };

	        var pageInfo = {
	            pagenum: parseInt(options.pagenum) || 1,
	            pagesize: parseInt(options.pagesize) || 20
	        };

	        var opts = {
	            url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms',
	            dataType: 'json',
	            type: 'GET',
	            headers: { 'Authorization': 'Bearer ' + token },
	            data: pageInfo,
	            success: suc || _utils.emptyfn,
	            error: error || _utils.emptyfn
	        };
	        _utils.ajax(opts);
	    } else {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
	        });
	    }
	};

	connection.prototype.joinChatRoom = function (options) {
	    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
	    var room_nick = roomJid + '/' + this.context.userId;
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_JOINCHATROOM_ERROR,
	            data: ele
	        });
	    };

	    var iq = $pres({
	        from: this.context.jid,
	        to: room_nick
	    }).c('x', { xmlns: Strophe.NS.MUC + '#user' }).c('item', { affiliation: 'member', role: 'participant' }).up().up().c('roomtype', { xmlns: 'easemob:x:roomtype', type: 'chatroom' });

	    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
	};

	connection.prototype.quitChatRoom = function (options) {
	    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
	    var room_nick = roomJid + '/' + this.context.userId;
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_QUITCHATROOM_ERROR,
	            data: ele
	        });
	    };
	    var iq = $pres({
	        from: this.context.jid,
	        to: room_nick,
	        type: 'unavailable'
	    }).c('x', { xmlns: Strophe.NS.MUC + '#user' }).c('item', { affiliation: 'none', role: 'none' }).up().up().c('roomtype', { xmlns: 'easemob:x:roomtype', type: 'chatroom' });

	    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
	};

	connection.prototype._onReceiveInviteFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var self = this;
	    var options = {
	        title: "Group invitation",
	        msg: info.user + " invites you to join into group:" + info.group_id,
	        agree: function agree() {
	            WebIM.doQuery('{"type":"acceptInvitationFromGroup","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                var message = {
	                    data: {
	                        data: "acceptInvitationFromGroup error:" + msg
	                    },
	                    type: _code.WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP
	                };
	                self.onError(message);
	            });
	        },
	        reject: function reject() {
	            WebIM.doQuery('{"type":"declineInvitationFromGroup","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                var message = {
	                    data: {
	                        data: "declineInvitationFromGroup error:" + msg
	                    },
	                    type: _code.WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP
	                };
	                self.onError(message);
	            });
	        }
	    };

	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveInviteAcceptionFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation response",
	        msg: info.user + " agreed to join into group:" + info.group_id,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveInviteDeclineFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation response",
	        msg: info.user + " rejected to join into group:" + info.group_id,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onAutoAcceptInvitationFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation",
	        msg: "You had joined into the group:" + info.group_name + " automatically.Inviter:" + info.user,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onLeaveGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group notification",
	        msg: "You have been out of the group:" + info.group_id + ".Reason:" + info.msg,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveJoinGroupApplication = function (info) {
	    info = eval('(' + info + ')');
	    var self = this;
	    var options = {
	        title: "Group join application",
	        msg: info.user + " applys to join into group:" + info.group_id,
	        agree: function agree() {
	            WebIM.doQuery('{"type":"acceptJoinGroupApplication","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                var message = {
	                    data: {
	                        data: "acceptJoinGroupApplication error:" + msg
	                    },
	                    type: _code.WEBIM_CONNECTION_ACCEPT_JOIN_GROUP
	                };
	                self.onError(message);
	            });
	        },
	        reject: function reject() {
	            WebIM.doQuery('{"type":"declineJoinGroupApplication","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                var message = {
	                    data: {
	                        data: "declineJoinGroupApplication error:" + msg
	                    },
	                    type: _code.WEBIM_CONNECTION_DECLINE_JOIN_GROUP
	                };
	                self.onError(message);
	            });
	        }
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveAcceptionFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group notification",
	        msg: "You had joined into the group:" + info.group_name + ".",
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveRejectionFromGroup = function () {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group notification",
	        msg: "You have been rejected to join into the group:" + info.group_name + ".",
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onUpdateMyGroupList = function (options) {
	    this.onUpdateMyGroupList(options);
	};
	connection.prototype._onUpdateMyRoster = function (options) {
	    this.onUpdateMyRoster(options);
	};
	connection.prototype.reconnect = function () {
	    var that = this;
	    setTimeout(function () {
	        _login(that.context.restTokenData, that);
	    }, (this.autoReconnectNumTotal == 0 ? 0 : this.autoReconnectInterval) * 1000);
	    this.autoReconnectNumTotal++;
	};

	connection.prototype.closed = function () {
	    var message = {
	        data: {
	            data: "Closed error"
	        },
	        type: _code.WEBIM_CONNECTION_CLOSED
	    };
	    this.onError(message);
	};

	// used for blacklist
	function _parsePrivacy(iq) {
	    var list = [];
	    var items = iq.getElementsByTagName('item');

	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var jid = item.getAttribute('value');
	            var order = item.getAttribute('order');
	            var type = item.getAttribute('type');
	            if (!jid) {
	                continue;
	            }
	            var n = _parseNameFromJidFn(jid);
	            list[n] = {
	                type: type,
	                order: order,
	                jid: jid,
	                name: n
	            };
	        }
	    }
	    return list;
	};

	// used for blacklist
	connection.prototype.getBlacklist = function (options) {
	    options = options || {};
	    var iq = $iq({ type: 'get' });
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var me = this;

	    iq.c('query', { xmlns: 'jabber:iq:privacy' }).c('list', { name: 'special' });

	    this.context.stropheConn.sendIQ(iq.tree(), function (iq) {
	        me.onBlacklistUpdate(_parsePrivacy(iq));
	        sucFn();
	    }, function () {
	        me.onBlacklistUpdate([]);
	        errFn();
	    });
	};

	// used for blacklist
	connection.prototype.addToBlackList = function (options) {
	    var iq = $iq({ type: 'set' });
	    var blacklist = options.list || {};
	    var type = options.type || 'jid';
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var piece = iq.c('query', { xmlns: 'jabber:iq:privacy' }).c('list', { name: 'special' });

	    var keys = Object.keys(blacklist);
	    var len = keys.length;
	    var order = 2;

	    for (var i = 0; i < len; i++) {
	        var item = blacklist[keys[i]];
	        var type = item.type || 'jid';
	        var jid = item.jid;

	        piece = piece.c('item', { action: 'deny', order: order++, type: type, value: jid }).c('message');
	        if (i !== len - 1) {
	            piece = piece.up().up();
	        }
	    }

	    // log('addToBlackList', blacklist, piece.tree());
	    this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
	};

	// used for blacklist
	connection.prototype.removeFromBlackList = function (options) {

	    var iq = $iq({ type: 'set' });
	    var blacklist = options.list || {};
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var piece = iq.c('query', { xmlns: 'jabber:iq:privacy' }).c('list', { name: 'special' });

	    var keys = Object.keys(blacklist);
	    var len = keys.length;

	    for (var i = 0; i < len; i++) {
	        var item = blacklist[keys[i]];
	        var type = item.type || 'jid';
	        var jid = item.jid;
	        var order = item.order;

	        piece = piece.c('item', { action: 'deny', order: order, type: type, value: jid }).c('message');
	        if (i !== len - 1) {
	            piece = piece.up().up();
	        }
	    }

	    // log('removeFromBlackList', blacklist, piece.tree());
	    this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
	};

	connection.prototype._getGroupJid = function (to) {
	    var appKey = this.context.appKey || '';
	    return appKey + '_' + to + '@conference.' + this.domain;
	};

	// used for blacklist
	connection.prototype.addToGroupBlackList = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var jid = _getJid(options, this);
	    var affiliation = 'admin'; //options.affiliation || 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'outcast',
	        jid: jid
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), sucFn, errFn);
	};

	function _parseGroupBlacklist(iq) {
	    var list = {};
	    var items = iq.getElementsByTagName('item');

	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var jid = item.getAttribute('jid');
	            var affiliation = item.getAttribute('affiliation');
	            var nick = item.getAttribute('nick');
	            if (!jid) {
	                continue;
	            }
	            var n = _parseNameFromJidFn(jid);
	            list[n] = {
	                jid: jid,
	                affiliation: affiliation,
	                nick: nick,
	                name: n
	            };
	        }
	    }
	    return list;
	}

	// used for blacklist
	connection.prototype.getGroupBlacklist = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // var jid = _getJid(options, this);
	    var affiliation = 'admin'; //options.affiliation || 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'get', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'outcast'
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        log('getGroupBlackList');
	        sucFn(_parseGroupBlacklist(msginfo));
	    }, function () {
	        errFn();
	    });
	};

	// used for blacklist
	connection.prototype.removeGroupMemberFromBlacklist = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    var jid = _getJid(options, this);
	    var affiliation = 'admin'; //options.affiliation || 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'none',
	        jid: jid
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        sucFn();
	    }, function () {
	        errFn();
	    });
	};

	/**
	 * changeGroupSubject 修改群名称
	 *
	 * @param options
	 */
	// <iq to='easemob-demo#chatdemoui_roomid@conference.easemob.com' type='set' id='3940489311' xmlns='jabber:client'>
	//     <query xmlns='http://jabber.org/protocol/muc#owner'>
	//         <x type='submit' xmlns='jabber:x:data'>
	//             <field var='FORM_TYPE'><value>http://jabber.org/protocol/muc#roomconfig</value></field>
	//             <field var='muc#roomconfig_roomname'><value>Room Name</value></field>
	//         </x>
	//     </query>
	// </iq>
	connection.prototype.changeGroupSubject = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // must be `owner`
	    var affiliation = 'owner';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('x', { type: 'submit', xmlns: 'jabber:x:data' }).c('field', { 'var': 'FORM_TYPE' }).c('value').t('http://jabber.org/protocol/muc#roomconfig').up().up().c('field', { 'var': 'muc#roomconfig_roomname' }).c('value').t(options.subject).up().up().c('field', { 'var': 'muc#roomconfig_roomdesc' }).c('value').t(options.description);

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        sucFn();
	    }, function () {
	        errFn();
	    });
	};

	/**
	 * destroyGroup 删除群组
	 *
	 * @param options
	 */
	// <iq id="9BEF5D20-841A-4048-B33A-F3F871120E58" to="easemob-demo#chatdemoui_1477462231499@conference.easemob.com" type="set">
	//     <query xmlns="http://jabber.org/protocol/muc#owner">
	//         <destroy>
	//             <reason>xxx destory group yyy</reason>
	//         </destroy>
	//     </query>
	// </iq>
	connection.prototype.destroyGroup = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // must be `owner`
	    var affiliation = 'owner';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('destroy').c('reason').t(options.reason || '');

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        sucFn();
	    }, function () {
	        errFn();
	    });
	};

	/**
	 * leaveGroupBySelf 主动离开群组
	 *
	 * @param options
	 */
	// <iq id="5CD33172-7B62-41B7-98BC-CE6EF840C4F6_easemob_occupants_change_affiliation" to="easemob-demo#chatdemoui_1477481609392@conference.easemob.com" type="set">
	//     <query xmlns="http://jabber.org/protocol/muc#admin">
	//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
	//     </query>
	// </iq>
	// <presence to="easemob-demo#chatdemoui_1479811172349@conference.easemob.com/mt002" type="unavailable"/>

	connection.prototype.leaveGroupBySelf = function (options) {
	    var self = this;
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // must be `owner`
	    var jid = _getJid(options, this);
	    var affiliation = 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'none',
	        jid: jid
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        sucFn(msgInfo);
	        var pres = $pres({ type: 'unavailable', to: to + '/' + self.context.userId });
	        self.sendCommand(pres.tree());
	    }, function (errInfo) {
	        errFn(errInfo);
	    });
	};

	/**
	 * leaveGroup 被踢出群组
	 *
	 * @param options
	 */
	// <iq id="9fb25cf4-1183-43c9-961e-9df70e300de4:sendIQ" to="easemob-demo#chatdemoui_1477481597120@conference.easemob.com" type="set" xmlns="jabber:client">
	//     <query xmlns="http://jabber.org/protocol/muc#admin">
	//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz4@easemob.com"/>
	//         <item jid="easemob-demo#chatdemoui_lwz4@easemob.com" role="none"/>
	//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
	//         <item jid="easemob-demo#chatdemoui_lwz2@easemob.com" role="none"/>
	//     </query>
	// </iq>
	connection.prototype.leaveGroup = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var list = options.list || [];
	    var affiliation = 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });
	    var piece = iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation });
	    var keys = Object.keys(list);
	    var len = keys.length;

	    for (var i = 0; i < len; i++) {
	        var name = list[keys[i]];
	        var jid = _getJidByName(name, this);

	        piece = piece.c('item', {
	            affiliation: 'none',
	            jid: jid
	        }).up().c('item', {
	            role: 'none',
	            jid: jid
	        }).up();
	    }

	    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        sucFn(msgInfo);
	    }, function (errInfo) {
	        errFn(errInfo);
	    });
	};

	/**
	 * addGroupMembers 添加群组成员
	 *
	 * @param options

	 Attention the sequence: message first (每个成员单独发一条message), iq second (多个成员可以合成一条iq发)
	 <!-- 添加成员通知：send -->
	 <message to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com'>
	 <x xmlns='http://jabber.org/protocol/muc#user'>
	 <invite to='easemob-demo#chatdemoui_lwz2@easemob.com'>
	 <reason>liuwz invite you to join group '谢谢'</reason>
	 </invite>
	 </x>
	 </message>
	 <!-- 添加成员：send -->
	 <iq id='09DFB1E5-C939-4C43-B5A7-8000DA0E3B73_easemob_occupants_change_affiliation' to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com' type='set'>
	 <query xmlns='http://jabber.org/protocol/muc#admin'>
	 <item affiliation='member' jid='easemob-demo#chatdemoui_lwz2@easemob.com'/>
	 </query>
	 </iq>
	 */

	connection.prototype.addGroupMembers = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var list = options.list || [];
	    var affiliation = 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });
	    var piece = iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation });
	    var len = list.length;

	    for (var i = 0; i < len; i++) {

	        var name = list[i];
	        var jid = _getJidByName(name, this);

	        piece = piece.c('item', {
	            affiliation: 'member',
	            jid: jid
	        }).up();

	        var dom = $msg({
	            to: to
	        }).c('x', {
	            xmlns: 'http://jabber.org/protocol/muc#user'
	        }).c('invite', {
	            to: jid
	        }).c('reason').t(options.reason || '');

	        this.sendCommand(dom.tree());
	    }

	    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        sucFn(msgInfo);
	    }, function (errInfo) {
	        errFn(errInfo);
	    });
	};

	/**
	 * acceptInviteFromGroup 接受加入申请
	 *
	 * @param options
	 */
	connection.prototype.acceptInviteFromGroup = function (options) {
	    options.success = function () {
	        // then send sendAcceptInviteMessage
	        // connection.prototype.sendAcceptInviteMessage(optoins);
	    };
	    this.addGroupMembers(options);
	};

	/**
	 * rejectInviteFromGroup 拒绝入群申请
	 *
	 * throw request for now 暂时不处理，直接丢弃
	 *
	 <message to='easemob-demo#chatdemoui_mt002@easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' id='B83B7210-BCFF-4DEE-AB28-B9FE5579C1E2'>
	 <x xmlns='http://jabber.org/protocol/muc#user'>
	 <apply to='easemob-demo#chatdemoui_groupid1@conference.easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' toNick='llllll'>
	 <reason>reject</reason>
	 </apply>
	 </x>
	 </message>
	 *
	 * @param options
	 */
	connection.prototype.rejectInviteFromGroup = function (options) {
	    // var from = _getJidByName(options.from, this);
	    // var dom = $msg({
	    //     from: from,
	    //     to: _getJidByName(options.to, this)
	    // }).c('x', {
	    //     xmlns: 'http://jabber.org/protocol/muc#user'
	    // }).c('apply', {
	    //     from: from,
	    //     to: this._getGroupJid(options.groupId),
	    //     toNick: options.groupName
	    // }).c('reason').t(options.reason || '');
	    //
	    // this.sendCommand(dom.tree());
	};

	connection.prototype.createGroupAsync = function (p) {
	    var roomId = p.from;
	    var me = this;
	    var toRoom = this._getGroupJid(roomId);
	    var to = toRoom + '/' + this.context.userId;
	    var options = this.groupOption;
	    var suc = p.success || _utils.emptyfn;

	    // Creating a Reserved Room
	    var iq = $iq({ type: 'get', to: toRoom }).c('query', { xmlns: 'http://jabber.org/protocol/muc#owner' });

	    // Strophe.info('step 1 ----------');
	    // Strophe.info(options);
	    me.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        // log(msgInfo);

	        // for ie hack
	        if ('setAttribute' in msgInfo) {
	            // Strophe.info('step 3 ----------');
	            var x = msgInfo.getElementsByTagName('x')[0];
	            x.setAttribute('type', 'submit');
	        } else {
	            // Strophe.info('step 4 ----------');
	            Strophe.forEachChild(msgInfo, 'x', function (field) {
	                field.setAttribute('type', 'submit');
	            });
	        }

	        Strophe.info('step 5 ----------');
	        Strophe.forEachChild(x, 'field', function (field) {
	            var fieldVar = field.getAttribute('var');
	            var valueDom = field.getElementsByTagName('value')[0];
	            Strophe.info(fieldVar);
	            switch (fieldVar) {
	                case 'muc#roomconfig_roomname':
	                    _setText(valueDom, options.subject || '');
	                    break;
	                case 'muc#roomconfig_roomdesc':
	                    _setText(valueDom, options.description || '');
	                    break;
	                case 'muc#roomconfig_publicroom':
	                    // public 1
	                    _setText(valueDom, +options.optionsPublic);
	                    break;
	                case 'muc#roomconfig_membersonly':
	                    _setText(valueDom, +options.optionsMembersOnly);
	                    break;
	                case 'muc#roomconfig_moderatedroom':
	                    _setText(valueDom, +options.optionsModerate);
	                    break;
	                case 'muc#roomconfig_persistentroom':
	                    _setText(valueDom, 1);
	                    break;
	                case 'muc#roomconfig_allowinvites':
	                    _setText(valueDom, +options.optionsAllowInvites);
	                    break;
	                case 'muc#roomconfig_allowvisitornickchange':
	                    _setText(valueDom, 0);
	                    break;
	                case 'muc#roomconfig_allowvisitorstatus':
	                    _setText(valueDom, 0);
	                    break;
	                case 'allow_private_messages':
	                    _setText(valueDom, 0);
	                    break;
	                case 'allow_private_messages_from_visitors':
	                    _setText(valueDom, 'nobody');
	                    break;
	                default:
	                    break;
	            }
	        });

	        var iq = $iq({ to: toRoom, type: 'set' }).c('query', { xmlns: 'http://jabber.org/protocol/muc#owner' }).cnode(x);

	        me.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	            me.addGroupMembers({
	                list: options.members,
	                roomId: roomId
	            });

	            suc(options);
	        }, function (errInfo) {
	            // errFn(errInfo);
	        });
	        // sucFn(msgInfo);
	    }, function (errInfo) {
	        // errFn(errInfo);
	    });
	};

	/**
	 * createGroup 创建群组
	 *
	 * 1. 创建申请 -> 得到房主身份
	 * 2. 获取房主信息 -> 得到房间form
	 * 3. 完善房间form -> 创建成功
	 * 4. 添加房间成员
	 * 5. 消息通知成员
	 * @param options
	 */
	connection.prototype.createGroup = function (options) {
	    this.groupOption = options;
	    var roomId = +new Date();
	    var toRoom = this._getGroupJid(roomId);
	    var to = toRoom + '/' + this.context.userId;

	    var pres = $pres({ to: to }).c('x', { xmlns: 'http://jabber.org/protocol/muc' }).up().c('create', { xmlns: 'http://jabber.org/protocol/muc' }).up();

	    // createGroupACK
	    this.sendCommand(pres.tree());
	};

	function _setText(valueDom, v) {
	    if ('textContent' in valueDom) {
	        valueDom.textContent = v;
	    } else if ('text' in valueDom) {
	        valueDom.text = v;
	    } else {
	        // Strophe.info('_setText 4 ----------');
	        // valueDom.innerHTML = v;
	    }
	}

	var WebIM = window.WebIM || {};
	WebIM.connection = connection;
	WebIM.utils = _utils;
	WebIM.statusCode = _code;
	WebIM.message = _msg.message;
	WebIM.doQuery = function (str, suc, fail) {
	    if (typeof window.cefQuery === 'undefined') {
	        return;
	    }
	    window.cefQuery({
	        request: str,
	        persistent: false,
	        onSuccess: suc,
	        onFailure: fail
	    });
	};

	module.exports = WebIM;

	if (false) {
	    module.hot.accept();
	}

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	;(function () {
	    'use strict';

	    var _utils = __webpack_require__(217).utils;
	    var Message = function Message(type, id) {
	        if (!this instanceof Message) {
	            return new Message(type);
	        }

	        this._msg = {};

	        if (typeof Message[type] === 'function') {
	            Message[type].prototype.setGroup = this.setGroup;
	            this._msg = new Message[type](id);
	        }
	        return this._msg;
	    };
	    Message.prototype.setGroup = function (group) {
	        this.body.group = group;
	    };

	    /*
	     * text message
	     */
	    Message.txt = function (id) {
	        this.id = id;
	        this.type = 'txt';
	        this.body = {};
	    };
	    Message.txt.prototype.set = function (opt) {
	        this.value = opt.msg;
	        this.body = {
	            id: this.id,
	            to: opt.to,
	            msg: this.value,
	            type: this.type,
	            roomType: opt.roomType,
	            ext: opt.ext || {},
	            success: opt.success,
	            fail: opt.fail
	        };

	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * cmd message
	     */
	    Message.cmd = function (id) {
	        this.id = id;
	        this.type = 'cmd';
	        this.body = {};
	    };
	    Message.cmd.prototype.set = function (opt) {
	        this.value = '';

	        this.body = {
	            to: opt.to,
	            action: opt.action,
	            msg: this.value,
	            type: this.type,
	            roomType: opt.roomType,
	            ext: opt.ext || {},
	            success: opt.success
	        };
	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * loc message
	     */
	    Message.location = function (id) {
	        this.id = id;
	        this.type = 'loc';
	        this.body = {};
	    };
	    Message.location.prototype.set = function (opt) {
	        this.body = {
	            to: opt.to,
	            type: this.type,
	            roomType: opt.roomType,
	            addr: opt.addr,
	            lat: opt.lat,
	            lng: opt.lng,
	            ext: opt.ext || {}
	        };
	    };

	    /*
	     * img message
	     */
	    Message.img = function (id) {
	        this.id = id;
	        this.type = 'img';
	        this.body = {};
	    };
	    Message.img.prototype.set = function (opt) {
	        opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

	        this.value = opt.file;

	        this.body = {
	            id: this.id,
	            file: this.value,
	            apiUrl: opt.apiUrl,
	            to: opt.to,
	            type: this.type,
	            ext: opt.ext || {},
	            roomType: opt.roomType,
	            onFileUploadError: opt.onFileUploadError,
	            onFileUploadComplete: opt.onFileUploadComplete,
	            success: opt.success,
	            fail: opt.fail,
	            flashUpload: opt.flashUpload,
	            width: opt.width,
	            height: opt.height,
	            body: opt.body,
	            uploadError: opt.uploadError,
	            uploadComplete: opt.uploadComplete
	        };

	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * audio message
	     */
	    Message.audio = function (id) {
	        this.id = id;
	        this.type = 'audio';
	        this.body = {};
	    };
	    Message.audio.prototype.set = function (opt) {
	        opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

	        this.value = opt.file;
	        this.filename = opt.filename || this.value.filename;

	        this.body = {
	            id: this.id,
	            file: this.value,
	            filename: this.filename,
	            apiUrl: opt.apiUrl,
	            to: opt.to,
	            type: this.type,
	            ext: opt.ext || {},
	            length: opt.length || 0,
	            roomType: opt.roomType,
	            file_length: opt.file_length,
	            onFileUploadError: opt.onFileUploadError,
	            onFileUploadComplete: opt.onFileUploadComplete,
	            success: opt.success,
	            fail: opt.fail,
	            flashUpload: opt.flashUpload,
	            body: opt.body
	        };
	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * file message
	     */
	    Message.file = function (id) {
	        this.id = id;
	        this.type = 'file';
	        this.body = {};
	    };
	    Message.file.prototype.set = function (opt) {
	        opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

	        this.value = opt.file;
	        this.filename = opt.filename || this.value.filename;

	        this.body = {
	            id: this.id,
	            file: this.value,
	            filename: this.filename,
	            apiUrl: opt.apiUrl,
	            to: opt.to,
	            type: this.type,
	            ext: opt.ext || {},
	            roomType: opt.roomType,
	            onFileUploadError: opt.onFileUploadError,
	            onFileUploadComplete: opt.onFileUploadComplete,
	            success: opt.success,
	            fail: opt.fail,
	            flashUpload: opt.flashUpload,
	            body: opt.body
	        };
	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * video message
	     */
	    Message.video = function (id) {};
	    Message.video.prototype.set = function (opt) {};

	    var _Message = function _Message(message) {

	        if (!this instanceof _Message) {
	            return new _Message(message, conn);
	        }

	        this.msg = message;
	    };

	    _Message.prototype.send = function (conn) {
	        var me = this;

	        var _send = function _send(message) {

	            message.ext = message.ext || {};
	            message.ext.weichat = message.ext.weichat || {};
	            message.ext.weichat.originType = message.ext.weichat.originType || 'webim';

	            var json = {
	                from: conn.context.userId || '',
	                to: message.to,
	                bodies: [message.body],
	                ext: message.ext || {}
	            };

	            var jsonstr = _utils.stringify(json);
	            var dom = $msg({
	                type: message.group || 'chat',
	                to: message.toJid,
	                id: message.id,
	                xmlns: 'jabber:client'
	            }).c('body').t(jsonstr);

	            if (message.roomType) {
	                dom.up().c('roomtype', { xmlns: 'easemob:x:roomtype', type: 'chatroom' });
	            }

	            setTimeout(function () {
	                if (typeof _msgHash !== 'undefined' && _msgHash[message.id]) {
	                    _msgHash[message.id].msg.fail instanceof Function && _msgHash[message.id].msg.fail(message.id);
	                }
	            }, 60000);
	            conn.sendCommand(dom.tree(), message.id);
	        };

	        if (me.msg.file) {
	            if (me.msg.body && me.msg.body.url) {
	                // Only send msg
	                _send(me.msg);
	                return;
	            }
	            var _tmpComplete = me.msg.onFileUploadComplete;
	            var _complete = function _complete(data) {

	                if (data.entities[0]['file-metadata']) {
	                    var file_len = data.entities[0]['file-metadata']['content-length'];
	                    me.msg.file_length = file_len;
	                    me.msg.filetype = data.entities[0]['file-metadata']['content-type'];
	                    if (file_len > 204800) {
	                        me.msg.thumbnail = true;
	                    }
	                }

	                me.msg.body = {
	                    type: me.msg.type || 'file',

	                    url: (location.protocol != 'https:' && conn.isHttpDNS ? conn.apiUrl + data.uri.substr(data.uri.indexOf("/", 9)) : data.uri) + '/' + data.entities[0]['uuid'],
	                    secret: data.entities[0]['share-secret'],
	                    filename: me.msg.file.filename || me.msg.filename,
	                    size: {
	                        width: me.msg.width || 0,
	                        height: me.msg.height || 0
	                    },
	                    length: me.msg.length || 0,
	                    file_length: me.msg.file_length || 0,
	                    filetype: me.msg.filetype
	                };
	                _send(me.msg);
	                _tmpComplete instanceof Function && _tmpComplete(data, me.msg.id);
	            };

	            me.msg.onFileUploadComplete = _complete;
	            _utils.uploadFile.call(conn, me.msg);
	        } else {
	            me.msg.body = {
	                type: me.msg.type === 'chat' ? 'txt' : me.msg.type,
	                msg: me.msg.msg
	            };
	            if (me.msg.type === 'cmd') {
	                me.msg.body.action = me.msg.action;
	            } else if (me.msg.type === 'loc') {
	                me.msg.body.addr = me.msg.addr;
	                me.msg.body.lat = me.msg.lat;
	                me.msg.body.lng = me.msg.lng;
	            }

	            _send(me.msg);
	        }
	    };

	    exports._msg = _Message;
	    exports.message = Message;
	})();

/***/ },

/***/ 227:
/***/ function(module, exports) {

	"use strict";

	;(function () {
	    function Array_h(length) {
	        this.array = length === undefined ? [] : new Array(length);
	    }

	    Array_h.prototype = {
	        /**
	         * 返回数组长度
	         *
	         * @return {Number} length [数组长度]
	         */
	        length: function length() {
	            return this.array.length;
	        },

	        at: function at(index) {
	            return this.array[index];
	        },

	        set: function set(index, obj) {
	            this.array[index] = obj;
	        },

	        /**
	         * 向数组的末尾添加一个或多个元素，并返回新的长度。
	         *
	         * @param  {*} obj [description]
	         * @return {Number} length [新数组的长度]
	         */
	        push: function push(obj) {
	            return this.array.push(obj);
	        },

	        /**
	         * 返回数组中选定的元素
	         *
	         * @param  {Number} start [开始索引值]
	         * @param  {Number} end [结束索引值]
	         * @return {Array} newArray  [新的数组]
	         */
	        slice: function slice(start, end) {
	            return this.array = this.array.slice(start, end);
	        },

	        concat: function concat(array) {
	            this.array = this.array.concat(array);
	        },

	        remove: function remove(index, count) {
	            count = count === undefined ? 1 : count;
	            this.array.splice(index, count);
	        },

	        join: function join(separator) {
	            return this.array.join(separator);
	        },

	        clear: function clear() {
	            this.array.length = 0;
	        }
	    };

	    /**
	     * 先进先出队列 (First Input First Output)
	     *
	     * 一种先进先出的数据缓存器
	     */
	    var Queue = function Queue() {
	        this._array_h = new Array_h();
	    };

	    Queue.prototype = {
	        _index: 0,

	        /**
	         * 排队
	         *
	         * @param  {Object} obj [description]
	         * @return {[type]}     [description]
	         */
	        push: function push(obj) {
	            this._array_h.push(obj);
	        },

	        /**
	         * 出队
	         *
	         * @return {Object} [description]
	         */
	        pop: function pop() {
	            var ret = null;
	            if (this._array_h.length()) {
	                ret = this._array_h.at(this._index);
	                if (++this._index * 2 >= this._array_h.length()) {
	                    this._array_h.slice(this._index);
	                    this._index = 0;
	                }
	            }
	            return ret;
	        },

	        /**
	         * 返回队列中头部(即最新添加的)的动态对象
	         *
	         * @return {Object} [description]
	         */
	        head: function head() {
	            var ret = null,
	                len = this._array_h.length();
	            if (len) {
	                ret = this._array_h.at(len - 1);
	            }
	            return ret;
	        },

	        /**
	         * 返回队列中尾部(即最早添加的)的动态对象
	         *
	         * @return {Object} [description]
	         */
	        tail: function tail() {
	            var ret = null,
	                len = this._array_h.length();
	            if (len) {
	                ret = this._array_h.at(this._index);
	            }
	            return ret;
	        },

	        /**
	         * 返回数据队列长度
	         *
	         * @return {Number} [description]
	         */
	        length: function length() {
	            return this._array_h.length() - this._index;
	        },

	        /**
	         * 队列是否为空
	         *
	         * @return {Boolean} [description]
	         */
	        empty: function empty() {
	            return this._array_h.length() === 0;
	        },

	        clear: function clear() {
	            this._array_h.clear();
	        }
	    };
	    exports.Queue = Queue;
	})();

/***/ }

/******/ });
/*****************************************************
 *
 */
var transferMap = {
    system: [],
    comments: ['欢迎对我的服务做出评价', '点击评价', ctx + 'html/evaluate/evaluate.html'],
    recipel: ['已为您制定个人调理方案，请查收', '查看调理方案', ctx + 'html/scheme/scheme_detail.html'],
    recordAudio: ['与患者的电话沟通结束', '点击收听录音'],
    schedule: ['邀请您来找我面诊', '查看坐诊信息', ctx + 'html/selector/select_patient.html?opener=appointment'],
    finishInquiry: ['请补填问诊单，以便更准确的为您辩证', '补填问诊单', ctx + 'sysInquiry/redirectSysInquiry'],
    doctorRefund: ['医生已发起退款，咨询已结束', '查看退款详情', ctx + 'html/refund/refund.html'],
    finishedInquiry: ['我的问诊单已填完，请您查看', '查看问诊单', ctx + 'html/inquiry/sheet.html'],
    guoyuweiFinishedInquiry: ['我的问诊单已填完，请您查看', '查看问诊单', ctx + 'html/inquiry/custom/guoyuwei/preview.html']
};
(function () {
    var IM = function (username, password, targetName, loginCallback) {
        this.targetName = targetName;
        this.loginCallback = loginCallback;
        this.username = username;
        this.password = password;
        this.init();
    };
    IM.prototype = {
        init: function (username, password) {
            this.options = {};
            this.connect();
            this.addListener();
            this.login();
        },
        connect: function () {
            //连接
            this.conn = new WebIM.connection({
                isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
                https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
                url: WebIM.config.xmppURL,
                isAutoLogin: true,
                heartBeatWait: WebIM.config.heartBeatWait,
                autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
                autoReconnectInterval: WebIM.config.autoReconnectInterval
            });
        },
        login: function () {
            var that = this;
            var options = {
                user: this.username,
                pwd: this.password,
                apiUrl: WebIM.config.apiURL,
                appKey: WebIM.config.appkey,
                success: function (token) {
                    if (that.loginCallback) {
                        that.loginCallback(true);
                    }
                }
            };
            this.conn.open(options);
        },
        addListener: function () {
            var that = this;
            this.conn.listen({
                onOpened: function (message) { //连接成功回调，连接成功后才可以发送消息
                    that.timestamp = new Date().getTime() + 1000;
                },
                onAudioMessage: function (message) {   //收到音频消息
                    if (new Date().getTime() < that.timestamp || that.targetName !== message.from && message.from !== 'serviceuser') {
                        return;
                    }
                    var options = {url: message.url};

                    options.onFileDownloadComplete = function (response) {
                        //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
                        var objectURL = WebIM.utils.parseDownloadResponse.call(that.conn, response);
                        var size = Math.ceil(response.size / 1024);
                        if (that.yourMessageCallback) {
                            that.yourMessageCallback(objectURL + '##' + size, 'audio');
                        }
                    };
                    options.onFileDownloadError = function () {
                        //音频下载失败
                    };
                    //通知服务器将音频转为mp3
                    options.headers = {'Accept': 'audio/mp3'};

                    WebIM.utils.download.call(that.conn, options);
                },
                onTextMessage: function (message) { //收到文本消息
                    if (new Date().getTime() < that.timestamp || that.targetName !== message.from && message.from !== 'serviceuser') {
                        return;
                    }
                    var ext = message.ext, data, type = 'txt';
                    if (ext.em_apns_ext) {
                        ext = JSON.parse(ext.em_apns_ext);
                    }
                    if (ext.cmdType) {
                        data = {
                            type: ext.cmdType,
                            cmdType: ext.cmdType,
                            content: ext.cmdType === 'system' ? ext.content : "",
                            url: "",
                            param: ext.param
                        };
                        if (ext.cmdType === 'recordAudio') {
                            data.url = ext.url;
                        } else if (ext.cmdType === 'system') {

                        } else {
                            var url = transferMap[ext.cmdType][2];
                            if (url.indexOf('?') !== -1) {
                                data.url = url + '&' + ext.param;
                            } else {
                                data.url = url + '?' + ext.param;
                            }

                        }
                        type = ext.cmdType;
                        //存库参数删除url
                        var _data = JSON.parse(JSON.stringify(data));
                        data.data = JSON.stringify(_data);
                        delete _data.url;
                    } else {
                        data = {data: message.data};
                    }

                    if (that.yourMessageCallback) {
                        that.yourMessageCallback(data, type);
                    }
                },
                onCmdMessage: function (message) {//收到命令消息
                    if (new Date().getTime() < that.timestamp || that.targetName != message.from && message.from !== 'serviceuser') {
                        return;
                    }
                    var ext = message.ext;
                    if (that.yourMessageCallback)
                        that.yourMessageCallback({type: ext.cmdType, data: ext.content, from: message.from}, 'system');
                },
                onPictureMessage: function (message) {//收到图片消息
                    if (new Date().getTime() < that.timestamp || that.targetName != message.from && message.from !== 'serviceuser') {
                        return;
                    }
                    var options = {
                        url: message.url
                    };
                    if (that.yourMessageCallback) {
                        that.yourMessageCallback(message, 'img');
                    }
                    options.onFileDownloadComplete = function (type, result) {
                        // 图片下载成功
                    };
                    options.onFileDownloadError = function () {
                        // 图片下载失败
                        console.log('Image download failed!');
                    };
                    WebIM.utils.download.call(that.conn, options); // 意义待查

                },
                onOnline: function () {//本机网络连接成功
                    console.log('onLine');
                },
                onOffline: function () { //本机网络掉线
                    console.log('offline');
                },
                onError: function (message) { //失败回调
                    console.log('Error', message);
                    if (message.type == 7) {
                        _im.init();//失败重联
                    }
                }
            });
        },
        sendPrivateText: function (text, callback) {
            var id = this.conn.getUniqueId();
            var msg = new WebIM.message('txt', id);
            msg.set({
                msg: text, // 消息内容
                to: this.targetName, // 接收消息对象
                roomType: false,
                success: function (id, serverMsgId) {
                    if (callback) {
                        callback(text);
                    }
                }
            });
            msg.body.chatType = 'singleChat';
            this.conn.send(msg.body);
        },
        sendPrivateImage: function (file, ext, onFileUploadError, onFileUploadComplete, success) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: WebIM.utils.getFileUrl({files: new files([file])}),
                to: this.targetName, // 接收消息对象
                roomType: false,
                chatType: 'singleChat',
                ext: ext,
                onFileUploadError: function () { // 消息上传失败
                    if (onFileUploadError) {
                        onFileUploadError();
                    }
                },
                onFileUploadComplete: function (e) { // 消息上传成功
                    if (onFileUploadComplete) {
                        onFileUploadComplete();
                    }
                },
                success: function () { // 消息发送成功
                    if (success) {
                        success();
                    }
                },
                flashUpload: WebIM.flashUpload
            };
            var id = this.conn.getUniqueId(); // 生成本地消息id
            var msg = new WebIM.message('img', id); // 创建文件消息
            msg.set(option);
            this.conn.send(msg.body);
        },
        sendExtText: function (obj, callback) {
            obj = obj || {msg: ''};
            var ext = JSON.parse(JSON.stringify(obj));
            delete ext.msg;
            if (!ext.patientId) {
                ext.patientId = "";
            }
            var id = this.conn.getUniqueId();
            var msg = new WebIM.message('txt', id);
            msg.set({
                msg: obj.msg || '', // 消息内容
                to: this.targetName, // 接收消息对象
                roomType: false,
                ext: ext,
                success: function (id, serverMsgId) {
                    if (callback) {
                        callback(obj.msg);
                    }
                }
            });
            msg.body.chatType = 'singleChat';
            this.conn.send(msg.body);
        },
        getConnection: function () {
            return this.conn;
        },
        offline: function () {
            _im.conn.close();
        }
    };
    var _im;
    window.lyb = window.lyb || {};
    lyb.Chat = lyb.Chat || {};
    lyb.Chat.getIM = function (username, password, targetName, loginCallback) {
        if (!_im) {
            _im = new IM(username, password, targetName, loginCallback);
        }
        return _im;
    };


//优先同步聊天数据到自己的服务器
    lyb.Chat.syncChat = function (type, text, from, callback) {
        var formData = new FormData();
        if (type == 'img') {
            formData.append('files', text);
        } else
            formData.append('content', text);
        formData.append('type', type);
        if (from == 'patient') {
            formData.append('fromType', 'patient');
            formData.append('toType', 'doctor');
            formData.append('toId', params.doctorImId || params.id || params.doctorId);
        } else {
            formData.append('fromId', params.doctorImId || params.id || params.doctorId);
            formData.append('fromType', 'doctor');
            formData.append('toType', 'patient');
        }

        //上传文件方法
        var xhr = new XMLHttpRequest();
        xhr.open("post", ctx + 'sysMessage/save', true);
        xhr.onload = function (evt) {
            if (this.status == 200 || this.status == 304) {
                var result = JSON.parse(evt.target.response);
                if (result.success) {
                    if (callback) {
                        callback(true, result.data);
                    }
                } else {
                    if (callback) {
                        callback(false, result.msg);
                    }
                    lyb.error('消息发送失败!');
                    window.mask && mask.close && mask.close();
                }
            }
        };
        xhr.upload.onprogress = function (evt) {
            if (evt.lengthComputable) {//
                var percent = Math.round(evt.loaded / evt.total * 100);
                window.mask && mask.update && mask.update('上传进度：' + percent + "%");
                if (callback) {
                    callback(false, {
                        onprogress: true,
                        percent: percent
                    });
                }
            }
        };
        xhr.send(formData);
    };


    //发送语音
    lyb.Chat.syncVoice = function (voice, callback) {
        var formData = new FormData();
        formData.append('type', 'audio');
        formData.append('content', voice);
        formData.append('fromType', 'patient');
        formData.append('toType', 'doctor');
        formData.append('toId', params.doctorImId || params.id || params.doctorId);

        //上传文件方法
        var xhr = new XMLHttpRequest();
        xhr.open("post", ctx + 'sysMessage/save', true);
        xhr.onload = function (evt) {
            if (this.status === 200 || this.status === 304) {
                var result = JSON.parse(evt.target.response);
                if (result.success) {
                    if (callback) {
                        callback(true, result.data);
                    }
                } else {
                    if (callback) {
                        callback(false, result.msg);
                    }
                }
            }
        };
        xhr.send(formData);
    };


    //定义Files对象
    var files = function (list) {
        this.array = list || [];
        this.length = list.length;
    };
    files.prototype = {
        item: function (i) {
            return this.array[i];
        }
    }
})();


//音频播放
(function ($) {
    var audioFn = function () {
        this.init();
    };
    audioFn.prototype = {
        init: function () {
            this.audio = new Audio();
            this.audio.preload = 'metadata';
        },
        setSrc: function (src) {
            this.src = src || '';
            if (this.src) {
                this.audio.src = this.src;
            }
        },
        play: function () {
            this.audio.play();
        },
        pause: function () {
            this.audio.pause();
        },
        isPlay: function () {
            return audio.played;
        },
        getTime: function () {
            if(this.src) {
                var time = this.audio.duration;
                if(!isNaN(time)) {
                    time = parseInt(time.toFixed(0));
                    return time;
                }
            }
            return 0;
        }
    };

    lyb.audio = new audioFn();
})(lyb);
/*****************************************************

document.addEventListener('contextmenu', function(e) { //屏蔽 在浏览器打开
    e.preventDefault();
    return false;
});

var pullRefresh = jQuery('#im-wrapper'),
    bottom = jQuery('.webim-bottom'),
    chatWin = jQuery('#chatWindow'),
    msgCell = jQuery('#msg_input'),
    sendBtn = jQuery('#send_btn'),
    sendImg = jQuery('#send_Img'),
    sendForm = jQuery('#msg_form');
if (lyb.os.ios) {
    msgCell.focus(function() {
        setTimeout(function() {
            document.body.scrollTop = jQuery(window).height();
        }, 200);
        setTimeout(function() {
            document.body.scrollTop = jQuery(window).height();
        }, 500);
    });
}

pullRefresh.on('touchend', function() {
    msgCell.blur();
})


jQuery("#tabs").on('change', '.weui-navbar__item', function() {
    window.location.hash = this.dataset.hash;
    if (this.dataset.hash !== '#webim') {
        window.location.href = ctx + 'html/doctor/doctor_detail.html?id=' + params.id + this.dataset.hash;
    }
});


var headURL = {
    doctor: '//image-1252304461.file.myqcloud.com/image/doctor.png',
    patient: '//image-1252304461.file.myqcloud.com/image/doctor.png'
};

//查询医生/患者详情
lyb.ajax({
    url: ctx + 'doctor/info/getChatPerson?id=' + params.id,
    dataType: 'json',
    success: function(result) {
        if (result.success) {
            var data = result.data,
                doctor = result.data.doctorInfo,
                weixin = result.data.wxInfo,
                patient = result.data.patientInfo;
            params.doctorImId = doctor.imId;
            if (!doctor.consulting) {
                lyb.confirm('您还没有购买该医生的服务，请购买后与医生沟通。去购买？', function() {
                    window.location.href = ctx + '/html/doctor/doctor_detail.html?id=' + params.id + '#doctor';
                });
            }

            if (!!doctor.headimgUrl) {
                headURL['doctor'] = doctor.headimgUrl;
            }
            if (!!weixin.headimgurl) {
                headURL['patient'] = weixin.headimgurl;
            }

            //医生不在线提醒
            if (data.unDisturb) {
                lyb.alert('大夫设置了' + data.unDisturbTime + '免打扰，该时间段内，大夫无法及时回复您，请稍后再来沟通病情。');
            } else
                window.IM = lyb.Chat.getIM(weixin.imId, weixin.imPassword, doctor.imId, function(loginSuccess) { //患者登录
                    if (loginSuccess && doctor.consulting && doctor.serviceSwitch === 'ON' && doctor.isOnline) {
                        sendBtn.removeAttr('disabled');
                        sendImg.removeClass('disabled');
                        msgCell.removeAttr('disabled').css('border-color', '#ccc');
                        jQuery('#mask').hide();

                        IM.yourMessageCallback = function(obj, type) {
                            if (type === 'txt') {
                                appendToChatWin(renderMsg(obj.data, 'doctor', new Date().getTime(), 'txt'));
                            } else if (type === 'img') {
                                appendToChatWin(renderMsg('<img alt="" src="' + obj.url + '" class="view-image" style="max-width: 120px;max-height: 120px;">', 'doctor'), new Date().getTime(), 'img');
                            } else if (type === 'system') {
                                appendToChatWin(renderMsg(obj.content, 'system'));
                            } else if (type === 'audio') {
                                appendToChatWin(renderMsg(obj, 'doctor', new Date().getTime(), 'audio'));
                            } else {
                                if (type === 'doctorRefund' || type === 'comments') {
                                    window.clearInterval(hearInterval);
                                    sendBtn.attr('disabled', 'disabled');
                                    sendImg.addClass('disabled');
                                    msgCell.attr('disabled', 'disabled').css('border-color', '#F3F3F3');
                                    jQuery('#mask').show();
                                }
                                appendToChatWin(renderTransferMsg(obj, 'doctor'));
                            }
                        }

                        //定义Files对象
                        var files = function(list) {
                            this.array = list || [];
                            this.length = list.length;
                        };
                        files.prototype = {
                                item: function(i) {
                                    return this.array[i];
                                }
                            }
                            //定义发送消息
                        IM.sendImg = function(file) {
                            var timestamp = new Date().getTime(),
                                _mask, percentEl;
                            var reader = new FileReader();
                            reader.onload = function() {
                                var html = '<img id="img_' + timestamp + '" class="view-image" alt="" src="' + this.result + '" style="max-width: 120px;max-height: 120px;"/>';
                                html += '<div id="loading_' + timestamp + '" class="loading-box"><div class="loadding-modal"></div><span class="his-spinner white-color" style="animation: initial;"></span></div>';
                                appendToChatWin(renderMsg(html, 'patient', timestamp, 'img'));
                                _mask = jQuery('#loading_' + timestamp);
                                percentEl = _mask.children(':last');
                            }
                            reader.readAsDataURL(file);
                            lyb.Chat.syncChat('img', file, 'patient', function(success, result) {
                                if (success) {
                                    var start = 50;
                                    IM.sendPrivateImage(file, { patientId: params.patientId }, function() { // 消息上传失败
                                            _mask.remove(); //去掉遮罩层
                                            jQuery('#' + timestamp).addClass('error');
                                            pull.refresh();
                                            pull.scrollToBottom();
                                        }, function() { // 消息上传成功
                                            clearInterval(_intervalFeat);
                                            var _interval = window.setInterval(function() {
                                                percentEl.html(++start + '%');
                                                if (start >= 100) {
                                                    clearInterval(_interval);
                                                    _mask.remove(); //去掉遮罩层
                                                }
                                            }, 10);
                                            pull.refresh();
                                            pull.scrollToBottom();
                                        }, function() { // 消息发送成功
                                            pull.refresh();
                                            pull.scrollToBottom();
                                        })
                                        //保持进度条继续
                                    var _intervalFeat = window.setInterval(function() {
                                        percentEl.html(++start + '%');
                                        if (start >= 90) {
                                            clearInterval(_intervalFeat);
                                            _mask.remove(); //去掉遮罩层
                                        }
                                    }, 200);
                                } else {
                                    if (jQuery.type(result) == 'object') {
                                        if (result.onprogress) {
                                            percentEl.html((result.percent / 2).toFixed(0) + '%');
                                        }
                                    } else {
                                        _mask.remove(); //去掉遮罩层
                                        jQuery('#' + timestamp).addClass('error');
                                    }
                                }
                            });
                        }

                        //websocket用于代表用户已经上线
                        var hearInterval = window.setInterval(function() {
                            lyb.ajax(ctx + 'member/info/userOnlineHeart?doctorId=' + params.id);
                        }, 4000);
                    } else {}
                });
            params.patientId = patient == null ? "" : patient.id;

            queryChatHistory();
        }
    }
});

//发送消息
sendForm.on('submit', function(e) {
    e.preventDefault();
    var value = msgCell.val(),
        timestamp = new Date().getTime();
    if (value.replace(/\s+/g, '') !== '') {
        appendToChatWin(renderMsg(value, 'patient', timestamp, 'txt'));
        msgCell.val('');
        lyb.Chat.syncChat('txt', value, 'patient', function(success, result) {
            if (success) {
                IM.sendExtText({ msg: value, patientId: params.patientId });
            } else {
                jQuery('#' + timestamp).addClass('error');
            }
        });
    }
});


//发送图片
sendImg.on('change', 'input', function() {
    IM.sendImg(this.files[0]);
});

//渲染消息
function renderMsg(text, type, timestamp, renderType) {
    timestamp = timestamp || new Date().getTime();
    var html = '<div class="his-webim-item webim-' + type + '">';
    html += '<div id="' + timestamp + '" class="his-webim-item-border">';
    if (type !== 'system') {
        html += '<div class="his-webim-headImg">';
        html += '<img alt="" src="' + headURL[type] + '">';
        html += '</div>';
    }
    html += '<div class="his-webim-msg-border ' + (renderType || '') + '">';
    if (type !== 'system') {
        html += '<div class="msg-time font10 marginBottom5 light-color">' + lyb.formatDate(new Date(timestamp), 'yyyy-mm-dd hh:mi') + '</div>';
    }
    if (renderType === 'txt') {
        var matcher = text.match(/(ht|f)tp(s?)\:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/img);
        if (matcher) {
            matcher.forEach(function(value) {
                text = text.replace(value, '<a href="' + value + '" style="text-decoration: underline;">' + value + '</a>');
            });
        }
    }
    if (renderType === 'audio') {
        var id = 'voice_' + timestamp;
        var direction = '';
        if (type === 'patient') {
            direction = 'flex-direction: row-reverse;';
        }

        //检测微信amr格式音频，后边拼接这音频长度
        var array = text.split('##');
        text = array[0];
        var voiceLength = array[1] ? (array[1] + '\'\'') : '';
        var msgLength = 60 + Number(array[1] || 0) * 1.5;
        if (msgLength > 180) msgLength = 180;

        if (!voiceLength) {
            (function(_id, _src) {
                var _audio = new Audio();
                _audio.preload = 'metadata';
                _audio.src = _src;
                _audio.addEventListener("loadedmetadata", function() {
                    var time = this.duration.toFixed(0);
                    jQuery('#' + _id).html(time + '\'\'');
                    _audio = null;
                });
            })(id, text);
        }

        text = '<div class="his-flex voice-container" data-src="' + text + '" style="width: ' + msgLength + 'px;padding: 8px 12px;margin: -5px -10px;' + direction + '"><i class="ico-voice ' + type + ' box-icon"></i><span id="' + id + '">' + voiceLength + '</span></div>'
            //如果失败，则显示出来重传
        text = '<i class="error-icon re-upload his-hide">↻</i>' + text;
    }
    html += '<div class="his-webim-msg">' + text + '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}

//渲染透传消息
function renderTransferMsg(message, type, timestamp) {
    timestamp = timestamp || new Date().getTime();
    var html = '<div class="his-webim-item webim-' + type + ' transfer">';
    html += '<div id="' + timestamp + '" class="his-webim-item-border">';
    html += '<div class="his-webim-headImg">';
    html += '<img alt="" src="' + headURL[type] + '">';
    html += '</div>';
    html += '<div class="his-webim-msg-border">';
    html += '<div class="msg-time font10 marginBottom5 light-color">' + lyb.formatDate(new Date(timestamp), 'yyyy-mm-dd hh:mi') + '</div>';
    if (message.type === 'recordAudio') {
        html += '<a href="javascript:void(0);" data-src="' + message.url + '" class="his-webim-msg record-audio">'
    } else {
        html += '<a href="' + message.url + '" class="his-webim-msg">'
    }
    html += '<div class="his-webim-msg-title ' + message.cmdType + '">' + transferMap[message.cmdType][0] + '</div>';
    if (message.cmdType === 'recordAudio') {
        html += '<div class="his-webim-msg-subtitle" style="height: 32px;overflow: hidden;"><audio controls="controls"><source src="' + message.url + '"></source></audio></div>'
    } else {
        html += '<div class="his-webim-msg-subtitle">' + transferMap[message.cmdType][1] + '</div>'
    }
    html += '</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}

//打开扩展消息
pullRefresh.on('click', '.his-webim-msg', function() {
    if (this.href)
        window.location.href = this.href;
    msgCell.trigger('blur');
});

//追加聊天消息到聊天窗口
function appendToChatWin(text) {
    chatWin.append(text);
    lyb.imgLoaded(jQuery('img', chatWin), function() {
        pull.refresh();
        pull.scrollToBottom();
    });
    pull.refresh();
    pull.scrollToBottom();
}


//查看历史聊天记录
var pull;

function queryChatHistory() {
    pull = lyb.pullDownLoading({
        allowCache: false,
        el: pullRefresh[0],
        pageSize: 20,
        url: ctx + 'sysMessage/get?fromId=' + params.id, //songhe
        type: 'get',
        dataType: 'json',
        success: function(result) {
            var list = result.data || [];
            if (result.success) {
                chatWin.prepend(renderChatHistory(list));
                if (this.pageNum === 1) {
                    this.scrollToBottom();
                }
            } else {
                lyb.error(result.msg);
            }
        },
        error: function() {
            notices.append('<div class="pull-error">真不巧，页面让攻城狮吃了！<a class="pull-refresh">点击此处刷新</a></div>');
        }
    });
}

function renderChatHistory(list) {
    var html = [];
    list = list || [];
    for (var i = list.length - 1; i >= 0; i--) {
        var item = list[i];
        var time = lyb.formatDate(item.createTime, 'yyyy-mm-dd hh:mi:ss', true).getTime();
        if (item.type === 'txt') {
            html.push(renderMsg(item.content, item.fromType, time, 'txt'));
        } else if (item.type === 'img') {
            var content = '<img alt="" src="' + item.content + '" class="view-image" style="max-width: 120px;max-height: 120px;"/>';
            if (/^\<img/.test(item.content)) {
                content = item.content;
            }
            html.push(renderMsg(content, item.fromType, time, 'img'));
        } else if (item.type === 'audio') {
            var content = JSON.parse(item.content);
            html.push(renderMsg(content.url + '##' + content.second, item.fromType, time, 'audio'));
        } else {
            if (item.content && item.content !== '') {
                var data = JSON.parse(item.content);
                if (data.cmdType !== 'recordAudio') {
                    var _url = transferMap[data.cmdType][2];
                    if (_url) {
                        data.url = _url + (_url.indexOf('?') === -1 ? '?' : '&') + data.param;
                    }
                }
                if (data.cmdType === 'system') {
                    html.push(renderMsg(data.content, data.cmdType, time));
                } else {
                    html.push(renderTransferMsg(data, item.fromType, time));
                }
            }
        }
    }
    return html.join('');
}

//问诊单
lyb.ajax({
    url: ctx + 'sysInquiry/exist?doctorId=' + params.id,
    success: function(result) {
        if (!result.success) {
            jQuery('.inquiry').removeClass('his-hide');
        }
    }
});
jQuery('.inquiry').on('click', function() {
    window.location.href = ctx + 'sysInquiry/redirectSysInquiry?doctorId=' + params.id + '&rewrite=Y';
});


//变成已读消息
lyb.ajax({
    url: ctx + 'sysMessage/saveRead?doctorId=' + params.id
});


//处理语音聊天
jQuery('#voice-icon').click(function() {
    var border = this.parentNode;
    var prev = border.previousElementSibling;
    border.classList.add('his-hide');
    prev.classList.remove('his-hide');
});
jQuery('#text-icon').click(function() {
    var border = this.parentNode;
    var next = border.nextElementSibling;
    border.classList.add('his-hide');
    next.classList.remove('his-hide');
});

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice', 'playVoice', 'onVoicePlayEnd', 'stopVoice', 'previewImage'], function() {
    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: window.shareCommonTitle, // 分享标题
        link: ctx + 'html/index.html', // 分享链接
        imgUrl: '//image-1252304461.file.myqcloud.com/image/' + (window.lybMp ? 'lyb-logo' : 'big-logo') + '.jpg', // 分享图标
        success: function() {
            lyb.alert('分享成功!');
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: window.shareCommonTitle, // 分享标题
        desc: window.shareCommonDesc, // 分享描述
        link: ctx + 'html/index.html', // 分享链接
        imgUrl: '//image-1252304461.file.myqcloud.com/image/' + (window.lybMp ? 'lyb-logo' : 'big-logo') + '.jpg',
        success: function() {
            lyb.alert('分享成功!');
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    // chatWin.on('click', 'img', function () {
    //     weui.gallery(this.src);
    // });
    chatWin.on('click', '.view-image', function() {
        // weui.gallery(this.src);
        var urls = [];
        var list = jQuery('.view-image').toArray();
        for (var i = 0, len = list.length; i < len; i++) {
            var img = list[i];
            urls.push(img.src);
        }
        wx.previewImage({
            current: this.src,
            urls: urls
        });
    });

    var touchStatus = false,
        interval = void(0),
        pageY = 0,
        recordIcon = void(0),
        startTime = 0,
        endTime = 0,
        recordTimer;
    var voicePlayer = {},
        voiceRecorder = {};
    var win = jQuery(window),
        winHeight = win.height(),
        winWidth = win.width();

    var voiceBtn = jQuery('#voice-btn');

    voiceBtn.on('touchstart', function(e) {
        e.preventDefault();
        startTime = new Date().getTime();
        touchStatus = true;

        recordTimer = setTimeout(function() {
            wx.startRecord({
                success: function() {
                    if (new Date().getTime() - startTime > 1000) { //超过了1秒就认为是授权导致
                        wx.stopRecord();
                    } else {
                        voiceRecorder.second = 1;
                        voiceRecorder.startTime = new Date().getTime();
                        pageY = e.touches[0].pageY;
                        recordIcon = jQuery('<div class="recording"><img src="' + ctx + 'resources/images/icons/recording.gif" style="width: 100%;vertical-align: top;"/></div>').appendTo(document.body);
                        voiceBtn.html('松开 结束');

                        interval = setInterval(function() {
                            voiceRecorder.second++;
                            if (voiceRecorder.second === 59) {
                                stopRecord(true);
                            }
                        }, 1000);
                    }
                },
                cancel: function() {
                    lyb.error('用户拒绝授权录音');
                }
            });
        }, 300);

    }).on('touchend', function(e) {
        e.preventDefault();
        if (touchStatus) {
            stopRecord(true);
        }
    }).on('touchmove', function(e) {
        if (touchStatus) {
            var _pageY = e.touches[0].pageY,
                _pageX = e.touches[0].pageX;
            if (pageY - _pageY >= 100) {
                stopRecord(false);
            }

            if (_pageY > winHeight || _pageX < 10 || _pageX > winWidth - 10) {
                stopRecord(false);
            }
        }
    });

    //停止录音
    function stopRecord(flag) {
        endTime = new Date().getTime();
        window.clearInterval(interval);

        if (flag) {
            if ((endTime - startTime) < 300) {
                endTime = 0;
                startTime = 0;
                //小于300ms，不录音
                clearTimeout(recordTimer);
            } else {
                wx.stopRecord({
                    success: function(res) {
                        voiceRecorder.localId = res.localId;

                        if ((new Date().getTime() - voiceRecorder.startTime) > 1000) {
                            readyRecord();
                        } else {
                            lyb.error('录音时间太短！');
                        }
                    }
                });
            }
        } else {
            wx.stopRecord();
        }
        touchStatus = false;
        recordIcon && recordIcon.remove();
        voiceBtn.html('按住 说话');
    }

    //准备重新上传
    function readyRecord() {
        var text = voiceRecorder.localId + '##' + voiceRecorder.second;
        var timestamp = new Date().getTime();
        voiceRecorder.timestamp = timestamp;

        if (voiceRecorder.second > 60) {
            voiceRecorder.second = 60;
        }

        appendToChatWin(renderMsg(text, 'patient', timestamp, 'audio'));

        uploadVoice();
    }

    //上传录音
    function uploadVoice() {
        wx.uploadVoice({
            localId: voiceRecorder.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function(res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                var obj = {
                    "param": "",
                    "cmdType": "audio",
                    "content": "",
                    "url": serverId,
                    "second": voiceRecorder.second
                };
                lyb.Chat.syncVoice(JSON.stringify(obj), function(success, data) {
                    if (success) {
                        jQuery('#' + voiceRecorder.timestamp).removeClass('error');
                        voiceRecorder = {};
                    } else {
                        jQuery('#' + voiceRecorder.timestamp).addClass('error');
                        lyb.error(data);
                    }
                })
            }
        });
    }

    //重传
    chatWin.on('click', '.re-upload', function(e) {
        uploadVoice();
    });
    //播放音频
    chatWin.on('click', '.voice-container', function(e) {
        var that = this;
        var src = this.dataset.src;
        if (src === voicePlayer.src) {
            if (/^weixin/.test(src) || /^wxLocalResource/.test(src)) {
                if (voicePlayer.playing) {
                    that.classList.remove('play'); //停止上一个播放都音频动画
                    wx.stopVoice({ //先停止正在播放的音频
                        localId: src
                    });
                    voicePlayer = {};
                }
            } else {
                if (voicePlayer.playing) {
                    that.classList.remove('play'); //停止上一个播放都音频动画
                    voicePlayer.audio.stop();
                    voicePlayer = {};
                }
            }
            return;
        }

        if (voicePlayer.el) {
            jQuery('.voice-container.play').removeClass('play');
            if (voicePlayer.audio) {
                voicePlayer.audio.pause();
                voicePlayer.audio = null;
            }
        }

        if (/^weixin/.test(src) || /^wxLocalResource/.test(src)) {
            if (voicePlayer.src) {
                wx.stopVoice({ //先停止正在播放的音频
                    localId: voicePlayer.src
                });
            }

            jQuery('.voice-container.play').removeClass('play'); //停止上一个播放都音频动画

            that.classList.add('play');

            wx.playVoice({
                localId: src, // 需要播放的音频的本地ID，由stopRecord接口获得
                success: function(res) {
                    voicePlayer = { el: that, src: src, playing: true };
                }
            });

            wx.onVoicePlayEnd({
                success: function(res) {
                    jQuery('.voice-container.play').removeClass('play');
                    voicePlayer = {};
                }
            });
            return;
        }

        var audio = new Audio();
        audio.preload = 'metadata';
        audio.src = src;
        voicePlayer.el = this;
        voicePlayer.src = src;
        voicePlayer.audio = audio;

        audio.addEventListener('play', function(e) {
            that.classList.add('play');
        });
        audio.addEventListener('ended', function(e) {
            jQuery('.voice-container.play').removeClass('play');
            voicePlayer = {};
        });
        audio.play();
        voicePlayer.playing = true;
    });

});