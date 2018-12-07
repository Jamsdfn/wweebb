var oMin = document.getElementsByClassName("min")[0],
    oMax = document.getElementsByClassName("max")[0],
    oCover = document.getElementsByClassName("cover")[0],
    oLarge = document.getElementsByClassName("large")[0];


oMin.onmouseover = function(){
    oMax.style.display = "block";
    oCover.style.display = "block";

}
oMin.onmouseout = function(){
    oMax.style.display = "none";
    oCover.style.display = "none";
}
oMin.onmousemove = function(e){
    var x =e.clientX - oMin.offsetLeft - oCover.offsetWidth/2;
    var y =e.clientY - oMin.offsetTop - oCover.offsetHeight/2;
    var maxX=oMin.offsetWidth- oCover.offsetWidth;
    var maxY=oMin.offsetHeight-oCover.offsetHeight;
    if(x<=0){
        x=0;
    }else if(x>=maxX)
    {
        x = maxX;
    }

    if(y<=0){
        y=0;
    }else if(y>=maxX)
    {
        y = maxX;
    }
    oCover.style.left = x + "px";
    oCover.style.top = y + "px";
    
    // x/maxX = L/(oLarge.offsetWidth-oMax.offsetWidth);
    oLarge.style.left = x/maxX * (oMax.offsetWidth-oLarge.offsetWidth) + "px";
    oLarge.style.top = y/maxY * (oMax.offsetHeight-oLarge.offsetHeight) + "px";
}