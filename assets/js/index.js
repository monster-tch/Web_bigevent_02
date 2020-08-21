$(function () {
    getUserInfo()
    var layer = layui.layer
    $("#btnLogout").on('click', function (e) {
        e.preventDefault()
        // console.log(1);
        layer.confirm('是否确认提示框？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            // console.log(2);
            localStorage.removeItem('token');
            // 页面跳转
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
//封装获取用户信息的函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            randerAvatar(res.data)
        }
    })
}

//封装用户头像渲染函数
function randerAvatar(user) {
    //用户昵称
    var name = user.nickname || user.username
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
    //用户头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr('src', user.user_pic)
        $(".user-avatar").hide()
    } else {
        //没头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".user-avatar").show().html(text)
    }
}
