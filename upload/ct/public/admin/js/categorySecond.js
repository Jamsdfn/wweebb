$(function () {
    window.page = 1;

    //模板引擎的内部无法访问外部变量的解决方案
    //辅助方法，通过template.helper（'name',function）定义一个可以在内部用的函数，这样可以在内部使用jquery方法
    template.helper('getJquery',function () {
        return jQuery
    })

    var render = function () {
        getCateSecondDate(function (data) {
            $('tbody').html(template('list',data))
            $('.pagination').bootstrapPaginator({
                //bootstrap 版本
                bootstrapMajorVersion:3,
                //分页按钮大小
                size:'small',
                //当前页
                currentPage: data.page,
                //总页数
                totalPages: Math.ceil(data.total/data.size),
                //显示页码的按钮数
                numberOfPages:3,
                onPageClicked:function (event,originalEvent,type,page) {
                //    event jquery事件对象
                //    originalEvent 原生dom对象
                //    type 按钮类型
                //    按钮对应的页码
                    window.page = page
                    render()
                }
            })
        })
    }
    render()
    getCateFirstDate(function (data) {
        $('.dropdown-menu').html(template('dropDown',data)).on('click','a',function () {
            var $this = $(this)
            var categoryName = $this.html()
            $('.categoryName').html(categoryName)
            $('[name=categoryId]').val($this.attr('data-id'))
            $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
        })
    })
    initFileUpload()
    $('#form').bootstrapValidator({
        //默认隐藏input不会校验，加上下面的参数才会校验隐藏元素
        excluded:['hidden'],
        //    校验的不同状态下显示的图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        //需要校验的表单元素 同过name
        fields:{
            //key 对应表单元素的name
            categoryId:{
                //    校验规则 （一个或者多个）
                validators:{
                    notEmpty:{
                        //提示信息
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty:{
                        //提示信息
                        message:'请输入二级分类名称'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty:{
                        //提示信息
                        message:'请上传图片'
                    }
                }
            }
        }
    }).on('success.form.bv',function (e) {
        //校验成功时候触发
        //防止form的默认跳转事件 因为要用ajax提交
        e.preventDefault()
        // alert('ok')
        //    后台校验用户名和密码
        //    e.target 为form的dom对象
        var $form = $(e.target)
        // alert(0)
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:$form.serialize(),
            dataType: 'json',
            success:function (data) {
                if(data.success){
                    window.page = 1;
                    render()
                    $('#save').modal('hide')
                }
            }
        })

    })
})

var getCateSecondDate = function (callback) {
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:window.page || 1,
            pageSize:3
        },
        dataType:'json',
        success:function (data) {
            callback && callback(data)
        }
    })
}

var getCateFirstDate = function (callback) {
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize: 1000
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }
    })
}

var initFileUpload = function () {
//    初始化上传插件
    $('[name=pic1]').fileupload({
        url:'/category/addSecondCategoryPic',
        dataType:'json',
        done: function (e, data) {
            $('#uploadImage').attr('src',data.result.picAddr)
            $('[name="brandLogo"]').val(data.result.picAddr)
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    })
}