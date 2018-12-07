var oBtn = document.getElementsByClassName('btn')[0],
    oInput = document.getElementsByClassName('input')[0],
    oMain = document.getElementsByClassName('main')[0],
    oMainW = oMain.offsetWidth;

oBtn.onclick = send;

oInput.onkeydown = function (e) {
    if(e.keyCode == 13) {
        send();
    }
}
function send() {
    if(oInput.value.length <= 0 || (/^\s+$/).test(oInput.value)) {
        alert('内容不能为空');
        return;
    }
    // oInput.value
    createSpan(oInput.value);
    oInput.value = '';
}

function createSpan(text) {

    var oSpan = document.createElement('span');
    oSpan.innerText = text;
    oSpan.style.left = oMainW + 'px';
    oMain.appendChild(oSpan);

    // timing color top fontSize
    spanStyle(oSpan);

}
function spanStyle(dom) {
    dom.style.top = random(0, 150) + 'px';
    dom.style.color = 'rgb('+random(0, 255)+', '+random(0, 255)+', '+random(0, 255)+')'
    dom.style.fontSize = random(12, 30) + 'px';
    var domW = dom.offsetWidth;

    var speed = [0, 1, 2][random(0,2)];

    dom.timer = setInterval(function () {
        switch (speed) {
            case 0:
                dom.style.left = dom.offsetLeft - 2 + 'px';
                break;
            case 1:
                dom.style.left = dom.offsetLeft - 4 + 'px';
                break;
            case 2:
                dom.style.left = dom.offsetLeft - 6 + 'px';  
        }
        if(dom.offsetLeft <= -domW) {
            clearInterval(dom.timer);
            oMain.removeChild(dom);
        }
    }, 20)
}
function random(start, end) {
    return Math.floor(Math.random() * (end + 1 - start) + start);
}


