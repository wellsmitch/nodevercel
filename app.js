// // // const 'module-alias/register'
// require('polyfill')
const createError = require('http-errors');
const express = require('express');
const { expressjwt } = require("express-jwt");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwtConfig = require("./config/secret.js");
const sessionSecretConfig = require("./config/sessionSecret.js");
const session = require('express-session');
var FileStore = require('session-file-store')(session);
// const { fileURLToPath } = require('node:url');

// const bodyParser = require("body-parser")        //获取模块

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const onelineUser = require('./routes/onelineUser.js');
var app = express();
app.use(session({
  secret: sessionSecretConfig.sessionSecret, //服务器端生成 session 的签名
  // genid(){
  //   return `iddddd-${Math.random()}`
  // },
  name: "addddd", //修改session对应cookie的名称
  resave: false,//强制保存 session 即使它并没有变化
  saveUninitialized: false, //强制将未初始化的 session 存储
  cookie: {
    maxAge:10000,
    secure: false  // true 表示只有https协议才能访问cookie  
  },
  rolling: true,  //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  store: new FileStore({
    // 每 10 秒检查并清除过期的session文件
    reapInterval: 1,
    logFn() {
      // console.log('123',args)
    },
    path: path.resolve(__dirname, "./")
  }),
}));
// //jwt中间件
// //安装的express-jwt模块会默认为最新版本，更新后的jwt需要在配置中加入algorithms属性，即设置jwt的算法。
// // 一般HS256为配置algorithms的默认值。
// // unless 指定哪些路径应该跳过JWT验证（例如，生成token的端点和公共资源的端点）
// // app.use(
// //   expressjwt({
// //      secret: jwtConfig.jwtSecret, 
// //     algorithms: ["HS256"],
// //     isRevoked(req) {
// //       console.log('req',req)
// //       return false
// //     }
// //    }).unless({
// //     path: [
// //       /^\/registerReturnToken\/*/,
// //       /^\/downloads\/*/,
// //       /^\/stylesheets\/*/,
// //       /^\/no\/*/,
// //       /^\/yzm\/*/,
// //       /^\/setSession\/*/,
// //       /^\/getSession\/*/,
// //     ],
// //     // path: [/^\/registerReturnToken\/*/],
// //   })
// // );

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
    res.send('Get a random book')

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

app.use(function (req, res, next) {
  // console.log('req,res',req,res)
   const allowedOrigins = ['https://next.wellsmitch.top', 'http://127.0.0.1'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'nonono'+Math.random()); // 或者拒绝请求
  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/onlineUser', onelineUser);

// app.use('/downloads', express.static('files'));
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');



// // 接下来的代码是您的路由定义和其他中间件的使用。
app.get('/ttt', (req, res) => {
  res.send('Hello, Wossrld!');
})

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   console.log("404fn>>>>>>>>>");

//   next(createError(404, "没找到"));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   const express1 = express;
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   const { code, name, message } = err
//   // render the error page
//   res.status(err.status || 500);
//   res.send({
//     code, name, message
//   })
//   // res.render('aaa');
// });

module.exports = app;
