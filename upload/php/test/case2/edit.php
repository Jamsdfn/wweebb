<?php
if (empty($_GET['id'])) {
    exit('<h1>必须传入指定参数</h1>');
}
$id = $_GET['id'];

$connection = mysqli_connect('127.0.0.1', 'root', '123456', 'test');

if (!$connection) {
    exit('<h1>连接数据库失败！</h1>');
}
//limit 找到信息后就不继续查询 提高效率
$query = mysqli_query($connection, "select * from users where id = {$id} limit 1;");

if (!$query) {
    exit('<h1>查询失败！</h1>');
}

$user = mysqli_fetch_assoc($query);

if (!$user) {
    exit('<h1>找不到要编辑的数据</h1>');
}


mysqli_free_result($query);
//更新数据

function edit()
{
    //把函数外的$user拿来用
    global $user;
    global $id;
    global $connection;
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


    $user['name'] = $_POST['name'];
    $user['gender'] = $_POST['gender'];
    $user['birthday'] = $_POST['birthday'];

//头像有上传头像
    if (empty($_FILES['avatar'])) {
        $GLOBALS['error-message'] = '请上传头像';
        return;
    }
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
        $avatar = $_FILES['avatar'];

        if ($avatar['size'] > 5 * 1024 * 1024) {
            $GLOBALS['error_message'] = '头像过大无法上传';
            return;
        }

        $allowed_images_types = array('image/jpeg', 'image/png');

        if (!in_array($avatar['type'], $allowed_images_types)) {
            $GLOBALS['error_message'] = '不支持此类图片格式';
            return;
        }

        $avatar_target = './uploads/avatar-' . uniqid() . '.' . pathinfo($avatar['name'], PATHINFO_EXTENSION);

        if (!move_uploaded_file($avatar['tmp_name'], $avatar_target)) {
            $GLOBALS['error_message'] = '上传头像失败';
            return;
        }
        //删除旧文件
        unlink($user['avatar']);
        //把新文件路径重新赋值
        $user['avatar']= $avatar_target;
    }
    $query = mysqli_query($connection, "update users set name='{$user['name']}',gender={$user['gender']},birthday='{$user['birthday']}',avatar='{$user['avatar']}' where id = {$id};");
    if (!$query) {
        exit('<h1>查询失败！</h1>');
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    edit();
    mysqli_close($connection);
    header('Location: list.php');
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
    <h1 class="display-3">编辑“<?php echo $user['name']; ?>”</h1>
    <hr>
    <?php if (isset($error_message)): ?>
        <div class="alert alert-warning">
            <?php echo $error_message; ?>
        </div>

    <?php endif ?>
    <form action="<?php echo $_SERVER['PHP_SELF'] . '?id=' . $id; ?>" method="post" enctype="multipart/form-data"
          autocomplete="off">
        <img src="<?php echo $user['avatar']; ?>" alt="">
        <div class="form-group">
            <label for="avatar">头像</label>
            <input type="file" name="avatar" id="avatar" class="form-control" accept="image/*">
        </div>

        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" name="name" id="name" class="form-control" value="<?php echo $user['name']; ?>">
        </div>

        <div class="form-group">
            <label for="birthday">出生年月</label>
            <input type="date" name="birthday" id="birthday" class="form-control"
                   value="<?php echo $user['birthday']; ?>">
        </div>
        <div class="form-group mt-5">
            <label for="gender">选择性别</label>
            <select name="gender" id="gender">
                <option value="-1">请选择性别</option>
                <!--                数据库调出来的数据全是字符串类型 -->
                <option value="1" <?php echo $user['gender'] === '1' ? 'selected' : '' ?>>男</option>
                <option value="0" <?php echo $user['gender'] === '0' ? 'selected' : '' ?>>女</option>
            </select>
        </div>
        <button class="btn btn-primary" style="margin: 0 auto;display: table;">保存</button>
    </form>
</div>
</body>
</html>