const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { post } = require('../routes');
const adapter = new FileSync('db.json');
const db = low(adapter)

//初始化数据
db.defaults({ posts: [], user: {} }).write()

//写入数据
// db.get("posts").push({ id: 3, title: '还好' }).write();
// db.get("posts").unshift({ id: 3, title: '还好' }).write();
//获取数据
// console.log(db.get('posts').value());
//移除数据
// db.get("posts").remove({ id: 3 }).write()
//更新数据
// db.get('posts').find({ id: 1 }).assign({ title: '今天下一拉' }).write()
//获取单条数据
let res = db.get('posts').find({ id: 1 }).value();
console.log(res);