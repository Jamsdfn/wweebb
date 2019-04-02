<?php
require_once '../function.php';
bx_get_current_user();

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>Comments &laquo; Admin</title>
    <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
    <link rel="stylesheet" href="/static/assets/css/admin.css">
    <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
    <script src="/static/assets/vendors/jquery/jquery.js"></script>
</head>
<body>
<script>
    NProgress.start()
    $('html').addClass('nprogress-busy')
</script>

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
            <h1>所有评论</h1>
        </div>
        <!-- 有错误信息时展示 -->
        <!-- <div class="alert alert-danger">
          <strong>错误！</strong>发生XXX错误
        </div> -->
        <div class="page-action">
            <!-- show when multiple checked -->
            <div class="btn-batch" style="display: none">
                <button class="btn btn-info btn-sm">批量批准</button>
                <button class="btn btn-warning btn-sm">批量拒绝</button>
                <button class="btn btn-danger btn-sm">批量删除</button>
            </div>
            <ul class="pagination pagination-sm pull-right">
            </ul>
        </div>
        <table class="table table-striped table-bordered table-hover">
            <thead>
            <tr>
                <th class="text-center" width="40"><input type="checkbox"></th>
                <th width="60">作者</th>
                <th>评论</th>
                <th width="120">评论在</th>
                <th width="100">提交于</th>
                <th width="60">状态</th>
                <th class="text-center" width="150">操作</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<?php $current_page = 'comments'; ?>
<?php include 'inc/sidebar.php'; ?>


<script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
<script src="/static/assets/vendors/jsrender/jsrender.js"></script>
<script id="comments_tmpl" type="text/x-jsrender">
{{for comments}}
    <tr{{if status == 'held'}} class = "warning"{{else status == 'rejected'}} class="danger"{{/if}} data-id="{{:id}}">
        <td class="text-center"><input type="checkbox"></td>
        <td>{{:author}}</td>
        <td>{{:content}}</td>
        <td>{{:posts_title}}</td>
        <td>{{:created}}</td>
        <td>{{if status == 'held'}}待审{{else status == 'rejected'}}拒绝{{else status == 'approved'}}通过{{else status == 'trashed'}}回收站{{else}}未知状态{{/if}}</td>
        <td class="text-center">
        {{if status == 'held'}}
        <a href="post-add.php" class="btn btn-info btn-xs">批准</a>
        <a href="post-add.php" class="btn btn-warning btn-xs">拒绝</a>
        {{/if}}
        <a href="javascript:;" class="btn btn-danger btn-xs btn-delete">删除</a>
        </td>
    </tr>
{{/for}}




</script>
<script src="/static/assets/vendors/twbs-pagination/jquery.twbsPagination.min.js"></script>
<script>
    //先初始化一个分页组件，防止函数中的destory报错
    $('.pagination').twbsPagination({
        first: '&laquo;',
        last: '&raquo;',
        prev: '&lt;',
        next: '&gt;',
        totalPages: 100,
        visiablePages: 5,
        initiateStartPageClick: false,
        onPageClick: function (e, page) {
            loadPageData(page)
        }
    })
    var currentPage = 1

    //发送ajax请求获取列表所需数据
    // $.getJSON('/admin/api/comments.php', {page:2}, function (res) {
    //
    //     var html = $('#comments_tmpl').render({comments: res})
    //     $('tbody').html(html)
    // })
    function loadPageData(page) {
        $.getJSON('/admin/api/comments.php', {page: page}, function (res) {
            //防止页面大于总页面
            if (page > res.total_pages) {
                loadPageData(res.total_pages)
                return
            }
            $('.pagination').twbsPagination('destroy')
            $('.pagination').twbsPagination({
                first: '&laquo;',
                last: '&raquo;',
                prev: '&lt;',
                next: '&gt;',
                startPage: page,
                totalPages: res.total_pages,
                visiablePages: 5,
                initiateStartPageClick: false,
                onPageClick: function (e, page) {
                    loadPageData(page)
                }
            })
            var html = $('#comments_tmpl').render({comments: res.comments})
            $('tbody').html(html)
            currentPage = page;
        })
    }

    loadPageData(currentPage)

    //删除功能
    //由于删除的按钮是动态添加的，而添加代码是ajax委托执行的，所以直接个按钮注册事件会失败
    //因而给父元素给事件委托完成,因为事件是有按钮触发的 所以this是按钮
    $('tbody').on('click', '.btn-delete', function () {
        //1.先拿到需要删除的数据ID
        var $tr = $(this).parent().parent()
        var id = $tr.data('id')

        //2.发送一个ajax请求
        $.get('/admin/api/comment-delete.php', {id: id}, function (res) {
            if (!res) return
            //3.根据服务端返回值来绝对是否在界面上移除这个数据
            //4.重新载入元素
            loadPageData(currentPage)
        })

    })

</script>
<script>
    NProgress.done()
    $('html').removeClass('nprogress-busy')
</script>
</body>
</html>
