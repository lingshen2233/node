const http = require('http');
const url = require('url');
http.createServer((request,response)=>{
    response.setHeader('content-type','text/html;charset=utf-8')
    let body='';
    request.on('data',chunk=>{
        console.log("chunk:"+chunk);
        body+=chunk
    })
    request.on('end',()=>{
        console.log("body:"+body);
    })
    response.end('结束啦')
}).listen(9000,()=>{
    console.log("端口启动~");
})
