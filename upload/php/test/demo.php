<?php
// 问题是cookie暴露了答案出来  v1.0
//if($_SERVER['REQUEST_METHOD']==='GET'){
//    $num = random_int(0,100);
//    setcookie('num',$num);
//}else{
//    $result = (int)$_POST['num'] - (int)$_COOKIE['num'];
//    if($result==0){
//        echo '猜对了';
//猜对了就删除cookie
//        setcookie('num');
//    }elseif ($result>0){
//        echo '太大了';
//    }else{
//        echo '太小了';
//    }
//}
//v2.0
$message = '';
$str = '';
$try = array();
if (empty($_COOKIE['num'])) {
    $num = random_int(0, 100);
    setcookie('num', $num);
} else {

    $count = empty($_COOKIE['count']) ? 0 : (int)$_COOKIE['count'];
    if ($count < 10) {
        if(!empty($_POST['num'])){

            $result = (int)$_POST['num'] - (int)$_COOKIE['num'];
            if ($result == 0) {
                $message = '猜对了';
                //猜对了就删除cookie
                setcookie('num');
                setcookie('count');
                for($i=0;$i<=$count;$i++){
                    setcookie('try'.$i);
                }
                $try = [];
            } elseif ($result > 0) {
                $message = '太大了';
                setcookie('count', $count+1);
                setcookie('try'.$count, $_POST['num']);
                for($i=0;$i<$count;$i++){
                    $try[] = $_COOKIE['try'.$i];
                }
                $try[]=$_POST['num'];
            } else {
                $message = '太小了';
                setcookie('count', $count+1);
                setcookie('try'.$count, $_POST['num']);
                for($i=0;$i<$count;$i++){
                    $try[] = $_COOKIE['try'.$i];
                }
                $try[]=$_POST['num'];
            }

        }


    } else {
        $message = 'GAME OVER';
        setcookie('num');
        setcookie('count');
        $try = [];
        for($i=0;$i<=$count;$i++){
            setcookie('try'.$i);
        }
    }
}

//解决cookie暴露问题,用session



?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF‐8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>猜数字</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
<h1>猜数字游戏</h1>
<p>Hi，我已经准备了一个 0 ‐ 100 的数字，你需要在仅有的 10 机会之内猜对它。</p>
<form action="" method="post">
    <input type="number" min="0" max="100" name="num" placeholder="随便猜">
    <button type="submit">
        <?php if($message == '猜对了' || $message == 'GAME OVER'): ?>
        <?php echo '再玩一次' ?>
        <?php else: ?>
        <?php echo '试一试' ?>
        <?php endif ?>
    </button>
</form>
<?php if (count($try) > 0): ?>
<p><?php echo '猜过的数字有:' ?>
    <?php foreach ($try as $value): ?>
    <?php $str = $str . $value . ' '?>
    <?php endforeach; ?>
    <?php echo $str ?>
</p>
<?php endif ?>
<?php if (isset($message)): ?>
    <p><?php echo $message ?></p>
<?php endif ?>
</body>
</html>