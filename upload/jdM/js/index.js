window.onload = function () {
    search()
    banner()
    downTime()

}
var search = function () {
//    默认固定顶部 透明背景
//    当页面滚动的时候--随着页面卷曲的高度变大，透明度变小
//    当超过一定高度后 透明度就不变
    var searchBox = document.querySelector('.jd_search_box')
    var banner = document.querySelector('.jd_banner')
    var height = banner.offsetHeight

//    监听页面滚动事件
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop
        console.log("height:" + height + "scrollTop:" + scrollTop + ".")
        var opacity = 0
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85
        } else {
            opacity = 0.85
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')'
    }
}

var banner = function () {
//    自动轮播
//    点要随着轮播改变
//    滑动效果 恢复（滑动距离不足）或切换（滑动距离足够）

//    轮播图
    var banner = document.querySelector('.jd_banner')
    //屏幕宽度
    var width = banner.offsetWidth
    //图片容器
    var imageBox = banner.querySelector('ul:first-child')
//    点容器
    var pointBox = banner.querySelector('ul:last-child')
    var points = pointBox.querySelectorAll('li')

    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s'
        imageBox.style.webkitTransition = 'all 0.2s'
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none'
        imageBox.style.webkitTransition = 'none'
    }
    var setTranslateX = function (x) {
        imageBox.style.transform = 'translateX(' + x + 'px)'
        imageBox.style.webkitTransform = 'translateX(' + x + 'px)'
    }

    var index = 1
    // console.log(imageBox)
    var timer = setInterval(function () {
        index++
        addTransition()
        setTranslateX(-index * width)

    }, 3000)

    imageBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1
            removeTransition()
            setTranslateX(-index * width)
        }
        else if (index <= 0) {
            index = 8
            removeTransition()
            setTranslateX(-index * width)
        }
        setPoint()
    })
    //轮播图索引点
    var setPoint = function () {
        for (var i = 0; i < points.length; i++) {
            var obj = points[i]
            obj.classList.remove('now')
        }
        points[index - 1].classList.add('now')
    }
//    滑动效果
    var startX = 0
    var distanceX = 0
    var isMove = false
    imageBox.addEventListener('touchstart', function (e) {
        // console.log(e)
        clearInterval(timer)
        startX = e.changedTouches[0].clientX
    })
    imageBox.addEventListener('touchmove', function (e) {
        //轮播图跟着手指滑动
        var moveX = e.changedTouches[0].clientX
        distanceX = moveX - startX
        var translateX = -index * width + distanceX
        removeTransition()
        setTranslateX(translateX)
        isMove = true
    })
    imageBox.addEventListener('touchend', function (e) {
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                addTransition()
                setTranslateX(-index * width)
            } else {
                if (distanceX > 0) {
                    index--

                } else {
                    index++
                }
                addTransition()
                setTranslateX(-index * width)
            }
            //参数重置
            startX = 0
            distanceX = 0
            isMove = false
            clearInterval(timer)
            timer = setInterval(function () {
                index++
                addTransition()
                setTranslateX(-index * width)

            }, 3000)
        }
    })
}

var downTime = function () {
    var time = 4 * 60 * 60;
    var timeBox = document.querySelector('.time').querySelectorAll('span');
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        timeBox[0].innerHTML = Math.floor(h / 10);
        timeBox[1].innerHTML = h % 10;

        timeBox[3].innerHTML = Math.floor(m / 10);
        timeBox[4].innerHTML = m % 10;

        timeBox[6].innerHTML = Math.floor(s / 10);
        timeBox[7].innerHTML = s % 10;

        if (time <= 0){
            clearInterval(timer);
        }

            }, 1000);

}
