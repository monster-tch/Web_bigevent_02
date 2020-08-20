$(function () {
    getUserInfo()
    var layer = layui.layer
    $("#btnLogout").on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: "提示" }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})
// 封装获取信息的函数
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token' || '')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功 渲染用户头像信息
            renderAvatar(res.data)
        }
    })
}
//封装渲染用户头像的函数
function randerAvatar(user) {
    var name = user.nickname || user.username
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
    // 用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr('src', user.user_pic)
        $(".user-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".user-avatar").show().html(text)
    }
}