$(".pic ul li").mouseover(function(){
    $(this).stop(true).animate({width:"520px"},750).siblings().stop(true).animate({width:"90px"},750);
});