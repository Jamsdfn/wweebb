$(function () {
    $('.btn_outLogin').on('tap',function () {
        $.ajax({
            url:'/user/logout',
            type: 'get',
            data:{},
            dataType: 'json',
            success:function (data) {
                if(data.success){
                    window.location.reload()
                }else{
                    mui.toast('服务器繁忙')
                }
            }
        })
    })
    $.ajax({
        url:'/user/queryUserMessage',
        type: 'get',
        data:{},
        dataType:'json',
        success:function (data) {
            if(data.error == 400){
                location.href = 'login.html'
            }else {
                $('.mui-media-body').html(data.username + "<p class=\"mui-ellipsis\">" + data.mobile + "</p>")
            }
        }
    })
})