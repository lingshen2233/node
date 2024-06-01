var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5')
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/config')

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        if (!data) {
            // return res.send('账号密码输错')
            return res.json({
                code: '2002',
                msg: '账号密码输错~',
                data: null
            })
        }
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        }, `${secret}`, {
            expiresIn: 60 * 60 * 24 * 7
        })
        res.json({
            code: '0000',
            msg: '登陆成功~',
            data: token
        })


    }).catch(err => {

        res.json({
            code: '2001',
            msg: '数据库读取失败~',
            data: null
        })
    })
})
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' })
    })
})

module.exports = router;
