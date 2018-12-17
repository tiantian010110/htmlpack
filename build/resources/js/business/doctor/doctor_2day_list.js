params.cityName = decodeURIComponent(params.cityName || params.selectCityName || '全国');
lyb.parse();
if(params.type === 'illness') {
    jQuery('#wrapper').css('padding-top', 68);
    jQuery('#switch').addClass('his-hide');
    jQuery('#city_selector').parent().addClass('his-hide');
}

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: '【' + window.mpName + '】今明出诊列表', // 分享标题
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
        title: '【' + window.mpName + '】今明出诊列表', // 分享标题
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

var doctors = jQuery('#doctorList'),
    cityBtn = jQuery('#city_selector');
//搜索框

var searchBox = initSearchBox({towDay: true, type: 'days'});

//今明两天切换
var today = new Date().getTime();
var dayTime = 24 * 60 * 60 * 1000;
var dayBorder = jQuery('.border');
params.date = lyb.formatDate(new Date(), 'yyyy-mm-dd');
dayBorder.on('click', '.day-type', function () {
    dayBorder.children().removeClass('selected');
    this.classList.add('selected');
    var type = this.dataset.type;
    if (type === '0') {
        params.date = lyb.formatDate(new Date(), 'yyyy-mm-dd');
    } else {
        params.date = lyb.formatDate(new Date(today + dayTime), 'yyyy-mm-dd');
    }
    doctors.empty();
    pull.reset();
    pull.params.days = type;
    pull.load();
});
//切换城市
jQuery('#searchBar').on('click', '#city_selector', function () {
    lyb.pageManager.show(function (dom) {
        dom.children().get(0).src = ctx + 'html/selector/select_city.html';
    });
});

window.updateCity = function (data) {
    params.cityName = data.selectCityName;
    window.setTimeout(function () {
        doctors.empty();
        pull.reset();
        pull.params.city = (params.cityName || '').replace('全国', '');
        cityBtn.html(params.cityName);
        pull.load();
    }, 100);
};

var url = ctx + 'doctor/info/daysList', renderList = renderClinicDoctorList;
if (params.type === 'illness') {
    url = ctx + 'sysDiseases/search';
    renderList = renderIlnessList
}
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    url: url,
    pageSize: 10,
    params: {days: 0, city: (params.cityName || '').replace('全国', ''), condition: params.condition || ''},
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            if (this.params.condition && list.length === 0 && result.code === 200) {
                jQuery('.no-record').children('div').html((this.params.days == '0' ? '今天' : '明天') + '没有找到与 ' + this.params.condition + ' 相关大夫的出诊信息</br></br><a class="red-color" style="text-decoration: underline;" href="' + params.ctx + 'html/doctor/doctor_all_list.html?condition=' + this.params.condition + '">点击查看 ' + this.params.condition + ' 大夫的其他出诊信息</a>？');
            }
            doctors.append(renderList(list));
        } else {
            lyb.toast(result.msg);
        }
    }
});

var locationPage = ctx + location.pathname.replace(/^\//, '');
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