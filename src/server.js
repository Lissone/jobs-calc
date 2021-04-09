require('./config/envConfig')
const connection = require('./config/dbConfig')
const app = require('./app')

const port = process.env.PORT || 5000

connection.then(() => {
  console.log('Connection started with database')
}).catch(console.log)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})