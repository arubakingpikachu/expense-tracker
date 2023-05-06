module.exports={
  authenticator:(req,res,next)=>{if(req.isAuthenticated()){
    return next()
  }else{res.redirect('/users/login')}
}}//判斷是否有經過驗證的middleware