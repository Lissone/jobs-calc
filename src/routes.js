const express = require('express')
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

const routes = express.Router()

routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.post)
routes.get('/job/:id', JobController.editPage)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes