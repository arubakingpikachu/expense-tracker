const express = require('express')
const router = express.Router()

const home=require('./modules/home')
const user=require('./modules/users')
const {authenticator}=require('../middleware/auth')//引入authenticator函式


router.use('/users',user)
router.use('/',authenticator,home)


module.exports=router