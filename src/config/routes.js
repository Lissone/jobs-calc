const express = require('express')
const ProfileController = require('../controllers/ProfileController')
const JobController = require('../controllers/JobController')
const DashBoardController = require('../controllers/DashBoardController')

const routes = express.Router()

routes.get('/', DashBoardController.renderDashBoard)
routes.get('/job', JobController.renderJob)
routes.post('/job', JobController.create)
routes.get('/job/:id', JobController.renderEditJob)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.renderProfile)
routes.post('/profile', ProfileController.update)

module.exports = routes