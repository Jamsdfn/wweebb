var oChange = document.getElementsByClassName("change")[0];
var oSpan = Array.prototype.slice.call(document.getElementsByTagName("span"));
var onOff = false;
var oActive;
var oCard = document.getElementsByClassName("card")[0],
    oCancle = document.getElementsByClassName("cancle")[0]
    oUl = document.getElementsByTagName("ul")[0];
    deg=0;
oChange.onclick= function(){
    onOff = !onOff;
    oSpan.forEach(function(ele,index){
        // if(onOff){
        //     ele.className="after";

        // }else{
        //     ele.className="before";
        // }
        ele.className = onOff?"after":"before";
    })

    deg += 180;
    oChange.style.transform = "rotate("+deg+"deg)";
};

oSpan.forEach(function(ele,index){
    ele.onclick = function(){
        oCard.style.left="0";
        ele.classList.add("active"); 
        oActive = document.getElementsByClassName("active")[0];
    }
});
oCancle.onclick = function(){
    oCard.style.left="100%";
};
oUl.addEventListener("click",function(e){
    var target = e.target;
    if(target.nodeName == "LI")
    {
        
        oCard.style.left="100%";
        oActive.innerText = target.innerText;
    }
   
});


