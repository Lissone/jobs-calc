const JobRepository = require('../repositories/JobRepository')
const ProfileRepository = require('../repositories/ProfileRepository')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  renderJob (req, res) {
    return res.render('job')
  },

  async renderEditJob (req, res) {
    const jobs = await JobRepository.getAll()
    const profile = await ProfileRepository.get()
    const jobId = req.params.id

    const obj = jobs.find(job => job.id == jobId)

    if(!obj) 
      res.send('Job not found!')
    
    obj.budget = JobUtils.calcBudget(obj, profile.value_hour)
    
    return res.render('job-edit', { job: obj })
  },
  
  async create (req, res) {
    const data = req.body

    await JobRepository.create({
      name: data.name,
      daily_hours: data.daily_hours,
      total_hours: data.total_hours,
      created_at: Date.now().toString()
    })
    
    return res.redirect('/')
  },

  async update (req, res) {
    const jobId = req.params.id
    const data = req.body
    
    const updatedJob = {
      name: data.name,
      total_hours: data.total_hours,
      daily_hours: data.daily_hours
    }

    await JobRepository.update(jobId, updatedJob)

    res.redirect('/')
  },

  async delete (req, res) {
    const jobId = req.params.id

    await JobRepository.delete(jobId)

    return res.redirect('/')
  }
}