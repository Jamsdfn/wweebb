
//当ajax发送请求 显示进度条
//ajax 发送中 没响应过来 显示进度条加载
//当ajax 完成了 进度条加载完
NProgress.configure({
    showSpinner: false
})
$(window).ajaxStart(function () {
    NProgress.start()
})
$(window).ajaxComplete(function () {
    NProgress.done()
})
//侧边栏的显示和隐藏 二级菜单的显示隐藏
$('[data-menu]').on('click',function () {
    $('.ad_aside').toggle()
    $('.ad_section').toggleClass('menu')
})
$('.menu [href="javascript:;"]').on('click',function () {
    $(this).siblings('.child').slideToggle()
})
//退出登录功能
//
 var  modalHtml = "<div class=\"modal fade\" id=\"logoutModal\">\n" +
     "  <div class=\"modal-dialog modal-sm\">\n" +
     "    <div class=\"modal-content\">\n" +
     "      <div class=\"modal-header\">\n" +
     "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span>&times;</span></button>\n" +
     "        <h4 class=\"modal-title\">温馨提示</h4>\n" +
     "      </div>\n" +
     "      <div class=\"modal-body\">\n" +
     "        <p class=\"text-danger\"><span class=\"glyphicon glyphicon-info-sign\"></span>您确认要退出后台系统吗</p>\n" +
     "      </div>\n" +
     "      <div class=\"modal-footer\">\n" +
     "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>\n" +
     "        <button type=\"button\" class=\"btn btn-primary\">确定</button>\n" +
     "      </div>\n" +
     "    </div>\n" +
     "  </div>\n" +
     "</div>"
$('body').append(modalHtml)
$('[data-logout]').on('click',function () {
    var $logoutModal = $('#logoutModal')
    $logoutModal.modal('show').find('.btn-primary').on('click',function () {
        //ajax 退出
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            dataType:'json',
            success:function (data) {
                if(data.success){
                    $logoutModal.modal('hide')
                //    跳转登录页
                    location.href = '/admin/login.html'
                }
            }
        })

    })

})


