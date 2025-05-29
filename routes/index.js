// const router = require("./createRouter")


var express = require('express');
var router = express.Router();

// require("./OnlineUser/index.js")

// var express = require('express');
// var dotenv = require('dotenv');
// const CryptoJS = require("crypto-js")
// const dayjs = require("dayjs")
const multer = require('multer')
// const NetWorkAction = require("./NetWorkAction")
// const Result = require("../utils/Result")
console.log('express',express)
// console.log('dotenv',dotenv)
// console.log('dayjs',dayjs)
// console.log('CryptoJS',CryptoJS)

class Result {
 constructor(props) {
  this.info = props || {}
 }
 getResult() {
  const { status, message,data } = this.info || {}
  if (this.info > 300) {
   return {
    status,
    message,
   }
  } else {
   return {
    message,
    ...data
   }
  }

 }
}

const queryUser = async (account, password) => {
 const netRes = await NetWorkAction.get("/OnlineUser", {
  params: {
   where: {
    account,
    password
   }
  }
 })
 return netRes
}

router.post('/book', function(req, res, next) {
 console.log('multer',multer)
  res.send('index.js book');
})


// router.post("/login", multer().any(), async (req, res) => {
//  const { account, password } = req.body
//  try {
//   const netRes = await queryUser(account, password)

//   res.send(new Result({ ...netRes, message: netRes.data?.results?.length > 0 ? "登录成功" : "用户不存在" }).getResult())

//   return
//  } catch (errr) {
//   res.send(new Result({ message: "登录失败" }).getResult())
//  }
// })


// router.post("/regeister", multer().any(), async (req, res) => {
//  const { account, password } = req.body
//  try {
//   const netRes = await queryUser(account, password)
//   if (netRes?.data?.results?.length > 0) {
//    res.send({
//     message: "用户已存在"
//    })
//    return
//   }

//   const netResRegeister = await NetWorkAction.post("/OnlineUser", {
//    account,
//    password
//   })

//   res.send(new Result({ ...netResRegeister, message: "注册成功" }).getResult())
//   return
//  } catch (errr) {
//   res.send(new Result({ message: "注册失败" }).getResult())
//  }
// })



module.exports = router;
