const express = require('express')
const adminRouter = require('./routers/adminRouter');
const homeRouter = require('./routers/homeRouter');
const app = express()
const port = 9000

app.use(adminRouter)
app.use(homeRouter)
app.use((req, res, next) => {
    let referer = req.get('referer');
    if (referer) {
        let url = new URL(referer);
        console.log("url:::" + url.toString());
        let hostname = url.hostname;
        if (hostname !== '127.0.0.1') {
            res.status(404).send('<h1>404 Not Found</h1>')
            return;
        }
    }
    next()

})
//静态资源中间件
app.use(express.static(__dirname + '/public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))