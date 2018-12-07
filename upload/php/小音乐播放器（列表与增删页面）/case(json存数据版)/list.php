<?php
//读出数据
$contents = file_get_contents('storage.json');
//解码contents,,将json中的对象转换为PHP的 stdClass 类型对象
$data = json_decode($contents, true);

//if(!$data){
//    exit('<h1>数据文件异常</h1>');
//}

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