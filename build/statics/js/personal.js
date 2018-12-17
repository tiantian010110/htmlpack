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
/*****************************************************source：resources/js/business/personal/personal.js*****************************************************/lyb.parse();
var gender = {'M': '男', 'F': '女'};
var relationMap = {
    'father': '爸爸',
    'mother': '妈妈',
    'husband': '老公',
    'wife': '老婆',
    'daughter': '女儿',
    'son': '儿子',
    'family': '家人',
    'friend': '朋友',
    'self': '本人'
};
var revertRelationMap = {
};

lyb.doPublicSourceZhugeTrack();

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
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

lyb.ajax(ctx + 'member/info/personal', {
    type: 'get',
    dataType: 'json',
    success: function (result) {
        var data = result.data;
        if (result.success) {
            var nameInfo = '<span class="fontBold font18 marginRight8" style="vertical-align: middle;">'+ data.name +'</span>';
            // var nameInfo = '<span class="fontBold font18 marginRight8" style="vertical-align: middle;">'+ data.name +'</span><span style="padding: 1px 9px 1px 9px;font-size: 9px;color: #7A988B;line-height: 1;border: 1px solid #7A988B;border-radius: 8px;vertical-align: middle;">本人</span>';
            jQuery('#name').html(nameInfo);
            jQuery('#info').html('<span style="vertical-align: middle;">' + (gender[data.gender] || '') + '</span><span class="his-spliter margin-0-5"></span><span style="vertical-align: middle;">' + (lyb.getAge(data.birthday) || '') + '</span>');
            jQuery('#viewInfo').removeClass('unlogin').addClass('login');
            jQuery('.add-family').removeClass('his-hide');
            queryBindUser();
        }else {
            params.nickname = data.nickname;
            jQuery('#name').html('<span class="fontBold font18">' + data.nickname + '</span>');
            var html = '<div class="padding1612 paddingTop0">\n' +
                '    <a href="javascript:void(0);" onclick="sessionStorage.setItem(\'callbackUrl\', \''+ ctx +'html/profile/profile_list.html?memberId=${params.memberId}\');window.location.href = \''+ ctx +'html/login/login.html\';">' +
                '        <img src="//image-1252304461.file.myqcloud.com/image/profile_unlogin.png" style="width: 100%;vertical-align: top;">' +
                '   </a>' +
                '</div>';
            jQuery('#user_list').append(html);
        }
        jQuery('#loginStatus').removeClass('his-hide');
        if (data && data.headimgurl) {
            jQuery('#head_url').attr('src', data.headimgurl);
        }
    }
});

//查询患者列表
function queryBindUser() {
    lyb.ajax({
        url: ctx + "member/info/list",
        success: function (result) {
            if (result.success) {
                var list = result.data || [],
                    html = '',
                    len = list.length;
                if (list.length) {
                    jQuery('#user_count').html('（已绑定<span class="red-color">' + len + '</span>人）')
                    for (var i = 0; i < (len > 2 ? 2 : len); i++) {
                        var item = list[i];
                        var relation = relationMap[item.relation] || '';
                        if(relation) {
                            relation = '<span style="padding: 2px 9px 1px 9px;font-size: 9px;color: #7A988B;line-height: 1;border: 1px solid #7A988B;border-radius: 8px;vertical-align: middle;">' + relation + '</span>';
                        }
                        html += '<div class="his-flex padding1612 radius2 bind-user" style="margin: 0 12px 8px 12px;background: #f7f7f7;">' +
                            '    <div class="">' +
                            '        <div class="deep-color marginBottom5"><span class="marginRight8" style="vertical-align: middle;">'+ item.name + '</span>' + relation +'</div>' +
                            '        <div class="font12 middle-color">' +
                            '            <span class="marginRight12">'+ (gender[item.gender] || '未知') +'</span><span class="marginRight12">'+ (lyb.getAge(item.birthday) || '未知') +'</span><span class="">'+ item.mobile +'</span>' +
                            '        </div>' +
                            '    </div>' +
                            '    <a href="javascript: void(0);" id="'+ item.id +'" class="red-color more link font12" data-page="'+ ctx +'html/profile/profile_list.html?memberId='+ item.id +'">看诊记录</a>' +
                            '</div>'
                    }
                    jQuery('#show_more_user').removeClass('his-hide');
                }
                jQuery('#user_list').html(html);
            }
        },
        error: function () {
            patientList.html('<div class="pull-error">真不巧，页面让攻城狮吃了！</div>');
        }
    });
}

jQuery(document.body).on('click', '.unbind', function () {
    var zanId = this.dataset.zanId,
        id = this.dataset.id;
    lyb.confirm('确认解绑会员?', function (e) {
        lyb.ajax(ctx + 'wxInfo/unbind', {
            type: 'get',
            dataType: 'json',
            data: {id: id, zanId: zanId},
            success: function (result) {
                lyb.toast(result.msg);
                if (result.success) {
                    money.innerHTML = '0.00 元';
                    bind.innerHTML = '<a href="bind.html" class="red-color">去绑定</a>';
                }
            }
        });
    });
}).on('click', '.float-box-inner,.link', function (e) {
    e.preventDefault();
    var link = this.dataset.page;
    var text = jQuery(this).text();
    zhuge.track('个人中心链接', {'功能入口': text}, function () {
        window.location.href = link;
    })
});

jQuery('#bg').on('click', '#viewInfo', function () {
    if (this.classList.contains('login')) {
        window.location.href = 'info.html';
    }
}).on('click', '.unlogin', function () {
    sessionStorage.setItem('callbackUrl', window.location.href);
    window.location.href = ctx + "html/login/login.html";
})

lyb.ajax({
    url: ctx + 'sysMessage/getAdvisoriesFlag',
    success: function (result) {
        if (result.success) {
            jQuery('#consultStatus').children('i').append('<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>');
        }
    }
});
