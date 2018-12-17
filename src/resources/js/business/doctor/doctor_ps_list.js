lyb.parse();
var doctors = jQuery('#doctor_list');
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    url: ctx + 'doctor/info/queryDoctorConditionType?id='+ params.id +'&type=' + params.type,
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
        html.push('<div class="doctor weui-cell padding15" data-id="' + item.id + '" data-currentwxid="'+item.currentWxId+'" style="display: block;">');
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
        html.push('<div class="textline1 illness-view">');
        var symptoms = item.symptomName && item.symptomName != '' ? item.symptomName.split(',') : [];
        for (var j = 0, length = symptoms.length; j < length; j++) {
            var symptom = symptoms[j];
            html.push('<span class="illness-item">' + symptom + '</span>');
        }
        html.push('</div>');
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