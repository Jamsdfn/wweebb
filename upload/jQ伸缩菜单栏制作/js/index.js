$(".uitem").hide();
$(".litem>a").mouseover(function(){
    $(this).next().stop(true).slideDown();
});
$(".litem>a").click(function(){
    $(this).next().stop(true).slideToggle();
});