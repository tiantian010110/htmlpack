params.cityName = decodeURIComponent(params.cityName || '全国');
lyb.parse();
if(params.type === 'illness') {
    jQuery('#wrapper').css('padding-top', 68);
    jQuery('#secondSearch').addClass('his-hide');
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
        title: '【' + window.mpName + '】明医列表', // 分享标题
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
        title: '【' + window.mpName + '】明医列表', // 分享标题
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

var searchBox = initSearchBox({mainPage: false, type: 'clinic'});

var doctors = jQuery('#doctor_list');


var url = ctx + 'doctor/info/clinic/list', renderList = renderClinicDoctorList;
if (params.type === 'illness') {
    url = ctx + 'sysDiseases/search';
    renderList = renderIlnessList
}
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    pageSize: 10,
    url: url,
    params: {city: (params.cityName || '').replace(/全国/g, ''), condition: searchBox.getValue()},
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            doctors.append(renderList(list));
        } else {
            lyb.error(result.msg);
        }
    }
});

var locationPage = location.pathname.replace(/^\//, '');
function renderIlnessList(list) {
    var html = '';
    list = list || [];
    html += '<div class="weui-cells">';
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        html += '<div class="weui-cell">';
        html += '<a class="weui-cell__bd middle-color search-result" data-type="illness" href="'+ ctx + locationPage +'?type=doctor&condition=' + item.name + '">' + item.name + '</a>';
        html += '</div>';
    }
    html += '</div>';
    return html;
}

initMultiFilter(pull, doctors);
//绑定事件
bindBtnEvents(doctors);