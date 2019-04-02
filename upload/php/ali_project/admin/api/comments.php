<?php

require_once '../../function.php';

$page = empty($_GET['page']) ? 1 : (int)$_GET['page'];

$length = 30;
$offset = ($page - 1) * $length;
$sql = sprintf('SELECT
	comments.*,
	posts.title AS posts_title
FROM comments
INNER JOIN posts ON comments.post_id = posts.id
ORDER BY comments.created DESC
LIMIT %d,%d;', $offset, $length);
$comments = bx_fetch_all($sql);
$total_count = bx_fetch_one('select count(1) as num from comments 
INNER JOIN posts ON comments.post_id = posts.id')['num'];
$total_page = (int)ceil($total_count / $length);
//因为网络之间传输的只能是字符串和二进制的东西，所以先将数据转换为字符串

$json = json_encode(array(
    'total_pages' => $total_page,
    'comments' => $comments
));

header('Content-Type: application/json');

echo $json;