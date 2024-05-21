const http = require('http');
const server = http.createServer((request, response) => {
    response.end('hello HTTP Server   1')
})
server.listen(9000, () => {
    console.log('服务启动~');
})