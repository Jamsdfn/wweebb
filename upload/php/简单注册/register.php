<?php

function postback()
{
    global $rsp;
    if (empty($_POST['userName'])) {
        //没有提交用户名或用户名为空
        $rsp = '乱来，用户名在哪？';
        return;
    }
    if (empty($_POST['password'])) {
        $rsp = '瞎搞，密码呢？';
        return;
    }
    if (empty($_POST['confirm'])) {
        $rsp = '嗯？玩你🐎呢，再输入一次密码🦆';
        return;
    }
    if ($_POST['confirm'] !== $_POST['password']) {
        $rsp = '两次输入要一样呀，哥';
        return;
    }
    if (!(isset($_POST['agree']) && $_POST['agree'] === 'on')) {
        $rsp = '不同意一下注册协议吗';
        return;
    } else {
        $username = $_POST['userName'];
        $password = $_POST['password'];
        $str = $username . ' | ' . $password . "\n";
        file_put_contents('register.txt', $str, FILE_APPEND);
        $rsp = '注册成功';
    }

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //1.接收并校验
    //不推荐直接写的方法，ifelse嵌套有点深不便于阅读
//    if (empty($_POST['userName'])) {
//        //没有提交用户名或用户名为空
//        $rsp = '乱来，用户名在哪？';
//    } else {
//        if (empty($_POST['password'])) {
//            $rsp = '瞎搞，密码呢？';
//        }else{
//            if (empty($_POST['confirm'])) {
//                $rsp = '嗯？玩你🐎呢，再输入一次密码🦆';
//            }else{
//                if($_POST['confirm']!==$_POST['password']){
//                    $rsp = '两次输入要一样呀，哥';
//                }else{
//                    if(!(isset($_POST['agree']) && $_POST['agree'] === 'on')){
//                        $rsp = '不同意一下注册协议吗';
//                    }else{
//                        $username = $_POST['userName'];
//                        $password = $_POST['password'];
//                        $str = $username. ' | ' .$password . "\n";
//                        file_put_contents('register.txt',$str,FILE_APPEND);
//                        $rsp = '注册成功';
//                    }
//                }
//            }
//
//        }
//
//    }
    postback();
    //2.持久化


    //3.响应
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <table>
        <tr>
            <td><label for="userName">用户名</label></td>
            <td><input type="text" name="userName" id="userName" value="<?php echo isset($_POST['userName']) ?
                    $_POST['userName'] : ''; ?>"></td>
        </tr>
        <tr>
            <td><label for="password">密码</label></td>
            <td><input type="password" name="password" id="password"></td>
        </tr>
        <tr>
            <td><label for="confirm">确认密码</label></td>
            <td><input type="password" name="confirm" id="confirm"></td>
        </tr>
        <tr>
            <td><label><input type="checkbox" name="agree">同意注册协议</label></td>
            <td></td>
        </tr>
        <?php if (isset($rsp)): ?>
            <tr>
                <td></td>
                <td><?php echo $rsp; ?></td>
            </tr>
        <?php endif ?>
        <tr>
            <td>
                <button>注册</button>
            </td>
            <td></td>
        </tr>
    </table>
</form>
</body>
</html>
