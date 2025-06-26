const multer = require('multer')
const fs = require('fs')
const buffer = require('buffer')
const path = require('path')
const router = require("./createRouter.js")
var svgCaptcha = require('svg-captcha');
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/secret.js");
var { authenticateJWT } = require("../middleware/index.js");
const svg2img = require('svg2img');
const jwtmiddleware = require("../middleware/jwt.js")
router.get("/jwtTest", [jwtmiddleware], async (req, res) => {
 res.send("jwtTest")
})

router.get("/no/uploadpage", multer().any(), async (req, res) => {
 res.render("index", {
  title: "uploadpage"
 })
})
const bufferIns = []
const uploadAsync = async (bufferList = []) => {
 for (let index = 0; index < bufferList.length; index++) {
  fs.writeFile(path.resolve(__dirname, "../files/" + "bbb.exe"), bufferList[index], (err) => {
   console.log('err', err)
  })
 }
}
router.post("/no/uploadFile", multer().any(), async (req, res) => {
 console.log('req', req)
  bufferIns.push(req.files[0].buffer )
 if (req.body.isEnd === "true") {

  // const resultBuffer = buffer.Buffer.concat(bufferIns);
  uploadAsync(bufferIns)
 }
 res.send("aaa")


})
router.post("/getSession", multer().any(), async (req, res) => {
 res.send(req.session)
})
router.post("/deleteSession", multer().any(), async (req, res) => {
 req.session.destroy()
 res.send(req.session)
})

router.get("/setSession", async (req, res) => {
    let info = req.session

 Object.entries(req.session).forEach(([k, v]) => {
  req.session[k] = v
 })
 req.session[req.query.sessionKey + Math.random()] = req.query.sessionValue;

    res.send(req.session)
})

router.get("/loginReturnToken", [authenticateJWT, (req,res,next)=> {
 console.log('req,res',req,res)
 next()
}], async (req, res) => {
 const { ttoken } = req.query;
 res.send(req.user)
})
router.get("/registerReturnToken", async (req, res) => {
    const { username, password } = req.body;
    if (username != "admin" && password != "123456") {
        return res.send({
            status: 1,
            msg: "登录失败",
        });
    }
    //登录成功之后，生成jwt字符串,并通过token的形式返回给客户端
    //参数:用户的信息对象，加密的秘钥，配置的对象(当前token的有效期 30s | 2h)
    const token = jwt.sign({ username: username }, jwtConfig.jwtSecret, {
        expiresIn: "60s",
    });
    res.send({
        status: 0,
        msg: "登录成功",
        token,
    });
})
router.get("/yzm", multer().any(), async (req, res) => {
    var captcha = svgCaptcha.create({ color: true, background: "#eaeaea", size: 8, width: 200 });
    res.set("Content-Type", "image/png");
    svg2img(captcha.data, function (error, buffer) {
        //returns a Buffer
        // fs.writeFileSync('foo1.png', buffer);
        if (!error) {
            res.send(buffer)
        }
    });
})

router.get("/aaa", multer().any(), async (req, res) => {
    res.send(req.body)
})



const NetWorkAction = require("./NetWorkAction.js")
const Result = require("../utils/Result.js")

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


module.exports = router