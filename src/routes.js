const express = require('express')
const routes = express.Router()

const basePath = __dirname + '/pages/'

routes.get('/', (req, res) => res.render(basePath + 'index'))
routes.get('/job', (req, res) => res.render(basePath + 'job'))
routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'))
routes.get('/profile', (req, res) => res.render(basePath + 'profile'))

module.exports = routes