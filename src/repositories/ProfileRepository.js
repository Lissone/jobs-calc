const { getRepository } = require('typeorm')
const Profile = require('../entities/Profile')

module.exports = {
  get repository () {
    return getRepository(Profile)
  },

  async get () {
    const ret = await this.repository.findOne()

    return ret
  },

  async create (data) {
    const obj = await this.repository.create(data)

    await this.repository.save(obj)
  },
  
  async update (id, data) {
    data.id = id

    await this.repository.save(data)
  }
}