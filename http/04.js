const http = require('http');
const url = require('url');
http.createServer((a,b)=>{
   let c= url.parse(a.url);
        console.log(c);
}).listen(9000,()=>{
    console.log("端口启动~");
})