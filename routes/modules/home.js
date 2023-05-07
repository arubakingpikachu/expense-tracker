const express = require('express')
const Record=require('../../models/record')
const router = express.Router()

router.get('/', (req, res) => {
  const userId = req.user._id
  
  
  Record.find({userId})
    .lean()
    .then(record => res.render('index', { record }))
    .catch(error => console.error(error))
})// 純瀏覽

module.exports=router