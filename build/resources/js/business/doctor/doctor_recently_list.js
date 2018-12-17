lyb.parse();
var doctors = jQuery('#doctorList');

//搜索框
// var searchBox = lyb.get('searchBar'),
//     $searchInput = $('#searchInput');
// searchBox.submitFn = function (text) {
//     // doctors.empty();
//     // pull.reset();
//     // pull.params.condition = $searchInput.val();
//     // pull.load();
// };

var req, queue = [], queueFlag = false, interval;
// searchBox.inputFn = function (text) {
//     var that = this;
//     if (text) {
//         this.viewSearchText.html(text);
//     } else {
//         this.viewSearchText.html(this.textEl[0].placeholder);
//     }
//     queue.push(text);
//     if(!queueFlag) {
//         interval = window.setInterval(function () {
//             if(queue.length) {
//                 queue = queue.slice(queue.length - 1, queue.length);
//                 doSearchOrder (queue.shift(), that);
//             }else {
//                 window.clearInterval(interval);
//                 queueFlag = false;
//             }
//         }, 500);
//         queueFlag = true;
//     }
// };

// function doSearchOrder (text, that) {
//     if (req) {
//         req.abort();
//     }
//     if (text === '') {
//         that.renderSearchResult('');
//         that._renderHistory();
//         return;
//     }
//     doctors.empty();
//     pull.reset();
//     pull.params.condition = text;
//     pull.load();
//     that.viewSearchText.html(text);
// }
// searchBox._focus = function () {
//
// }
// searchBox._blur = function (text) {
//     this.viewSearchText.html(this.textEl[0].placeholder);
// };


var pull = lyb.pullUpLoading({
    el: '#wrapper',
    url: ctx + 'member/visit/record/doctors',
    pageSize: 10,
    emptyText: '<div class="padding-10-0 middle-color font14">还未看诊，寻找适合的医生</div><div><a class="red-color more" href="../illness/illness_list.html">点这里找明医</a></div>',
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