const express = require('express');
//创建应用对象
const router = express();
//创建路由

router.get('/admin', (req, res) => {
    res.send("后台主页");
})
router.get('/admin2', (req, res) => {
    res.send("后台主页2");
})


module.exports = router;