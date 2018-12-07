<?php
//在客户端跳转的URL中加信息  如 href="delete.php?id=<?php echo $item['id']; ？>
//通过此URL？参数的不同来辨别要删除哪个数据

//接收URL中不同的id

if(empty($_GET['id'])){
    //停止执行，并警示
    exit('<h1>必须制定参数<h1>');
}

$id = $_GET['id'];

$data = json_decode(file_get_contents('storage.json'),true);
foreach ($data as $item){
    if($item['id']!==$id) continue;
    $index = array_search($item , $data);
    array_splice($data,$index,1);
    unlink($item['images']);
    unlink($item['source']);
    break;
}

$json = json_encode($data);
file_put_contents('storage.json',$json);
header('Location: list.php');
