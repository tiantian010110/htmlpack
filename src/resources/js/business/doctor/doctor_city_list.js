params.cityName = decodeURIComponent(params.cityName || '全国');
lyb.parse();
if(params.type === 'illness') {
    jQuery('#wrapper').css('padding-top', 68);
    jQuery('#current_online').addClass('his-hide');
}

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'openLocation'], function () {
    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: '【' + window.mpName + '】在线问诊', // 分享标题
        link: window.location.href, // 分享链接
        imgUrl: '//image-1252304461.file.myqcloud.com/image/' + (window.lybMp ? 'lyb-logo' : 'big-logo') + '.jpg', // 分享图标
        success: function () {
            lyb.alert('分享成功!');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: '【' + window.mpName + '】在线问诊', // 分享标题
        desc: window.shareCommonDesc, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: '//image-1252304461.file.myqcloud.com/image/' + (window.lybMp ? 'lyb-logo' : 'big-logo') + '.jpg',
        success: function () {
            lyb.alert('分享成功!');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
});

//搜索框
var searchBox = initSearchBox({type: 'net'});
var doctors = jQuery('#doctor_list'), currentEl = jQuery('#current_online');
if(params.type !== 'illness') {
//查询正在咨询的医生
    lyb.ajax(ctx + 'doctor/info/consult/list', {
        success: function (result) {
            var list = result.data.doctors || [], count = result.data.totalCount || 0;
            if (result.success) {
                if (count) {
                    var imgs = [], html = '';
                    for (var i = 0, len = list.length; i < len; i++) {
                        var item = list[i];
                        imgs.push('<img alt="" class="online-image" src="' + (item.headImgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" style="z-index: ' + (3 - i) + ';"/>');
                    }
                    html += '<div class="deep-color">已向<span class="red-color"> ' + count + ' </span>位大夫在线问诊，点击咨询</div>';
                    html += '<div class="more">';
                    html += imgs.join('');
                    html += '</div>';
                    currentEl.html(html).removeClass('his-hide');

                    currentEl.click(function () {
                        var link = this.dataset.href;
                        zhuge.track('网诊咨询快捷入口', {
                            '入口页面': document.title
                        }, function () {
                            window.location.href = link;
                        })
                    });
                    jQuery('#wrapper').css('padding-top', 120)
                }
            }
        }
    });
}
var url = ctx + 'doctor/info/net/allList', renderList = renderOnlineDoctorList;
if (params.type === 'illness') {
    url = ctx + 'sysDiseases/search';
    renderList = renderIlnessList
}
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    url: url,
    data: {condition: decodeURIComponent(params.condition || '')},
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            if (list.length === 0 && this.pageNum === 1)
                jQuery('.no-record').children('div').html('<div class="padding-10-0 middle-color font14">您还没有过看诊，预约门诊或扫码关注医生后方可复诊。</div><div><a class="weui-btn weui-btn_mini weui-btn_warn radius2 his-noborder" href="doctor_hospital_list.html?cityName=" style="zoom: 1.1;">预约门诊</a></div>');
            doctors.append(renderList(list, {showPrice: true, showVC: true, showTitle: true}));
        } else {
            lyb.toast(result.msg);
        }
    }
});

var locationPage = ctx + location.pathname.replace(/^\//, '');;
function renderIlnessList(list) {
    var html = '';
    list = list || [];
    html += '<div class="weui-cells">';
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        html += '<div class="weui-cell">';
        html += '<a class="weui-cell__bd middle-color search-result" data-type="illness" href="'+ locationPage +'?type=doctor&condition=' + item.name + '">' + item.name + '</a>';
        html += '</div>';
    }
    html += '</div>';
    return html;
}

//绑定事件
bindBtnEvents(doctors);