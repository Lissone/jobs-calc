const { createConnection } = require('typeorm')
const Jobs = require('../entities/Jobs')
const Profile = require('../entities/Profile')

const connection = createConnection({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Jobs, Profile],
  synchronize: true,
  logging: false,
  options: {
    enableArithAbort: true
  }
})

module.exports = connection