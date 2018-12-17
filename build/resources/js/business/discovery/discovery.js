var swiperHeight = jQuery(window).width() / 375 * 140;
lyb.parse();
jQuery('#swipper_container').height(swiperHeight);

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: '【' + window.mpName + '】热点资讯', // 分享标题
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
        title: '【' + window.mpName + '】热点资讯', // 分享标题
        desc: '明医定制调理方案、查看明医热点资讯', // 分享描述
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

jQuery('.weui-tabbar__item').on('click', function () {
    jQuery(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
});

var artList = jQuery('#list');

lyb.ajax(ctx + 'doctor/article?pageNum=1&&pageSize=10', {
    type: 'get',
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            artList.html(renderList(result.data || []));
        }
    }
});

//明医荐药
lyb.ajax(ctx + 'product/online/list?isTop=1', {
    type: 'get',
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            var data = result.data || [];
            var html = '<div style="width: 50%;padding-right: 2px;border-right: solid 1px #fff;">\n' +
                '   <a href="javascript:void(0);" data-id="' + data[0].id + '" data-doctor-id="' + data[0].doctorId + '" data-doctor-name="' + data[0].doctorName + '" class="his-grid-cell doctor" style="height: 100%;">\n' +
                '        <img src="' + data[0].bannerLeftPic + '" alt="" style="vertical-align: top;width: 100%;"/>\n' +
                '    </a>\n' +
                '</div>\n' +
                '<div style="width: 50%;padding-left: 2px;">\n' +
                '    <a href="javascript:void(0);" data-id="' + data[1].id + '" data-doctor-id="' + data[1].doctorId + '" data-doctor-name="' + data[1].doctorName + '"  class="his-grid-cell doctor" style="border-bottom: solid 1px #fff;">\n' +
                '        <img src="' + data[1].bannerRightPic + '" alt="" style="vertical-align: top;width: 100%;margin-bottom: 4px;"/>\n' +
                '    </a>\n' +
                '    <a href="javascript:void(0);" data-id="' + data[2].id + '" data-doctor-id="' + data[2].doctorId + '" data-doctor-name="' + data[2].doctorName + '"  class="his-grid-cell doctor">\n' +
                '        <img src="' + data[2].bannerRightPic + '" alt="" style="vertical-align: top;width: 100%;"/>\n' +
                '    </a>\n' +
                '</div>';
            jQuery('#myjy').html(html);
        }
    }
});

function renderList(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var url = item.link ? item.link : '../article/art_detail.html?artId=' + item.id;
        html += '<a class="weui-cell view-zixun" href="javascrip:void(0);" data-title="' + item.title + '" data-url="' + url + '">\n' +
            '    <div class="weui-cell__hd marginRight10">\n' +
            '        <img src="' + item.thumb + '" style="width: 38px;height: 38px;border-radius: 2px;vertical-align: top">\n' +
            '    </div>\n' +
            '    <div class="weui-cell__bd">\n' +
            '        <div class="deep-color marginBottom5 textline1">' + (item.title || '') + '</div>\n' +
            '        <div class="middle-color font12 textline1">' + (item.summary || '') + '</div>\n' +
            '    </div>\n' +
            '</a>';
    }
    return html;
}

jQuery(document.body).on('click', '.view-zixun', function () {
    var url = this.dataset.url;
    var title = this.dataset.title;
    zhuge.track('热点资讯', {'文章标题': title}, function () {
        window.location.href = url
    });
});

jQuery(document.body).on('click', '.swiper-slide', function () {
    var url = this.dataset.url;
    var title = this.dataset.title;
    zhuge.track('广告位', {'文章标题': title}, function () {
        window.location.href = url
    });
});

lyb.ajax({
    url: ctx + 'sysMessage/getAdvisoriesFlag',
    success: function (result) {
        if (result.success) {
            jQuery('#consultStatus').children('i').append('<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>');
        }
    }
});
lyb.ajax({
    url: ctx + 'doctor/article?pageNum=1&pageSize=5&isBanner=Y',
    success: function (result) {
        if (result.success) {
            var html = '';
            var data = result.data || [];
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var url = item.link ? item.link : '../article/art_detail.html?artId=' + item.id;
                html += '<a class="swiper-slide" href="javascrip:void(0);" data-title="' + item.title + '" data-url="' + url + '"><img src="' + item.bannerPic + '" alt="' + item.title + '" style="vertical-align: top;height: 100%;width: 100%;"></a>';
            }
            var el = jQuery('#swipper_border');
            if (len === 0) {

            } else {
                el.html(html);
            }
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: 5000,//可选选项，自动滑动
                // 如果需要分页器
                pagination: '.swiper-pagination'
            });
        }
    }

});

//调理方案
jQuery('#wrapper').on('click', '.doctor', function () {
    var doctorName = this.dataset.doctorName,
        id = this.dataset.id,
        doctorId = this.dataset.doctorId;
    zhuge.track('明医荐药', {'荐药大夫': doctorName}, function () {
        window.location.href = ctx + 'html/discovery/doctor_product.html?id=' + id + '&doctorId=' + doctorId;
    });

});

