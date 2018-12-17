lyb.parse();

//判断显示那个页签
var hash = window.location.hash;
if (hash === '#webim') {
    window.location.href = ctx + 'html/chat/chat.html?id=' + params.id;
}

var GAOFANGJIE_STATUS = {};


var service = jQuery('#doctor_service'), moreService = jQuery('#doctor_more_service');
//查询医生详情
lyb.ajax({
    url: ctx + 'doctor/info/get?id=' + params.id+'&shareId='+(params.shareId||''),
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            var data = result.data;

            if (data.headimgUrl)
                document.querySelector('#head_url').src = data.headimgUrl;

            document.querySelector('#doctor_name').innerHTML = '<span class="fontBold marginRight8">' + data.name + '</span><span style="opacity: 0.8;">' + (data.titles || '') + '</span>';
            params.name = data.name;
            // if(data.source === 'bd'){
            //     jQuery('#xw_doctor_schedule').show();
            // }
            document.querySelector('#doctor_info').innerHTML = (data.hospital || '') + '<span class="marginLeft8">' + (data.officeName || 'nbsp;') + '</span>';
            document.querySelector('#visit_count').innerHTML = data.visitsCount || '--';
            document.querySelector('#commont_count').innerHTML = '（' + (data.commentsCount || '--') + '人评价）';
            document.querySelector('#comments_persent').innerHTML = data.goodCommentsPersent || '--';
            document.querySelector('#visit_rate').innerHTML = data.repeatVisitPersent || '--';
            document.querySelector('#clinic_pricef').innerHTML = data.consultationFeeStr || 0;
            if (params.shareId) {
                new QRCode(document.querySelector('#doctor_qr'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'shareWithWxInfoQrcodeLyb' : 'shareWithWxInfoQrcodeZan'],
                    width: 100,
                    height: 100
                });
                new QRCode(document.querySelector('#qrCode'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'shareWithWxInfoQrcodeLyb' : 'shareWithWxInfoQrcodeZan'],
                    width: 100,
                    height: 100
                });
            }else{
                new QRCode(document.querySelector('#doctor_qr'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'lybQrcodeUrl' : 'qrcodeUrl'],
                    width: 100,
                    height: 100
                });
                new QRCode(document.querySelector('#qrCode'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'lybQrcodeUrl' : 'qrcodeUrl'],
                    width: 100,
                    height: 100
                });
            }
            var clinic = document.querySelector('#clinic_switch');

            var allowQueryService = lyb.wxBrowser && data.subFlag || !lyb.wxBrowser;
            if (allowQueryService) {
                if (data.clinicSwitch == "ON" || data.clinicSwitch == "ON1" || data.clinicSwitch == "ON2" || data.clinicSwitch == "ON3") {
                    clinic.onclick = function() {
                        zhuge.track('医生主页链接', {
                            '功能入口': '门诊预约',
                            '医生名称': params.name
                        }, function () {
                            window.location.href = 'doctor_schedule.html?id=' + params.id + '&channel=' + (params.channel || '');
                        });
                    }
                    clinic.innerHTML = '点此预约';
                    jQuery('#clinicGao').show();
                    clinic.parentNode.classList.remove('his-hide');
                } else if (data.clinicSwitch == "OFF" && data.schedule) {
                    clinic.onclick = function() {
                        zhuge.track('医生主页链接', {
                            '功能入口': '查看排班',
                            '医生名称': params.name
                        }, function () {
                            window.location.href = ctx + 'html/schedule/view_schedule.html?id=' + params.id;
                        });
                    };
                    jQuery('#clinicGao').attr('data-href', ctx + 'html/schedule/view_schedule.html?id=' + params.id).show();
                    clinic.innerHTML = '查看排班';
                    clinic.parentNode.classList.remove('his-hide');
                } else {
                    clinic.parentNode.classList.add('his-hide');
                    clinic.classList.add('gray-border');
                    clinic.classList.add('gray-color');
                    clinic.classList.add('white-background');
                }

                //服务
                params.consulting = data.consulting;

                service.append(renderGraphic(data.isFirst || false, data.graphicPrice || 0, data.graphicFurtherPrice || 0, (data.serviceSwitch == 'ON' && data.graphicSwitch == 'ON' ? true : false), data.consulting));
                service.append(renderPhone(data.isFirst || false, data.phonePrice || 0, data.phoneFurtherPrice || 0, (data.serviceSwitch == 'ON' && data.phoneSwitch == 'ON' ? true : false), data.consulting));
                service.append(renderFurtherConsultation(data.consultPrice || 0, data.consultCount || 0, data.consultCount > 0 || data.serviceSwitch == 'ON' && data.consultAfterSwitch == "ON" && data.consultCount == 0));

                queryDoctorOther();

                //TODO 王买亮图文复诊2
                if (params.id === "f0200471b3414238ab61e6f8d0801eac") {
                    renderGraphic2();
                }
            } else {
                jQuery('#un_care_mp').removeClass('his-hide').prevAll().addClass('his-hide');
            }

            //简介
            var doctor_jianjie = document.querySelector('#doctor_jianjie');
            if (data.speciality) {
                doctor_jianjie.classList.remove('his-hide');
                document.querySelector('#inst').innerHTML = data.speciality;
            }

            //擅长
            var html = '', shareHTML = data.symptomName || '';
            var sympList = data.symptomName && data.symptomName != '' ? data.symptomName.split(',') : [];
            for (var j = 0, length = sympList.length; j < length; j++) {
                var symptom = sympList[j];
                html += '<span class="illness-item">' + symptom + '</span>';
            }
            var doctor_shanchang = document.querySelector('#doctor_shanchang');
            if (html) {
                doctor_shanchang.classList.remove('his-hide');
                document.querySelector('#doctor_symptoms').innerHTML = html;
            }

            zhuge.track('医生主页', {'医生名称': params.name, '来源': decodeURIComponent(params.sourcePage)});

            //微信签名授权
            lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
                wx.hideMenuItems({
                    menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
                });
                wx.showMenuItems({
                    menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
                });
                wx.onMenuShareTimeline({
                    title: '【' + window.mpName + '】推荐好中医：' + data.name, // 分享标题
                    link: ctx + 'weixin/doctor/' + params.id+'?shareId='+data.currentWxId, // 分享链接
                    imgUrl: data.headimgUrl, // 分享图标
                    success: function () {
                        lyb.alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '【' + window.mpName + '】推荐好中医：' + data.name, // 分享标题
                    desc: '擅长：' + shareHTML, // 分享描述
                    link: ctx + 'weixin/doctor/' + params.id+'?shareId='+data.currentWxId, // 分享链接
                    imgUrl: data.headimgUrl,
                    success: function () {
                        lyb.alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        }
    }
});

//服务按钮点击事件
service.on('click', '.buy-service', function (e) {
    e.stopPropagation();
    var dataSet = this.dataset;
    zhuge.track('医生主页链接', {
        '医生名称': params.name,
        '功能入口': {
            'graphic': '图文复诊',
            'phone': '电话复诊',
            'consult': '诊后提问',
            'graphic2': '舒眠咨询'
        }[dataSet.serviceType]
    }, function () {
        var url = ctx + 'pay/wx/mp/redirect/buy_service?id=' + params.id + '&serviceType=' + dataSet.serviceType + '&channel=' + (params.channel || '');
        if (dataSet.serviceType === 'consult') {
            if (dataSet.count > 0) {
                url = '../consult/consult.html?id=' + params.id;
            } else {
                url = ctx + 'pay/wx/mp/redirect/buy_service?id=' + params.id + '&serviceType=' + dataSet.serviceType + '&channel=' + (params.channel || '');
            }
        } else if (dataSet.serviceType === 'graphic' || dataSet.serviceType === 'phone') {
            lyb.ajax({
                url: ctx + 'doctor/info/serviceEnd?doctorId=' + params.id,
                success: function (result) {
                    if (result.code === 403 || result.code === 401) {
                        return;
                    }
                    if (result.success) {
                        window.location.href = ctx + 'sysInquiry/redirectSysInquiry?doctorId=' + params.id + '&channel=' + (params.channel || '');
                    } else {
                        window.location.href = url;
                    }
                }
            })
            return;
        }
        window.location.href = url + '&_=' + new Date().getTime();
    });//打点
});

//图文复诊
function renderGraphic(isFirst, firstPrice, morePrice, service, consulting) {
    var btnText = service ? consulting ? '正在咨询' : '点此复诊' : '暂未开通';
    if(btnText === '点此复诊'){
        GAOFANGJIE_STATUS.TUWEN = true;
        judgeBtnsStatuMethod();
    }
    var cls = (service || consulting) ? 'buy-service ' : '';
    var html = '<div class="white-background his-flex padding15">';
    html += '<div class="">';
    html += '<div class="marginBottom10">';
    html += '<span class="deep-color" style="vertical-align: middle;">图文复诊</span>';
    html += '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>';
    html += '<span class="red-color" style="vertical-align: middle;">' + comparePrice(firstPrice, morePrice) + '<span class="font11">元/次</span></span>';
    html += '</div>';
    html += '<div class="light-color font12">在线图文交流，开方调药</div>';
    html += '</div>';
    html += '<a data-service="' + service + '" data-service-type="graphic" class="' + cls + 'weui-btn weui-btn_mini buy-btn ' + (service ? consulting ? 'yellow-background' : '' : 'gray-background') + '">' + btnText + '</a>';
    html += '</div>';
    return html;
}

//图文复诊2
function renderGraphic2() {
    lyb.ajax(ctx + 'order/special/count?doctorId=' + params.id, {
        success: function (result) {
            if (result.success) {
                var html = '<div class="white-background his-flex padding15">';
                html += '<div class="">';
                html += '<div class="marginBottom10">';
                html += '<span class="deep-color" style="vertical-align: middle;">舒眠咨询</span>';
                html += '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>';
                html += '<span class="red-color" style="vertical-align: middle;">600<span class="font11">元/次</span><span class="font11 marginLeft5">限量</span>1<span class="font11">次</span></span>';
                html += '</div>';
                html += '<div class="light-color font12">一小时与医生单独沟通</div>';
                html += '</div>';
                html += '<a data-service="ON" data-service-type="graphic2" class="buy-service weui-btn weui-btn_mini buy-btn">点此复诊</a>';
                html += '</div>';

                service.append(html);
            }
        }
    })
}

//电话复诊
function renderPhone(isFirst, firstPrice, morePrice, service, consulting) {
    var btnText = service ? consulting ? '正在咨询' : '点此复诊' : '暂未开通';
    if(btnText === '点此复诊'){
        GAOFANGJIE_STATUS.DIANHUA = true;
        judgeBtnsStatuMethod();
    }
    var cls = (service || consulting) ? 'buy-service ' : '';
    var html = '<div class="white-background his-flex padding15">';
    html += '<div class="">';
    html += '<div class="marginBottom10">';
    html += '<span class="deep-color" style="vertical-align: middle;">电话复诊</span>';
    html += '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>';
    html += '<span class="red-color" style="vertical-align: middle;">' + comparePrice(firstPrice, morePrice) + '<span class="font11">元/次</span></span>';
    html += '</div>';
    html += '<div class="light-color font12">20分钟通话，图文交流，开方调药</div>';
    html += '</div>';
    html += '<a data-service="' + service + '" data-service-type="phone" class="' + cls + 'weui-btn weui-btn_mini buy-btn ' + (service ? consulting ? 'yellow-background' : '' : 'gray-background') + '">' + btnText + '</a>';
    html += '</div>';
    return html;
}

function comparePrice(firstPrice, morePrice) {
    if (firstPrice > morePrice) {
        return morePrice + ' - ' + firstPrice;
    } else if (firstPrice === morePrice) {
        return firstPrice;
    }
    return firstPrice + ' - ' + morePrice;
}

//诊后提问
function renderFurtherConsultation(price, serviceCount, consultSwitch) {
    var btnText = consultSwitch ? '点此提问' : '暂未开通';
    var cls = (consultSwitch) ? 'buy-service ' : 'gray-background ';
    return '<div class="white-background his-flex padding15">' +
        '<div class="">' +
        '<div class="marginBottom10">' +
        '<span class="deep-color" style="vertical-align: middle;">诊后提问</span>' +
        '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>' +
        '<span class="red-color" style="vertical-align: middle;">' + price + '<span class="font11">元/5次</span></span>' +
        '</div>' +
        '<div class="light-color font12 marginBottom5">在线快速提问，大夫解答</div>' +
        '<div class="light-color red-color font12">剩余' + serviceCount + '次免费机会</div>' +
        '</div>' +
        '<a data-service-type="consult" data-count="' + serviceCount + '" class="' + cls + 'weui-btn weui-btn_mini buy-btn his-flex-unshrink">' + btnText + '</a>' +
        '</div>';
}

function queryDoctorOther() {
    var array = ['', '', '', ''];
    lyb.Promise.all(function (resolve) {
         //有调理方案
         lyb.ajax(ctx + 'product/doctor/online/' + params.id + "?pageNum=1&pageSize=1", {
             dataType: 'json',
             success: function (result) {
                 if (result.success && result.data && result.data.length) {
                     var html = '<div class="white-background his-flex padding15">\n' +
                         '    <div>\n' +
                         '        <div class="marginBottom10">\n' +
                         '            <span class="deep-color">在售产品</span>\n' +
                         '        </div>\n' +
                         '        <div class="light-color font12 margin0">健康调理方案，明医定制</div>\n' +
                         '    </div>\n' +
                         '    <a data-text="在售产品" data-page="' + ctx + 'html/discovery/doctor_product.html?doctorId=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                         '</div>';
                     array[0] = html;
                 }
                 resolve();
             },
             error: function () {
                resolve();
             }
         });
    }, function (resolve) {
        //有医生讲座
        lyb.ajax({
            url: ctx + 'course/doctor/' + params.id + "?pageNum=1&pageSize=1",
            dataType: 'json',
            success: function (result) {
                if (result.success && result.data && result.data.length) {
                    var html = '<div class="white-background his-flex padding15">\n' +
                        '    <div>\n' +
                        '        <div class="marginBottom10">\n' +
                        '            <span class="deep-color">明医讲座</span>\n' +
                        '        </div>\n' +
                        '        <div class="light-color font12 margin0">和明医面对面，线下讲座</div>\n' +
                        '    </div>\n' +
                        '    <a data-text="明医讲座" data-page="' + ctx + 'html/course/doctor_course_list.html?id=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                        '</div>';
                    array[2] = html;
                }
                resolve();
            },
            error: function () {
                resolve();
            }
        });
    }, function (resolve) {
        //有医生套餐
        lyb.ajax({
            url: ctx + 'market/package/list?doctorId=' + params.id + "&pageNum=1&pageSize=1",
            dataType: 'json',
            success: function (result) {
                if (result.success && result.data && result.data.length) {
                    var html = '<div class="white-background his-flex padding15">\n' +
                        '    <div>\n' +
                        '        <div class="marginBottom10">\n' +
                        '            <span class="deep-color">明医套餐</span>\n' +
                        '        </div>\n' +
                        '        <div class="light-color font12 margin0">问诊服务套餐，专属折扣</div>\n' +
                        '    </div>\n' +
                        '    <a data-text="明医套餐" data-page="' + ctx + 'html/package_special/doctor_package_list.html?id=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                        '</div>';
                    array[1] = html;
                }
                resolve();
            },
            error: function () {
                resolve();
            }
        });
    }, function (resolve) {
        //有医生专科
        lyb.ajax({
            url: ctx + 'market/specialist/list?doctorId=' + params.id + "&pageNum=1&pageSize=1",
            dataType: 'json',
            success: function (result) {
                if (result.success && result.data && result.data.length) {
                    var html = '<div class="white-background his-flex padding15">\n' +
                        '    <div>\n' +
                        '        <div class="marginBottom10">\n' +
                        '            <span class="deep-color">明医专科</span>\n' +
                        '        </div>\n' +
                        '        <div class="light-color font12 margin0">门诊诊疗专科服务</div>\n' +
                        '    </div>\n' +
                        '    <a data-text="明医专科" data-page="' + ctx + 'html/package_special/doctor_special_list.html?id=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                        '</div>';
                    array[3] = html;
                }
                resolve();
            },
            error: function () {
                resolve();
            }
        });
    }).then(function () {
        var html = array.join('');
        // if (html === '') {
        //     jQuery('#service_more').hide();
        //     return;
        // }
        service.append(html);
        service.on('click', '.buy-more-btn', function (e) {
            e.stopPropagation();
            var data = this.dataset;
            zhuge.track('医生主页链接', {
                '功能入口': '查看' + data.text,
                '医生名称': params.name
            }, function () {
                window.location.href = data.page;
            });
        });
    });
}
//
// var moreServiceOpen = true;
// jQuery('#service_more').click(function () {
//     if (moreServiceOpen) {
//         this.children[1].style.transform = 'rotate(180deg)';
//         moreService.show();
//         // moreService.slideDown();
//     } else {
//         this.children[1].style.transform = 'rotate(0deg)';
//         moreService.hide();
//         // moreService.slideUp();
//     }
//
//     moreServiceOpen = !moreServiceOpen;
// });

jQuery('#doctor_service').on('click', '.white-background.his-flex.padding15', function () {
    var buyBtn = jQuery(this).children('a.buy-btn');
    if(buyBtn && buyBtn[0] && (buyBtn[0].dataset.service === 'true' || buyBtn[0].dataset.serviceType === 'consult')) {
        buyBtn.trigger('click');
    }
    var buyMoreBtn = jQuery(this).children('a.buy-more-btn');
    if(buyMoreBtn && buyMoreBtn[0]) {
        buyMoreBtn.trigger('click');
    }
});

//系外大夫出诊接口
lyb.ajax(ctx + 'doctor/visit/schedule/hospital?doctorId=' + params.id, {
    success: function(result){
        if(result.success){
            renderHospitalList(result.data);
        }
    }
});


function renderHospitalList(data){
    if(data.length){
        var html = [];
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if(index === 2){
                break;
            }
            /*     if(!item.schedule){
                     continue;
                 }*/
            index++;
            html.push('<div class="marginBottom20 color-999999">');
            html.push('<div class="middle-color marginBottom8">'+ item.hospitalNane +'</div>');
            html.push('<div class="marginBottom8">门诊地址：'+ (item.address || '暂未添加') +'</div>');
            if(item.schedule){
                html.push('<div class="">出诊日期：'+ item.schedule +'</div>');
            }
            html.push('</div>');
        }
        jQuery('#xw_doctor_schedule').show()
        jQuery('#xw_schedule').html(html.join(''));
    }
}


//是否关注了该医生
lyb.ajax({
    url: ctx + 'member/doctor/get/' + params.id,
    dataType: 'json',
    success: function (result) {
        if (result.code === 1) {
            jQuery('#careDoctor').addClass('unlogin');
            return;
        }
        if (result.data) {
            jQuery('#careDoctor').removeClass('icon-care-empty').addClass('icon-care');
        }
    }
});

//有安康诊疗套餐
lyb.ajax({
    url: ctx + 'market/package/ad/' + params.id,
    dataType: 'json',
    success: function (result) {
        if (result.success && result.data) {
            var border = document.querySelector('#special_ps');
            border.classList.remove('his-hide');
            border.innerHTML = '<div class="his-flex-grow marginRight8 fontBold" style="color: #C78736;line-height: 50px;font-size: 13px;">' +
                '购买安康诊疗套餐预约门诊更优惠' +
                '</div>' +
                '<a href="../package_special/ps_detail.html?id=' + result.data + '&type=package" class="weui-btn weui-btn_mini his-noborder font12 lineHeight22 radius2" style="background: #E5AA60;color: #fff;padding: 0 8px;">查看详情</a>';
        }
    }
});

//最后一条文章
lyb.ajax({
    url: ctx + 'doctor/article/' + params.id + '/newest',
    dataType: 'json',
    success: function (result) {
        if (result.success && result.data) {
            var data = result.data;
            var wenzhang = document.querySelector('#doctor_wenzhang');
            wenzhang.classList.remove('his-hide');
            var content = document.querySelector('#wenzhang');
            content.innerHTML = '<div class="middle-color lineHeight22" style="margin-bottom: 4px;">' + data.title + '</div>' +
                '<div class="lineHeight22 light-color" style="margin-bottom: 4px;">' + data.summary + '</div>' +
                '<div class="font12 light-color">' + data.createTime.split(' ')[0] + '</div>';
            (function (id, link) {
                content.onclick = function () {
                    zhuge.track('医生主页链接', {
                        '功能入口': '文章详情',
                        '医生名称': params.name
                    }, function () {
                        if (link) {
                            window.location.href = link;
                        } else {
                            window.location.href = ctx + 'html/article/art_detail.html?artId=' + id;
                        }
                    });
                }
            })(data.id, data.link);
        }
    }
});

//最后一条公告
lyb.ajax({
    url: ctx + 'sysNotices/wxList?doctorId=' + params.id + '&pageNum=1&pageSize=1',
    dataType: 'json',
    success: function (result) {
        if (result.success && result.data && result.data.length) {
            var data = result.data[0];
            var gonggao = document.querySelector('#doctor_gonggao');
            gonggao.classList.remove('his-hide');

            var content = data.type=='TEXT'? data.content : data.title;
            document.querySelector('#gonggao').innerHTML = '<span class="font12 marginRight8" style="background: #EFF6F1;border-radius: 10px;color: #C0CAC3;padding: 3px 8px;">' + data.modifyTime.split(' ')[0] + '</span>' + content;
        }
    }
});

jQuery('#careDoctor').on('click', function (e) {
    if (this.classList.contains('unlogin')) {
        lyb.confirm('登录后可关注该医生，是否去登录？', {
            buttons: [{
                label: '稍后再说',
                type: 'default',
                onClick: function () {
                }
            }, {
                label: '马上去',
                type: 'primary',
                onClick: function () {
                    sessionStorage.setItem('callbackUrl', window.location.href);
                    window.location.href = '../login/login.html';
                }
            }]
        });
        return;
    }
    var that = this;
    var url = ctx + 'member/doctor/attention/' + params.id;
    if (that.classList.contains('icon-care')) {
        url = ctx + 'member/doctor/cancel/attention/' + params.id;
    }
    lyb.ajax({
        url: url,
        dataType: 'json',
        success: function (result) {
            if (result.success) {
                lyb.toast(result.msg);
                if (that.classList.contains('icon-care')) {
                    that.classList.remove('icon-care');
                    that.classList.add('icon-care-empty');
                } else {
                    that.classList.add('icon-care');
                    that.classList.remove('icon-care-empty');
                }
            }
        }
    });
});

//评价
var doctor_pingjia = document.querySelector('#doctor_pingjia');
var evaluationList = jQuery('#evaluation_list');
lyb.ajax(ctx + 'doctor/info/doctorCommentsList?doctorId=' + params.id + '&pageNum=1&pageSize=5', {
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            var html = renderEvaluation(list);
            if (html) {
                evaluationList.append(html);
                doctor_pingjia.classList.remove('his-hide');
            }
        } else {
            lyb.error(result.msg);
        }
    }
});
var types = {'1': '还可以', '2': '满意', '3': '很满意'};

function renderEvaluation(list) {
    var html = '', list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var tags = (item.contentTags && item.contentTags != '' ? item.contentTags.split(',') : []), yx = '';
        for (var j = 0; j < tags.length; j++) {
            yx += '<span class="illness-item doctor-eval-item">' + tags[j] + '</span>';
        }
        var type = Number(item.type || 0), pj = '';
        for (var index = 0; index < type; index++) {
            pj += '<i class="icon-star font14 marginRight8 red-color"></i>';
        }
        html += '<div class="weui-panel paddingBottom12" style="margin-bottom: 16px;">\n';
        html += '    <div class="his-flex marginBottom12">\n';
        html += '        <div class="his-flex">\n';
        html += '            <img src="//image-1252304461.file.myqcloud.com/image/doctor.png" class="doctor-eval-head" alt=""/>\n';
        html += '            <span class="font12 middle-color marginLeft12 marginRight8">' + item.patientName + '</span>\n';
        html += '            <div class="font12 light-color his-flex-grow">\n';
        html += pj;
        html += '            </div>\n';
        html += '        </div>\n';
        html += '        <span class="light-color font12">' + item.createTime + '</span>\n';
        html += '    </div>\n';
        html += '    <div class="marginBottom8">\n';
        html += '        <div class="illness-view his-flex-grow">\n';
        html += yx;
        html += '        </div>\n';
        html += '    </div>\n';
        if (item.content) {
            html += '    <div class="lineHeight22 middle-color marginBottom8">\n';
            html += item.content;
            html += '    </div>\n';
        }

        if (item.recent) {
            html += '    <div class="lineHeight22 middle-color marginBottom8">\n';
            html += '追加评论：' + item.recent;
            html += '    </div>\n';
        }
        if (item.masterSymptom) {
            html += '    <div class="" style="padding-top: 6px;position: relative;">\n';
            html += '        <span class="doctor-eval-angle"></span>\n';
            html += '        <div class="lineHeight22 light-color padding10" style="background: #f7f7f7;">\n';
            html += item.masterSymptom || '未填写';
            html += '        </div>\n';
            html += '    </div>\n';
        }
        html += '</div>'

    }
    return html;
}

if(params.isActiveGF === '1') {
    document.querySelector('#gaofang').classList.remove('his-hide');
}

function judgeBtnsStatuMethod(){
    if(GAOFANGJIE_STATUS.DIANHUA || GAOFANGJIE_STATUS.TUWEN){
        jQuery('#netGao').show();
        if(GAOFANGJIE_STATUS.TUWEN){
            var url = ctx + 'pay/wx/mp/redirect/buy_service?id=' + params.id + '&serviceType=graphic&isActiveGF=' + params.isActiveGF + '&channel=' + (params.channel || '');
            jQuery('#netGao').attr('data-href', url)
        }
    }
}

jQuery('.gaofang_link').on('click', 'a', function(){
    var href = this.dataset.href;
    var text = this.innerHTML;
    zhuge.track('膏方节活动', {
        '页面': '医生详情页',
        '类别': text
    }, function(){
        window.location.href = href;
    })
});