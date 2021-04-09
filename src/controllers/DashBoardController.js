const Profile = require('../entities/Profile')
const JobRepository = require('../repositories/JobRepository')
const ProfileRepository = require('../repositories/ProfileRepository')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async renderDashBoard (req, res) {
    const jobs = await JobRepository.getAll()
    let profile = await ProfileRepository.get()
    
    if(profile === undefined) {
      await ProfileRepository.create({
        name: 'Leonardo Lissone',
        avatar: 'https://avatars.githubusercontent.com/u/57052110?s=400&u=3f60caf81f05629983bed45d9eaa3663fd90a390&v=4',
        monthly_budget: 3000,
        days_per_week: 5,
        hours_per_day: 5,
        vacation_per_year: 4,
        value_hour: 70
      })

      profile = await ProfileRepository.get()
    }

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