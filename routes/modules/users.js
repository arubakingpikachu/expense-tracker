const express=require('express')
const User=require('../../models/user')// 引入User model
const bcrypt=require('bcryptjs')
const router = express.Router()
const passport=require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})//登入頁面
router.get('/register',(req,res)=>{
  res.render('register')
})//註冊頁面

router.post('/register',(req,res)=>{
  const{name,email,password,confirmPassword}=req.body

  User.findOne({email})
  .then(user=>{
    if(user){return res.render('register',{name,email,password,confirmPassword})}
    return bcrypt
    .genSalt(10)
    .then(salt=>bcrypt.hash(password,salt))
    .then(hash=>User.create({name,email,password:hash})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err)))
  })
})

router.post('/login',
  passport.authenticate('local', 
  {
    successRedirect: '/',
    failureRedirect: '/users/login'
}),
  
  );


module.exports=router