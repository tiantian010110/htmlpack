lyb.parse();
//针对苏全新大夫需要提前支付诊费
if(params.id === '100529'){
    jQuery('#suquanxin_tips').removeClass('his-hide');
}

//查询医生详情
lyb.ajax({
    url: ctx + 'doctor/info/get?id=' + params.id,
    dataType: 'json',
    success: function (result) {
        if(result.success) {
            var data = result.data;
            document.title = (data.name || '') + '排班';
            jQuery('.head-view img').attr('src', data.headimgUrl);
            jQuery('.head-view .name').text(data.name);
        }
    }
});
//TODO 膏方节标识
var gf = '';
if(params.isActiveGF === '1') {
    gf = '&isActiveGF=1';
}
//TODO 膏方节标识

jQuery('#doctor_link').bind('click', function(){
    window.location.href = ctx + 'html/doctor/doctor_detail.html?id=' + params.id + gf;
});

//TODO 添加channel
var logChannel = '';
if(params.logChannel) {
    logChannel = '&logChannel=' + (params.logChannel || '');
}

var channel = '';
if(params.channel && params.channel !== 'undefined'){
    channel = '&channel=' + params.channel;
}

//初始化
var appointId = params.appointId ? ('&appointId=' + params.appointId) : '';
var detailUrl = ctx + 'pay/wx/mp/redirect/appointment?id=' + params.id + '&memberId=' + (params.memberId || '') + logChannel + gf + channel;
if(appointId) {
    detailUrl = ctx + 'html/pay/appoint_edit.html?id=' + params.id + '&memberId=' + (params.memberId || '') + appointId + gf;
}
new workTime("box", {
    scheduleUrl: ctx + 'member/appointment/doctor/schedule?doctorId=' + params.id + '&memberId=' + (params.memberId || ''),
    detailUrl: detailUrl + '&_=' + new Date().getTime(),
    renderSuccess: function () {
    }
});