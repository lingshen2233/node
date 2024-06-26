const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express()
const port = 3000
app.use(session({
    name: 'sid', //设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
    resave: true, //是否在每次请求时重新保存session
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/bilibili' //数据库的连接配置
    }),
    cookie: {
        httpOnly: true, // 开启后前端无法通过 JS 操作
        maxAge: 1000 * 300 * 5 // 这一条 是控制 sessionID 的过期时间的！！！
    },
}))
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/login', (req, res) => {
    if (req.query.username === 'admin' && req.query.password === 'admin') {
        req.session.username = 'admin'
        req.session.uid = '156adfwe28'
        res.send('登录成功')
    } else {
        res.send('登陆失败')
    }

})
app.get('/cart', (req, res) => {
    if (req.session.username) {
        res.send(`欢迎你们${req.session.username}`)
    } else {
        res.send('未登录')
    }
})
app.get('/loginout', (req, res) => {
    req.session.destroy(() => {
        res.send('销毁成功')
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))