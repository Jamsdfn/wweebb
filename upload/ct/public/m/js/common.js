window.CT = {}


CT.loginUrl = '/m/user/login.html'
CT.cartUrl = '/m/user/cart.html'
CT.userUrl = '/m/user/index.html'


CT.getParamsByUrl = function () {
    //用对象形式存储弟子兰信息
    var params = {};
    var search = location.search;
    if(search){
        search = search.replace('?','');
        //如果用多个键值对
        var arr = search.split('&');
        arr.forEach(function (item,i) {
            var itemArr =item.split('=');
            params[itemArr[0]] = itemArr[1]
        })
    }
    // console.log(params)
    return params
}

CT.serialize2object = function (serializeStr) {
    var obj = {}
    if(serializeStr){
        var arr = serializeStr.split('&');
        arr.forEach(function (item,i) {
            var itemArr = item.split('=');
            obj[itemArr[0]] = itemArr[1]
        })
    }
    return obj
}

CT.getItemById = function(arr,id){
    var target = null
    arr.forEach(function (item,i) {
        if(item.id == id){
            target = item
        }

    })
    return target
}


CT.loginAjax = function (params) {
    $.ajax({
        url: params.url || '#',
        type: params.type || "get",
        data: params.data || '',
        dataType: params.dataType || 'json',
        success:function (data) {
        //    未登录的处理
            if(data.error == 400){
                //跳去登录也， 登录成功后再跳回来
                location.href = CT.loginUrl + '?returnUrl=' + location.href
                return false
            }else{
                params.success && params.success(data)
            }
        },
        error:function () {
            mui.toast('服务器繁忙')
        }
    })
}