const bodyParser = require('body-parser');//获取请求体数据

const express = require('express')
const app = express()
const jsonParaser = bodyParser.json();//解析json
const urlencodeParser = bodyParser.urlencoded({ extended: false });//解析query String
const port = 9000

app.get('/login', (req, res) => res.sendFile(__dirname + "/011.html"))//响应html内容
app.post('/login', urlencodeParser, (req, res) => {
    console.log(req.body);
    let { username, password } = req.body
    res.send('Hello post!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))