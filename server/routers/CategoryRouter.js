const express = require('express')
const router = express.Router()
const {db, genId} = require('../db/DbUtils')

//列表接口
//添加接口
//修改接口
//删除接口

//添加接口
router.post('/add', async(req, res) => {
    let {name} = req.body

    let {err, rows} =  await db.async.run("INSERT INTO category(id, name) VAULES (?, ?)", [genId.NextId(), name])
    if(err == null){
        res.send({
            code:200, 
            msg:'添加成功'
        })
    }else{
        res.send({
            code: 500,
            msg:'添加失败'
        })
    }
   
})

module.exports = router