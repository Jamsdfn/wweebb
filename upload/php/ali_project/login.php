<?php

//接受
if (empty($_POST['username']) || empty($_POST['password'])) {
    exit('请提交用户名和密码');
    //参数相当于echo '...';exit();两行代码
}
//校验
if($_POST['username'] === 'admin' && $_POST['password'] === '123'){
    exit('登录成功');
}
exit('用户名或密码错误');
//响应