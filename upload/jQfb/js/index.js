var Obird = $("#dbird");
var pos = Obird.offset();
var birdSize = {
    width: Obird.width(),
    height: Obird.height()
}
var speed = 10;
var keyrecord=39;
$(document).keydown(function (e) {
    var key = e.keyCode;
    if(key != keyrecord){
        Obird.removeClass().addClass("dir_"+key);
    }
    keyrecord = key;
    switch (key) {
        case 37:
            pos.left -= speed;
            if(pos.left <= -birdSize.width){
                pos.left = $(window).width();
            }
            break;
        case 38:
            pos.top -= speed;
            if(pos.top <= -birdSize.height){
                pos.top = $(window).height();
            }
            break;
        case 39:
            pos.left += speed; 
            if(pos.left >= $(window).width()){
                pos.left = -birdSize.width;
            }
            break;
        case 40:
            pos.top += speed;
            if(pos.top >= $(window).height()){
                pos.top = -birdSize.height;
            }
            break;
    }
    
    Obird.offset(pos);

});