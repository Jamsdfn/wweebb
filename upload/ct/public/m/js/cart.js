$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    })

    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto:true,
                callback: function () {
                    var that = this
                    getChartData(function (data) {
                        // console.log(data)
                        $('.mui-table-view').html(template('cart',data))
                        that.endPulldownToRefresh()
                    })
                }
            }
        }
    });
    $('.fa-refresh').on('tap',function () {
        mui('#refreshContainer').pullRefresh().pulldownLoading()
    })
    $('.mui-table-view').on('tap','.mui-icon-compose',function () {
        var id = $(this).parent().attr('data-id')
        var item = CT.getItemById(window.cartData.data,id)
        // console.log(item)
        var html = template('edit',item)
        mui.confirm(html.replace(/\n/g,''),'商品编辑',['确认','取消'],function (e) {
            if(e.index == 0){
                var size = $('.btn_size.now').html()
                var num = $('.p_number input').val()
                CT.loginAjax({
                    url:'/cart/updateCart',
                    type:'post',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    dataType: 'json',
                    success: function (data) {
                        if(data.success){
                            item.num = num
                            item.size = size
                            $('.mui-table-view').html(template('cart',window.cartData))
                        }
                    }
                })
            }else{

            }
        })

    })
    $('body').on('tap','.btn_size',function () {
        $(this).addClass('now').siblings().removeClass('now')
    })
    $('body').on('tap','.p_number span',function () {
        var $input = $(this).siblings('input')
        var currNum = $input.val()
        var maxNum = parseInt($input.attr('data-max'))
        if ($(this).hasClass('jian')) {
            if (currNum <= 1) {
                mui.toast('至少一件商品')
                return false
            }
            currNum--
        } else {
            if (currNum >= maxNum) {
                setTimeout(function () {
                    mui.toast('库存不足')
                }, 100)
                return false
            }
            currNum++
        }
        $input.val(currNum)
    })

    $('.mui-table-view').on('tap','.mui-icon-trash',function () {
        var $this = $(this)
        var id = $this.parent().attr('data-id')
        mui.confirm('您确认是否删除该商品','商品删除',['确认','取消'],function (e) {
            if(e.index == 0){
                CT.loginAjax({
                    url:'/cart/deleteCart',
                    type:'get',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function (data) {
                        if(data.success){
                            $this.parent().parent().remove()
                            setAmount()
                        }
                    }
                })
            }else{

            }
        })

    })
    $('.mui-table-view').on('change','[type=checkbox]',function () {
        // console.log('s')
        setAmount()
    })

})
var setAmount = function () {
    var $checkBox = $('[type=checkbox]:checked')
    var sum = 0;
    $checkBox.each(function (i,item) {
        var id = $(this).attr('data-id')
        var item = CT.getItemById(window.cartData.data,id)
        var num = item.num
        var price = item.price
        var amount = num * price
        sum +=amount
    })
    //两位小数
    if(Math.floor(sum * 100)%10){
        sum = Math.floor(sum * 100)/100
    }else{
        sum = Math.floor(sum * 100)/100
        sum = sum.toString()+'0'
    }

    // console.log(sum)
    // sum = Math.floor(sum * 100)/100
    $('#cartAmount').html(sum)
}

var getChartData = function (callback) {
    CT.loginAjax({
        url:'/cart/queryCartPaging',
        type:'get',
        data:{
            page:1,
            pageSize:1000,
        },
        dataType: 'json',
        success:function (data) {
            window.cartData = data
            callback && callback(data)
        }

    })
}