var oList = document.getElementsByClassName("list")[0]
    oPrev = document.getElementById("prev"),
    oNext = document.getElementById("next"),
    oDots = document.getElementsByClassName("dots")[0],
    oLi = oDots.getElementsByTagName('li');
var timer1 =  null,
    flag = true,
    index = 0;

function moveList(dis) {//dis 每一大步移动的距离
    var time = 500,//每一大步挪动的时间
        eachTime = 20,//每一小步需要的时间
        eachDis = dis/(time/eachTime),//每一小布移动的值，带正负
        newLeft = oList.offsetLeft + dis;
        flag = false;
    
        timer1 = setInterval(function(){
            if(dis < 0 && newLeft <= oList.offsetLeft || dis > 0 && newLeft>= oList.offsetLeft){
                oList.style.left = oList.offsetLeft + eachDis + 'px';

            }else{
                flag = true;
                clearInterval(timer1);
                oList.style.left = newLeft + "px";
                if(oList.offsetLeft == -3120){
                    oList.style.left = "-520px";
                }
                if(oList.offsetLeft == 0){
                    oList.style.left="-2600px";
                }
            }
    },eachTime);
}

oPrev.onclick = function(){
    if(!flag){
        return;
    }
    moveList(520);
    if(index == 0)
    {
        index = 4;
    }else{
        index--;
    }
    dotsStyle();
}
oNext.onclick = function(){
    if(!flag){
        return;
    }
    moveList(-520);
    if(index == 4)
    {
        index = 0;
    }else{
        index++;
    }
    dotsStyle();
}
for(var i = 0;i<oLi.length;i++){
    (function (j){
            oLi[j].onclick = function(){
                moveList((index - j)*520 );
                index = j;
                dotsStyle();
        }

    })(i);
}

function dotsStyle(){
    for(var i =0; i < oLi.length ; i++)
    {
        if(oLi[i].className == "active")
        {
            oLi[i].className = "";
            break;
        }
    }
    oLi[index].className = "active";
}


