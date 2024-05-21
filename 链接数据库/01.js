const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')
//链接成功回调
mongoose.connection.on('open', () => {
    console.log('链接成功');
})
//链接失败回调
mongoose.connection.on('error', () => {
    console.log('链接失败');

})
//连接关闭回调
mongoose.connection.on('close', () => {
    console.log('链接关闭');

})

setTimeout(() => {
    mongoose.disconnect()
}, 2000)