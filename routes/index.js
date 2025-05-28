const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
console.log(">>>>>>>>>");


const fs = require('fs');
const path = require('path');
 
// 创建一个Buffer
const data = Buffer.from('Hello, world!', 'utf8');
 
// 指定文件路径
const filePath = path.join(__dirname, 'output.jpg');
 
// 异步写入文件
fs.writeFile(filePath, data, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File written successfully');
  }
});

router.use((req, res, next) => {
  console.log('Time::::::111', Date.now())
  next()
})

router.post("/book1",(req,res)=>{
  
  req.on('data', function(chunk){
    console.log("MMMMMMMMMM",chunk);
    
    const bRes = Buffer.from(chunk)

    const d = bRes.toString()

    console.log(d);
    
    // console.log( chunk.toJson())
    
});
  res.send("aaa")
})

/* GET home page. */
router.post('/book', function(req, res, next) {
  res.send('index.js book');
})

/* GET home page. */
router.get('/aaac', function(req, res, next) {
  res.render('ex/aaa');
})
router.get('/downloads', function(req, res, next) {
  // res.send(Buffer.from('whoop'))
  // res.send({ some: 'json' })
  // res.status(500).send({ error: 'something blew up' })
  // res.send('<p>some html</p>')
//   res.set('Content-Type', 'text/html')
// res.send(Buffer.from('<p>some ccchtmlaaa</p>'))
// res.cookie('cart', "123s")
//   res.render('ex/aaa', { title: 'Express',dd:123 });
res.download('baby.txt', 'report.txt')
});

module.exports = router;
