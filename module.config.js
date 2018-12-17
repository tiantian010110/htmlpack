/**
 * @author 田鑫龙 v1.0
 */
module.exports = {
    load: {
        css: ['resources/css/weui.css', 'resources/css/zan.css', 'resources/css/iconfont.css'],
        js: ['resources/js/jquery.min.js', 'resources/js/weui.js', 'resources/js/load.js', 'resources/js/zan.js', 'resources/js/ajax.js']
    },
    index: {
        css: ['resources/css/single_page.css', 'resources/js/commons/swiper/css/swiper-3.4.2.min.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/single_page.js', 'resources/js/commons/swiper/js/swiper-3.4.2.jquery.min.js', 'resources/js/business/index.js']
    },
    personal: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/personal/personal.js']
    },
    info: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/personal/info.js']
    },
    chat: {
        js: ['resources/js/commons/wxSign.js',
            'resources/js/commons/im/webim.config.js', 'resources/js/commons/im/strophe-1.2.8.js', 'resources/js/commons/im/websdk-1.4.10.js', 'resources/js/commons/loadIM.js', 'resources/js/business/chat/chat.js'
        ]
    },
    chat_list: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/chat/chat_list.js']
    },
    discovery: {
        css: ['resources/js/commons/swiper/css/swiper-3.4.2.min.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/commons/swiper/js/swiper-3.4.2.jquery.min.js', 'resources/js/business/discovery/discovery.js']
    },
    doctor_coupon_online_list: {
        css: ['resources/js/business/doctor/calendar.static.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/calendar.static.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_coupon_online_list.js']
    },
    doctor_coupon_list: {
        css: ['resources/js/business/doctor/calendar.static.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/calendar.static.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_coupon_list.js']
    },
    doctor_hospital_list: {
        css: ['resources/js/business/doctor/calendar.static.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/calendar.static.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_hospital_list.js']
    },
    doctor_recently_list: {
        css: ['resources/js/business/doctor/calendar.static.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/calendar.static.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_recently_list.js']
    },
    doctor_2day_list: {
        css: ['resources/css/single_page.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/single_page.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_2day_list.js']
    },
    doctor_city_list: {
        css: ['resources/js/business/doctor/calendar.static.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_city_list.js']
    },
    doctor_online_list: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/common.js', 'resources/js/business/doctor/doctor_online_list.js']
    },
    doctor_list: {
        css: ['resources/js/business/doctor/calendar.static.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/calendar.static.js', 'resources/js/business/doctor/doctor_list.js']
    },
    doctor_detail: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/commons/qrcode.js', 'resources/js/business/doctor/doctor_detail.js']
    },
    doctor_introduct: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/doctor_introduct.js']
    },
    hospital_list: { js: ['resources/js/commons/wxSign.js', 'resources/js/business/hospital/hospital_list.js'] },
    hospital_inst: { js: ['resources/js/commons/wxSign.js', 'resources/js/business/hospital/hospital_inst.js'] },
    hospital_detail: { js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/common.js', 'resources/js/business/hospital/hospital_detail.js'] },
    illness_list: {
        js: ['resources/js/commons/wxSign.js', 'resources/js/business/doctor/common.js', 'resources/js/business/illness/illness_list.js']
    },
};