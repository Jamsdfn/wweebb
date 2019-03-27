<?php
/**
 * Created by PhpStorm.
 * User: 24192
 * Date: 2019/2/1
 * Time: 10:56
 */


$data = [
    [
        'id' => 1,
        'name' => '张三',
        'age' => 18
    ],
    [
        'id' => 2,
        'name' => '李四',
        'age' => 19
    ],
    [
        'id' => 3,
        'name' => '王五',
        'age' => 20
    ],
    [
        'id' => 4,
        'name' => '赵六',
        'age' => 21
    ]
];


if (empty($_GET['id'])){
    //没ID获取全部
    //因为HTTP中约定报文的内容就是字符串，而我们需要传递给客户端的信息是有结构的数据
    //这种情况下我们一般采用JSON 作为数据格式
    $json = json_encode($data);
    echo $json;
}else{
    foreach ($data as $item){
        if($item['id'] != $_GET['id']) continue;
        $json = json_encode($item);
        echo  $json;
    }
}
