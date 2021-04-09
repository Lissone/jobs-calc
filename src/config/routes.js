const express = require('express')
const ProfileController = require('../controllers/ProfileController')
const JobController = require('../controllers/JobController')
const DashBoardController = require('../controllers/DashBoardController')

const routes = express.Router()

routes.get('/', DashBoardController.index)
routes.get('/job', JobController.index)
routes.post('/job', JobController.post)
routes.get('/job/:id', JobController.edit)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes