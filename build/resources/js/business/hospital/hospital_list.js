lyb.parse();

var hospitalList = jQuery('#hospital_list');
lyb.ajax('list.json', {
    success: function (result) {
        if (result.success) {
            renderHospitalList(result.data || []);
        } else {
            lyb.error(result.msg);
        }
    }
});

function renderHospitalList(list) {
    var string = '', top = '';
    for (var i = 0, len = list.length; i < len; i++) {
        var html = '';
        var item = list[i];
        html += '<div class="weui-panel marginBottom10">';
        html += '<div class="weui-panel__hd">';
        html += '<span class="title-block deep-color">' + item.name + '</span>';
        html += '</div>';
        html += '<div class="weui-panel__bd">';
        var children = item.sysHospitals || [];
        for (var j = 0, length = children.length; j < length; j++) {
            var child = children[j];
            html += '<a href="hospital_detail.html?id=' + child.id + '" class="weui-cell weui-cell_access">';
            html += '<div class="weui-cell__bd his-flex-unshrink marginRight10" style="flex: none;flex-basis: 70px;">';
            html += child.name;
            html += '</div>';
            html += '<div class="weui-cell__ft his-flex-grow font12 his-left">';
            html += child.address;
            html += '</div>';
            html += '</a>';
        }
        html += '</div>';
        html += '</div>';
        if(item.name === decodeURIComponent(params.cityName)) {
            top = html;
        }else {
            string += html;
        }
    }
    document.getElementById('hospital_list').innerHTML = top + string;
}