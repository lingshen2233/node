var express = require('express');
var router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

/* GET home page. 记账本列表*/
router.get('/account', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // let accounts = db.get('accounts').value();
    AccountModel.find().sort({ time: -1 }).exec().then(data => {
        // res.render("list", { accounts: data, moment: moment })
        res.json({
            code: '20000',
            msg: '读取成功~',
            data: data
        })
    }).catch(err => {
        res.json({
            code: '1001',
            msg: '读取失败~',
            data: null
        })
    })


});
//新增记录

router.post('/account', (req, res) => {
    AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    }).then(data => {
        res.json({
            code: '20000',
            msg: '新增成功~',
            data: data
        })
    }).catch(err => {
        res.json({
            code: '1002',
            msg: '新增失败~',
            data: null
        })
    })

})
// 删除记录
router.delete('/account/:id', (req, res) => {
    let id = req.params.id;
    AccountModel.deleteOne({ _id: id }).then(data => {
        res.json({
            code: '20000',
            msg: '删除成功~',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: '1003',
            msg: '删除失败~',
            data: null
        })
    })
})
// 获取单个账单信息
router.get('/account/:id', (req, res) => {
    let id = req.params.id;
    AccountModel.findById({ _id: id }).then(data => {
        res.json({
            code: '20000',
            msg: '读取成功~',
            data: data
        })
    }).catch(err => {
        res.json({
            code: '1004',
            msg: '读取失败~',
            data: null
        })
    })
})
// 修改账单信息
router.patch("/account/:id", (req, res) => {
    let { id } = req.params;
    AccountModel.updateOne({ _id: id }, req.body).then(data => {
        AccountModel.findById(id).then(ress => {
            res.json({
                code: '20000',
                msg: '修改成功~',
                data: ress
            })
        })

    }).catch(err => {
        res.json({
            code: '1004',
            msg: '修改失败~',
            data: null
        })
    })

})
module.exports = router;
