var numBox = document.getElementsByClassName('num-box')[0];
var oSec = document.getElementsByClassName('sec')[0];
var oMin = document.getElementsByClassName('min')[0];
var oHou = document.getElementsByClassName('hou')[0];
function init(){
    var str = '';
    for(var i =1;i<=12;i++){
        str += '<li class= "num" style="transform:rotate('+30*i+'deg)"><span style="transform:rotate('+(-30)*i+'deg)">'+i+'</span></li>';
    }
    numBox.innerHTML =str;
}

init();


function time(){
    var newDate = new Date();
    var hour = newDate.getHours();
    var minute = newDate.getMinutes();
    var second = newDate.getSeconds();


    var ds = 360/60 * second;
    var dm = 360/60 * (minute + second/60);
    var dh = 360/12 * (hour + minute/60 + second/3600);
    oSec.style.transform = 'rotate('+ ds +'deg)';
    oMin.style.transform = 'rotate('+ dm +'deg)';
    oHou.style.transform = 'rotate('+ dh +'deg)';

    setTimeout(time,1000/60);//浏览器一次刷新获取一次事件
}
time();
