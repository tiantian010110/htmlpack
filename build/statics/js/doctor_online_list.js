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
/*****************************************************source：resources/js/business/doctor/common.js*****************************************************/var today = new Date().getTime();
var dayTime = 24 * 60 * 60 * 1000;

//渲染门诊医生列表
function renderClinicDoctorList(list) {
    var html = '';
    list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        if (item.isConsulting) {
            html += '<div class="doctor doctor-item weui-cell" data-href="' + ctx + 'html/chat/chat.html?id=' + item.id + '" data-id="' + item.id + '">';
        } else {
            html += '<div class="doctor doctor-item weui-cell" data-href="' + ctx + 'html/doctor/doctor_detail.html?id=' + item.id + '" data-id="' + item.id + '">';
        }
        html += '<div class="his-flex his-align-top">';
        html += '<img alt="" src="' + (item.headimgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" class="his-flex-unshrink" style="width: 48px;height: 48px;border-radius: 50%;">';
        html += '<div class="his-flex-grow marginLeft8" style="line-height: 1;margin-top: 4px;">';
        html += '<div class="his-flex">';
        html += '<div class="" style="width: 100%;">';

        if (item.isConsulting) {
            html += '<div class="his-flex marginBottom10 his-align-bottom">';
            html += '<div class="fontBold deep-color font17">' + (item.name || '') + '</div>';
            html += '<div class="more yellow-color">网诊咨询中</div>';
            html += '</div>';
        } else {
            html += '<div class="fontBold deep-color font17 marginBottom10">' + (item.name || '') + '</div>';
        }
        html += '<div class="light-color font13">';
        html += '<span style="vertical-align: middle;">看诊量' + (item.visitsCount || 0) + '</span>';
        html += '<span class="his-spliter gray-background" style="margin: 0 8px;"></span>';
        html += '<span style="vertical-align: middle;">评价' + (item.commentsCount || 0) + '</span>';
        html += '</div>';
        html += '</div>';
        if (!item.isConsulting) {
            html += '<div class="more"></div>';
        }
        html += '</div>';
        html += '<div class="font13 light-color textline1 marginTop10 marginBottom10">' + (item.source === 'ZA' ? item.hospitalName.replace(/,/g, '，') : item.hospital) + '</div>';
        html += '<div class="his-flex his-align-bottom">';
        html += '<div class="illness-view" style="max-height: 23px;overflow: hidden;">';
        var symptoms = item.symptomName && item.symptomName !== '' ? item.symptomName.split(',') : [];
        for (var j = 0, length = symptoms.length; j < length; j++) {
            var symptom = symptoms[j];
            html += '<span class="illness-item">' + symptom + '</span>';
        }
        html += '</div>';
        if (item.schedule) {
            if (item.clinicSwitch === "ON" || item.clinicSwitch === "ON1" || item.clinicSwitch === "ON2" || item.clinicSwitch === "ON3") {
                if (item.limit === null || params.date && item.limit > 0) {
                    if (params.date === lyb.formatDate(new Date(today + dayTime), 'yyyy-mm-dd') && Number(lyb.formatDate(today, 'hh')) >= 18
                        || params.date === lyb.formatDate(new Date(), 'yyyy-mm-dd')) {// 今天18点前只能电话预约明天
                        html += '<button data-name="'+ item.name +'" data-href="tel: 010-6064-7090" type="button" class="phone his-button marginLeft10">电话预约</button>';
                    } else if (params.date) {
                        html += '<button data-name="'+ item.name +'" type="button" data-href="' + ctx + 'pay/wx/mp/redirect/appointment?id=' + item.id + '&date=' + params.date + '" data-id="' + item.id + '" class="appointment his-button marginLeft10" style="margin-top: -5px;">预约门诊</button>';
                    } else {
                        html += '<button data-name="'+ item.name +'" type="button" data-href="' + ctx + 'html/doctor/doctor_schedule.html?id=' + item.id + '" data-id="' + item.id + '" class="appointment his-button marginLeft10" style="margin-top: -5px;">预约门诊</button>';
                    }
                } else {
                    html += '<button data-name="'+ item.name +'" data-href="tel: 010-6064-7090" type="button" class="phone his-button marginLeft10 yellow-background" style="margin-top: -5px;width: 76px;">已约满</button>';
                }
            } else if (item.clinicSwitch === "OFF") {
                html += '<button data-name="'+ item.name +'" type="button" data-href="' + ctx + 'html/schedule/view_schedule.html?id=' + item.id + '" class="view-scheme his-button marginLeft10 yellow-background" style="margin-top: -5px;">查看排班</button>';
            }
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}


//渲染网诊医生列表
function renderOnlineDoctorList(list, options) {
    var html = '';
    list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        if (item.isConsulting) {
            html += '<div class="doctor doctor-item weui-cell" data-href="' + ctx + 'html/chat/chat.html?id=' + item.id + '" data-id="' + item.id + '">';
        } else {
            html += '<div class="doctor doctor-item weui-cell" data-href="' + ctx + 'html/doctor/doctor_detail.html?id=' + item.id + '" data-id="' + item.id + '">';
        }
        html += '<div class="his-flex his-align-top">';
        html += '<img alt="" src="' + (item.headimgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" class="his-flex-unshrink" style="width: 48px;height: 48px;border-radius: 50%;">';
        html += '<div class="his-flex-grow marginLeft8" style="line-height: 1;">';

        html += '<div class="marginBottom10" style="margin-top: 4px;">';
        if (item.isConsulting) {
            html += '<div class="his-flex marginBottom10 his-align-bottom">';
            html += '<div class="">';
            html += '<span class="fontBold deep-color font17" style="vertical-align: middle;">' + (item.name || '') + '</span>';
            if (options && options.showTitle) {
                html += '<span class="font13 marginLeft8" style="vertical-align: bottom;color: #333;">' + (item.titles || '') + '</span>';
            }
            html += '</div>';
            html += '<div class="more yellow-color">网诊咨询中</div>';
            html += '</div>';
        } else {
            html += '<div class="marginBottom10">';
            html += '<span class="fontBold deep-color font17" style="vertical-align: middle;">' + (item.name || '') + '</span>';
            if (options && options.showTitle) {
                html += '<span class="font13 marginLeft8" style="vertical-align: bottom;color: #333;">' + (item.titles || '') + '</span>';
            }
            html += '<div class="more"></div>';
            html += '</div>';
        }
        html += '<div class="font13 light-color textline1">' + (item.source === 'ZA' ? item.hospitalName.replace(/,/g, '，') : item.hospital) + '</div>';
        html += '</div>';
        html += '<div class="illness-view' + (options && (options.showPrice || options.showVC) ? ' marginBottom10' : '') + '" style="max-height: 23px;overflow: hidden;">';
        var symptoms = item.symptomName && item.symptomName !== '' ? item.symptomName.split(',') : [];
        for (var j = 0, length = symptoms.length; j < length; j++) {
            var symptom = symptoms[j];
            html += '<span class="illness-item">' + symptom + '</span>';
        }
        html += '</div>';
        html += '<div class="light-color font13">';

        if (options && options.showPrice) {
            var price = 0;
            if (item.serviceSwitch === 'ON') {
                if (item.graphicSwitch === 'ON') {
                    price = item.graphicPrice;
                    if (price > item.graphicFurtherPrice) {
                        price = item.graphicFurtherPrice;
                    }
                } else if (item.phoneSwitch === 'ON') {
                    price = item.phonePrice;
                    if (price > item.phoneFurtherPrice) {
                        price = item.phoneFurtherPrice;
                    }
                } else if (item.minConsultationFeeStr) {
                    price = item.minConsultationFeeStr;
                }
            } else if (item.minConsultationFeeStr) {
                price = item.minConsultationFeeStr;
            }
            if(price !== undefined && price !== null) {
                html += '<span class="font16 red-color" style="vertical-align: middle;margin-right: 2px;">' + price + '</span><span class="font12 middle-color marginRight20" style="vertical-align: middle;">元/次</span>';
            }
        }

        if (options && options.showVC) {
            html += '<span style="vertical-align: middle;">看诊量' + (item.visitsCount || 0) + '</span>';
            html += '<span class="his-spliter gray-background" style="margin: 0 8px;"></span>';
            html += '<span style="vertical-align: middle;">评价' + (item.commentsCount || 0) + '</span>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}

//TODO 绑定医生列表事件
function bindBtnEvents(el) {
    el.on('click', '.doctor', function (e) {
        var dataSet = this.dataset;
        var text = '';
        if(dataSet.href.indexOf('chat.html') !== -1){//补充网诊咨询中点击卡片的埋点文案
            text = '网诊咨询中点击卡片';
        }
        zhuge.track('医生列表功能入口', {'功能名称': text || '查看医生详情', '医生姓名': dataSet.name}, function () {
            window.location.href = dataSet.href;
        })
    }).on('click', '.appointment,.phone,.view-scheme', function (e) {
        e.stopPropagation();
        var dataSet = this.dataset, text = this.innerText;
        zhuge.track('医生列表功能入口', {'功能名称': text, '医生姓名': dataSet.name}, function () {
            window.location.href = dataSet.href;
        })
    });
}

//TODO 初始化searchbox
function initSearchBox(options, callback) {
    if (lyb.type(options) === 'function') {
        callback = options;
        options = null;
    }
    //定位
    var citySelector = document.querySelector('#city_selector');
    //搜索框
    var searchBox = lyb.get('searchBar');
    var req, queue = [], queueFlag = false, interval;
    searchBox.inputFn = function (text) {
        var that = this;
        if (text) {
            this.viewSearchText.html(text);
        } else {
            this.viewSearchText.html(this.textEl[0].placeholder);
        }
        queue.push(text);
        if (!queueFlag) {
            interval = window.setInterval(function () {
                if (queue.length) {
                    queue = queue.slice(queue.length - 1, queue.length);
                    if (callback) {
                        callback(queue.shift(), that, req);
                    } else {
                        doSearchOrder(queue.shift(), that);
                    }
                } else {
                    window.clearInterval(interval);
                    queueFlag = false;
                }
            }, 500);
            queueFlag = true;
        }
    };
    searchBox.focusFn = function (text) {
        citySelector && citySelector.parentNode.classList.add('his-hide');
        if (callback) {
            callback(text, this, req);
        } else {
            doSearchOrder(text, this);
        }
    };
    searchBox.cancelFn = function () {
        params.type !== 'illness' && citySelector && citySelector.parentNode.classList.remove('his-hide');
        this.textEl.val(decodeURIComponent(params.condition));
        this.viewSearchText.html(decodeURIComponent(params.condition) || this.textEl[0].placeholder);
    };

    var locationPage = location.pathname.replace(/^\//, '');

    function doSearchOrder(text, that) {
        if (req) {
            req.abort();
        }
        if (text === '') {
            that.renderSearchResult('');
            that._renderHistory();
            return;
        }

        var _params = [];
        if (options) {
            if (options.mainPage) {
                _params.push('mainPage=true')
            } else {
                _params.push('mainPage=false');
            }
            if (options.type) {
                _params.push('type=' + options.type);
            }
            if (options.towDay) {
                _params.push('date=' + params.date)
            }
        }
        var _paramsString = _params.join('&');
        jQuery.ajax(ctx + 'doctor/info/search' + (_paramsString ? ('?' + _paramsString) : ''), {
            type: 'get',
            data: {'condition': text, pageNum: 1, pageSize: 4},
            success: function (result) {
                if (result.success) {
                    var data = result.data || {doctors: [], diseases: []};
                    data.doctors = data.doctors || [];
                    data.diseases = data.diseases || [];
                    var _data = {
                        doctor: {list: data.doctors, total: data.doctors.length},
                        illness: {list: data.diseases, total: data.diseases.length}
                    };
                    var doctor = _data.doctor, illness = _data.illness, html = '';

                    //病症
                    if (illness.total > 0) {
                        html += '<div class="weui-panel his-nobackground no-after-line no-before-line">';
                        html += '<div class="weui-panel__hd no-after-line">病症</div>';
                        html += '<div class="weui-panel__bd no-after-line">';
                        html += '<div class="weui-cells his-nobackground">';
                        for (var i = 0, len = (illness.total > 3 ? 3 : illness.total); i < len; i++) {
                            var item = illness.list[i];
                            html += '<div class="weui-cell white-background">';
                            html += '<span class="weui-cell__bd middle-color search-result" data-type="illness" data-href="' + locationPage + '?condition=' + item.name + '&type=doctor&cityName=' + (params.cityName || '全国') + '">' + item.name + '</span>';
                            html += '</div>';
                        }
                        if (illness.total > 3) {
                            html += '<div class="weui-cell weui-cell_access">';
                            html += '<span class="weui-cell__bd light-color search-more-result" data-href="' + locationPage + '?type=illness&condition=' + text + '" style="flex: 0 0 86px;-webkit-flex: 0 0 86px;">查看更多病症</span>';
                            html += '<div class="weui-cell__ft"></div>';
                            html += '</div>';
                        }

                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    }

                    //大夫
                    if (doctor.total > 0) {
                        html += '<div class="weui-panel his-nobackground no-after-line no-before-line marginBottom10">';
                        html += '<div class="weui-panel__hd no-after-line">大夫</div>';
                        html += '<div class="weui-panel__bd no-after-line">';
                        html += '<div class="weui-cells his-nobackground">';
                        for (var i = 0, len = (doctor.total > 3 ? 3 : doctor.total); i < len; i++) {
                            var item = doctor.list[i];
                            html += '<div class="weui-cell white-background">';
                            html += '<span class="weui-cell__bd middle-color search-result" data-type="doctor" data-id="' + item.id + '" data-href="html/doctor/doctor_detail.html?id=' + item.id + '&shareId=' + item.currentWxId + '">' + item.name + '</span>';
                            html += '</div>';
                        }
                        if (doctor.total > 3) {
                            html += '<div class="weui-cell weui-cell_access">';
                            html += '<span class="weui-cell__bd light-color search-more-result" data-href="' + locationPage + '?type=doctor&condition=' + text + '" style="flex: 0 0 86px;-webkit-flex: 0 0 86px;">查看更多医生</span>';
                            html += '<div class="weui-cell__ft"></div>';
                            html += '</div>';
                        }
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    }
                    if (illness.total === 0 && doctor.total === 0) {
                        html += '<div class="padding-10-0" style="text-align: center;"><div class="light-color font12 padding-0-5">没有找到相关数据</div></div>';
                    }
                    that.renderSearchResult(html);
                }
            }
        });
    }

//诸葛打点
    jQuery(searchBox.searchBody).on('click', '.search-result, .search-more-result', function () {
        var url = this.dataset.href;
        var text = this.innerText;
        zhuge.track(document.title + '-点击搜索结果', {
            '内容': text,
            '来源': document.title,
            '时间': lyb.formatDate(new Date(), 'yyyy-mm-dd hh:mi:ss')
        }, function () {
            // history.replaceState('', '', ctx + url);
            // window.setTimeout(function () {
            //     window.location.reload();
            // }, 0);
            window.location.href = ctx + url;
        });
    });
    return searchBox;
}

//TODO 初始化多条件查询
function initMultiFilter(pullComp, listEl) {
    var cityData = {}, allHospital = [];
    var _cityHTML = '<label class="weui-cell weui-check__label" for="quanguo">\n' +
        '        <div class="weui-cell__bd">不限</div>\n' +
        '        <div class="weui-cell__ft">\n' +
        '            <input type="radio" name="city" ' + (params.cityName && params.cityName !== '全国' ? '' : 'checked') + ' class="weui-check" id="quanguo" value="">\n' +
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
            for (var i = 0, len = list.length; i < len; i++) {
                var city = list[i];
                cityData[city.simple] = city;
                cityHTML += '<label class="weui-cell weui-check__label" for="' + city.id + '">\n' +
                    '        <div class="weui-cell__bd ' + (params.cityName === city.simple ? 'red-color' : '') + '">' + city.name + '</div>\n' +
                    '        <div class="weui-cell__ft">\n' +
                    '            <input type="radio" name="city" ' + (params.cityName && params.cityName === city.simple ? 'checked' : '') + ' class="weui-check" id="' + city.id + '" value="' + city.simple + '">\n' +
                    '            <span class="weui-icon-checked"></span>\n' +
                    '        </div>\n' +
                    '    </label>';
                // if (!params.cityName || params.cityName === '全国') {//url上不带城市，列出所有医馆
                var hospitals = city.sysHospitals || [];
                for (var j = 0, length = hospitals.length; j < length; j++) {
                    allHospital.push(hospitals[j]);
                }
                // }
            }
            cityData[''] = {simple: '全国', sysHospitals: allHospital};
            if (!params.cityName || params.cityName === '全国') {//url上不带城市，列出所有医馆
                renderHospital(allHospital);
            } else {
                renderHospital((cityData[params.cityName.replace('市', '')] || {}).sysHospitals || []);
            }
            jQuery('#cityList').html(_cityHTML + cityHTML);
        }
    });

    function renderHospital(hospitals) {
        var hospitalHTML = '';
        for (var j = 0, length = hospitals.length; j < length; j++) {
            var hosptial = hospitals[j];
            allHospital.push(hosptial);
            hospitalHTML += '<label class="weui-cell weui-check__label" for="' + hosptial.id + '">\n' +
                '    <div class="weui-cell__bd">\n' +
                '        <div class="weui-cell__bd marginBottom5"><span style="vertical-align: middle;">' + hosptial.name + '</span><button data-name="' + hosptial.name + '" data-address="' + hosptial.address + '" data-latitude="' + hosptial.lat + '" data-longitude="' + hosptial.lng + '" class="weui-btn weui-btn_mini weui-btn_warn yellow-background his-noborder radius2 font12 marginLeft20" style="line-height: 2;vertical-align: middle;position: absolute;margin-top: -1px;">进入地图</button></div>\n' +
                '        <div class="weui-cell__bd font12 light-color">' + hosptial.address + '</div>\n' +
                '    </div>\n' +
                '    <div class="weui-cell__ft">\n' +
                '        <span id="other_info" class="marginLeft20 red-color font12"></span>\n' +
                '        <input type="radio" name="hospital" class="weui-check" id="' + hosptial.id + '" data-name="' + hosptial.name + '" value="' + hosptial.id + '">\n' +
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
        queryList(pullComp, listEl);
        lyb.updateUrl({cityName: value || "全国"});
        if (value) {
            cityBtn.addClass('red-color');
        } else {
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
        queryList(pullComp, listEl);
        if (value) {
            hospitalBtn.addClass('red-color');
        } else {
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
        queryList(pullComp, listEl);
        dateBtn.addClass('red-color');

        zhuge.track('搜索条件', {'日期': value || ""});
    });
    listBorder.on('click', '.clear-date', function () {
        listBorder.find('.calendar-unvalid.active').removeClass('active');
        delete params.date;
        dateBtn.html("日期");
        module.click();
        queryList(pullComp, listEl);
        dateBtn.removeClass('red-color');

        zhuge.track('搜索条件', {'日期': ""});
    });
}

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

function queryList(pullComp, listEl) {
    listEl.empty();
    pullComp.reset();
    if (params.date) {
        pullComp.params.date = params.date;
    } else {
        delete pullComp.params.date;
    }
    if (params.cityName) {
        pullComp.params.city = params.cityName.replace(/全国/g, '');
    } else {
        delete pullComp.params.city;
    }
    if (params.hospitalId) {
        pullComp.params.hospitalId = params.hospitalId;
    } else {
        delete pullComp.params.hospitalId;
    }
    pullComp.load();
}
/*****************************************************source：resources/js/business/doctor/doctor_online_list.js*****************************************************/lyb.parse();

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'openLocation'], function () {
    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: window.shareCommonTitle, // 分享标题
        link: window.location.href, // 分享链接
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
        link: window.location.href, // 分享链接
        imgUrl: '//image-1252304461.file.myqcloud.com/image/'+ (window.lybMp ? 'lyb-logo' : 'big-logo') +'.jpg',
        success: function () {
            lyb.alert('分享成功!');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
});

//搜索框
var searchBox = initSearchBox();
var doctors = jQuery('#doctor_list');

var pull = lyb.pullUpLoading({
    el: document.querySelector('#wrapper'),
    reference: document.body,
    pageSize: 10,
    url: ctx + 'doctor/info/lyb/search',
    params: {condition: searchBox.getValue()},
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            doctors.append(renderOnlineDoctorList(list, {showPrice: true, showVC: true, showTitle: true}));
        } else {
            lyb.error(result.msg);
        }
    }
});

//绑定事件
bindBtnEvents(doctors);
