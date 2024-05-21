const express = require('express');
const app = express()
app.get('/:id.html', (req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('商品详情  商品id：' + req.params.id)
})
app.listen(9000, () => {
    console.log('端口9000，启动~');
})