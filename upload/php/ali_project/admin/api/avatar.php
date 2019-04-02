<?php
//根据用户邮箱获取头像
require_once '../../config.php';

if(empty($_GET['email'])){
    exit('/static/assets/img/default.png');
}
$email = $_GET['email'];
$conn = mysqli_connect(BX_DB_HOST,BX_DB_USER,BX_DB_PASS,BX_DB_NAME);
if(!$conn){
    exit('/static/assets/img/default.png');
}

$query = mysqli_query($conn,"select * from users WHERE email = '{$email}' limit 1;");

if(!$query){
    exit('/static/assets/img/default.png');
}

$user = mysqli_fetch_assoc($query);

if(!$user){
    exit('/static/assets/img/default.png');
}

echo $user['avatar'];
