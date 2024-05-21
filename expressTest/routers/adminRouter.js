const express = require('express');
//创建应用对象
const router = express();
//创建路由

router.get('/home', (req, res) => {
    res.send("前台主页");
})
router.get('/home2', (req, res) => {
    res.send("前台主页2");
})


module.exports = router;