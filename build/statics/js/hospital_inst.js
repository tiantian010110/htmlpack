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
/*****************************************************source：resources/js/business/hospital/hospital_inst.js*****************************************************/lyb.parse();

lyb.ajax(ctx + 'SysHospital/detail?id=' + params.id, {
    success: function (result) {
        if (result.success) {
            var data = result.data || {};
            document.getElementById('hospital_img').innerHTML = '<img alt="" src="' + data.pic + '" style="width: 100%;height: 100%;vertical-align: top;"/>';
            document.getElementById('inst').innerHTML = data.description || '';
            document.getElementById('name').innerHTML = data.name || '';
            var address = document.getElementById('address');
            address.innerHTML = data.address || '';
            address.dataset.name = data.name;
            address.dataset.address = data.address;
            address.dataset.latitude = data.lat;
            address.dataset.longitude = data.lng;
            address.addEventListener('click', function (ev) {
                daohang(this.dataset);
            });
            document.getElementById('phone').innerHTML = '<a class="red-color" href="tel:' + data.phone + '">' + data.phone + '</a>';
        }
    }
});

lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'openLocation'], function () {
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
});

function daohang(data) {
    wx.openLocation({
        latitude: parseFloat(data.latitude), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(data.longitude), // 经度，浮点数，范围为180 ~ -180。
        name: data.name, // 位置名
        address: data.address, // 地址详情说明
        // scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: 'https://mp.zanchina.com' // 在查看位置界面底部显示的超链接,可点击跳转
    });
}
