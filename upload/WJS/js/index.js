$(function ($) {
    // render()
    $(window).on('resize', function () {
        render()
    //    trigger() 通过js主动触发某个事件,在此处也可以不用trigger(),直接解除最开头的注释进行初始化
    }).trigger('resize')

//    轮播图手势切换
    var startX = 0
    var distanceX = 0
    var isMove = false
    $('.wjs_banner').on('touchstart',function (e) {
        // console.log(e)
        startX = e.originalEvent.touches[0].clientX
    }).on('touchmove',function (e) {
        var moveX = e.originalEvent.touches[0].clientX
        distanceX = moveX - startX
        isMove = true
    }).on('touchend',function (e) {
        if(isMove && Math.abs(distanceX) > 50){
            if(distanceX < 0){
                $('.carousel').carousel('next')
            }else {
                $('.carousel').carousel('prev')
            }
        }
        startX = 0
        distanceX = 0
        isMove = false
    })
    initMobileTab()

    $('[data-toggle="tooltip"]').tooltip()

})
//为了防止多次加载 data.json 对data.json数据进行缓存,而不是直接在ajax中进行逻辑处理
var getData = function (callback) {
    if (window.data) {
        callback && callback(window.data)
    } else {
        $.ajax({
            type: 'get',
            url: './js/data.json',
            //强制转换后台返回的数据为json对象,若不成功程序会报错,不会执行success会执行error回调
            dataType: 'json',
            data: '',
            success: function (data) {
                window.data = data
                callback && callback(window.data)
            }
        })
    }

}

var render = function () {
    getData(function (data) {
        var isMobile = $(window).width() < 768
        var pointHtml = template('pointTemplate', {list: data});
        var imageHtml = template('imageTemplate', {list: data, isM: isMobile});
        // console.log(pointHtml)
        // console.log(imageHtml)
        $('.carousel-indicators').html(pointHtml)
        $('.carousel-inner').html(imageHtml)
    })
}
var initMobileTab = function () {
//    解决换行
    var $navTabs = $('.wjs_product .nav-tabs')
    var width = 0
    $navTabs.find('li').each(function (i,item) {
        var $currLi = $(item)
        // console.log($currLi)
        var liWidth = $currLi.outerWidth(true)
        width += liWidth
    })
    // console.log(width)
    $navTabs.width(width)
//    修改结构使其成为区域滑动结构 css
//    自己实现或使用iscroll
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    })
}