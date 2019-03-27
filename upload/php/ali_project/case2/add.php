<?php
function add_user()
{
//    TODO:验证非空
    if (empty($_POST['name'])) {
        $GLOBALS['error-message'] = '请输入姓名';
        return;
    }

    if (!(isset($_POST['gender']) && $_POST['gender'] !== '-1')) {
        $GLOBALS['error-message'] = '请选择性别';
        return;
    }

    if (empty($_POST['birthday'])) {
        $GLOBALS['error-message'] = '请选择出生年月';
        return;
    }


//    TODO:取值
    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $birthday = $_POST['birthday'];

//    TODO: 接收文件并验证
    if (empty($_FILES['avatar'])) {
        $GLOBALS['error-message'] = '请上传头像';
        return;
    }
    $avatar = $_FILES['avatar'];
    if ($avatar['error'] !== UPLOAD_ERR_OK) {
        $GLOBALS['error_message'] = '请选择头像';
        return;
    }
    if ($avatar['size'] > 5 * 1024 * 1024) {
        $GLOBALS['error_message'] = '头像过大无法上传';
        return;
    }
    $allowed_images_types = array('image/jpeg', 'image/png');
    if (!in_array($avatar['type'], $allowed_images_types)) {
        $GLOBALS['error_message'] = '不支持此类图片格式';
        return;
    }
    $avatar_target = './uploads/avatar-' . uniqid() . '.' .pathinfo($avatar['name'],PATHINFO_EXTENSION);
    if (!move_uploaded_file($avatar['tmp_name'], $avatar_target)) {
        $GLOBALS['error_message'] = '上传海报失败';
        return;
    }

//    TODO：保存
    $conn = mysqli_connect('localhost', 'root', '123456', 'test');

    if (!$conn) {
        $GLOBALS['error_message'] = '连接数据库失败';
    }

// 2. 开始查询
    $sql = "insert into users values (null,'{$name}',{$gender},'{$birthday}','{$avatar_target}');";


        $query = mysqli_query($conn, $sql);

    if (!$query) {
        $GLOBALS['error_message'] = '查询过程失败';
        mysqli_close($conn);
        return;

    }
    if(mysqli_affected_rows($conn) !==1 ){
        $GLOBALS['error_message'] = '删除失败';
        mysqli_close($conn);
        return;
    }
    mysqli_close($conn);
//    TODO：响应
    header('Location: list.php');

}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    add_user();
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./bootstrapv4.css">
</head>
<body>
<nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">XXX管理系统</a>
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="list.php">用户管理</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">商品管理</a>
        </li>
    </ul>
</nav>
<div class="container mt-5 w-25">
    <h1 class="display-3">添加用户</h1>
    <hr>
    <?php if(isset($error_message)): ?>
    <div class="alert alert-warning">
        <?php echo $error_message; ?>
    </div>

    <?php endif ?>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data"
          autocomplete="off">
        <div class="form-group">
            <label for="avatar">头像</label>
            <input type="file" name="avatar" id="avatar" class="form-control" accept="image/*">
        </div>

        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" name="name" id="name" class="form-control">
        </div>

        <div class="form-group">
            <label for="birthday">出生年月</label>
            <input type="date" name="birthday" id="birthday" class="form-control">
        </div>
        <div class="form-group mt-5">
            <label for="gender">选择性别</label>
            <select name="gender" id="gender">
                <option value="-1">请选择性别</option>
                <option value="1">男</option>
                <option value="0">女</option>
            </select>
        </div>
        <button class="btn btn-primary" style="margin: 0 auto;display: table;">保存</button>
    </form>
</div>
</body>
</html>