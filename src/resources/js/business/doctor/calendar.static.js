/**
 * info：生成静态日历 author：田鑫龙 date：2017-05-05
 */

(function () {
    var workTime = function (id, options) {
        this.monthDay = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.init(id);
        this.render();
        this.options = options || {};
        options && this.renderWrokTime(options);
    };

    workTime.prototype = {
        init: function (id) {
            var dayTime = 24 * 60 * 60 * 1000;//1天
            var step = 58 * dayTime;//58天
            //var date = new Date(new Date().getTime() + dayTime);
            var date = new Date();
            var endDate = new Date(date.getTime() + step);
            this.params = {
                date: date,
                startYear: date.getFullYear(),
                startMonth: date.getMonth() + 1,
                startDay: date.getDate(),
                endYear: endDate.getFullYear(),
                endMonth: endDate.getMonth() + 1,
                endDay: endDate.getDate()
            };
            this.params.startString = this.params.startYear + '-' + (this.params.startMonth >= 10 ? this.params.startMonth : ('0' + this.params.startMonth)) + '-' + (this.params.startDay >= 10 ? this.params.startDay : ('0' + this.params.startDay));
            this.params.endString = this.params.endYear + '-' + (this.params.endMonth >= 10 ? this.params.endMonth : ('0' + this.params.endMonth)) + '-' + (this.params.endDay >= 10 ? this.params.endDay : ('0' + this.params.endDay));

            this.el = document.getElementById(id);
            this.today = date;
            this.dayTime = dayTime;
        },
        getFebruary: function (year) {// 判断闰年
            if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
                return 29;
            }
            return 28;
        },
        runNian: function (year) {// 判断闰年
            if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
                return true;
            }
            return false;
        },
        getFirstDay: function (year, month) {// 判断某年某月的1号是星期几
            var allDay = 0, y = year - 1, i = 1;
            allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
            for (; i < month; i++) {
                switch (i) {
                    case 1:
                        allDay += 31;
                        break;
                    case 2:
                        if (this.runNian(year)) {
                            allDay += 29;
                        }
                        else {
                            allDay += 28;
                        }
                        break;
                    case 3:
                        allDay += 31;
                        break;
                    case 4:
                        allDay += 30;
                        break;
                    case 5:
                        allDay += 31;
                        break;
                    case 6:
                        allDay += 30;
                        break;
                    case 7:
                        allDay += 31;
                        break;
                    case 8:
                        allDay += 31;
                        break;
                    case 9:
                        allDay += 30;
                        break;
                    case 10:
                        allDay += 31;
                        break;
                    case 11:
                        allDay += 30;
                        break;
                    case 12:
                        allDay += 31;
                        break;
                }
            }
            return allDay % 7;
        },
        renderCalendar: function (year, month) {// 显示日历
            var i = 0,
                monthDay = this.monthDay[month - 1] || this.getFebruary(),
                html = [],
                _classname = "",
                firstDay = this.getFirstDay(year, month);

            html.push('<table class="his-calendar-table">');
            html.push('<caption class="calendar-caption">');
            //html.push('<div class="caption-title caption-sub-title">日期表</div>');
            html.push('<div class="caption-title">' + year + '年' + month + '月</div>');
            html.push('</caption>');
            html.push('<thead>');

            html.push('<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>');

            html.push('</thead>');
            html.push('<tbody>');
            html.push('<tr>');

            for (i = 1; i <= firstDay; i++) {
                html.push('<td class="calendar-day calendar-empty"></td>');
            }

            for (i = 1; i <= monthDay; i++) {
                var currentString = year + '-' + (month >= 10 ? month : ('0' + month)) + '-' + (i >= 10 ? i : ('0' + i));

                if (currentString < this.params.startString || currentString > this.params.endString) {
                    _classname = 'calendar-day calendar-overflow';
                } else {
                    _classname = 'calendar-day calendar-unvalid';
                }
                html.push('<td class="' + _classname + ' $' + currentString + '" data-value="' + currentString + '"><div>' + i + '</div></td>');

                firstDay = (firstDay + 1) % 7;
                if (firstDay === 0 && i !== monthDay) {
                    html.push('</tr><tr>');
                }
            }

            if (firstDay !== 0) {
                for (i = firstDay; i < 7; i++) {
                    html.push('<td class="calendar-day calendar-empty"></td>');
                }
            }

            html.push('</tr>');
            html.push('</tbody>');
            html.push('</table>');

            return html.join('');
        },
        render: function () {
            var array = [];
            if (this.params.endYear === this.params.startYear) {
                do {
                    array.unshift([this.params.startYear, this.params.endMonth - array.length]);
                } while (this.params.endMonth - array.length >= this.params.startMonth);
            } else {
                while (this.params.endMonth - array.length > 0) {
                    array.unshift([this.params.endYear, this.params.endMonth - array.length]);
                }
                var month = 12;
                while (month - this.params.startMonth >= 0) {
                    array.unshift([this.params.startYear, month--]);
                }
            }
            for (var i = 0, len = array.length; i < len; i++) {
                var date = array[i];
                var div = document.createElement('div');
                div.classList.add('his-calendar');
                div.innerHTML = this.renderCalendar(date[0], date[1]);
                this.el.appendChild(div);
            }
        },
        renderWrokTime: function (options) {
            if(options.scheduleUrl) {
                var startDate = this.params.startString, endDate = this.params.endString, that = this;
                var mask = lyb.showMask();
                mask.show();
                lyb.ajax(options.scheduleUrl, {
                    type: 'get',
                    dataType: 'json',
                    data: {start: startDate, end: endDate},
                    success: function (result) {
                        var array = result.data || [];
                        that.iteratorDate(array, options.detailUrl);
                        mask.close();
                    }
                });
            }else {
                if(this.options.renderSuccess) {
                    this.options.renderSuccess();
                    delete this.options.renderSuccess;
                }
            }
        },
        iteratorDate: function (array, url) {
            var telFunction = function(e){
                lyb.confirm('当前时间段只能通过电话预约，是否致电010-6064-7090？', {
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function () {
                        }
                    }, {
                        label: '拨打电话',
                        type: 'primary',
                        onClick: function () {
                            window.location.href = 'tel: 010-6064-7090';
                        }
                    }]
                });
            };
            var scheduleFunction = function(e){
                window.location.href = url + '&date=' + this.dataset.value;
            };

            var combineFunction = function(e){
                var value = this.dataset.value;
                var telHospital = this.dataset.telhospital;
                var schduleHopital = this.dataset.schdulehopital;
                var confirm = new weui.confirm(value + '<br>'+ telHospital +'：只能电话预约<br>'+ schduleHopital +'：可以微信预约', {
                    buttons: [{
                        label: '电话约' + telHospital,
                        type: 'default',
                        onClick: function () {
                            window.location.href = 'tel: 010-6064-7090';
                        }
                    }, {
                        label: '微信约' + schduleHopital,
                        type: 'primary',
                        onClick: function () {
                            window.location.href = url + '&date=' + value;
                        }
                    }]
                });
                jQuery('.weui-dialog__bd').append('<span class="lyb-mock-close" style="position: absolute;right: 5px;top: 0;color: #c03e3e;"></span>')
                jQuery('.lyb-mock-close').click(function () {
                    confirm.hide();
                })
            };
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                var app = this.el.querySelector('.\\$' + item.date);
                app.setAttribute('vAlign', 'bottom');
                var border = app.querySelector('.hospital-border');
                if (!border) {
                    border = document.createElement('div');
                    border.classList.add('hospital-border');
                    app.appendChild(border);
                }
                var status = document.createElement('div');
                status.classList.add('lest');
                status.classList.add('font10');
                status.style.fontSize = '10px';
                status.innerText = item.hospitalName;
                if (Number(item.limit) <= 0) {
                    status.classList.add('CCCCCC-bg');
                    app.classList.remove('calendar-valid');
                    app.classList.add('calendar-unvalid');
                } else if (item.isFirstNumLimit || item.date === lyb.formatDate(new Date(this.today.getTime() + this.dayTime), 'yyyy-mm-dd') && Number(lyb.formatDate(this.today, 'hh')) >= 18
                   || item.date === lyb.formatDate(new Date(this.today.getTime()), 'yyyy-mm-dd')) {// 今天18点前只能电话预约明天
                    status.classList.add('E6A85F-bg');
                    app.classList.add('calendar-valid');
                    app.classList.add('only-phone');
                    jQuery(app).attr('data-telhospital', item.hospitalName);
                    app.classList.remove('calendar-unvalid');
                    if(app.classList.contains('can-schedule')){ //如果当前日期已经有了预约标志
                        app.removeEventListener('click', scheduleFunction);
                        app.addEventListener('click', combineFunction);
                    }else{
                        app.addEventListener('click', telFunction);
                    }
                } else {
                    status.classList.add('A3C37A-bg');
                    app.classList.add('calendar-valid');
                    app.classList.add('can-schedule');
                    app.classList.remove('calendar-unvalid');
                    jQuery(app).attr('data-schdulehopital', item.hospitalName);
                    if (url) {
                        if(app.classList.contains('only-phone')){ //如果当前日期已经有了打电话标志
                            app.removeEventListener('click', telFunction);
                            app.addEventListener('click', combineFunction);
                        }else{
                            app.addEventListener('click', scheduleFunction);
                        }
                    }
                }
                border.appendChild(status);
            }
            if(this.options.renderSuccess) {
                this.options.renderSuccess();
                delete this.options.renderSuccess;
            }
        }
    };
    window.workTime = workTime;
})();