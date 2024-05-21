const BookModel = require('./models/BookModel');
const db = require('./db/db');
const mongoose = require('mongoose');
db(() => {
    console.log('连接成功');

    //7. 新增
    BookModel.create(
        {
            name: '在细雨中呼喊',
            author: '余华',
            price: 25,
            is_hot: true
        }).then(res => {
            // 没有出错，输出插入后的文档对象
            // console.log(res);
            // 关闭连接
            mongoose.disconnect();
        }).catch(res => {
            // console.log(res);
        });


}, () => {
    console.log('链接失败');
})
