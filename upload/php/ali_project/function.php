<?php
require_once 'config.php';
session_start();
function bx_get_current_user()
{
    if (empty($_SESSION['current_login_user'])) {
        header('Location: /admin/login.php');
        exit();

    }
    return $_SESSION['current_login_user'];
}
//获取数据得到的是索引数组套关联数组
function bx_fetch_all($sql)
{
    $conn = mysqli_connect(BX_DB_HOST, BX_DB_USER, BX_DB_PASS, BX_DB_NAME);
    if (!$conn) {
        exit('链接数据库失败');

    }

    $query = mysqli_query($conn, $sql);

    if (!$query) {
        return false;
    }
    $result = [];
    while ($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
    }

    mysqli_free_result($query);
    mysqli_close($conn);

    return $result;
}

function bx_fetch_one($sql)
{
    $res = bx_fetch_all($sql);
    return isset($res) ? $res[0] : null;
}

function bx_execute ($sql){

    $conn = mysqli_connect(BX_DB_HOST, BX_DB_USER, BX_DB_PASS, BX_DB_NAME);
    if (!$conn) {
        exit('链接数据库失败');

    }

    $query = mysqli_query($conn, $sql);

    if (!$query) {
        return false;
    }

    $affected_row = mysqli_affected_rows($conn);
    mysqli_close($conn);

    return $affected_row;

}