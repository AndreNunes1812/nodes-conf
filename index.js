const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const logMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next() // não bloqueia o fluxo de func. do Node
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major', logMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', logMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  console.log(req.body.age)
  const { age } = req.body
  if ({ age } < 18) {
    return res.redirect(`/minor?age=${age}`)
  } else {
    return res.redirect(`/major?age=${age}`)
  }
})

app.listen(3000)
