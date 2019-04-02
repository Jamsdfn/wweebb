<?php
//在客户端跳转的URL中加信息  如 href="delete.php?id=<?php echo $item['id']; ？>
//通过此URL？参数的不同来辨别要删除哪个数据

//接收URL中不同的id

if(empty($_GET['id'])){
    //停止执行，并警示
    exit('<h1>必须制定参数<h1>');
}

$id = $_GET['id'];

$connection = mysqli_connect('127.0.0.1', 'root', '123456', 'test');

if (!$connection) {
    exit('<h1>连接数据库失败！</h1>');
}
$query = mysqli_query($connection,'select * from users;');

if(!$query){
    exit('<h1>查询失败！</h1>');
}

//先赋值再判断
$data = array();
while($row = mysqli_fetch_assoc($query)){
    //逐条追加到data数组中
    $data[] = $row;
}
//释放结果集 类似C中的fclose()
mysqli_free_result($query);

//关闭链接 类似C中的fclose()



foreach ($data as $item){
    if($item['id']!==$id) continue;
    $sql = "delete from users where id = '".$id."';";
    $query = mysqli_query($connection,$sql);
    unlink($item['avater']);
    break;
}



mysqli_close($connection);
header('Location: list.php');
