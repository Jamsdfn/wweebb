$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    //取关键字放入输入框中
    var urlParams = CT.getParamsByUrl()
    var $input = $('input').val(urlParams.key || '');
//    根据关键字查询第一页数据
//    因为mui的下拉刷新自动执行所以这段代码重复了

//     getSearchData({
//         proName: urlParams.key,
//         page: 1,
//         pageSize: 4
//     }, function (data) {
//         // console.log(data)
//         $('.ct_product').html(template('list', data))
//     });
//    若更改关键字则重新搜索
    $('.ct_search a').on('tap', function () {
        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入关键字')
            return false
        }
        getSearchData({
            proName: key,
            page: 1,
            pageSize: 4
        }, function (data) {
            // console.log(data)
            $('.ct_product').html(template('list', data))
        })
    });
//    根据排序选项排序
    $('.ct_order a').on('tap', function () {
        //    改变商品样式
        //    如果已经选择了，则改变箭头的方向

        var $this = $(this);
        if (!$this.hasClass('now')) {
            $this.addClass('now').siblings().removeClass('now').find('span')
                .removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            if ($this.find('span').hasClass('fa-angle-down')) {
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
            } else {
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')

            }
        }
        //    获取点击的功能参数
        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入关键字')
            return false
        }
        var order = $this.attr('data-order');
        var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
        var params = {
            proName: key,
            page: 1,
            pageSize: 4
        }
        params[order] = orderVal
        getSearchData(params, function (data) {
            // console.log(data)
            $('.ct_product').html(template('list', data))
        });
    })
//    下拉刷新 重新加载页面 排序状态也要清除 上拉的没有数据的状态也要重置
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                // style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                // color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                // height: '50px',//可选,默认50px.下拉刷新控件的高度,
                // range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                // offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                // auto: true,//可选,默认false.首次加载自动上拉刷新一次
                auto: true,//页面加载时自动执行
                callback: function () {
                    var that = this;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字')
                        return false
                    }
                    //清除排序状态
                    $('.ct_order a').removeClass('now').find('span')
                        .removeClass('fa-angle-up').addClass('fa-angle-down');

                    getSearchData({
                        proName: key,
                        page: 1,
                        pageSize: 4
                    }, function (data) {
                        // console.log(data)
                        $('.ct_product').html(template('list', data))

                        that.endPulldownToRefresh()
                        that.refresh(true)
                    });
                }
            },
            //    上拉加载
            up: {
                callback: function () {
                    window.page++
                    var that = this
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字')
                        return false
                    }

                    var order = $('.ct_order a.now').attr('data-order');
                    var orderVal = $('.ct_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                    var params = {
                        proName: key,
                        page: window.page,
                        pageSize: 4
                    }
                    params[order] = orderVal
                    getSearchData(params, function (data) {
                        // console.log(data)
                        $('.ct_product').append(template('list', data))
                        //判断有无数据  如果没有数据了则在停止加载函数中加true则会显示一句话“没有更多数据了”
                        if(data.data.length){
                            that.endPullupToRefresh()
                        }else{
                            that.endPullupToRefresh(true)
                        }
                    });
                }
            }
        }
    });



})
var getSearchData = function (params, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            window.page = data.page;
            callback && callback(data)
        }
    });
}