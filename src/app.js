require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config');
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const adminsRouter = require('./admins/admins-router')
const schoolsRouter = require('./schools/schools-router')
const jobsRouter = require('./jobs/jobs-router')
const authRouter = require('./auth/auth-router')


const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors());
app.use(helmet())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello, boilerplate!')
})

app.use('/api/auth', authRouter)
app.use('/api/schools', schoolsRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/admins/', adminsRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {

    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})


module.exports = app