if(params.fromWhere === 'lyb' || params.fromWhere === 'lyh') {
    lyb.fastNav = function(){};
}

lyb.parse();

var inputs = jQuery('input:password'), first = jQuery('#first_title'), last = jQuery('#last_title');

var psd = ['', ''];
jQuery('.keyboard').on('touchend', '.number', function (e) {
    e.preventDefault();
    if (psd[0].length < 6) {
        first.removeClass('his-hide');
        last.addClass('his-hide');
        psd[0] += this.innerHTML;
        setPassword(psd[0].split(''));

        if (psd[0].length == 6) {
            window.setTimeout(function () {
                setPassword([]);
                first.addClass('his-hide');
                last.removeClass('his-hide');
            }, 200);
            return;
        }
    } else {
        first.addClass('his-hide');
        last.removeClass('his-hide');
        psd[1] += this.innerHTML;
        setPassword(psd[1].split(''));
        if (psd[1].length == 6) {
            validate();
        }
    }
});
jQuery('.keyboard').on('touchend', '.delete', function (e) {
    e.preventDefault();
    if (psd[0].length < 6) {
        var psdArray = psd[0].split('');
        psdArray.shift();
        psd[0] = psdArray.join('');
        setPassword(psdArray);
    } else {
        var psdArray = psd[1].split('');
        psdArray.shift();
        psd[1] = psdArray.join('');
        setPassword(psdArray);
    }
});

function setPassword(values) {
    for (var i = 0; i < 6; i++) {
        inputs[i].value = values[i] || '';
    }
}

function validate() {
    if (psd[0] != psd[1]) {
        psd[0] = psd[1] = '';
        setPassword([]);
        first.removeClass('his-hide');
        last.addClass('his-hide');
        lyb.error('两次输入的密码不一致!');
    } else {
        lyb.ajax(ctx + 'member/info/addPassword', {
            type: 'post',
            dataType: 'json',
            data: {
                password: psd[0],
                cardId: params.cardId
            },
            success: function (result) {
                if (result.success) {
                    lyb.toast('支付密码设置成功!', function () {
                        if (sessionStorage.getItem('callbackUrl')) {
                            window.location.href = sessionStorage.getItem('callbackUrl');
                            sessionStorage.removeItem('callbackUrl');
                        } else {
                            window.location.href = ctx + 'html/personal/index.html';
                        }
                    });
                } else {
                    lyb.error(result.msg);
                    setPassword([]);
                    first.removeClass('his-hide');
                    last.addClass('his-hide');
                }
            }
        });
    }
}