<?php

session_start();

$message = '';
$str = '';
$try = array();
if (empty($_SESSION['num'])) {
    $num = random_int(0, 100);
    $_SESSION['num'] = $num;
} else {

    $count = empty($_SESSION['count']) ? 0 : $_SESSION['count'];
    if ($count < 9) {
        if (!empty($_POST['num'])) {

            $result = (int)$_POST['num'] - $_SESSION['num'];
            if ($result == 0) {
                $message = '猜对了';
                //猜对了就删除cookie
                unset($_SESSION['num']);
                unset($_SESSION['count']);
                for ($i = 0; $i <= $count; $i++) {
                    setcookie('try' . $i);
                }
                $try = [];
            } elseif ($result > 0) {
                $message = '太大了';
                $_SESSION['count'] = $count + 1;
                setcookie('try' . $count, $_POST['num']);
                for ($i = 0; $i < $count; $i++) {
                    $try[] = $_COOKIE['try' . $i];
                }
                $try[] = $_POST['num'];
            } else {
                $message = '太小了';
                $_SESSION['count'] = $count + 1;
                setcookie('try' . $count, $_POST['num']);
                for ($i = 0; $i < $count; $i++) {
                    $try[] = $_COOKIE['try' . $i];
                }
                $try[] = $_POST['num'];
            }

        }

    }elseif ($count == 10){
        if (!empty($_POST['num'])) {
            $result = (int)$_POST['num'] - $_SESSION['num'];
            if ($result == 0) {
                $message = '猜对了';
                //猜对了就删除cookie
                unset($_SESSION['num']);
                unset($_SESSION['count']);
                for ($i = 0; $i <= $count; $i++) {
                    setcookie('try' . $i);
                }
                $try = [];
            } else {
                $message = 'GAME OVER';
                unset($_SESSION['num']);
                unset($_SESSION['count']);
                $try = [];
                for ($i = 0; $i <= $count; $i++) {
                    setcookie('try' . $i);
                }
            }
        }
    }else {
        $message = 'GAME OVER';
        unset($_SESSION['num']);
        unset($_SESSION['count']);
        $try = [];
        for($i=0;$i<=$count;$i++){
            setcookie('try'.$i);
        }
    }
}




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