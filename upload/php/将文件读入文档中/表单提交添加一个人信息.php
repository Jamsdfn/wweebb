<?php
//因为对表单的处理逻辑不是每一次都执行，所以一般会判断请求的方式，从而决定是否执行对数据的处理
	if($_SERVER['REQUEST_METHOD']==='POST'){
		$str = '';
		foreach ($_POST as $key => $item){
			if($key == 'webSite') {
				$str = $str . $item;
			}else{
				$str = $str . $item . '|';
		}
    }
    $str = $str . "\n";
    file_put_contents('names.txt',$str,FILE_APPEND);
	}


    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>用户登陆</title>
</head>
<body>
<!-- 一般为了便于维护，我们将表单提交给当前页面本身，由于文件重命名会导致代码修改，鲁棒性不强所以用以下方式提高鲁棒性 -->
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <table>
        <tr>
            <td>编号</td>
            <td><input type="text" name="number"></td>
        </tr>
        <tr>
            <td>姓名</td>
            <td><input type="text" name="name"></td>
        </tr>
        <tr>
            <td>年龄</td>
            <td><input type="text" name="age"></td>
        </tr>
        <tr>
            <td>邮箱</td>
            <td><input type="text" name="mailBox"></td>
        </tr>
        <tr>
            <td>网址</td>
            <td><input type="text" name="webSite"></td>
        </tr>
        <tr>
            <td><input type="submit"></td>
            <td></td>
        </tr>
    </table>
</form>


</body>
</html>
