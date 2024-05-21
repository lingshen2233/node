const http = require('http');
const server=http.createServer((request,response)=>{
    response.setHeader("content-type","text/json;charset=utf-8")
    let {method}=request
    console.log(method);
    let {pathname}=new URL(request.url,"http://127.0.0.1")
    if(method==='GET' && pathname==='/login'){
        response.end("登录")
    }else if(method='GET' && pathname==='/reg'){
        response.end("注册")
    }else{
    response.end("Not Fond")
    }
})
server.listen(9000,()=>{
    console.log("9000端口启动~");
})