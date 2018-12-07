$("#blogin").click(ShowLoginBox);

function ShowLoginBox(){
    layer.open({
        type:1,
        title:"登陆",
        area:["395px","330px"],
        content:$("#loginbox")
    })
}


$(".login-item a").click(Login);

function Login(){
    var username = $.trim($("#txtusername").val());
    var pwd = $.trim($("#txtpwd").val());
    if(username == "" || pwd == ""){
        layer.alert("用户名或密码不能为空",{
            title:"提示",
            icon:2
        });
    }else{
        $.post("#",{"username":username,"pwd":pwd},function (data) {
            if(data == "登陆成功"){
                layer.alert("登陆成功",{
                    title:"提示"
                });
            }else{
                layer.alert("用户名或密码错误",{
                    title:"提示"
                });
            }
        })
    }
}