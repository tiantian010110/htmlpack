/**
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