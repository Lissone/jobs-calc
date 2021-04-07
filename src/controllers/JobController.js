const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  index (req, res) {
    return res.render('job')
  },
  
  async post (req, res) {
    await Job.create({
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now()
    })

    return res.redirect('/')
  },

  async edit(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()
    const jobId = req.params.id

    const obj = jobs.find(job => job.id == jobId)

    if(!obj) 
      res.send('Job not found!')
    
    obj.budget = JobUtils.calcBudget(obj, profile["value-hour"])
    
    return res.render('job-edit', { job: obj })
  },

  async update(req, res) {
    const jobId = req.params.id
    
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    await Job.update(jobId, updatedJob)

    res.redirect('/')
  },

  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    return res.redirect('/')
  }
}