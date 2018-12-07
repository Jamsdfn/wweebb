<?php
function postback()
{
    if(!isset($_FILES['avatar'])){
        $GLOBALS['message'] = '没文件';
        //客户端提交的表单根本没有文件域
        return;
    }
    $avatar = $_FILES['avatar'];
    if($avatar['error']!==UPLOAD_ERR_OK){
        $GLOBALS['message']='上传失败';
        return;
    }
    //将文件从临时目录移动到网站根目录范围之内
    $source = $avatar['tmp_name'];
    $target = './img/' . $avatar['name'];
    $moved = move_uploaded_file($source,$target);
    if(!$moved){
        $GLOBALS['message'] = '上传失败';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    postback();


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
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar">
    <button>上传</button>
    <?php if(isset($message)): ?>
    <p style = "color : hotpink"><?php echo $message; ?></p>
    <?php endif ?>
</form>
</body>
</html>