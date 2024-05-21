const http = require('http');
http.createServer((request,response)=>{
    console.log("请求方式："+request.method);
    console.log("URL:"+request.url);
    console.log("http协议版本号："+request.httpVersion);
    console.log("headers:"+JSON.stringify(request.headers));
    response.setHeader('content-type','text/html;charset=utf-8')
    console.log("headers:"+JSON.stringify(request.headers));
    response.end('你好')
}).listen(9000,()=>{
    console.log('启动~');
})
