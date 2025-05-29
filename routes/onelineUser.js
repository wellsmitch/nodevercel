import multer from 'multer'
import router from "./createRouter.js"
router.get("/aaa", multer().any(), async (req, res) => {
 res.send(req.body)
})


import NetWorkAction from "./NetWorkAction.js"
import Result from "../utils/Result.js"

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

router.post("/login", multer().any(), async (req, res) => {
 const { account, password } = req.body
 try {
  const netRes = await queryUser(account, password)

  res.send(new Result({ ...netRes, message: netRes.data.results.length > 0 ? "登录成功" : "用户不存在" }).getResult())

  return
 } catch (errr) {
  res.send(new Result({ message: "登录失败" }).getResult())
 }
})


router.post("/register", multer().any(), async (req, res) => {
 const { account, password } = req.body
 try {
  const netRes = await queryUser(account, password)
  if (netRes.data.results.length > 0) {
   res.send({
    message: "用户已存在"
   })
   return
  }

  const netResRegeister = await NetWorkAction.post("/OnlineUser", {
   account,
   password
  })

  res.send(new Result({ ...netResRegeister, message: "注册成功" }).getResult())
  return
 } catch (errr) {
  res.send(new Result({ message: "注册失败" }).getResult())
 }
})


export default router