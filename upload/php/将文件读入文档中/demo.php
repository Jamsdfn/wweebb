<?php
//读取文件内容
$contents = file_get_contents('./names.txt');
//拆分内容
$lines = explode("\n", $contents);
//加内容到data数组中
$data = array();
foreach ($lines as $item) {
    //如果为空字符串则舍去
    if (!$item) continue;
    $data[] = explode('|', $item);
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
<h1>全部人员信息表</h1>
<table>
    <thead>
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>邮箱</th>
        <th>网址</th>
    </tr>
    </thead>
    <!--                判断这里的数据是不是一个网址 是则用a标签-->
    <tbody>
    <?php foreach ($data as $line): ?>
        <tr>
            <?php foreach ($line as $key => $col): ?>
                <?php $col = trim($col) ?>
                <?php if ($key == 0): ?>
                    <?php if ($col < 10): ?>
                        <td><?php echo str_repeat('0', 2), $col ?></td>
                    <?php elseif ($col >= 10 && $col < 100): ?>
                        <td><?php echo '0', $col ?></td>
                    <?php else: ?>
                        <td><?php echo $col ?></td>
                    <?php endif ?>
                <?php elseif (strpos($col, 'http://') === 0): ?>
                    <td><a href="<?php echo strtolower($col); ?>"><?php echo strtolower($col); ?></a></td>
                <?php else: ?>
                    <td><?php echo $col; ?></td>
                <?php endif ?>
            <?php endforeach ?>
        </tr>
    <?php endforeach ?>
    </tbody>
</table>
</body>
</html>
