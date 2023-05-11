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
  
  const userId=req.user._id
 
  const refCate=await Category.findOne({categoryName:category})//找出要新增的類別
 
  await Record.create({name,amount,date,categoryId:refCate._id,userId})//創造新資料，categoryId用refCate的_is
  res.redirect('/')
})//new POST

router.get('/:id/edit',async (req,res)=>{
  const userId=req.user._id//登入使用者的id
  const record_id=req.params.id//條目id

  const record=await Record.findOne({_id:record_id,userId}).lean()//取出該筆支出完整的紀錄
  
  const cate_id=record.categoryId//該筆支出的類別id
  const cate=await Category.findOne({_id:cate_id}).lean()
  const cateName=cate.categoryName

  const category=await Category.find({}).lean()//整組類別選項

  record.date=record.date.toLocaleDateString('zh-TW',{  year:'numeric',month:'numeric',
  day: 'numeric',})
  
console.log(record.date)

  res.render('edit',{record,cateName,category})
 
  
})//get EDIT


router.put('/:id',async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  
  RestData.findOne({_id,userId})
    .then(restaurant => { return restaurant.update(req.body) })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})// 儲存編輯條目


router.delete('/:id',async (req,res)=>{
  const userId = req.user._id
  const _id=req.params.id

  try{
  const record=await Record.findOne({ _id, userId })
  record.remove()
  res.redirect('/')}catch{console.log('error')}  
  
})//delete



module.exports=router