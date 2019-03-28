$(
    function () {
        //    stellar插件使用
        //    1.给要产生视差效果的div标签中加上属性data-stellar-background-ratio="0.3"[0,1]
        //    2.css样式要加上background-attachment: fixed;
        //    3.初始化
        $.stellar({
            horizontalScrolling: false,
            responsive: true
        });
    }
)