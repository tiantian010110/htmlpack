lyb.parse();

var doctors = jQuery('#doctorList');
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    reference: document.body,
    allowCache: false,
    url: ctx + 'member/info/getAdvisories',
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            doctors.append(renderDoctorList(list));
        } else {
            lyb.error(result.msg);
        }
    }
});
var map = {
    system: '系统消息',
    comments: '欢迎对医生的服务做出评价',
    recipel: '医生已为您制定个人调理方案',
    recordAudio: '医生与您的电话沟通结束',
    schedule: '医生邀请您来找我面诊',
    finishInquiry: '请补填问诊单，以便更准确的为您辩证',
    doctorRefund: '医生已发起退款，咨询已结束',
    uploadPatientInfo: '请上传您的资料和门诊处方单',
    finishedInquiry: '我的问诊单已填完',
    guoyuweiFinishedInquiry: '我的问诊单已填完'
};

var type = {'graphic': '图文复诊', 'phone': '电话复诊', 'graphic_visit': '图文复诊', 'phone_visit': '电话复诊'};

function renderDoctorList(list) {
    var html = '',
        list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        html += '<div class="his-flex panel-shadow white-background" style="margin: 0 10px 10px 10px!important;">';
        html += '<a class="weui-cell padding15 his-flex-grow" href="' + ctx + 'sysInquiry/redirectSysInquiry?doctorId=' + item.doctorId + '">';
        html += '<div class="weui-cell__hd marginRight10" style="width: 48px;height: 48px;border-radius: 50%;overflow: hidden;">';
        html += '<img alt="" src="' + (item.headImgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" style="width: 100%;height: 100%;">';
        html += '</div>';
        html += '<div class="weui-cell__bd">';
        var orderType = item.orderType ? ('<span class="'+ item.orderType +' white-color radius2 marginLeft15" style="padding: 2px 5px;font-size: 8px;vertical-align: middle;">' + type[item.orderType] + '</span>') : '';
        html += '<div class="marginBottom10 font16 deep-color"><span style="vertical-align: middle;">' + (item.doctorName || '') + '</span>' + orderType + '</div>';
        html += '<div class="his-flex">';
        var message = item.msg;
        if (/cmdType"\s*\:/.test(message)) {
            message = JSON.parse(message);
            message = map[message.cmdType];
        }

        if(/[ht|f]tp(s?)/ig.test(message)) {
            if(/[jpg|gif|bmp|jpeg|png|ico]$/img.test(message)) {
                message = '[图片]';
            }
        }

        html += '<span class="textline1 light-color marginRight10" style="font-size: 11px;">' + (message || "&nbsp;") + '</span>';
        html += item.msgFlag ? '<span class="weui-badge weui-badge_dot" style="padding: 5px;"></span>' : '';
        html += '</div>';
        html += '</div>';
        html += '</a>';
        html += '<div class="font10 status white-color his-flex-unshrink ' + (item.status !== 'END' ? 'yellow-background' : 'gray-background') + '">' + (item.status !== 'END' ? '咨询中' : '已结束') + '</div>';
        html += '</div>';
    }
    return html;
}

//搜索框
var searchBox = lyb.get('searchBar'),
    $searchInput = $('#searchInput');
searchBox.submitFn = function (text) {
    doctors.empty();
    pull.reset();
    pull.params.condition = text;
    pull.load();
};
searchBox.inputFn = function (text) {
    doctors.empty();
    pull.reset();
    pull.params.condition = text;
    pull.load();
};
searchBox._focus = function () {

}

lyb.ajax({
    url: ctx + 'sysMessage/getAdvisoriesFlag',
    success: function (result) {
        if (result.success) {
            jQuery('#consultStatus').children('i').append('<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>');
        }
    }
});