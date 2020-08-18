var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (res) {
    res.url = baseURL + res.url
})