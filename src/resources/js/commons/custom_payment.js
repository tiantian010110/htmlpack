/**
 * info：支付 author：田鑫龙 date：2017-05-09
 */

(function(){
    window.lyb = window.lyb || {};
    lyb.Pay = lyb.Pay || {};
    // 阿里支付
    lyb.Pay.aliPay = function(mergeNo, callbackUrl, opener){
        // callbackUrl = encodeURIComponent(callbackUrl);
        window.location.href = ctx + 'html/pay/alipay.html?mergeNo='+ mergeNo + '&callbackUrl=' + callbackUrl + '&opener=' + opener;
    };
    lyb.Pay.wxH5Pay = function(mergeNo, callbackUrl){
        // callbackUrl = encodeURIComponent(callbackUrl);
        window.location.href = ctx + 'pay/wx/h5/merge/' + mergeNo + '?returnUrl=' + callbackUrl;
    };
	lyb.Pay.payMethod = function(){
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
		            appId: data.appId, // 必填，公众号的唯一标识
		            timestamp: data.timestamp, // 必填，生成签名的时间戳
		            nonceStr: data.nonceStr, // 必填，生成签名的随机串
		            signature: data.signature,// 必填，签名，见附录1
		            jsApiList: ['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        });
					        
		        wx.ready(function(){
                    window.lyb.Pay.mergeWxPay = function(mergeNo, callback){
                        lyb.ajax(ctx + 'pay/wx/mp/merge/' + mergeNo + '?openid=' + params.openId, {
                            dataType: 'json',
                            success: function(result1){
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
                                        if (res.errMsg == "chooseWXPay:ok") {
                                            var count = 0;
                                            var heart = window.setInterval(function(){
                                                heartRequest();
                                            }, 1000);
                                            function heartRequest(){
                                                lyb.ajax(ctx + 'order/merge/ispay/' + mergeNo, {
                                                    success: function(result){
                                                        if(result.success){
                                                            if(callback){
                                                            	if(!result.data || jQuery.type(result.data) != 'object') {
                                                            		result.data = {};
                                                            	}
                                                                result.data.success = true;//强制注入支付成功标识
                                                                callback(result.data);
                                                                window.clearInterval(heart);
                                                            }
                                                        }else {
                                                            if(++count == 30){
                                                                window.clearInterval(heart);
                                                                if(callback)
                                                                    callback({success: false, msg: '支付异常，请查询微信订单详情或致电客服!'});//强制注入支付失败回调
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            heartRequest();
                                        }
                                    },
                                    cancel: function(res){
                                        if (res.errMsg == "chooseWXPay:cancel") {
                                            if(callback)
                                                callback({success: false, msg: '已取消支付!'});//强制注入支付失败回调
                                        }
                                    }
                                });
                            }
                        });
                    }
				});
							
				wx.error(function(res){
					// lyb.error('系统异常，稍后重试!');
				});
		    }
		});
	};
})();