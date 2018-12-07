var minSize = 5;
var maxSize = 50;
var newOn = 500;
var flakeColor = "#fff";
var flake = $("<div></div>").css({"position":"absolute",
                                    "top":"-50px"}).html("❄");
var DHeight = $(document).height();
var DWidth = $(document).width();
setInterval(function(){
    var starLeft = Math.random()*DWidth;
    var startOpcity = 0.6 + Math.random()*0.2;
    var endTop = DHeight;
    var endLeft = Math.random()*DWidth;
    var fallTime = 6000 + Math.random()*2000;
    var sizeFlack= minSize + Math.random()*maxSize;
    flake.clone().appendTo("body").css({
        "left" : starLeft,
        "opacity" : startOpcity,
        "font-size" : sizeFlack,
        "color" : flakeColor
    }).animate({
        "top":endTop,
        "left":endLeft,
        "opacity" : 0.3
    },fallTime,function(){
        $(this).remove();
    });
},newOn);

