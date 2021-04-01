const express = require('express')

const routes = express.Router()
const basePath = __dirname + '/pages/'

const Profile = {
  data: {
    name: "Leonardo Dias Lissone",
    avatar: "https://github.com/Lissone.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },
  controllers: {
    index(req, res) {
      return res.render(basePath + 'profile', { profile: Profile.data })
    },
    update(req, res) {
      const data = req.body
      const weeksPerYear = 52
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

      Profile.data = data

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria EdeCasa',
      'daily-hours': 2,
      'total-hours': 1,
      created_at: Date.now()
    },
    {
      id: 2,
      name: 'DevNotes',
      'daily-hours': 8,
      'total-hours': 100,
      created_at: Date.now()
    }
  ],
  controllers: {
    index (req, res) {
      const updatedJobs = Job.data.map(job => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        const budget = Job.services.calcBudget(job, Profile.data["value-hour"])
    
        return {
          ...job,
          remaining,
          status,
          budget
        }
      })
    
      return res.render(basePath + 'index', { jobs: updatedJobs, profile: Profile.data })
    },
    post (req, res) {
      const lastId = Job.data.length === 0 ? 1 : Job.data.length+1

      const job = {
        id: lastId,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now()
      }
    
      Job.data.push(job)
      return res.redirect('/')
    },
    create (req, res) {
      return res.render(basePath + 'job')
    },
    editPage(req, res) {
      const jobId = req.params.id

      const obj = Job.data.find(job => job.id == jobId)

      if(!obj) 
        res.send('Job not found!')
      
      obj.budget = Job.services.calcBudget(obj, Profile.data["value-hour"])
      
      return res.render(basePath + 'job-edit', { job: obj })
    },
    update(req, res) {
      const jobId = req.params.id

      const obj = Job.data.find(job => job.id == jobId)

      if(!obj) 
        res.send('Job not found!')
      
      const updatedJob = {
        ...obj,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId))
          job = updatedJob

        return job
      })

      res.redirect('/')
    },
    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      const createdDate = new Date(job.created_at)
      const remaningDays = (job["total-hours"] / job["daily-hours"]).toFixed()
      const dueDay = createdDate.getDate() + Number(remaningDays) //Dia da entrega
      const dueDateInMs = createdDate.setDate(dueDay)
      const timeDiffInMs = dueDateInMs - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
      return dayDiff
    },
    calcBudget(job, valueHour) {
      return valueHour * job["total-hours"]
    }
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.post)
routes.get('/job/:id', Job.controllers.editPage)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes