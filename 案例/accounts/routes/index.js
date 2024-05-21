var express = require('express');
var router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { post } = require('../routes');
const shortid = require('shortid');

const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter)
const moment = require('moment');
const AccountModel = require('../models/AccountModel');
// console.log(moment('2024-10-11').toDate());
/* 警告: 在循环依赖项中访问模块导出的不存在的属性“post”
（使用“node --trace-warnings ...”显示警告的创建位置） */
/* GET home page. 记账本列表*/
router.get('/account', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  // let accounts = db.get('accounts').value();
  AccountModel.find().sort({ time: -1 }).exec().then(data => {
    res.render("list", { accounts: data, moment: moment })
  }).catch(err => {
    res.status(500).send('读取失败~')
    return
  })


});
//添加记录
router.get('/account/create', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("create")
})

//新增记录

router.post('/account', (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(ress => {
    res.render("success", { msg: '添加成功~', url: '/account' })
  }).catch(err => {
    res.status(500).send('插入失败~')
    return;
  })

})
router.get('/account/:id', (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.render('success', { msg: '删除成功！', url: "/account" })
  }).catch(err => {
    res.status(500).send('删除失败')
  })
})

module.exports = router;
