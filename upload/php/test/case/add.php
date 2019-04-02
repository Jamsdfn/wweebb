<?php
function add_music()
{
    $id = (string)uniqid();


    if (empty($_POST['title'])) {
        $GLOBALS['error_message'] = '请输入标题';
        return;
    }


    if (empty($_POST['artist'])) {
        $GLOBALS['error_message'] = '请输入歌手';
        return;
    }


    if (empty($_FILES['images'])) {
        $GLOBALS['error_message'] = '请正确提交海报';
        return;
    }

    $images = $_FILES['images'];

    if ($images['error'] !== UPLOAD_ERR_OK) {
        $GLOBALS['error_message'] = '请选择图片文件';
        return;
    }
    if ($images['size'] > 6 * 1024 * 1024) {
        $GLOBALS['error_message'] = '图片文件过大无法上传';
        return;
    }
    $allowed_images_types = array('image/jpeg', 'image/png');
    if (!in_array($images['type'], $allowed_images_types)) {
        $GLOBALS['error_message'] = '不支持此类图片格式';
        return;
    }
    $img_target = './img/' . $id . '-' . $images['name'];
    if (!move_uploaded_file($images['tmp_name'], $img_target)) {
        $GLOBALS['error_message'] = '上传海报失败';
        return;
    }


    if (empty($_FILES['source'])) {
        $GLOBALS['error_message'] = '请正确提交音乐文件';
        return;
    }

    $source = $_FILES['source'];

    if ($source['error'] !== UPLOAD_ERR_OK) {
        $GLOBALS['error_message'] = '请选择音乐文件';
        return;
    }
    if ($source['size'] > 10 * 1024 * 1024) {
        $GLOBALS['error_message'] = '音乐文件过大无法上传';
        return;
    }

    $allowed_music_types = array('audio/mp3', 'audio/wma');
    if (!in_array($source['type'], $allowed_music_types)) {
        $GLOBALS['error_message'] = '不支持此类音乐格式';
        return;
    }


    $audio_target = './uploads/' . $id . '-' . $source['name'];
    if (!move_uploaded_file($source['tmp_name'], $audio_target)) {
        $GLOBALS['error_message'] = '上传音乐失败';
        return;
    }
    $connection = mysqli_connect('127.0.0.1','root','123456','music');
    if (!$connection) {
        exit('<h1>连接数据库失败！</h1>');
    }
    $title = $_POST['title'];
    $artist = $_POST['artist'];
    $images = $img_target;
    $source = $audio_target;
    $sql = "insert into music values ('".$id."','".$title."','".$artist."','".$images."','".$source."');";
//    var_dump($sql);
    $query = mysqli_query($connection,$sql);
    if(!$query){
        exit('<h1>添加失败！</h1>');
    }
    mysqli_close($connection);


    header('Location: list.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    add_music();

}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Add Music</title>
    <link rel="stylesheet" href="./bootstrapv4.css">
</head>
<body>
<div class="container mt-5 w-25">
    <h1 class="display-3">添加音乐</h1>
    <hr>
    <?php if (isset($error_message)): ?>
        <div class="alert alert-danger" role="alert">
            <?php echo $error_message; ?>
        </div>
    <?php endif ?>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data"
          autocomplete="off">
        <label for="title">标题</label>
        <input type="text" name="title" id="title" class="form-control">
        <small class="form-text text-muted">请输入音乐标题</small>
        <label for="artist">歌手</label>
        <input type="text" name="artist" id="artist" class="form-control">
        <small class="form-text text-muted">请输入歌手名字</small>
        <label for="images">海报</label>
        <!--        input:file 的accept属性可以选择默认提交的文件类型 值是 MIME Typ-->
        <input type="file" name="images" id="images" class="form-control" accept="image/*">
        <small class="form-text text-muted">请提交音乐的海报</small>
        <label for="source">音乐</label>
        <input type="file" name="source" id="source" class="form-control" accept="audio/*">
        <small class="form-text text-muted">请提交音乐文件</small>
        <button class="btn btn-primary" style="margin: 0 auto;display: table;">保存</button>
    </form>
</div>
</body>
</html>