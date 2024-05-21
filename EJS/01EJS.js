const ejs = require('ejs');
let str = '我爱你';
let china = '中国';

let result = ejs.render('<%=china %>', { china });
console.log(result);

