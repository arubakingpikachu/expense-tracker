const express=require('express')
const Record=require('../../models/record')// 引入Record model
const Category = require('../../models/category')
const router=express.Router()

router.get('/new',async (req, res) => {
  const category=await Category.find({}).lean()
  res.render('new',{category})
}) //new的頁面

router.post('/',async (req,res)=>{
  
  const {name,amount,date,category}=req.body

  const cates=await Category.find({}).lean()
  const refCate=cates.find(cate=>{return cate.categoryName===category})
  
  await Record.create({name,amount,date,categoryId:refCate._id,userId:req.user._id})
  res.redirect('/')
})//new的機制




module.exports=router