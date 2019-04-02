<?php

$connection = mysqli_connect('127.0.0.1', 'root', '123456', 'demo');

if (!$connection) {
    exit('<h1>连接数据库失败！</h1>');
}

$query = mysqli_query($connection,'select * from user1;');

if(!$query){
    exit('<h1>查询失败！</h1>');
}

//先赋值再判断
while($row = mysqli_fetch_assoc($query)){
    var_dump($row);
}
//释放结果集 类似C中的fclose()
mysqli_free_result($query);

//关闭链接 类似C中的fclose()
mysqli_close($connection);
