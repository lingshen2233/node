var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5')
router.get('/reg', (req, res) => {
    res.render('auth/reg')
})
router.post('/reg', (req, res) => {
    console.log(req.body);
    UserModel.create({ ...req.body, password: md5(req.body.password) }).then(data => {
        res.render('success', { msg: '注册成功', url: '/login' })
    }).catch(err => {
        res.status(500).send('注册失败~')
    })
})
module.exports = router;
