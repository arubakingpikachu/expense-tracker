const express = require('express')
const Record=require('../../models/record')
const record = require('../../models/record')
const router = express.Router()
let totalAmount=0

router.get('/',async (req, res) => {
  const userId = req.user._id
  let totalAmount=0
 try{
  const record=await Record.find({userId}).lean()
 console.log(record)
 for(let item of record){
    totalAmount+=item.amount
 }
 res.render('index',{record,totalAmount})
 } catch{console.log(error)} 

})// 純瀏覽及總金額

module.exports=router