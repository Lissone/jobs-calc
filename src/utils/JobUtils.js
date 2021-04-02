module.exports = {
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