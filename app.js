const Port=3000
//require區
const express=require('express') 
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const app =express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//middleware區
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))








app.listen(Port,() => {
  console.log(`Express is listening on localhost:${port}`)
})