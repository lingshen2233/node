var express = require('express');
var router = express.Router();

const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

router.get('/', (req, res) => {
  res.redirect('/account')
})
/* 警告: 在循环依赖项中访问模块导出的不存在的属性“post”
（使用“node --trace-warnings ...”显示警告的创建位置） */
/* GET home page. 记账本列表*/
router.get('/account', checkLoginMiddleware, function (req, res, next) {

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
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("create")
})

//新增记录

router.post('/account', checkLoginMiddleware, (req, res) => {
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
router.post('/account/:id', checkLoginMiddleware,
  (req, res) => {
    let id = req.params.id;
    AccountModel.deleteOne({ _id: id }).then(data => {
      res.render('success', { msg: '删除成功！', url: "/account" })
    }).catch(err => {
      res.status(500).send('删除失败')
    })
  })

module.exports = router;
