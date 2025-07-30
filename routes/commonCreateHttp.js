const multer = require('multer')
const router = require("./createRouter.js")
const NetWorkAction = require("./NetWorkAction.js")
const Result = require("../utils/Result.js")


const doGet = (tableName) => {
 router.get(`/api/get${tableName}`, multer().any(), async (req, res) => {
  const searchInfoList = []
  Object.entries(req.query).concat(req.body).forEach((kvList) => {
   if (kvList[0]) {
    searchInfoList.push({
     [kvList[0]]: {
      "$lt": kvList[1] || "",// "$options": "i"
     },
    })
   }
  })

  try {
   const netRes = await NetWorkAction.get(`/${tableName}`, {
    params: {
     count: 1,
     where: JSON.stringify(searchInfoList.length>0?{
      "$or": searchInfoList
     }:{})
    }
   })

   res.send(new Result({
    ...netRes,
   }).getResult())
  } catch (errr) {
   res.send(new Result({ message: "查询失败" }).getResult())
  }
 })
}

const doAdd = (tableName) => {
 router.post(`/api/add${tableName}`, multer().any(), async (req, res) => {
  try {
   const netRes = await NetWorkAction.post(`/${tableName}`, body, {
    headers: {
     "content-type": "application/json"
    },
   })
   res.send(new Result({ ...netRes.data, message: "新增成功" }).getResult())
  } catch (errr) {
   res.send(new Result({ message: "新增失败" }).getResult())
  }
 })
}

const doUpdate = (tableName) => {
 router.post(`/api/update${tableName}`, multer().any(), async (req, res) => {
  try {
   const netRes = await NetWorkAction.post(`/${tableName}`, body, {
    headers: {
     "content-type": "application/json"
    },
   })
   res.send(new Result({ ...netRes.data, message: "新增成功" }).getResult())
  } catch (errr) {
   res.send(new Result({ message: "新增失败" }).getResult())
  }
 })
}

const doDelete = (tableName) => {
 router.delete(`/api/delete${tableName}/:id`, multer().any(), async (req, res) => {
  const { id } = req.params
  if (!id) {
   res.send(new Result({ errMsg: "id 不能为空" }).getResult())
  }
  try {
   const netRes = await NetWorkAction.delete(`/${tableName}/${id}`, {}, {
    headers: {
     "content-type": "application/json"
    },
   })
   res.send(new Result({ ...netRes.data, message: "删除成功" }).getResult())
  } catch (errr) {
   res.send(new Result({ message: "删除失败" }).getResult())
  }
 })
}

module.exports = {
 doGet, doAdd, doUpdate, doDelete
}
