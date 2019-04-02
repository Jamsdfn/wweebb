<?php
//require是php的函数 它的绝对路径是window的绝对路径 所以不能动/config.php的方式
require_once '../config.php';

// 开启session ，给用户找一个session
session_start();

function login()
{
    //接收并校验
    //持久化
    //响应
    if (empty($_POST['email'])) {
        $GLOBALS['message'] = '请填写邮箱';
        return;
    }
    if (empty($_POST['password'])) {
        $GLOBALS['message'] = '请填写密码';
        return;
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    $conn = mysqli_connect(BX_DB_HOST,BX_DB_USER,BX_DB_PASS,BX_DB_NAME);
    if(!$conn){
        exit('<h1>链接数据库失败</h1>');
    }

    $query = mysqli_query($conn,"select * from users WHERE email = '{$email}' limit 1;");

    if(!$query){
        $GLOBALS['message'] = '登录失败，请重试!';
        return;
    }

    $user = mysqli_fetch_assoc($query);

    if(!$user){
        $GLOBALS['message'] = '用户名不存在';
        return;
    }
    //md5函数是把字符串加密，数据库通常是加密过后的密码
    //但是md5现在不安全，通常加密后再加点规则改变再存进数据库
    //所以通常只用md5也是不行的，以下为demo，方便测试所以只用md5的方式
    if($user['password'] !== md5($password)){
        $GLOBALS['message'] = '密码不正确';
        return;
    }

    //存一个登录标识
    $_SESSION['current_login_user'] = $user;

    header('Location: /admin');

}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    login();
}

if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'logout'){
    unset($_SESSION['current_login_user']);
}

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>Sign in &laquo; Admin</title>
    <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/static/assets/css/admin.css">
    <link rel="stylesheet" href="/static/assets/vendors/animate/animate.min.css">
</head>
<body>
<div class="login">
    <form class="login-wrap <?php echo isset($message) ? ' shake animated' : '' ?>"
          action="<?php echo $_SERVER['PHP_SELF'] ?>"
          method="post" autocomplete="off">
        <img class="avatar" src="/static/assets/img/default.png">

        <?php if (isset($message)): ?>
            <div class="alert alert-danger">
                <strong>错误！</strong> <?php echo $message; ?>
            </div>
        <?php endif ?>
        <div class="form-group">
            <label for="email" class="sr-only">邮箱</label>
            <input id="email" name="email" type="email" class="form-control" placeholder="邮箱" autofocus
                   value="<?php echo empty($_POST['email']) ? '' : $_POST['email'] ?>">
        </div>
        <div class="form-group">
            <label for="password" class="sr-only">密码</label>
            <input id="password" name="password" type="password" class="form-control" placeholder="密码">
        </div>
        <button class="btn btn-primary btn-block">登 录</button>
    </form>
</div>
<script src="/static/assets/vendors/jquery/jquery.min.js"></script>
<script>
    $(function ($) {
        $("#email").blur(function () {
            $.get('/admin/api/avatar.php',{email:$('#email').val()},function (res) {
                $(".avatar").attr('src',res);
            })
        })
    })


</script>
</body>
</html>
