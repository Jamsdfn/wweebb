$(function () {
//    用表单校验插件
//    要有form表单结构 并且有一个提交按钮
    $('#login').bootstrapValidator({
    //    校验的不同状态下显示的图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        //需要校验的表单元素 同过name
        fields:{
            //key 对应表单元素的name
            username:{
            //    校验规则 （一个或者多个）
                validators:{
                    notEmpty:{
                        //提示信息
                        message:'请输入用户名'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password:{
                validators: {
                    notEmpty:{
                        //提示信息
                        message:'请输入密码'
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:'密码必须是6-18个字符',
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv',function (e) {
        //校验成功时候触发
        //防止form的默认跳转事件 因为要用ajax提交
        e.preventDefault()
        // alert('ok')
    //    后台校验用户名和密码
    //    e.target 为form的dom对象
        var $form = $(e.target)

        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:$form.serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success){
                    location.href = '/admin/index.html'
                }else{
                    if(data.error == 1000){
                    //用户名错误
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback')
                    }else if(data.error == 1001){
                    //密码错误
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback')
                    }
                }
            }
        })
    })
})