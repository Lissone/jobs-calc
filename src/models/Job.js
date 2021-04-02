let data = [
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
]

module.exports = {
  get() {
    return data
  },
  set(newData) {
    data = newData
  }
}