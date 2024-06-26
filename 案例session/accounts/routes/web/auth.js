var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5')
const session = require('express-session');
const MongoStore = require('connect-mongo');


router.get('/reg', (req, res) => {
    res.render('auth/reg')
})
router.post('/reg', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) }).then(data => {
        res.render('success', { msg: '注册成功', url: '/login' })
    }).catch(err => {
        res.status(500).send('注册失败~')
    })
})
router.get('/login', (req, res) => {
    res.render('auth/login')
})
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        if (!data) {
            return res.send('账号密码输错')
        }
        req.session.username = data.username;
        req.session._id = data._id;

        res.render('success', { msg: '登陆成功', url: '/account ' })
    }).catch(err => {
        res.status(500).send('读取失败')
    })
})
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' })
    })
})

module.exports = router;
