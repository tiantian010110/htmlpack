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
/*****************************************************source：resources/js/business/hospital/hospital_list.js*****************************************************/lyb.parse();

var hospitalList = jQuery('#hospital_list');
lyb.ajax('list.json', {
    success: function (result) {
        if (result.success) {
            renderHospitalList(result.data || []);
        } else {
            lyb.error(result.msg);
        }
    }
});

function renderHospitalList(list) {
    var string = '', top = '';
    for (var i = 0, len = list.length; i < len; i++) {
        var html = '';
        var item = list[i];
        html += '<div class="weui-panel marginBottom10">';
        html += '<div class="weui-panel__hd">';
        html += '<span class="title-block deep-color">' + item.name + '</span>';
        html += '</div>';
        html += '<div class="weui-panel__bd">';
        var children = item.sysHospitals || [];
        for (var j = 0, length = children.length; j < length; j++) {
            var child = children[j];
            html += '<a href="hospital_detail.html?id=' + child.id + '" class="weui-cell weui-cell_access">';
            html += '<div class="weui-cell__bd his-flex-unshrink marginRight10" style="flex: none;flex-basis: 70px;">';
            html += child.name;
            html += '</div>';
            html += '<div class="weui-cell__ft his-flex-grow font12 his-left">';
            html += child.address;
            html += '</div>';
            html += '</a>';
        }
        html += '</div>';
        html += '</div>';
        if(item.name === decodeURIComponent(params.cityName)) {
            top = html;
        }else {
            string += html;
        }
    }
    document.getElementById('hospital_list').innerHTML = top + string;
}
