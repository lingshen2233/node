const http = require('http');
http.createServer((a,b)=>{
  let url=  new URL(a.url,"http://127.0.0.1");
        console.log(url);
        console.log("url.searchParams::"+url.searchParams.get('se'));
}).listen(9000,()=>{
    console.log("端口启动~");
})