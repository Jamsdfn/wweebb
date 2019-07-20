$(function () {
    getFirstCategory(function (data) {
        $('.cate_left ul').html(template('firstTemplate', data))
        var categoryId = $('.cate_left ul li.now').find('a').attr('data-id');
        //数据渲染
        render(categoryId)
    })

})
//绑定事件
    $('.cate_left').on('tap','a',function (e) {
        //防止重复加载
        if($(this).parent().hasClass('now')) return false
        $('.cate_left li').removeClass('now')
        $(this).parent().addClass('now')
        //数据渲染
        render($(this).attr('data-id'))
    })

//获取一级分类
var getFirstCategory = function (callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }
    })
}
//获取二级分类
var getSecondCategory = function (params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }
    })
}

var render = function (categoryId) {
    getSecondCategory({id: categoryId}, function (data) {
        $('.cate_right ul').html(template('secondTemplate', data))
    })
}