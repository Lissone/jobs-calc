const JobRepository = require('../repositories/JobRepository')
const ProfileRepository = require('../repositories/ProfileRepository')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async renderDashBoard (req, res) {
    const jobs = await JobRepository.getAll()
    const profile = await ProfileRepository.get()

    let statusCount = {
      total: jobs.length,
      progress: 0,
      done: 0
    }

    let jobTotalHours = 0

    const updatedJobs = jobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'
      const budget = JobUtils.calcBudget(job, profile.value_hour)

      statusCount[status] += 1

      if(status == 'progress')
        jobTotalHours += job.daily_hours
  
      return {
        ...job,
        remaining,
        status,
        budget
      }
    })

    const freeHours = profile.hours_per_day - jobTotalHours
  
    return res.render('index', { 
      jobs: updatedJobs, 
      profile: profile, 
      statusCount: statusCount,
      freeHours: freeHours
    })
  }
}