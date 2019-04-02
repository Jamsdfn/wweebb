<?php

require_once '../../function.php';
if (empty($_GET['id'])) {
    exit('确少必要参数');
}
//为了防止sql注入 所以把类型改一下,或者用 is_numeric()函数判断
//delete from categories where id = 1 or 1 = 1;
$id = $_GET['id'];

$row = bx_execute("DELETE FROM comments WHERE id in ({$id});");

header('Content-Type: application/json');

echo json_encode($row > 0);