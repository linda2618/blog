const express = require('express')
const multer = require('multer')  //multer上传文件,sqlite3数据库，方便服务端的移植,uuid唯一标识

const app = express()
const port = 8080

//升级跨域请求
app.use(function(req, res, next){
    //设置允许跨域的域名， *代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", '*')
    //允许的header类型
    res.header('Access-Control-Allow-Headers', '*')
    //跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE, PUT, POST, GET, OPTIONS')

    if(req.method == 'OPTIONS')res.sendStatus(200)
    else next()
})


//注册中间件
app.use(express.json())
const update = multer({
    dest:'./public/upload/temp'   //上传的文件地址
})
app.use(update.any())  //允许所有文件上传
//注册router
app.use('/test', require('./routers/TestRouter.js'))
app.use('/admin', require('./routers/AdminRouter.js'))


app.get('/',(req, res) => {
    res.send('Hello linMM!')
})

app.listen(port, ()=>{
    console.log(`启动成功: http://localhost:${port}`)
})

