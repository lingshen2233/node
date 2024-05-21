//导入express
const express = require('express');
//创建应用对象
const app = express();
//创建路由


app.get('/home', (req, res) => {
    //req 原生http
    /*  console.log("method：" + req.method);
     console.log("url：" + req.url);
     console.log("headers：" + JSON.stringify(req.headers));
     console.log("body：" + req.body);
     console.log("HTTP Version：" + req.httpVersion); */
    //res 原生http
    res.statusCode = 300;
    res.statusMessage = '11';
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.write('响应体');
    res.end('呢容');

    // req express特有的 
    /*  console.log("path:" + req.path);//路径
     console.log("query:" + JSON.stringify(req.query));//后边参数
     console.log("ip:" + req.ip);//获取IP
     console.log(req.get('host'));
     res.end('hello express'); */
    // res express特有的 
    // res.status(300);
    // res.set('content-type', 'text/html;charset=utf-8')
    // res.send('hello')

    /* 
        res.redirect('http://baidu.com')//重定向
        res.download('./package.json')//下载相应
        res.json();//相应JSON
        res.sendFile(__dirname+'/home.html')//响应文件内容 */
})
app.get('/', (req, res) => {
    res.end('home')
})
app.post('/login', (req, res) => {
    res.end('login')
})
app.all('/test', (req, res) => {
    res.end('test')
})
app.all('*', (req, res) => {
    res.end('404 Not Found')
})
//监听端口，启动服务
app.listen(9000, () => {
    console.log('端口9000;服务启动~');
})