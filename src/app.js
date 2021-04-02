const express = require('express')
const routes = require('./routes.js')
const path = require('path')

const app = express()

//Habilitar template engine
app.set('view engine', 'ejs')

//Setar pasta views como padrao
app.set('views', path.join(__dirname, 'views'))

//Habilitar arquivos statics
app.use(express.static("public"))

//Habilitar req.body
app.use(express.urlencoded({ extended: true }))

app.use(routes)

module.exports = app