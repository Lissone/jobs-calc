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

  async update (id, data) {
    data.id = id

    await this.repository.save(data)
  }
}