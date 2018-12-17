var __city = localStorage.getItem('__location');
params.cityName = params.cityName || __city || '全国';

lyb.parse();

zhuge.track('进入首页');//打点

var viewBodyEl = jQuery('#view_body');

var useSetPos = false;

//定位
var citySelector = document.querySelector('#city_selector');

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'getLocation'], function () {
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
    if (!__city) {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

                $.ajax({
                    url: location.protocol + '//apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&coord_type=5&output=jsonp&callback=calllocation&key=HL5BZ-TA5WJ-VY3FM-KSJWW-BDOM6-LNFYF',
                    dataType: 'jsonp'
                });
            }
        });
    }
});

if (__city) {//
    updateLinksCity(__city);
    citySelector.innerHTML = __city;
}

//跨域请求定位回调函数
window.calllocation = function (data) {
    if (useSetPos) {//用户手动设置位置，定位不生效
        return;
    }
    if (data.message === 'query ok') {
        var result = data.result;
        var ad_info = result.ad_info;
        var city = ad_info.city;

        localStorage.setItem('__location', city);

        updateLinksCity(city);
        citySelector.innerHTML = city;
    }
};

citySelector.addEventListener('click', function (e) {
    lyb.pageManager.show(function (dom) {
        dom.find('iframe')[0].src = ctx + 'html/selector/select_city.html?opener=sliderFrame';
    })
});
//更新城市
window.updateCity = function (data) {
    useSetPos = true;
    updateLinksCity(data.selectCityName);
    citySelector.innerHTML = (data.selectCityName);
    localStorage.setItem('__location', data.selectCityName);
};


var currentEl = jQuery('#current_online');
lyb.ajax(ctx + 'member/visit/record/doctors/newest', {
    success: function (result) {
        var list = result.data.doctors || [], count = result.data.totalCount || 0;
        if (result.success) {
            if (count) {
                var imgs = [], html = '';
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    imgs.push('<img alt="" class="online-image" src="' + (item.headimgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" style="z-index: ' + (3 - i) + ';vertical-align: top;"/>');
                }
                html += '<div class="marginBottom10 weui-panel weui-panel_access no-before-line">';
                html += '<div class="weui-panel__bd">';
                html += '<div class="his-flex white-background" style="padding: 0px 12px;position:relative;height: 48px;">';
                html += '<div class="deep-color">我熟悉的<span class="red-color"> ' + count + ' </span>位大夫，点此复诊</div>';
                html += '<div class="more">';
                html += imgs.join('');
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                currentEl.html(html).removeClass('his-hide');

                currentEl.click(function () {
                    var link = this.dataset.href;
                    zhuge.track('首页链接', {
                        '功能入口': '我熟悉的大夫'
                    }, function () {
                        window.location.href = link;
                    })
                });
                jQuery('#wrapper').css('padding-top', 120)
            }
        }
    }
});

//更新超链的city
var wzPull;
window.wzHasLoaded = false;

function updateLinksCity(city) {
    var links = jQuery('.link').toArray();
    for (var i = 0, len = links.length; i < len; i++) {
        var link = links[i];
        link.dataset.city = city;
    }
    queryWz(city, true);
    window.wzHasLoaded = true;
}

jQuery('.multi-tabs').on('click', '.tab', function (e) {
    var dataset = e.target.dataset;
    var target = dataset.target;
    jQuery('.content', e.delegateTarget).removeClass('active');
    jQuery('.tab', e.delegateTarget).removeClass('active');
    e.target.classList.add('active');
    jQuery(target, e.delegateTarget).addClass('active');
});

jQuery('.lyb-customer').click(function () {
    if(lyb.os.ios){//ios直接拨打，android需要弹窗过度 @pm liuhe
        zhuge.track('首页链接', {'功能入口': '首页导医'}, function () {
            window.location.href = 'tel:400-898-5070';
        });
    }else{
        lyb.confirm('没找到合适的大夫，点击“马上咨询” 连线导医，根据您的情况和要求推荐合适的大夫<br>咨询时间：9:00~19:00', {
            buttons: [{
                label: '取消',
                type: 'default',
                onClick: function () {
                }
            },{
                label: '马上咨询',
                type: 'primary',
                onClick: function () {
                    zhuge.track('首页链接', {'功能入口': '首页导医'}, function () {
                        window.location.href = 'tel:400-898-5070';
                    });
                }
            }
            ]
        });
    }

});

//根据城市查文章
function queryWz(city, reset) {
    if (reset) {
        if (wzPull) {
            wzPull.reset(function () {
                wzPull.params.pageNum = 1;
                wzPull.params.city = city.replace('全国', '').replace('市', '');
            });
        }
        jQuery('#zx_list').html('');
    }
    if (wzPull) {
        wzPull.load();
    } else {
        wzPull = lyb.pullUpLoading({
            el: document.querySelector('#zx_pull'),
            reference: document.querySelector('.single-page-container'),
            pageSize: 10,
            params: {city: city.replace('全国', '').replace('市', '')},
            url: ctx + 'doctor/article',
            success: function (result) {
                if (result.success) {
                    jQuery('#zx_list').append(renderList(result.data || []));
                }
            }
        });
    }
}

window.setTimeout(function () {
    if (window.wzHasLoaded === false) {
        queryWz('');
    }
}, 5000);

//根据城市查询讲座
lyb.pullUpLoading({
    el: document.querySelector('#jz_pull'),
    reference: document.querySelector('.single-page-container'),
    pageSize: 10,
    url: ctx + 'course',
    success: function (result) {
        if (result.success) {
            jQuery('#jz_list').append(renderCourseList(result.data || []));
        }
    }
});

//根据城市查询套餐
lyb.pullUpLoading({
    el: document.querySelector('#tc_pull'),
    reference: document.querySelector('.single-page-container'),
    pageSize: 10,
    url: ctx + 'market/package/list',
    success: function (result) {
        if (result.success) {
            jQuery('#tc_list').append(renderPSList(result.data, 'package'));
        } else {
            lyb.error(result.msg);
        }
    }
});

//根据城市查询专科
lyb.pullUpLoading({
    el: document.querySelector('#zk_pull'),
    reference: document.querySelector('.single-page-container'),
    pageSize: 10,
    url: ctx + 'market/specialist/list',
    success: function (result) {
        if (result.success) {
            if(result.data.length !== 0){
                jQuery('.tab[data-target="#zk_pull"]').show();
                jQuery('#zk_list').append(renderPSList(result.data, 'special'));
            }
        } else {
            lyb.error(result.msg);
        }
    }
});

//给超链拼接城市（如果存在）
jQuery('.link').on('click', function () {
    var city = this.dataset.city || decodeURIComponent(params.cityName || params.selectCityName || ''),
        link = this.dataset.href;
    var text = jQuery(this).find('.fontBold').text();
    if (city) {
        if (link.indexOf('?') === -1) {
            link += '?cityName=' + city;
        } else {
            link += '&cityName=' + city;
        }
    }
    zhuge.track('首页链接', {'功能入口': text}, function () {
        window.location.href = link;
    });
});


jQuery('.weui-tabbar__item').on('click', function () {
    jQuery(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
    var url = this.dataset.href;
    var text = jQuery(this).find('.weui-tabbar__label').html();
    zhuge.track('底部导航', {
        '按钮名称': text
    }, function () {
        window.location.href = url;
    });
});

var searchBox = lyb.get('searchBar');

searchBox.submitFn = function (text) {
};

window.query = function (text) {
    doctors.empty();
    pull.reset();
    pull.params.condition = text;
    pull.load();
    searchBox.cancelFn();
    searchBox.el.removeClass('weui-search-bar_focusing');
};

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
                doSearchOrder(queue.shift(), that);
            } else {
                window.clearInterval(interval);
                queueFlag = false;
            }
        }, 500);
        queueFlag = true;
    }
};
searchBox.focusFn = function (text) {
    citySelector.parentNode.classList.add('his-hide');
    doSearchOrder(text, this);
};
searchBox.cancelFn = function () {
    citySelector.parentNode.classList.remove('his-hide');
    this.viewSearchText.html(this.textEl[0].placeholder);
};

function doSearchOrder(text, that) {
    if (req) {
        req.abort();
    }
    if (text === '') {
        that.renderSearchResult('');
        that._renderHistory();
        that._renderCommonDisease();
        return;
    }
    jQuery.ajax(ctx + 'doctor/info/search?type=all', {
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
                        html += '<a class="weui-cell__bd middle-color search-result" data-type="illness" href="javascript:void(0);" data-href="html/search/index_search.html?type=doctor&condition=' + item.name + '">' + item.name + '</a>';
                        html += '</div>';
                    }
                    if (illness.total > 3) {
                        html += '<div class="weui-cell weui-cell_access">';
                        html += '<a class="weui-cell__bd light-color search-more-result" href="javascript:void(0);" data-href="html/search/index_search.html?type=illness&condition=' + text + '" style="flex: 0 0 86px;-webkit-flex: 0 0 86px;">查看更多病症</a>';
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
                        html += '<a class="weui-cell__bd middle-color search-result" data-type="doctor" href="javascript:void(0);" data-id="'+ item.id +'" data-href="html/doctor/doctor_detail.html?id=' + item.id + '">' + item.name + '</a>';
                        html += '</div>';
                    }
                    if (doctor.total > 3) {
                        html += '<div class="weui-cell weui-cell_access">';
                        html += '<a class="weui-cell__bd light-color search-more-result" href="javascript:void(0);" data-href="html/search/index_search.html?type=doctor&condition=' + text + '" style="flex: 0 0 86px;-webkit-flex: 0 0 86px;">查看更多医生</a>';
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
        window.location.href = ctx + url;
    });
});


function renderPSList(list, type) {
    list = list || [];
    var html = '';
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var text = type === 'package' ? '套餐' : '专科';
        var name = type === 'package' ? item.packageName : item.specialistName;
        var url = ctx + 'html/package_special/ps_detail.html?id=' + item.id + '&type=' + type + '&sourcePage=首页';
        html += '<div class="weui-cell padding10 view-ps" data-url="' + url + '" data-text="' + text + '" data-name="' + name + '">';
        html += '<div class="weui-cell_hd marginRight10"><img alt="" src="' + item.thumbImg + '" style="width: 100px;height: 100px;vertical-align: top;" class="radius2"/></div>'
        html += '<div class="weui-cell__bd" style="position: relative;">';
        html += '<div class="lineHeight18 fontBold marginBottom8 deep-color">' + name + '</div>';
        html += '<div class="font12 light-color marginBottom15 textline2 height36 lineHeight18">' + (item.description || '') + '</div>';
        html += '<div class="his-flex"><span class="red-color">&yen; ' + (item.comboTotalPrice || "") + '</span><span class="light-color font12">' + (item.buyAmount || '0') + '人购买</span></div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}

//套餐、专科点击埋点
viewBodyEl.on('click', '.view-ps', function () {
    var url = this.dataset.url;
    var type = this.dataset.text;
    var title = this.dataset.name;
    zhuge.track('查看' + type, {'名称': title}, function () {
        window.location.href = url;
    });
});

viewBodyEl.on('click', '.view-zixun', function () {
    var url = this.dataset.url;
    var title = this.dataset.title;
    zhuge.track('查看资讯', {'文章标题': title}, function () {
        window.location.href = url
    });
});

viewBodyEl.on('click', '.view-jz', function () {
    var url = this.dataset.url;
    var name = this.dataset.name;
    zhuge.track('查看讲座', {'讲座名称': name}, function () {
        window.location.href = url
    });
});
//banner埋点
viewBodyEl.on('click', '.swiper-slide', function(){
   var url = this.dataset.url;
   var actname = this.dataset.actname;
    zhuge.track('点击首页banner', {'活动名称': actname}, function () {
        window.location.href = url;
    });
});
//充值送豪礼埋点
// jQuery(document.body).on('click', '.activity', function(){
//    var url = this.dataset.href;
//     zhuge.track('充值送豪礼', {'来源': '首页弹窗'}, function () {
//         window.location.href = url;
//     });
// });



function renderList(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var url = item.link ? item.link : 'article/art_detail.html?artId=' + item.id;
        html += '<div class="weui-cell view-zixun" data-url="' + url + '" data-title="' + item.title + '">\n' +
            '    <div class="weui-cell__hd marginRight10">\n' +
            '        <img src="' + item.thumb + '" style="width: 70px;height: 70px;border-radius: 2px;vertical-align: top">\n' +
            '    </div>\n' +
            '    <div class="weui-cell__bd">\n' +
            '        <div class="deep-color marginBottom8 fontBold textline1">' + (item.title || '') + '</div>\n' +
            '        <div class="middle-color font12 textline2 height36 lineHeight18">' + (item.summary || '') + '</div>\n' +
            '    </div>\n' +
            '</div>';
    }
    return html;
}



function renderCourseList(list) {
    list = list || [];
    var html = '';
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var time = lyb.formatDate(item.courseStartTime, 'mm/dd 周w');
        var price = item.price === 0 ? '免费' : '&yen;' + item.price;
        var url = ctx + 'html/course/course_detail.html?id=' + item.id;
        html += '<div class="weui-panel no-before-line marginBottom15 view-jz" data-url="'+ url +'" data-name="'+ item.name +'">';
        html += '<div class="weui-panel__bd"><img alt="" src="' + item.bigImgPath + '" style="width: 100%;vertical-align: top;" class="radius2"/></div>'
        html += '<div class="weui-panel_ft padding-5-0 deep-color marginBottom5">';
        html += '<div class="font14 fontBold deep-color marginBottom5">' + (item.name || '') + '</div>';
        html += '<div class="his-flex font12">';
        html += '<span class="light-color">' + time + '&nbsp;&nbsp;&nbsp;&nbsp;' + item.hospitalName + '</span>';

        var startTime = new Date(item.courseStartTime.replace(/-/g, '\/')).getTime(),
            endTime = new Date(item.courseEndTime.replace(/-/g, '\/')).getTime(), now = new Date().getTime();
        if (now > endTime) {
            html += '<span class="light-color">已结束</span>';
        } else if (now > startTime && now < endTime) {
            html += '<span class="green-color">进行中</span>';
        } else {
            html += '<span class="red-color">' + price + '</span>';
        }

        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}



lyb.ajax({
    url: ctx + 'sysMessage/getAdvisoriesFlag',
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            jQuery('#consultStatus').children('i').append('<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>');
        }
    }
});

// 回到顶部
var mBack = document.getElementById('mBack2Top'), compareHeight = jQuery(window).height();
document.body.onscroll = function (e) {
    if (window.scrollY > compareHeight) {
        mBack.classList.remove('his-hide');
    } else {
        mBack.classList.add('his-hide');
    }
};


