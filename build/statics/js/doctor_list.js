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
/*****************************************************source：resources/js/business/doctor/calendar.static.js*****************************************************//**
 * info：生成静态日历 author：田鑫龙 date：2017-05-05
 */

(function () {
    var workTime = function (id, options) {
        this.monthDay = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.init(id);
        this.render();
        this.options = options || {};
        options && this.renderWrokTime(options);
    };

    workTime.prototype = {
        init: function (id) {
            var dayTime = 24 * 60 * 60 * 1000;//1天
            var step = 58 * dayTime;//58天
            //var date = new Date(new Date().getTime() + dayTime);
            var date = new Date();
            var endDate = new Date(date.getTime() + step);
            this.params = {
                date: date,
                startYear: date.getFullYear(),
                startMonth: date.getMonth() + 1,
                startDay: date.getDate(),
                endYear: endDate.getFullYear(),
                endMonth: endDate.getMonth() + 1,
                endDay: endDate.getDate()
            };
            this.params.startString = this.params.startYear + '-' + (this.params.startMonth >= 10 ? this.params.startMonth : ('0' + this.params.startMonth)) + '-' + (this.params.startDay >= 10 ? this.params.startDay : ('0' + this.params.startDay));
            this.params.endString = this.params.endYear + '-' + (this.params.endMonth >= 10 ? this.params.endMonth : ('0' + this.params.endMonth)) + '-' + (this.params.endDay >= 10 ? this.params.endDay : ('0' + this.params.endDay));

            this.el = document.getElementById(id);
            this.today = date;
            this.dayTime = dayTime;
        },
        getFebruary: function (year) {// 判断闰年
            if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
                return 29;
            }
            return 28;
        },
        runNian: function (year) {// 判断闰年
            if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
                return true;
            }
            return false;
        },
        getFirstDay: function (year, month) {// 判断某年某月的1号是星期几
            var allDay = 0, y = year - 1, i = 1;
            allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
            for (; i < month; i++) {
                switch (i) {
                    case 1:
                        allDay += 31;
                        break;
                    case 2:
                        if (this.runNian(year)) {
                            allDay += 29;
                        }
                        else {
                            allDay += 28;
                        }
                        break;
                    case 3:
                        allDay += 31;
                        break;
                    case 4:
                        allDay += 30;
                        break;
                    case 5:
                        allDay += 31;
                        break;
                    case 6:
                        allDay += 30;
                        break;
                    case 7:
                        allDay += 31;
                        break;
                    case 8:
                        allDay += 31;
                        break;
                    case 9:
                        allDay += 30;
                        break;
                    case 10:
                        allDay += 31;
                        break;
                    case 11:
                        allDay += 30;
                        break;
                    case 12:
                        allDay += 31;
                        break;
                }
            }
            return allDay % 7;
        },
        renderCalendar: function (year, month) {// 显示日历
            var i = 0,
                monthDay = this.monthDay[month - 1] || this.getFebruary(),
                html = [],
                _classname = "",
                firstDay = this.getFirstDay(year, month);

            html.push('<table class="his-calendar-table">');
            html.push('<caption class="calendar-caption">');
            //html.push('<div class="caption-title caption-sub-title">日期表</div>');
            html.push('<div class="caption-title">' + year + '年' + month + '月</div>');
            html.push('</caption>');
            html.push('<thead>');

            html.push('<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>');

            html.push('</thead>');
            html.push('<tbody>');
            html.push('<tr>');

            for (i = 1; i <= firstDay; i++) {
                html.push('<td class="calendar-day calendar-empty"></td>');
            }

            for (i = 1; i <= monthDay; i++) {
                var currentString = year + '-' + (month >= 10 ? month : ('0' + month)) + '-' + (i >= 10 ? i : ('0' + i));

                if (currentString < this.params.startString || currentString > this.params.endString) {
                    _classname = 'calendar-day calendar-overflow';
                } else {
                    _classname = 'calendar-day calendar-unvalid';
                }
                html.push('<td class="' + _classname + ' $' + currentString + '" data-value="' + currentString + '"><div>' + i + '</div></td>');

                firstDay = (firstDay + 1) % 7;
                if (firstDay === 0 && i !== monthDay) {
                    html.push('</tr><tr>');
                }
            }

            if (firstDay !== 0) {
                for (i = firstDay; i < 7; i++) {
                    html.push('<td class="calendar-day calendar-empty"></td>');
                }
            }

            html.push('</tr>');
            html.push('</tbody>');
            html.push('</table>');

            return html.join('');
        },
        render: function () {
            var array = [];
            if (this.params.endYear === this.params.startYear) {
                do {
                    array.unshift([this.params.startYear, this.params.endMonth - array.length]);
                } while (this.params.endMonth - array.length >= this.params.startMonth);
            } else {
                while (this.params.endMonth - array.length > 0) {
                    array.unshift([this.params.endYear, this.params.endMonth - array.length]);
                }
                var month = 12;
                while (month - this.params.startMonth >= 0) {
                    array.unshift([this.params.startYear, month--]);
                }
            }
            for (var i = 0, len = array.length; i < len; i++) {
                var date = array[i];
                var div = document.createElement('div');
                div.classList.add('his-calendar');
                div.innerHTML = this.renderCalendar(date[0], date[1]);
                this.el.appendChild(div);
            }
        },
        renderWrokTime: function (options) {
            if(options.scheduleUrl) {
                var startDate = this.params.startString, endDate = this.params.endString, that = this;
                var mask = lyb.showMask();
                mask.show();
                lyb.ajax(options.scheduleUrl, {
                    type: 'get',
                    dataType: 'json',
                    data: {start: startDate, end: endDate},
                    success: function (result) {
                        var array = result.data || [];
                        that.iteratorDate(array, options.detailUrl);
                        mask.close();
                    }
                });
            }else {
                if(this.options.renderSuccess) {
                    this.options.renderSuccess();
                    delete this.options.renderSuccess;
                }
            }
        },
        iteratorDate: function (array, url) {
            var telFunction = function(e){
                lyb.confirm('当前时间段只能通过电话预约，是否致电010-6064-7090？', {
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function () {
                        }
                    }, {
                        label: '拨打电话',
                        type: 'primary',
                        onClick: function () {
                            window.location.href = 'tel: 010-6064-7090';
                        }
                    }]
                });
            };
            var scheduleFunction = function(e){
                window.location.href = url + '&date=' + this.dataset.value;
            };

            var combineFunction = function(e){
                var value = this.dataset.value;
                var telHospital = this.dataset.telhospital;
                var schduleHopital = this.dataset.schdulehopital;
                var confirm = new weui.confirm(value + '<br>'+ telHospital +'：只能电话预约<br>'+ schduleHopital +'：可以微信预约', {
                    buttons: [{
                        label: '电话约' + telHospital,
                        type: 'default',
                        onClick: function () {
                            window.location.href = 'tel: 010-6064-7090';
                        }
                    }, {
                        label: '微信约' + schduleHopital,
                        type: 'primary',
                        onClick: function () {
                            window.location.href = url + '&date=' + value;
                        }
                    }]
                });
                jQuery('.weui-dialog__bd').append('<span class="lyb-mock-close" style="position: absolute;right: 5px;top: 0;color: #c03e3e;"></span>')
                jQuery('.lyb-mock-close').click(function () {
                    confirm.hide();
                })
            };
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                var app = this.el.querySelector('.\\$' + item.date);
                app.setAttribute('vAlign', 'bottom');
                var border = app.querySelector('.hospital-border');
                if (!border) {
                    border = document.createElement('div');
                    border.classList.add('hospital-border');
                    app.appendChild(border);
                }
                var status = document.createElement('div');
                status.classList.add('lest');
                status.classList.add('font10');
                status.style.fontSize = '10px';
                status.innerText = item.hospitalName;
                if (Number(item.limit) <= 0) {
                    status.classList.add('CCCCCC-bg');
                    app.classList.remove('calendar-valid');
                    app.classList.add('calendar-unvalid');
                } else if (item.isFirstNumLimit || item.date === lyb.formatDate(new Date(this.today.getTime() + this.dayTime), 'yyyy-mm-dd') && Number(lyb.formatDate(this.today, 'hh')) >= 18
                   || item.date === lyb.formatDate(new Date(this.today.getTime()), 'yyyy-mm-dd')) {// 今天18点前只能电话预约明天
                    status.classList.add('E6A85F-bg');
                    app.classList.add('calendar-valid');
                    app.classList.add('only-phone');
                    jQuery(app).attr('data-telhospital', item.hospitalName);
                    app.classList.remove('calendar-unvalid');
                    if(app.classList.contains('can-schedule')){ //如果当前日期已经有了预约标志
                        app.removeEventListener('click', scheduleFunction);
                        app.addEventListener('click', combineFunction);
                    }else{
                        app.addEventListener('click', telFunction);
                    }
                } else {
                    status.classList.add('A3C37A-bg');
                    app.classList.add('calendar-valid');
                    app.classList.add('can-schedule');
                    app.classList.remove('calendar-unvalid');
                    jQuery(app).attr('data-schdulehopital', item.hospitalName);
                    if (url) {
                        if(app.classList.contains('only-phone')){ //如果当前日期已经有了打电话标志
                            app.removeEventListener('click', telFunction);
                            app.addEventListener('click', combineFunction);
                        }else{
                            app.addEventListener('click', scheduleFunction);
                        }
                    }
                }
                border.appendChild(status);
            }
            if(this.options.renderSuccess) {
                this.options.renderSuccess();
                delete this.options.renderSuccess;
            }
        }
    };
    window.workTime = workTime;
})();
/*****************************************************source：resources/js/business/doctor/doctor_list.js*****************************************************/params.cityName = decodeURIComponent(params.cityName || '全国');
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
