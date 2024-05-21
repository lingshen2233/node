const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')
//链接成功回调
mongoose.connection.once('open', () => {
    console.log('链接成功');
    // 创建文档的结构对象
    let BookSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true
        },
        author: String,
        price: Number
    })
    // 创建模型对象 对文档操作的封装对象 
    let BookModel = mongoose.model('books', BookSchema)
    BookModel.create({
        name: '西游记',
        author: '吴承恩',
        price: 19.9
    }).then(res => {
        // 没有出错，输出插入后的文档对象
        console.log(res);
        // 关闭连接
        mongoose.disconnect();
    }).catch(res => {
        console.log(res);
    })


})
//链接失败回调
mongoose.connection.on('error', () => {
    console.log('链接失败');

})
//连接关闭回调
mongoose.connection.on('close', () => {
    console.log('链接关闭');

})

