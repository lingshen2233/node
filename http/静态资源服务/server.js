const http = require('http')
const fs = require('fs')
const path = require('path')
//声明一个变量
let mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}
//创建服务对象
const server = http.createServer((request, response) => {
    response.setHeader("content-type", "text/json;charset=utf-8")
    let { pathname } = new URL(request.url, 'http://127.0.0.1');
    let root = __dirname + '/../'
    let filePath = root + pathname;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.setHeader('content-type', 'text/html;charset=utf-8')
            //判断错误代号
            switch (err.code) {
                case "ENOENT":
                    response.statusCode = 404;
                    response.end("<h1>404 NOT FOUND</h1>")
            }
            response.statusCode = 500;
            response.end('文件读取失败')
            return;
        }
        response.end(data);
        //获得后缀
        let ext = path.extname(filePath).slice(1);
        let type = mimes[ext];
        //解决乱码问题
        if (type) { response.setHeader('content-type', type + ';charset=utf-8') }
        else {
            response.setHeader('content-type', 'application/octet-stream')
        }
        console.log(ext);
    })
});
server.listen(9000, () => {
    console.log("9000端口启动~");
})