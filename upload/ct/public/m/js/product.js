$(function () {
    var id = CT.getParamsByUrl().productId
    getProductData(id, function (data) {
        //      清除加载状态
        $('.loading').remove()
        $('.mui-scroll').html(template('detail', data))
        mui('.mui-slider').slider({
            interval: 200
        })
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        })
        $('.btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now')
        })
        $('.p_number span').on('tap', function () {
            // console.log($(this))
            var $input = $(this).siblings('input')
            var currNum = $input.val()
            //因为取出的是字符串，直接比较的话会只取字符串的第一个数字，所以
            //强转为数字
            var maxNum = parseInt($input.attr('data-max'))
            // console.log(maxNum)
            if ($(this).hasClass('jian')) {
                if (currNum <= 0) {
                    // mui.toast('数量不能小于零')
                    return false
                }
                currNum--
            } else {
                if (currNum >= maxNum) {
                    //因为加号位置刚好与提示框重合，所以点加的时候也会把消息框点没
                    //移动端会把这种现象称为"击穿",tap事件特有的
                    //所以设一个延时，防止击穿现象
                    setTimeout(function () {
                        mui.toast('库存不足')
                    }, 100)
                    return false
                }
                currNum++
            }
            $input.val(currNum)
        })
        //    加入购物车
        $('.btn_addCart').on('tap', function () {
            //    数据校验
            var $changeBtn = $('.btn_size.now')
            if (!$changeBtn.length) {
                mui.toast('请选择尺码')
                return false
            }
            var num = $('.p_number input').val()
            if (num <= 0) {
                mui.toast('至少选择一件商品')
                return false
            }
            CT.loginAjax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: id,
                    num: num,
                    size: $changeBtn.html()
                },
                dataType: 'json',
                success: function (data) {
                    if(data.success){
                       // 内容，标题，按钮，点击后的事件
                       mui.confirm('商品添加成功，去购物车看看？','温馨提示',['是','否'],function (e) {
                           if(e.index == 0){
                               location.href = CT.cartUrl;
                           }else{

                           }
                       })
                    }
                }
            })
        })
    })
})

var getProductData = function (productId, callback) {
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data)
            callback && callback(data)
        }
    })
}