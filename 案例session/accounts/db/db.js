/**
 * 
 * @param {*} success 数据库连接成功回调
 * @param {*} error 数据库连接失败回调
 */
const { DBNAME, DBPORT, DBHOST } = require('../config/config');
module.exports = function (success, error) {
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败');
        }
    }
    const mongoose = require('mongoose');

    //设置 strictQuery 为 true
    mongoose.set('strictQuery', true);

    //3. 连接 mongodb 服务                        数据库的名称
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.connection.once('open', async () => {
        success()
    })
    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error()
        console.log('连接失败');
    });

    //设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    });

}