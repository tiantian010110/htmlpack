lyb.parse();

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