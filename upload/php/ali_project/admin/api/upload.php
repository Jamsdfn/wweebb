<?php
if(empty($_FILES['avatar'])){
    exit('必须上传文件');

}

$avatar = $_FILES['avatar'];

if($avatar['error'] !== UPLOAD_ERR_OK){
    exit('上传失败');

}
//校验类型大小



//移动文件到网站范围之内
//获取拓展名
$ext = pathinfo($avatar['name'], PATHINFO_EXTENSION);
$target = '../../static/uploads/img-' . uniqid() . '.' . $ext;
if(!move_uploaded_file($avatar['tmp_name'],$target)){
    exit('上传失败');
}
//返回路径 去掉../.. 从而到网站根目录
echo substr($target,5);

