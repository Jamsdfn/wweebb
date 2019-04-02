<?php
require_once '../function.php';
bx_get_current_user();

if (!empty($_GET['id'])) {
    //拿到用户需要修改的东西
    $current_edit_category = bx_fetch_one("SELECT * FROM categories where id ={$_GET['id']};");
}

function add_category()
{
    if (empty($_POST['name']) || empty($_POST['slug'])) {
        $GLOBALS['message'] = '请完整填写内容';
        $GLOBALS['success'] = false;
        return;
    }
    $name = $_POST['name'];
    $slug = $_POST['slug'];

    $row = bx_execute("INSERT INTO categories VALUES (NULL, '{$slug}','{$name}');");
    $GLOBALS['success'] = $row > 0;
    $GLOBALS['message'] = $row <= 0 ? '添加失败' : '添加成功';

}

function edit_category()
{
    global $current_edit_category;
    $id = $current_edit_category['id'];
    $name = empty($_POST['name']) ? $current_edit_category['name'] : $_POST['name'];
    $current_edit_category['name'] = $name;
    $slug = empty($_POST['slug']) ? $current_edit_category['slug'] : $_POST['slug'];
    $current_edit_category['slug'] = $slug;

    $row = bx_execute("UPDATE categories SET slug = '{$slug}', `name` = '{$name}' WHERE id = {$id};");
    $GLOBALS['success'] = $row > 0;
    $GLOBALS['message'] = $row <= 0 ? '更新失败' : '更新成功';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_GET['id'])) {
        add_category();
    } else {
        edit_category();
    }

}

$categories = bx_fetch_all("SELECT * FROM categories;");


?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>Categories &laquo; Admin</title>
    <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
    <link rel="stylesheet" href="/static/assets/css/admin.css">
    <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
<script>NProgress.start()</script>

<div class="main">
    <nav class="navbar">
        <button class="btn btn-default navbar-btn fa fa-bars"></button>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="profile.php"><i class="fa fa-user"></i>个人中心</a></li>
            <li><a href="login.php"><i class="fa fa-sign-out"></i>退出</a></li>
        </ul>
    </nav>
    <div class="container-fluid">
        <div class="page-title">
            <h1>分类目录</h1>
        </div>
        <?php if (isset($message)): ?>
            <?php if ($success): ?>
                <div class="alert alert-success">
                    <strong>成功！</strong><?php echo $message; ?>
                </div>
            <?php else: ?>
                <div class="alert alert-danger">
                    <strong>错误！</strong><?php echo $message; ?>
                </div>
            <?php endif; ?>
        <?php endif; ?>
        <div class="row">
            <div class="col-md-4">
                <?php if (isset($current_edit_category)): ?>
                    <form action="<?php echo $_SERVER['PHP_SELF'] ?>?id=<?php echo $current_edit_category['id']; ?>"
                          method="post">
                        <h2>编辑《<?php echo $current_edit_category['name']; ?>》</h2>
                        <div class="form-group">
                            <label for="name">名称</label>
                            <input id="name" class="form-control" name="name" type="text" placeholder="分类名称"
                                   value="<?php echo $current_edit_category['name']; ?>">
                        </div>
                        <div class="form-group">
                            <label for="slug">别名</label>
                            <input id="slug" class="form-control" name="slug" type="text" placeholder="slug"
                                   value="<?php echo $current_edit_category['slug']; ?>">
                            <p class="help-block">https://zce.me/category/<strong>slug</strong></p>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit">保存</button>
                        </div>
                    </form>
                <?php else: ?>
                    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
                        <h2>添加新分类目录</h2>
                        <div class="form-group">
                            <label for="name">名称</label>
                            <input id="name" class="form-control" name="name" type="text" placeholder="分类名称">
                        </div>
                        <div class="form-group">
                            <label for="slug">别名</label>
                            <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
                            <p class="help-block">https://zce.me/category/<strong>slug</strong></p>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit">添加</button>
                        </div>
                    </form>
                <?php endif; ?>
            </div>
            <div class="col-md-8">
                <div class="page-action">
                    <!-- show when multiple checked -->
                    <a id="btn_delete" class="btn btn-danger btn-sm" href="/admin/category-delete.php"
                       style="display: none">批量删除</a>
                </div>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th class="text-center" width="40"><input type="checkbox"></th>
                        <th>名称</th>
                        <th>Slug</th>
                        <th class="text-center" width="100">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($categories as $item): ?>
                        <tr>
                            <td class="text-center"><input type="checkbox" data-id="<?php echo $item['id'] ?>"></td>
                            <td><?php echo $item['name'] ?></td>
                            <td><?php echo $item['slug'] ?></td>
                            <td class="text-center">
                                <a href="/admin/categories.php?id=<?php echo $item['id'] ?>"
                                   class="btn btn-info btn-xs">编辑</a>
                                <a href="/admin/category-delete.php?id=<?php echo $item['id'] ?>"
                                   class="btn btn-danger btn-xs">删除</a>
                            </td>
                        </tr>

                    <?php endforeach; ?>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php $current_page = 'categories'; ?>
<?php include 'inc/sidebar.php'; ?>

<script src="/static/assets/vendors/jquery/jquery.js"></script>
<script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
<script>
    $(function ($) {
        var $tbodyCheckboxs = $('tbody input')
        var $btnDelete = $('#btn_delete')
        var allChecked = []

        // $tbodyCheckboxs.on('change',function () {
        //     var flag = false;
        //     $tbodyCheckboxs.each(function (i,item) {
        //         if($(item).prop('checked')){
        //             flag = true;
        //         }
        //     })
        //     flag ? $btnDelete.fadeIn() : $btnDelete.fadeOut();
        // })

        $tbodyCheckboxs.on('change', function () {
            var id = $(this).data('id')
            if ($(this).prop('checked')) {
                allChecked.includes(id) || allChecked.push(id)

            } else {
                //未被选中就移除
                allChecked.splice(allChecked.indexOf(id), 1)
            }
            allChecked.length ? $btnDelete.fadeIn() : $btnDelete.fadeOut()
            $btnDelete.prop('search', '?id=' + allChecked)
        })
        //全选
        $('thead input').on('change', function () {
            var checked = $(this).prop('checked')
            //$tbodyCheckboxs.prop('checked', checked).trigger('change')
            $tbodyCheckboxs.prop('checked', checked).change()

        })
    })


</script>
<script>NProgress.done()</script>
</body>
</html>
