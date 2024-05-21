const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const moment = require('moment');
const bodyParser = require('body-parser');//获取请求体数据
//静态资源响应
app.use(express.static(__dirname + "/public"))


function recordMiddleware(req, res, next) {
    res.setHeader('content-type', 'text/html;charset=utf-8')

    let { ip, url } = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'),
        `时间 ：${moment().format('YYYY MM DD  hh:mm:ss')}  url:${url}  ip:${ip}\r\n`)
    next()
}
const detectionParameterMiddleware = (req, res, next) => {
    if (req.query.code == '521') {
        next()
    } else {
        res.send("code err")
    }
}

app.use(recordMiddleware)

app.get('/home', detectionParameterMiddleware, (req, res) => {
    res.send('前台首页')
})
app.get('/admin', detectionParameterMiddleware, (req, res) => {
    res.send('后台首页')
})
app.get('*', (req, res) => {

    res.send("<h1>404 Not Found</h1>")
})





app.listen(9000, () => {
    console.log('9000端口启动~');
})