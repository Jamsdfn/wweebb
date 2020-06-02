$(function ($) {
    //app中手滑控制轮播图
    touch = function () {
        $carousels = $(".carousel");//effect是轮播图id
        var startX, endX;
        // 在滑动的一定范围内，才切换图片
        var offset = 50;
        // 注册滑动事件
        $carousels.on('touchstart', function (e) {
            // 手指触摸开始时记录一下手指所在的坐标x
            startX = e.originalEvent.touches[0].clientX;

        });
        $carousels.on('touchmove', function (e) {
            // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
            endX = e.originalEvent.touches[0].clientX;
        });
        $carousels.on('touchend', function (e) {
            //console.log(endX);
            //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
            //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
            var distance = Math.abs(startX - endX);
            if (distance > offset) {
                //说明有方向的变化
                //根据获得的方向 判断是上一张还是下一张出现
                $(this).carousel(startX > endX ? 'next' : 'prev');
            }
        })
    }
    navClick = function () {
        $('.myNav-text').on('click', function () {
            $target = '.section' + $(this).attr('data-my')
            $($target).addClass('active').siblings().removeClass('active')
            return false
        })
    }
//====================================================================
    $('.myNav-text').on('click', navClick())
    touch()



//二级关联select
    var grade = new Array(9);
    grade[0] = new Array("语文","数学","英语");
    grade[1] = new Array("语文","数学","英语");
    grade[2] = new Array("语文","数学","英语");
    grade[3] = new Array("语文","数学","英语","生物","地理");
    grade[4] = new Array("语文","数学","英语","生物","地理","物理");
    grade[5] = new Array("语文","数学","英语","物理","化学");
    grade[6] = new Array("语文","数学","英语","物理","化学","生物");
    grade[7] = new Array("语文","数学","英语","物理","化学","生物");
    grade[8] = new Array("语文","数学","英语","物理","化学","生物");

    $(".section4 .form .grade .container").change(function(){
        $(".section4 .form .subject .container").empty();
        var val = this.value
        // console.log(val)
        $.each(grade,function(i,n){
            // console.log(i+":"+n);
            if(val==i){
                $.each(grade[i], function(j,m) {
                    // console.log(m)
                    var textNode = document.createTextNode(m);
                    var opEle = document.createElement("option");
                    $(opEle).append(textNode);
                    $(opEle).appendTo($(".section4 .form .subject .container")).attr('value',m);
                });
            }
        });

    });
//app表单检验
    $('.section4 .sub').on('click', function () {
        var flag1 = false
        var flag2 = false
        var flag3 = false
        var flag4 = false
        var flag5 = false
        var $phone = $('.section4 .form .phone-input')
        var $name = $('.section4 .form .name-input')
        var $grade = $('.section4 .form .grade .container')
        var $subject = $('.section4 .form .subject .container')
        var $location = $('.section4 .form .location .container')
        var phone = $phone.val()
        var name = $name.val()
        var grade = $grade.val()
        var subject = $subject.val()
        var location = $location.val()
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myreg.test(phone)) {
            $('.section4 .form .phone').addClass('has-error')
            $phone.attr('placeholder', '请输入正确有效电话')
            console.log(flag1)

        } else flag1 = true
        if (name == '' || name == null) {
            $('.section4 .form .name').addClass('has-error')
            console.log(flag2)
        } else flag2 = true
        if (grade == -1 || grade == null) {
            $('.section4 .form .grade label').css('color','red')
            $grade.val('-1')
            console.log(flag3)
        } else flag3 = true
        if (subject == -1 || subject == null) {
            $('.section4 .form .subject label').css('color','red')
            $subject.val('-1')
            console.log(flag4)
        } else flag4 = true
        if (location == -1 || location == null) {
            $('.section4 .form .location label').css('color','red')
            $location.val('-1')
            console.log(flag5)
        } else flag5 = true
        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true) {
            $('.section4 form').submit()
            alert('报名成功')
        }

    })
    //app第二页导航注册
    $('.section2 nav .grade1').on('click',function () {
        $('#grade1').addClass('g-active').siblings().removeClass('g-active')
    })
    $('.section2 nav .grade2').on('click',function () {
        $('#grade2').addClass('g-active').siblings().removeClass('g-active')
    })
    $('.section2 nav .grade3').on('click',function () {
        $('#grade3').addClass('g-active').siblings().removeClass('g-active')
    })
    $('.section2 nav .grade4').on('click',function () {
        $('#grade4').addClass('g-active').siblings().removeClass('g-active')
    })
    $('.section2 nav .grade5').on('click',function () {
        $('#grade5').addClass('g-active').siblings().removeClass('g-active')
    })
    $('.section2 nav .grade6').on('click',function () {
        $('#grade6').addClass('g-active').siblings().removeClass('g-active')
    })

})

var myChart = echarts.init(document.getElementById('echart-container'))

var eChartOption = {
    title: {
        text: '各类培训机构对比'
    },
    tooltip: {
        trigger:'axis',
        axisPointer:{
            type:'none'
        },
        formatter:function (params) {
            return params[0].name+":&nbsp;"+params[0].data+"/课时"
        }
    },
    xAxis: {
        data: ['其他机构1对1','其他机构班课','韵文1对1']
    },
    yAxis: {max:250,
        name:'费用',
        nameTextStyle:{
            fontSize:14,
            fontWeight:800,
        },
        axisLabel:{
            show:false
        }
    },
    series: [{
        type: 'bar',
        data: [200,100,70],
        itemStyle: {
            normal: {
                color: function(params) {
                    var colorList = [
                        '#28bfdc','#ffc40e','#fa5831'
                    ];
                    return colorList[params.dataIndex]
                },
                //以下为是否显示，显示位置和显示格式的设置了
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}'
                }
            }
        },
    }],
};


//二级关联select
var grade = new Array(9);
grade[0] = new Array("语文","数学","英语");
grade[1] = new Array("语文","数学","英语");
grade[2] = new Array("语文","数学","英语");
grade[3] = new Array("语文","数学","英语","生物","地理");
grade[4] = new Array("语文","数学","英语","生物","地理","物理");
grade[5] = new Array("语文","数学","英语","物理","化学");
grade[6] = new Array("语文","数学","英语","物理","化学","生物");
grade[7] = new Array("语文","数学","英语","物理","化学","生物");
grade[8] = new Array("语文","数学","英语","物理","化学","生物");

$(".pc .modal .form .grade .container").change(function(){
    $(".pc .modal .form .subject .container").empty();
    var val = this.value
    // console.log(val)
    $.each(grade,function(i,n){
        // console.log(i+":"+n);
        if(val==i){
            $.each(grade[i], function(j,m) {
                // console.log(m)
                var textNode = document.createTextNode(m);
                var opEle = document.createElement("option");
                $(opEle).append(textNode);
                $(opEle).appendTo($(".pc .modal .form .subject .container")).attr('value',m);
            });
        }
    });

});
//表单验证
$('.pc .modal .sub').on('click', function () {
    var flag1 = false
    var flag2 = false
    var flag3 = false
    var flag4 = false
    var flag5 = false
    var $phone = $('.pc .modal .form .phone-input')
    var $name = $('.pc .modal .form .name-input')
    var $grade = $('.pc .modal .form .grade .container')
    var $subject = $('.pc .modal .form .subject .container')
    var $location = $('.pc .modal .form .location .container')
    var phone = $phone.val()
    var name = $name.val()
    var grade = $grade.val()
    var subject = $subject.val()
    var location = $location.val()
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
        $('.pc .modal .form .phone').addClass('has-error')
        $phone.attr('placeholder', '请输入正确有效电话')
        console.log(flag1)

    } else flag1 = true
    if (name == '' || name == null) {
        $('.pc .modal .form .name').addClass('has-error')
        console.log(flag2)
    } else flag2 = true
    if (grade == -1 || grade == null) {
        $('.pc .modal .form .grade label').css('color','red')
        $grade.val('-1')
        console.log(flag3)
    } else flag3 = true
    if (subject == -1 || subject == null) {
        $('.pc .modal .form .subject label').css('color','red')
        $subject.val('-1')
        console.log(flag4)
    } else flag4 = true
    if (location == -1 || location == null) {
        $('.pc .modal .form .location label').css('color','red')
        $location.val('-1')
        console.log(flag5)
    } else flag5 = true
    if (flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true) {
        $('.pc .modal form').submit()
        alert('报名成功')
    }

})

