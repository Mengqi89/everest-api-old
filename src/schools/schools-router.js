const path = require('path')
const express = require('express')
const xss = require('xss')
const SchoolsService = require('./schools-service')

const schoolsRouter = express.Router()
const jsonParser = express.json()


schoolsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    SchoolsService.getAllSchools(knexInstance)
      .then(schools => {
        res.json(schools.map(SchoolsService.serializeSchool))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const newSchool = req.body
    const requiredFields = ['school_name', 'school_type']
    requiredFields.forEach(field => {
      if (newSchool[field] === null)
        return res.status(400).json({
          error: { message: `Missing '${field}' in request body` }
        })
    })

    SchoolsService.insertSchool(
      req.app.get('db'),
      newSchool
    )
      .then(school => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${school.id}`))
          .json(SchoolsService.serializeSchool(school))
      })
      .catch(next)
  })

schoolsRouter
  .route('/:school_id')
  .all((req, res, next) => {
    SchoolsService.getById(
      req.app.get('db'),
      req.params.school_id
    )
      .then(school => {
        if (!school) {
          return res.status(404).json({
            error: { message: `School doesn't exist` }
          })
        }
        res.school = school
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(SchoolsService.serializeSchool(res.school))
  })
  .delete((req, res, next) => {
    SchoolsService.deleteSchool(
      req.app.get('db'),
      req.params.school_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const schoolToUpdate = req.body
    // const requiredFields = ['school_name', 'school_type']
    // requiredFields.forEach(field => {
    //   if (schoolToUpdate[field] === null)
    //     return res.status(400).json({
    //       error: { message: `Missing '${field}' in request body` }
    //     })
    // })

    SchoolsService.updateSchool(
      req.app.get('db'),
      req.params.school_id,
      schoolToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = schoolsRouter
