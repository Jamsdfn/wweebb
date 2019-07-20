$(function () {
    $('#submit').on('tap',function () {
        //获取表单序列化数据
        var data = $('form').serialize()
        //    数据类型转换
        var dataObj = CT.serialize2object(data)
//    校验数据
        if(!dataObj.username){
            mui.toast('请您输入用户名')
            return false
        }
        if(!dataObj.password){
            mui.toast('请您输入密码')
            return false
        }
        $.ajax({
            url:'/user/login',
            type:'post',
            data: dataObj,
            dataType: 'json',
            success: function (data) {
                // 如果成功 根据地址跳转
                //    如果没有地址 默认调到个人中心首页
                if(data.success){
                    var returnUrl = location.search.replace('?returnUrl=','')
                    if(returnUrl){
                        location.href = returnUrl
                    }else{
                        location.href = CT.userUrl
                    }
                }else{
                    mui.toast(data.message)
                }
            }

        })
    })


})