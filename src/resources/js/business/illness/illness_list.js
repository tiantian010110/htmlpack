params.cityName = decodeURIComponent(params.cityName || '全国');
lyb.parse();

//微信签名授权
lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: '【'+ window.mpName +'】对症寻医', // 分享标题
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
        title: '【'+ window.mpName +'】对症寻医', // 分享标题
        desc: '根据病症匹配明医', // 分享描述
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

lyb.doPublicSourceZhugeTrack();

var mask = new lyb.showMask();
mask.show();

//症状列表
lyb.ajax({
    url: ctx + 'sysDiseases/list',
    dataType: 'json',
    success: function (result) {
        var array = result.data;
        var html = [];
        for (var i = 0; i < array.length; i++) {
            var row = array[i];
            var symptoms = row.item || [];
            if (symptoms.length === 0) {
                continue;
            }
            html.push('<div class="weui-panel marginBottom8 no-after-line no-before-line">');
            html.push('<div class="weui-panel__hd deep-color fontBold no-after-line" style="font-size: 19px;padding: 20px 12px 12px 12px;">' + row.name + '</div>');
            html.push('<div class="weui-panel__bd" style="padding: 0 12px;">');
            for (var j = 0; j < symptoms.length; j++) {
                var symptom = symptoms[j];
                html.push('<a class="illness-item" href="../doctor/doctor_hospital_list.html?condition=' + symptom.symptomsName + '&cityName='+ params.cityName +'">' + symptom.symptomsName + '</a>');
            }
            html.push('</div>');
            html.push('</div>');
        }
        document.getElementById('list').innerHTML = html.join('');
        mask.close();
    },
    error: function () {
        mask.close();
    }
});


var searchBox = initSearchBox(function (text, that, req) {
    if (req) {
        req.abort();
    }
    if(text === '') {
        that._renderHistory();
        return;
    }
    lyb.ajax(ctx + 'sysDiseases/search?condition=' + text, {
        type: 'get',
        success: function (result) {
            if (result.success) {
                var list = result.data || [];
                var html = '';

                //病症
                html += '<div class="weui-panel his-nobackground no-after-line no-before-line" style="max-height: 100%;overflow-y: scroll;">';
                html += '<div class="weui-panel__bd">';
                html += '<div class="weui-cells his-nobackground">';
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    html += '<div class="weui-cell white-background">';
                    html += '<span class="weui-cell__bd middle-color search-result" data-type="illness" data-href="html/doctor/doctor_hospital_list.html?condition=' + item.name + '&cityName='+ params.cityName +'">' + item.name + '</span>';
                    html += '</div>';
                }
                if(list.length === 0) {
                    html += '<div class="padding-10-0" style="text-align: center;"><div class="light-color font12 padding-0-5">没有找到相关数据</div></div>';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';

                that.renderSearchResult(html);
            }
        }
    });
});

searchBox._renderCommonDisease = function (flag) {
    var text = localStorage.getItem('commonDisease');
    if (text) {
        var html = '', list = text.split(','), page = 'html/doctor/doctor_hospital_list.html';
        for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            html += '<span class="common-disease deep-color" data-href="' + ctx + page +'?condition=' + item + '" style="padding: 8px 12px;background: #f2f2f2;border-radius: 2px;margin-right: 12px;margin-bottom: 12px;display: inline-block;">' + item + '</span>';
        }
        return '<div class="weui-panel his-nobackground no-after-line no-before-line" style="margin-top: '+ (flag ? '8' : '0') +'px;">' +
            '<div class="weui-panel__hd his-flex no-after-line" style="padding: 20px 12px 12px;">' +
            '<span class="font15 middle-color">常见病症</span> ' +
            '</div>' +
            '<div class="weui-panel__bd" style="padding: 0 12px;">' + html + '</div>' +
            '</div>';
    }else {
        var that = this;
        lyb.ajax(ctx + 'sysDiseases/common', {
            success: function (result) {
                if(result.success) {
                    var list = result.data || [];
                    localStorage.setItem('commonDisease', list.join(','));
                    that._renderCommonDisease(flag);
                }
            }
        })
    }
    return '';
}

searchBox.getHistoryItem = function (item) {
    var text = item.text, type = item.type, id = item.id, page = 'html/doctor/doctor_hospital_list.html?condition=' + text;
    if(type === 'doctor' && id) {
        page = 'html/doctor/doctor_detail.html?id=' + id;
    }
    return '<span data-type="' + type + '" class="history-item deep-color" data-href="' + ctx + page +'" style="padding: 8px 12px;background: #f2f2f2;border-radius: 2px;margin-right: 12px;margin-bottom: 12px;display: inline-block;">' + text + '</span>'
};