lyb.parse();

lyb.ajax(ctx + 'SysHospital/detail?id=' + params.id, {
    success: function (result) {
        if(result.success) {
            var data = result.data;
            var html = '<img alt="" src="'+ data.pic +'" style="width: 100%;height: 100%;vertical-align: top;"/>';
            html += '<div class="padding-0-15" style="height: 28px;line-height: 28px;position: relative;margin-top: -28px;">';
            html += '<div style="position: absolute;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5);left: 0;top: 0;"></div>'
            html += '<div class="his-flex font12" style="position:relative;color: rgba(255, 255, 255, 0.8);"><span>'+ window.mpName +' - '+ data.name +'</span><div class="his-flex"><span class="marginRight5">详情</span><span class="icon-angle-right font18"></span></div></div>';
            html += '</div>';
            document.getElementById('hospital_img').innerHTML = html;
        }
    }
});

var doctors = jQuery('#doctor_list');
var pull = lyb.pullUpLoading({
    el: '#wrapper',
    params: {hospitalId: params.id},
    pageSize: 10,
    url: ctx + 'doctor/info/clinic/list',
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            doctors.append(renderClinicDoctorList(list));
        } else {
            lyb.toast(result.msg);
        }
    }
});

//绑定事件
bindBtnEvents(doctors);