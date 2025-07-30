const multer = require('multer')
const router = require("/createRouter.js")
const NetWorkAction = require("./NetWorkAction.js")
const Result = require("../utils/Result.js")


router.get("/getArticleList", multer().any(), async (req, res) => {
  // console.log('req', req)
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
    const netRes = await NetWorkAction.get("/indexData", {
      params: {
        count: 1,
        where: JSON.stringify({
          "$or": searchInfoList
        })
      }
    })

    res.send(new Result({
      ...netRes,
      // message: netRes.data.results.length > 0 ? "查询成功" : "查询失败"
    }).getResult())

    return
  } catch (errr) {
    res.send(new Result({ message: "查询失败" }).getResult())
  }
})


router.post("/addArticle", multer().any(), async (req, res) => {
  const body = req.body
  try {
    const netRes = await NetWorkAction.post("/indexData", body, {
      headers: {
        "content-type": "application/json"
      },
    })

    res.send(new Result({ ...netRes.data, message: "新增成功" }).getResult())

    return
  } catch (errr) {

    res.send(new Result({ message: "新增失败" }).getResult())
  }
})

router.put("/updateArticle", multer().any(), async (req, res) => {
  const body = req.body
  try {
    const netRes = await NetWorkAction.post("/indexData", body, {
      headers: {
        "content-type": "application/json"
      },
    })

    res.send(new Result({ ...netRes.data, message: "更新成功" }).getResult())

    return
  } catch (errr) {

    res.send(new Result({ message: "更新失败" }).getResult())
  }
})

router.delete("/deleteArticle/:id", multer().any(), async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.send(new Result({ errMsg: "id 不能为空" }).getResult())
  }
  try {
    const netRes = await NetWorkAction.delete(`/indexData/${id}`, {}, {
      headers: {
        "content-type": "application/json"
      },
    })

    res.send(new Result({ ...netRes.data, message: "删除成功" }).getResult())
    return
  } catch (errr) {
    res.send(new Result({ message: "删除失败" }).getResult())
  }
})