const ProfileRepository = require('../repositories/ProfileRepository')

module.exports = {
  async renderProfile (req, res) {
    const profile = await ProfileRepository.get()

    return res.render('profile', { profile: profile })
  },
  
  async update (req, res) {
    const profile = await ProfileRepository.get()
    const data = req.body

    const weeksPerYear = 52
    const weeksPerMonth = (weeksPerYear - data.vacation_per_year) / 12
    const weekTotalHours = data.hours_per_day * data.days_per_week
    const monthlyTotalHours = weekTotalHours * weeksPerMonth
    const valueHour = data.monthly_budget / monthlyTotalHours
    
    await ProfileRepository.update(profile.id, {
      ...profile,
      ...data,
      value_hour: valueHour
    })
  
    return res.redirect('/')
  }
}