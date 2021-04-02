const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  index (req, res) {
    const jobs = Job.get()
    const profile = Profile.get()

    let statusCount = {
      total: jobs.length,
      progress: 0,
      done: 0
    }

    let jobTotalHours = 0

    const updatedJobs = jobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'
      const budget = JobUtils.calcBudget(job, profile["value-hour"])

      statusCount[status] += 1

      if(status == 'progress')
        jobTotalHours += job["daily-hours"]
  
      return {
        ...job,
        remaining,
        status,
        budget
      }
    })

    const freeHours = profile["hours-per-day"] - jobTotalHours
  
    return res.render('index', { 
      jobs: updatedJobs, 
      profile: profile, 
      statusCount: statusCount,
      freeHours: freeHours
    })
  }
}