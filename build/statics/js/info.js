/*****************************************************source：resources/js/commons/wxSign.js*****************************************************//**
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
/*****************************************************source：resources/js/business/personal/info.js*****************************************************/lyb.parse();
var gender = {'M': '男', 'F': '女'};

lyb.ajax(ctx + 'member/info/personal', {
    type: 'get',
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            var data = result.data;
            if(data.headimgurl)
                document.querySelector('#headImgUrl').src = data.headimgurl;
            document.querySelector('#name').innerHTML = data.name;
            document.querySelector('#gender').innerHTML = gender[data.gender] || '';
            document.querySelector('#birthday').innerHTML = data.birthday || '';
            document.querySelector('#mobile').innerHTML = data.mobile || '';
        }
    }
});

var loading = lyb.showMask();
document.querySelector('#logout').addEventListener('click', function () {
    lyb.confirm('确认退出？', function () {
        loading.show();
        lyb.ajax(ctx + 'member/info/logout', {
            type: 'get',
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    loading.success('退出成功!', function () {
                        window.location.href = ctx + 'html/personal/personal.html';
                        localStorage.removeItem('MONTH_BILLS');
                    });
                }else {
                    loading.close();
                    lyb.error(result.msg);
                }
            }
        });
    })
});
