$('#center').click(() => {
    // require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行
    // 第一个参数 声明依赖文件 第二个参数 执行依赖文件
    require.ensure(['../img/img.js'], require => require('../img/img.js'))
})
