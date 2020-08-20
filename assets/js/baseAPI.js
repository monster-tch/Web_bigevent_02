var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (res) {
    res.url = baseURL + res.url


    if (res.url.indexOf('/my/') !== 1) {
        res.headers = {
            Authorization: localStorage.getItem('token' || '')
        }
    }
})