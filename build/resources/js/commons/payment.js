/**
 * info：支付 author：田鑫龙 date：2017-05-09
 */

window.lyb = window.lyb || {};
lyb.Pay = lyb.Pay || {};
(function () {
    // 阿里支付
    lyb.Pay.aliPay = function (mergeNo, callbackUrl, opener, fromWhere) {
        callbackUrl = encodeURIComponent(decodeURIComponent(callbackUrl));
        window.location.href = ctx + 'html/pay/alipay.html?mergeNo=' + mergeNo + '&callbackUrl=' + callbackUrl + '&opener=' + opener + '&fromWhere=' + params.fromWhere;
    };
    lyb.Pay.wxH5Pay = function (mergeNo, callbackUrl) {
        callbackUrl = encodeURIComponent(decodeURIComponent(callbackUrl));
        window.location.href = ctx + 'pay/wx/h5/merge/' + mergeNo + '?returnUrl=' + callbackUrl;
    };
    lyb.Pay.payMethod = function () {
        lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'openLocation', 'chooseWXPay'], function () {

            window.lyb.Pay.mergeWxPay = function (mergeNo, callback) {
                lyb.ajax(ctx + 'pay/wx/mp/merge/' + mergeNo, {
                    dataType: 'json',
                    success: function (result1) {
                        var data1 = result1.data;
                        wx.chooseWXPay({
                            timestamp: data1.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: data1.nonceStr, // 支付签名随机串，不长于
                            // 32 位
                            package: data1.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: data1.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: data1.paySign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                if (res.errMsg === "chooseWXPay:ok") {
                                    var count = 0;
                                    var heart = window.setInterval(function () {
                                        heartRequest();
                                    }, 1000);

                                    function heartRequest() {
                                        lyb.ajax(ctx + 'order/merge/ispay/' + mergeNo, {
                                            success: function (result) {
                                                if (result.success) {
                                                    if (callback) {
                                                        if (!result.data || lyb.type(result.data) !== 'object') {
                                                            result.data = {};
                                                        }
                                                        result.data.success = true;//强制注入支付成功标识
                                                        callback(result.data);
                                                        window.clearInterval(heart);
                                                    }
                                                } else {
                                                    if (++count === 30) {
                                                        window.clearInterval(heart);
                                                        if (callback)
                                                            callback({success: false, msg: '支付异常，请查询微信订单详情或致电客服!'});//强制注入支付失败回调
                                                    }
                                                }
                                            }
                                        });
                                    }

                                    heartRequest();
                                }
                            },
                            cancel: function (res) {
                                if (res.errMsg === "chooseWXPay:cancel") {
                                    if (callback)
                                        callback({success: false, msg: '已取消支付!'});//强制注入支付失败回调
                                }
                            }
                        });
                    }
                });
            }

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
                success: function () {
                    lyb.alert('分享成功!');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: window.shareCommonTitle, // 分享标题
                desc: window.shareCommonDesc, // 分享描述
                link: ctx + 'html/index.html', // 分享链接
                imgUrl: '//image-1252304461.file.myqcloud.com/image/' + (window.lybMp ? 'lyb-logo' : 'big-logo') + '.jpg',
                success: function () {
                    lyb.alert('分享成功!');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.error(function (res) {
                // lyb.error('系统异常，稍后重试!');
            });
        });
    };
})();
(function () {
    var url = 'http://user.zanchina.com/html/wallet/charge.html?source=下单&channel=buy&origin=' + encodeURIComponent(encodeURIComponent(location.href));
    var canPay = true, unPayReason = '';
    //渲染显示的支付方式
    lyb.Pay.renderPayType = function (options) {
        canPay = true;
        var path = '//image-1252304461.file.myqcloud.com/image/pay/' + options.type + '.png';
        var html = '<div class="marginRight8 his-flex-unshrink">';
        html += '<img src="' + path + '" style="height: 36px;width: 36px;vertical-align: middle;">';
        html += '</div>';
        html += '<div class="his-flex-grow">';
        if (options.type === 'walletPay') {
            html += '<p class="deep-color font15" style="line-height: 1;margin-bottom: 2px;">';
            html += options.text;
            // if(options.page === 'appointment') {//刘河
                html += '<span class="font10 deep-color">（享受会员价）</span>';
            // }
            html += '</p>';
            if(options.page !== 'appointment') {
                if(options.noCard) {
                    html += '<div class="font10 red-color"><span class="light-color">您未开通会员卡，</span><a class="red-color" href="' + url + '">点击去开通</a></div>';
                    canPay = false;
                    unPayReason = 'noCard';
                }else if (options.password === 1) {
                    if (options.price - Number(options.couponPrice || '') - (options.originalPrice || 0) > 0) {
                        html += '<div class="font10 red-color">可用余额： ¥ ' + options.price + '</div>';
                    } else {
                        html += '<div class="font10 red-color"><span class="light-color">余额不足，</span><a class="red-color" href="' + url + '">点击去充值</a></div>';
                        canPay = false;
                        unPayReason = 'lessMoney';
                    }
                } else {
                    url = ctx + 'html/personal/pay_password.html' + (params.fromWhere ? '?fromWhere=' + params.fromWhere : '');
                    html += '<div class="font10 red-color set-password" style="display: inline-block;"><span class="light-color">您还没有设置密码，</span><a class="red-color" data-href="' + url + '">点击设置</a></div>';
                    canPay = false;
                    unPayReason = 'noPassword';
                }
            }else {
                html += '<div class="font10 red-color">可用余额： ¥ ' + options.price + '</div>';
            }
        } else {
            html += '<p class="deep-color font15" style="line-height: 1;">' + options.text + '</p>';
        }
        html += '</div>';
        html += '</div>';
        return html;
    };
    //设置密码
    jQuery(document.body).on('click', '.set-password', function () {
        sessionStorage.setItem('callbackUrl', window.location.href);
        window.location.href = ctx + 'html/personal/pay_password.html' + (params.fromWhere ? '?fromWhere=' + params.fromWhere : '');
    });

    //验证是否可以支付
    lyb.Pay.validIfCanPay = function (options) {
        if (!canPay) {
            switch (unPayReason) {
                case 'noPassword':
                    lyb.confirm('您还没有设置密码！', {
                        buttons: [{
                            label: '稍后再说',
                            type: 'default',
                            onClick: function () {
                            }
                        }, {
                            label: '马上设置',
                            type: 'primary',
                            onClick: function () {
                                sessionStorage.setItem('callbackUrl', window.location.href);
                                window.location.href = ctx + 'html/personal/pay_password.html' + (params.fromWhere ? '?fromWhere=' + params.fromWhere : '');
                            }
                        }]
                    });
                    break;
                case 'lessMoney':
                    var buttons = [{
                        label: '切换',
                        type: 'default',
                        onClick: function () {
                            jQuery('#pay_type_selector').click();
                        }
                    }, {
                        label: '充值',
                        type: 'primary',
                        onClick: function () {
                            window.location.href = url;
                        }
                    }];
                    if (options.onlyCard === 'Y') {
                        buttons.splice(0, 1, {
                            label: '取消',
                            type: 'default',
                            onClick: function () {
                            }
                        })
                    }
                    lyb.confirm('余额不足，您可切换支付方式或充值', {
                        buttons: buttons
                    });
                    break;
                case 'noCard':
                    var buttons = [{
                        label: '切换',
                        type: 'default',
                        onClick: function () {
                            jQuery('#pay_type_selector').click();
                        }
                    }, {
                        label: '加入会员',
                        type: 'primary',
                        onClick: function () {
                            window.location.href = url;
                        }
                    }];
                    if (options.onlyCard === 'Y') {
                        buttons.splice(0, 1, {
                            label: '取消',
                            type: 'default',
                            onClick: function () {
                            }
                        })
                    }
                    lyb.confirm('您未开通会员卡，您可切换支付方式或加入会员', {
                        buttons: buttons
                    });
                    break;
            }
            return false;
        }
        return true;
    }
})();