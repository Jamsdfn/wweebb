<?php
//建立数据库连接
$connection = mysqli_connect('127.0.0.1', 'root', '123456', 'music');

if (!$connection) {
    exit('<h1>连接数据库失败！</h1>');
}
$query = mysqli_query($connection,'select * from music;');

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
mysqli_close($connection);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Music List</title>
    <link rel="stylesheet" href="./bootstrapv4.css">
</head>
<body>
<div class="container my-5">
    <h1 class="display-3 mb-2">音乐列表</h1>
    <hr>
    <table class="table table-bordered table-striped table-hover">
        <thead class="thead-dark">
        <tr>
<!--            <th style="font-size: 20px">编号</th>-->
            <th style="font-size: 20px">标题</th>
            <th style="font-size: 20px">歌手</th>
            <th style="font-size: 20px">海报</th>
            <th style="font-size: 20px">音乐</th>
            <th style="font-size: 20px">操作</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($data as $item): ?>
            <tr>
                <td  class="align-middle" style="font-size: 20px"><?php echo $item['title']; ?></td>
                <td  class="align-middle" style="font-size: 20px"><?php echo $item['artist']; ?></td>
                <td class="align-middle"><img src="<?php echo $item['images']; ?>" alt="" style="height: 60px;width: 60px"></td>
                <td class="align-middle">
                    <audio src="<?php echo $item['source'] ?>" controls></audio>
                </td>
                <td class="align-middle">
                    <a class="btn btn-danger btn-sm " href="delete.php?id=<?php echo $item['id']; ?>">Delete</a>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <a href="add.php" class="btn btn-primary mr-3" style="float: right">Add</a>
</div>
</body>
</html>