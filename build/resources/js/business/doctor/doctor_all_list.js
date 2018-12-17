lyb.parse();
var doctors = jQuery('#doctorList');
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    url: ctx + 'doctor/info/allList?condition=' + decodeURIComponent(params.condition || ''),
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            doctors.append(renderDoctorList(list));
        } else {
            lyb.toast(result.msg);
        }
    }
});

function renderDoctorList(list) {
    var html = [],
        list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        html.push('<div class="doctor weui-cell padding15" data-id="' + item.id + '"  data-currentwxid="'+item.currentWxId+'" style="display: block;">');
        html.push('<div class="his-flex">');
        html.push('<img alt="" src="' + (item.headimgUrl || '//image-1252304461.file.myqcloud.com/image/doctor.png') + '" class="his-flex-unshrink" style="width: 60px;height: 60px;border-radius: 50%;">');
        html.push('<div class="his-flex-grow marginLeft10">');
        html.push('<div class="his-flex">');
        html.push('<div class="fontBold marginBottom5">');
        html.push('<span class="deep-color">'+ (item.name || '') + '</span>');
        html.push('</div>');
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
                html.push('<button type="button" data-id="' + item.id + '" class="appointment weui-btn weui-btn_mini weui-btn_warn radius2 his-flex-unshrink marginLeft10 his-noborder">预约门诊</button>');
            } else if (item.clinicSwitch === "OFF") {
                html.push('<a href="'+ ctx +'html/schedule/view_schedule.html?id='+ item.id +'" class="weui-btn weui-btn_mini weui-btn_warn radius2 his-flex-unshrink marginLeft10 yellow-background his-noborder">查看排班</a>');
            }
        }        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
    }
    return html.join('');
}

doctors.on('click', '.doctor', function (e) {
    var dataSet = this.dataset;
    window.location.href = 'doctor_detail.html?id=' + dataSet.id+'&shareId='+dataSet.currentwxid;
});


doctors.on('click', '.appointment', function (e) {
    e.stopPropagation();
    var dataSet = this.dataset;
    if(params.date) {
        window.location.href = ctx + 'pay/wx/mp/redirect/appointment?id=' + dataSet.id + '&date=' + params.date;
    }else {
        window.location.href = 'doctor_schedule.html?id=' + dataSet.id;
    }
});