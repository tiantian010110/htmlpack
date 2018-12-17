lyb.parse();


lyb.ajax(ctx + 'member/info/personal', {
    type: 'get',
    dataType: 'json',
    success: function (result) {
        var data = result.data;
        if (result.success) {
            jQuery('#name').html(data.name);
            jQuery('#mobile').html(data.mobile);
            jQuery('#sendCode').removeAttr('disabled');
        }
    }
});

weui.form.checkIfBlur('#payForm');

var mobile = jQuery('#mobile'), vCode = jQuery('#code');
jQuery('#payForm').on('click', '#sendCode', function () {
    var that = this;
    lyb.ajax({
        url: ctx + 'wallet/changePwd/validCode',
        type: 'get',
        success: function (result) {
            if(result.success){
                vCode.focus();
                var count = 90;
                that.innerHTML = '90s后发送';
                that.classList.add('disabled');
                that.setAttribute("disabled", true);
                var interval = window.setInterval(function () {
                    count--;
                    that.innerHTML = count + 's后发送';
                    if(count <= 0) {
                        window.clearInterval(interval);
                        that.innerHTML = '发送验证码';
                        that.classList.remove('disabled');
                        that.removeAttribute('disabled');
                    }
                }, 1000);
            }else {
                lyb.error(result.msg);
            }
        }
    })
});

var mask = lyb.showMask();
document.getElementById('pay').addEventListener('click', function () {
    var that = this, mValue = mobile.val(), vValue = vCode.val();
    if(vValue === '') {
        lyb.error('请输入验证码！');
        return;
    }
    if(vValue.length !== 4) {
        lyb.error('请输入正确的验证码！');
        return;
    }
    mask.show();
    this.setAttribute('disabled', 'disabled');
    this.classList.add('gray-background');
    lyb.ajax({
        url: ctx + 'wallet/changePwd/validate?validCode=' + vValue,
        type: 'get',
        success: function (result) {
            that.removeAttribute('disabled');
            that.classList.remove('gray-background');
            if(result.success){
                window.location.href = 'pay_password.html';
            }else {
                mask.close();
                lyb.error(result.msg);
            }
        }
    })
});