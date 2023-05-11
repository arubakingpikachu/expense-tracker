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

  const cates=await Category.find({}).lean()
  const refCate=cates.find(cate=>{return cate.categoryName===category})

  console.log(date)
 
  
  await Record.create({name,amount,date,categoryId:refCate._id,userId})
  res.redirect('/')
})//new POST

router.get('/:id/edit',async (req,res)=>{
  const userId=req.user._id
  const _id=req.params.id

  try{
    const cates=await Category.find({}).lean()
    const record=await Record.findOne({_id,userId}).lean()
    
    console.log(record)
    console.log(record.date.toLocaleDateString( { year: 'numeric', month: 'long', day: 'numeric'}))
   
    record.date=new Date(record.date)

    console.log(record.date)
    

    res.render('edit',{record})
  }catch{console.log(error)}
  
})


router.delete('/:id',async (req,res)=>{
  const userId = req.user._id
  const _id=req.params.id

  try{
  const record=await Record.findOne({ _id, userId })
  record.remove()
  res.redirect('/')}catch{console.log('error')}  
  
})//delete



module.exports=router