// const 'module-alias/register'
require('polyfill')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { fileURLToPath } = require('node:url');

const bodyParser = require("body-parser")        //获取模块

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const onelineUser = require('./routes/onelineUser.js');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/downloads", express.static(path.join(__dirname, 'files')));
app.use("/", express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({extended: true})); //创建 application/x-www-form-urlencoded 解析
// app.use(bodyParser.json());

const info = { a: 123 }
// console.log(">>>>>>>>>>>a", info?.a);


app.route('/book')
  .get(function (req, res, next) {
    // res.send('Get a random book')

    // 使用http-errors创建一个400 Bad Request错误

    // app.render('index', { title: 'Tobi' }, function (err, html) {
    //   console.log("***",err, html);

    // })
    return next(createError(400, 'Invalid user ID'));

  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

app.set("sss", "sssaaa")
app.disable("sss")
app.enable("sss")
const getKey = app.get("sss")
console.log("getKey>>", getKey);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/onlineUser', onelineUser);

app.use('/downloads', express.static('files'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// 接下来的代码是您的路由定义和其他中间件的使用。
app.get('/ttt', (req, res) => {
  res.send('Hello, Wossrld!');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("404fn>>>>>>>>>");

  next(createError(404, "没找到"));
});

// error handler
app.use(function (err, req, res, next) {
  const express1 = express;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('aaa');
});

module.exports = app;
