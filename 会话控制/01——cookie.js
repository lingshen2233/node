const express = require('express')
const app = express()
const port = 3000

app.get('/set-cookie', (req, res) => {
    res.cookie('name', "zhangsan")

    res.send('Hello World!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))