const { getRepository } = require('typeorm')
const Jobs = require('../entities/Jobs')

module.exports = {
  get repository () {
    return getRepository(Jobs)
  },

  async getAll () {
    const ret = await this.repository.find()

    return ret
  },

  async create (data) {
    const obj = await this.repository.create(data)

    await this.repository.save(obj)
  },

  async update (id, data) {
    await this.repository.update({ id: id }, data)
  },

  async delete (id) {
    await this.repository.delete(id)
  }
}