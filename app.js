const Port=3000
//require區
const express=require('express') 
const exphbs = require('express-handlebars')
const methodOverride=require('method-override')
const routes=require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')


require('./config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app =express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//middleware區
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req, res, next) => {
  console.log(req.isAuthenticated())
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)






app.listen(Port,() => {
  console.log(`Express is listening on localhost:${Port}`)
})