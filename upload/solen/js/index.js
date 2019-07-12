//仿真的时候 谷歌新版浏览器禁止了移动端的一些默认事件，因此加这段代码组着浏览器默认事件
//等测试完成后去掉这段代码

document.addEventListener(

    'touchmove',
    function (event) {
        event.preventDefault()
    },
    {passive: false}
)



$(function () {
//    轮播图 手势切换轮播图
    var $banner = $('.sn_banner')
    var width = $banner.width()

    var $imageBox = $banner.find("ul:first-child")
    var $pointBox = $banner.find("ul:last-child")
    var $points = $pointBox.find('li')

    var animationFuc = function () {
        $imageBox.animate({transform:'translateX('+(-index*width)+'px)'},500,function () {
            if(index >= 9){
                index = 1
                $imageBox.css({transform:'translateX('+(-index*width)+'px)'})
            }else if(index <=0 ){
                index = 8;
                $imageBox.css({transform:'translateX('+(-index*width)+'px)'})
            }
            $points.removeClass('now').eq(index-1).addClass('now')
        })
    }

    var index = 1;
    var timer = setInterval(function () {
        index++
        animationFuc()

    },3000)

    $banner.on('swipeLeft',function () {
        clearInterval(timer)
        index++
        animationFuc()
        timer = setInterval(function () {
            index++
            animationFuc()

        },3000)
    })
    $banner.on('swipeRight',function () {
        clearInterval(timer)
        index--
        animationFuc()
        timer = setInterval(function () {
            index++
            animationFuc()

        },3000)
    })
})