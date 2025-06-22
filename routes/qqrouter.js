
const { response } = require("../app.js")
const router = require("./createRouter.js")
const axios = require("axios")
router.get("/qqtest", async (req, res) => {
 res.send("qqtestdata")
})

router.get("/qqLogin", async (req, res) => {
    const d = req.query.code||""
    axios.get("https://graph.qq.com/oauth2.0/token",{
        params: {
            grant_type: "authorization_code",
            client_id: "101852145",
            client_secret: "4018b05d574a457d34168d876c747776",
            code: d,
            redirect_uri: "https://www.wellsmitch.top/blog/categoryListIndex",
            need_openid: "1",
        }
    }).then(res1=> {
        console.log('res1',res1.data)
       const up = new URLSearchParams(res1.data)
       if(up.get("access_token")) {
        res.send(null)
       }else {
        axios.get("https://graph.qq.com/user/get_user_info",{
            params: {
                access_token: up.get("access_token"),
                oauth_consumer_key:"101852145",
                openid: up.get("openid")
            }
        }).then(res3=> {
            if(res3.ret) {
                res.send(null)
            }else {
                res.send(res3.data||{})
            }
        }).then(rrr=> {
            res.send(null)
        })
        
       }
    
    }).catch(err=> {
        res.send(null)
    })
   })

module.exports = router