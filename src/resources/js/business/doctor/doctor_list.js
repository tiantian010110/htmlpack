params.cityName = decodeURIComponent(params.cityName || '全国');
lyb.parse();

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
        imgUrl: '//image-1252304461.file.myqcloud.com/image/'+ (window.lybMp ? 'lyb-logo' : 'big-logo') +'.jpg', // 分享图标
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
        imgUrl: '//image-1252304461.file.myqcloud.com/image/'+ (window.lybMp ? 'lyb-logo' : 'big-logo') +'.jpg',
        success: function () {
            lyb.alert('分享成功!');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
});

var doctors = jQuery('#doctorList');

// //搜索框
// var searchBox = lyb.get('searchBar');
// searchBox.submitFn = function (text) {
// };
// searchBox.inputFn = function (text) {
//     queryList(text);
// };
// searchBox._focus = function () {};

function queryList(text){
    doctors.empty();
    pull.reset();
    pull.params.condition = params.condition;
    if(params.date) {
        pull.params.date = params.date;
    }else {
        delete pull.params.date;
    }
    if(params.cityName) {
        pull.params.city = params.cityName.replace(/全国/g, '').replace('市', '');
    }else {
        delete pull.params.city;
    }
    if(params.hospitalId) {
        pull.params.hospitalId = params.hospitalId;
    }else {
        delete pull.params.hospitalId;
    }
    pull.load();
}

var pull = lyb.pullUpLoading({
    el: document.querySelector('#wrapper'),
    reference: document.body,
    pageSize: 10,
    url: ctx + 'doctor/info/clinic/list',
    params: {condition: decodeURIComponent(params.condition || ''), city: params.cityName.replace(/全国/g, '').replace('市', '')},
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            doctors.append(renderDoctorList(list));
        } else {
            lyb.toast(result.msg);
        }
    }
});

var today = new Date().getTime();
var dayTime = 24 * 60 * 60 * 1000;
function renderDoctorList(list) {
    var html = [],
        list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        html.push('<div class="doctor weui-cell padding15" data-id="' + item.id + '" data-currentwxid="'+item.currentWxId+'" style="display: block;">');
        html.push('<div class="his-flex">');
        html.push('<img alt="" src="' + (item.headimgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" class="his-flex-unshrink" style="width: 60px;height: 60px;border-radius: 50%;">');
        html.push('<div class="his-flex-grow marginLeft5">');
        html.push('<div class="his-flex marginBottom5">');
        html.push('<div class="fontBold deep-color">'+ (item.name || '') + '</div>');
        html.push('<div class="light-color font10">' + (item.visitsCount || 0) + '看诊量 | ' + (item.commentsCount || 0) + '条评价</div>');
        html.push('</div>');
        html.push('<div class="font12 light-color marginBottom5 textline1">' + (item.source === 'ZA' ? item.hospitalName.replace(/,/g, '，') : item.hospital) + '</div>');
        html.push('<div class="his-flex his-align-bottom">');
        html.push('<div class="textline1 illness-view">');
        var symptoms = item.symptomName && item.symptomName != '' ? item.symptomName.split(',') : [];
        for (var j = 0, length = symptoms.length; j < length; j++) {
            var symptom = symptoms[j];
            html.push('<span class="illness-item">' + symptom + '</span>');
        }
        html.push('</div>');
        if(item.schedule) {
            if (item.clinicSwitch === "ON" || item.clinicSwitch === "ON1" || item.clinicSwitch === "ON2" || item.clinicSwitch === "ON3") {
                if (params.date === lyb.formatDate(new Date(today + dayTime), 'yyyy-mm-dd') && Number(lyb.formatDate(today, 'hh')) >= 18
                    || params.date === lyb.formatDate(new Date(), 'yyyy-mm-dd')) {// 今天18点前只能电话预约明天
                    html.push('<a href="tel: 010-6064-7090" onclick="window.event.stopPropagation();" class="weui-btn weui-btn_mini weui-btn_warn radius2 his-flex-unshrink marginLeft10 yellow-background his-noborder">电话预约</a>');
                }else if(item.limit === null || params.date && item.limit > 0) {
                    html.push('<button type="button" data-id="' + item.id + '" class="appointment weui-btn weui-btn_mini weui-btn_warn radius2 his-flex-unshrink marginLeft10 his-noborder">预约门诊</button>');
                }else {
                    html.push('<button type="button" disabled class="weui-btn weui-btn_mini weui-btn_warn radius2 his-flex-unshrink marginLeft10 his-noborder">已约满</button>');
                }
            } else if (item.clinicSwitch === "OFF") {
                html.push('<a href="'+ ctx +'html/schedule/view_schedule.html?id='+ item.id +'" class="weui-btn weui-btn_mini weui-btn_warn radius2 his-flex-unshrink marginLeft10 yellow-background his-noborder">查看排班</a>');
            }
        }
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
    }
    return html.join('');
}

doctors.on('click', '.appointment', function (e) {
    e.stopPropagation();
    var dataSet = this.dataset;
    zhuge.track('点击医生列表预约按钮', function () {
        if(params.date) {
            window.location.href = ctx + 'pay/wx/mp/redirect/appointment?id=' + dataSet.id + '&date=' + params.date;
        }else {
            window.location.href = 'doctor_schedule.html?id=' + dataSet.id;
        }
    });
});

doctors.on('click', '.doctor', function (e) {
    var dataSet = this.dataset;
    window.location.href = 'doctor_detail.html?id=' + dataSet.id+'&shareId='+dataSet.currentwxid;
});

var cityData = {}, allHospital = [];
var _cityHTML = '<label class="weui-cell weui-check__label" for="quanguo">\n' +
    '        <div class="weui-cell__bd">不限</div>\n' +
    '        <div class="weui-cell__ft">\n' +
    '            <input type="radio" name="city" '+ (params.cityName && params.cityName !== '全国' ? '' : 'checked') +' class="weui-check" id="quanguo" value="">\n' +
    '            <span class="weui-icon-checked"></span>\n' +
    '        </div>\n' +
    '    </label>',
    _hospitalHTML = '<label class="weui-cell weui-check__label" for="yiguan">\n' +
        '    <div class="weui-cell__bd">\n' +
        '        <div class="weui-cell__bd">不限</div>\n' +
        '    </div>\n' +
        '    <div class="weui-cell__ft">\n' +
        '        <span id="other_info" class="marginLeft20 red-color font12"></span>\n' +
        '        <input type="radio" name="hospital" checked class="weui-check" id="yiguan" value="">\n' +
        '        <span class="weui-icon-checked"></span>\n' +
        '    </div>\n' +
        '</label>';
lyb.ajax(ctx + 'html/hospital/list.json', {
    success: function (result) {
        var list = result.data, cityHTML = '';
        for(var i=0,len=list.length;i<len;i++) {
            var city = list[i];
            cityData[city.simple] = city;
            cityHTML += '<label class="weui-cell weui-check__label" for="'+ city.id +'">\n' +
                '        <div class="weui-cell__bd '+ (params.cityName === city.simple ? 'red-color' : '') +'">'+ city.name +'</div>\n' +
                '        <div class="weui-cell__ft">\n' +
                '            <input type="radio" name="city" '+ (params.cityName && params.cityName === city.simple ? 'checked' : '') +' class="weui-check" id="'+ city.id +'" value="'+ city.simple +'">\n' +
                '            <span class="weui-icon-checked"></span>\n' +
                '        </div>\n' +
                '    </label>';
            if(!params.cityName || params.cityName === '全国') {//url上不带城市，列出所有医馆
                var hospitals = city.sysHospitals || [];
                for(var j=0,length=hospitals.length;j<length;j++) {
                    allHospital.push(hospitals[j]);
                }
            }
        }
        cityData[''] = {simple: '全国', sysHospitals: allHospital};
        if(!params.cityName || params.cityName === '全国') {//url上不带城市，列出所有医馆
            renderHospital(allHospital);
        }else {
            renderHospital((cityData[params.cityName.replace('市', '')] || {}).sysHospitals || []);
        }
        jQuery('#cityList').html(_cityHTML + cityHTML);
    }
});

function renderHospital(hospitals) {
    var hospitalHTML = '';
    for(var j=0,length=hospitals.length;j<length;j++) {
        var hosptial = hospitals[j];
        allHospital.push(hosptial);
        hospitalHTML += '<label class="weui-cell weui-check__label" for="'+ hosptial.id +'">\n' +
            '    <div class="weui-cell__bd">\n' +
            '        <div class="weui-cell__bd marginBottom5"><span style="vertical-align: middle;">' + hosptial.name + '</span><button data-name="' + hosptial.name + '" data-address="' + hosptial.address + '" data-latitude="' + hosptial.lat + '" data-longitude="' + hosptial.lng + '" class="weui-btn weui-btn_mini weui-btn_warn yellow-background his-noborder radius2 font12 marginLeft20" style="line-height: 2;vertical-align: middle;position: absolute;margin-top: -1px;">进入地图</button></div>\n' +
            '        <div class="weui-cell__bd font12 light-color">'+ hosptial.address +'</div>\n' +
            '    </div>\n' +
            '    <div class="weui-cell__ft">\n' +
            '        <span id="other_info" class="marginLeft20 red-color font12"></span>\n' +
            '        <input type="radio" name="hospital" class="weui-check" id="'+ hosptial.id +'" data-name="'+ hosptial.name +'" value="'+ hosptial.id +'">\n' +
            '        <span class="weui-icon-checked"></span>\n' +
            '    </div>\n' +
            '</label>';
    }
    jQuery('#hospitalList').html(_hospitalHTML + hospitalHTML);
}

new workTime("calendarList", {
    renderSuccess: function () {
        jQuery('#calendar').append('');
    }
});

//条件逻辑
var listBorder = jQuery("#listBorder"), module = jQuery("#module");
//按钮
jQuery('.select-btn').on('click', function () {
    var target = this.dataset.target;
    listBorder.children().addClass('his-hide');
    jQuery(target).removeClass('his-hide');
    module.removeClass('his-hide');
});

module.on('click', function () {
    listBorder.children().addClass('his-hide');
    module.addClass('his-hide');
});

listBorder.on('click', 'button', function (e) {
    e.stopPropagation();
    e.preventDefault();
    daohang(this.dataset);
});

var cityBtn = jQuery('.area-selector');
listBorder.on('change', 'input[name=city]', function () {
    var value = this.value;
    params.cityName = value;
    params.hospitalId = '';
    cityBtn.html(value || "全国");
    hospitalBtn.html("医馆");
    jQuery('#yiguan').attr('checked', true);
    var city = cityData[value] || {};
    renderHospital(city.sysHospitals || []);
    module.click();
    queryList();
    lyb.updateUrl({cityName: value || "全国"});
    if(value) {
        cityBtn.addClass('red-color');
    }else {
        cityBtn.removeClass('red-color');
    }
    hospitalBtn.removeClass('red-color');
    jQuery('#cityList').find('.weui-cell__bd.red-color').removeClass('red-color');
    jQuery(this).parent().prev().addClass('red-color');

    zhuge.track('搜索条件', {'城市': value || "全国"});
});

var hospitalBtn = jQuery('.hospital-selector');
listBorder.on('change', 'input[name=hospital]', function () {
    var value = this.value;
    params.hospitalId = value;
    hospitalBtn.html(this.dataset.name || "医馆");
    module.click();
    queryList();
    if(value) {
        hospitalBtn.addClass('red-color');
    }else {
        hospitalBtn.removeClass('red-color');
    }

    zhuge.track('搜索条件', {'门店': this.dataset.name || ""});
});

var dateBtn = jQuery('.date-selector');
listBorder.on('click', '.calendar-unvalid', function () {
    var value = this.dataset.value;
    params.date = value;
    listBorder.find('.calendar-unvalid.active').removeClass('active');
    this.classList.add('active');
    dateBtn.html(value || "日期");
    module.click();
    queryList();
    dateBtn.addClass('red-color');

    zhuge.track('搜索条件', {'日期': value || ""});
});
listBorder.on('click', '.clear-date', function () {
    listBorder.find('.calendar-unvalid.active').removeClass('active');
    delete params.date;
    dateBtn.html("日期");
    module.click();
    queryList();
    dateBtn.removeClass('red-color');

    zhuge.track('搜索条件', {'日期': ""});
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

    zhuge.track('搜索条件点击导航查看门店地址', {'门店名称': data.name, '地址': data.address});
}