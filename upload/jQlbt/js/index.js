//渐变效果轮播

var i = 0;
var timer;


$(function () {
    $(".ig").eq(i).show().siblings().hide();
    time();    
});


$(".tab").hover(function(){
    i=$(this).index();
    show();
    clearInterval(timer);
},function(){
    time();
});


$(".btn1").click(function () {
    clearInterval(timer);
    if (i == 0) {
        i = 5;
    }
    i--;
    show();
    time();
});


$(".btn2").click(function () {
    clearInterval(timer);
    if (i == 4) {
        i = -1;
    }
    i++;
    show();
    time();
});


function show(){
    $(".tab").eq(i).addClass("bg").siblings().removeClass("bg");
    $(".ig").eq(i).fadeIn(1000).siblings().fadeOut(1000);

}


function time(){
    
    timer=setInterval(function () {
        i++;
        if (i == 5) {
            i = 0;
        }
        show();
    }, 4000);

}