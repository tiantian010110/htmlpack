lyb.parse();

//查询医生详情
lyb.ajax({
    url: ctx + 'doctor/info/wxGet?id=' + params.id,
    dataType: 'json',
    success: function (result) {
        var data = result.data, html = [];

        if (data.headimgUrl)
            jQuery('#head_url').attr('src', data.headimgUrl);

        jQuery('#doctor_name').html(data.name || '');
        // jQuery('#doctor_name').html((data.name || '') + '  <span class="font12">' + (data.titles || '') + '</span>');
        jQuery('#inst').html(data.speciality || '完善中');
        jQuery('#doctor_info').html(data.hospital || '');

        jQuery('#twhycz').html(data.graphicPrice);
        jQuery('#twhyfz').html(data.graphicFurtherPrice);
        jQuery('#dhhycz').html(data.phonePrice);
        jQuery('#dhhyfz').html(data.phoneFurtherPrice);

        if(data.lastNotices) {
            jQuery('#notice_box').removeClass('his-hide');
            jQuery('#gonggao').html(data.lastNotices || '暂未发布公告');
        }

        var html = '';
        var sympList = data.symptomName && data.symptomName != '' ? data.symptomName.split(',') : [];
        for (var j = 0, length = sympList.length; j < length; j++) {
            var symptom = sympList[j];
            html += '<span class="font12 white-color yellow-background illness-item radius2">' + symptom + '</span>';
        }
        jQuery('#shanchang').html(html);

        //微信签名授权
        lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
            wx.hideMenuItems({
                menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
            });
            wx.showMenuItems({
                menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
            });
            wx.onMenuShareTimeline({
                title: '【'+ window.mpName +'】'+ data.name +'主页', // 分享标题
                link: ctx + 'html/doctor/doctor_detail.html?id=' + params.id, // 分享链接
                imgUrl: data.headimgUrl, // 分享图标
                success: function () {
                    lyb.alert('分享成功!');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: '【'+ window.mpName +'】'+ data.name +'主页', // 分享标题
                desc: '简介：' + (data.speciality || ''), // 分享描述
                link: ctx + 'html/doctor/doctor_detail.html?id=' + params.id, // 分享链接
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
});