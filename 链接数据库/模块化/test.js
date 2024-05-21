const db = require('./db/db')
const MovieModel = require('./models/MovieModel')
db(() => {
    // 电影模型对象
    MovieModel.create({ title: '让子弹你飞', author: '姜文' })
        .then(res => {
            console.log(res);
        }).catch(res => {
            console.log(res);
        })
})