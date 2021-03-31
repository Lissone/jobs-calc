const express = require('express')
const routes = require('./routes.js')

const app = express()

app.set('view engine', 'ejs')

//Habilitar arquivos statics
app.use(express.static("public"))

//Habilitar req.body
app.use(express.urlencoded({ extended: true }))

app.use(routes)

module.exports = app