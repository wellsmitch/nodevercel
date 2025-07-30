const multer = require('multer') 
const router = require("./createRouter.js") 
const NetWorkAction = require("./NetWorkAction.js") 
const Result = require("../utils/Result.js") 


router.get("/getx6List", multer().any(), async (req, res) => {
 const { account, password } = req.body
 try {
  const netRes = await NetWorkAction.get("/x6List", {
  params: {
   where: {

   }
  }
 })

  res.send(new Result({ ...netRes, message: netRes.data.results.length > 0 ? "查询成功" : "查询失败" }).getResult())

  return
 } catch (errr) {
  res.send(new Result({ message: "查询失败" }).getResult())
 }
})