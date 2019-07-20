$(function () {
    var keyHistory =  []
    var keyHistoryHtml = ""
    //取历史记录，并把历史记录放入数组中
    if(window.localStorage.keyHistory){
        keyHistory = JSON.parse(window.localStorage.keyHistory)
        // console.log(keyHistory)
    }
    //判断有无历史记录
    if(keyHistory.length>0) {
        //将内容放入ul里
        for (var i = 0; i < keyHistory.length; i++) {
            keyHistoryHtml += "<li><span class=\"keyHistory\">" + keyHistory[i] + "</span><span class=\"fa fa-close clear\" data-id='" + i + "'></span></li>"
        }
    }else{
        keyHistoryHtml = "<li>暂无搜索记录</li>"
    }
    $('.ct_history .history ul').html(keyHistoryHtml)
    $('.ct_search a').on('tap',function () {
        var key =$.trim($('input').val())
        if(!key){
            mui.toast('请输入关键字')
        }else{
            keyHistory.push(key)
            window.localStorage.keyHistory = JSON.stringify(keyHistory);
            location.href = './searchList.html?key='+key
        }
    })
    $('.ct_history .history').on('tap','.clear',function () {
        //数组中删除元素，并存入localstoraage中
        keyHistory.splice($(this).attr('data-id'),1)
        window.localStorage.keyHistory = JSON.stringify(keyHistory);
        $(this).parent().remove()
        if(keyHistory){
            $('.ct_history .history ul').html("<li>暂无搜索记录</li>")
        }
    })
    $('.ct_history .clearAllHistory').on('tap',function () {
        window.localStorage.clear()
        keyHistory = []
        $('.ct_history .history ul li').remove();
        $('.ct_history .history ul').html("<li>暂无搜索记录</li>")
    })
    $('.ct_history .history').on('tap','.keyHistory',function () {
        var key = $(this).html()
        location.href = './searchList.html?key='+key
    })
})

