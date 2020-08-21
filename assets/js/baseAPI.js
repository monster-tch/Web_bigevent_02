var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (res) {
    res.url = baseURL + res.url


    if (res.url.indexOf('/my/') !== 1) {
        res.headers = {
            Authorization: localStorage.getItem('token' || '')
        }
    }
    //拦截响应
    res.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        console.log(obj);
        // console.log(1);
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // console.log(2);
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})