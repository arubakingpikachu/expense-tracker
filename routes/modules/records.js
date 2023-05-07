const express=require('express')
const Record=require('../../models/record')// 引入Record model
const Category = require('../../models/category')
const router=express.Router()

router.get('/new',async (req, res) => {
  const category=await Category.find({}).lean()
  res.render('new',{categories:category})
}) //new的頁面

router.post('/',(req,res)=>{
  const userId=req.user._id
  const {name,amount,date,category} = req.body       // 從 req.body 拿出表單裡的 name 資料
  return Record.create({ name,amount,date,userId })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})//new的機制


module.exports=router