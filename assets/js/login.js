$(function () {
    $("#link-reg").on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $("#link-login").on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //自定义验证表单
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须是6-16位,且不能有空格"
        ],
        //确认密码规则
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return "两次输入密码不一致"
            }
        }
    })
    // 注册功能
    var layer = layui.layer
    $("#form-reg").on('submit', function (e) {
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name = username]').val(),
                password: $('.reg-box [name = password]').val()
            },
            success: function (res) {
                if (res.msg != 0) {
                    alert('注册成功')
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                $("#link-login").click()
                $("#form-reg")[0].reset()
            }
        })
    })
    //登录功能
    $("#form-login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})