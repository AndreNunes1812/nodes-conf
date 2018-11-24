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
  console.log(
    `HOST: ${req.headers.host} || URL: ${req.url} | METHOD: ${req.method} `
  )

  req.name = 'GoNode'

  return next() // não bloqueia o fluxo de func. do Node
}

app.use(logMiddleware) // todos os verbos irao ter acesso.

// app.get('/', (req , res) => {
//     return res.send('Hello Word')
// })

const users = ['Andre Nunes', 'Francisca Nunes']

// nunjucks
app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  console.log(req.body)
  users.push(req.body.user)

  return res.redirect('/')
})

// app.get('/Login', (req , res) => {
//     return res.send('Login')
// })

// app.get('/nome/:name', (req , res) => {
//     return res.send(`Bem Vindo, ${req.params.name} `)
// })

/* Query Params */
// app.get('/', (req , res) => {
//     return res.send(`Bem Vindo, ${req.query.name} `)
// })

/* Json */
// app.get('/nome/:name', logMiddleware, (req , res) => {
//     return res.json({
//         message: `Welcome to ${req.name} **, ${req.params.name} `
//     })
// })

/* Fluxo de Requisição */

app.listen(3000)
