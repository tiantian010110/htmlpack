lyb.parse();
var gender = {'M': '男', 'F': '女'};

lyb.ajax(ctx + 'member/info/personal', {
    type: 'get',
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            var data = result.data;
            if(data.headimgurl)
                document.querySelector('#headImgUrl').src = data.headimgurl;
            document.querySelector('#name').innerHTML = data.name;
            document.querySelector('#gender').innerHTML = gender[data.gender] || '';
            document.querySelector('#birthday').innerHTML = data.birthday || '';
            document.querySelector('#mobile').innerHTML = data.mobile || '';
        }
    }
});

var loading = lyb.showMask();
document.querySelector('#logout').addEventListener('click', function () {
    lyb.confirm('确认退出？', function () {
        loading.show();
        lyb.ajax(ctx + 'member/info/logout', {
            type: 'get',
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    loading.success('退出成功!', function () {
                        window.location.href = ctx + 'html/personal/personal.html';
                        localStorage.removeItem('MONTH_BILLS');
                    });
                }else {
                    loading.close();
                    lyb.error(result.msg);
                }
            }
        });
    })
});