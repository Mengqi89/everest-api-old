const express = require('express')
const path = require('path')
const ApplicationsService = require('./application-service')
const { requireSchoolAuth, requireTeacherAuth } = require('../middleware/jwt-auth')

const applicationsRouter = express.Router()
const jsonBodyParser = express.json()

applicationsRouter.route('/').post(jsonBodyParser, requireTeacherAuth, (req, res, next) => {
  const newApplication = {
    job_id: req.body.job_id,
    school_id: req.body.school_id,
  }

  for (const [key, value] of Object.entries(newApplication))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      })

  newApplication.teacher_id = req.user.id

  ApplicationsService.insertApplication(req.app.get('db'), newApplication).then(
    application => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${application.id}`))
        .json(application)
    }
  )
})

applicationsRouter.route('/admin').get((req, res, next) => {
  ApplicationsService.getAllApplications(req.app.get('db'))
    .then(applications => res.json(applications))
    .catch(next)
})

applicationsRouter.route('/school').get(requireSchoolAuth, (req, res, next) => {
  const { id } = req.user
  ApplicationsService.getApplicationsForSchool(req.app.get('db'), id)
    .then(applications => res.json(applications))
    .catch(next)
})

applicationsRouter.route('/teacher').get(requireTeacherAuth, (req, res, next) => {
  const { id } = req.user
  ApplicationsService.getApplicationsForTeacher(req.app.get('db'), id)
    .then(applications => res.json(applications))
    .catch(next)
})


applicationsRouter
  .route('/:application_id')
  .get((req, res, next) => {
    const { application_id } = req.params
    ApplicationsService.getApplicationById(req.app.get('db'), application_id)
      .then(application => {
        if (!application) {
          return res.status(404).json({ error: `Application doesn't exist` })
        } else { res.status(200).json(application) }
      })
      .catch(next)
  })
  .patch((req, res, next) => {
    const application_id = req.params.application_id
    const { approvalStatus } = req.body
    if (approvalStatus === true) {
      const newApplicationField = {
        application_approved: false
      }
      ApplicationsService.toggleAppApproval(
        req.app.get('db'),
        application_id,
        newApplicationField
      )
        .then(numRowsAffected => res.json(numRowsAffected))
        .catch(next)
    } else {
      const newApplicationField = {
        application_approved: true
      }
      ApplicationsService.toggleAppApproval(
        req.app.get('db'),
        application_id,
        newApplicationField
      )
        .then(numRowsAffected => res.json(numRowsAffected))
        .catch(next)
    }
  })
  .delete((req, res, next) => {
    const { application_id } = req.params
    ApplicationsService.deleteApplication(req.app.get('db'), application_id)
      .then(numRowsAffected => {
        if (!numRowsAffected) {
          res
            .status(404)
            .json({ error: "Application doesn't exist" })
          next()
        } else {
          res.status(202).json(numRowsAffected)
        }
      })
      .catch(next)
  })

module.exports = applicationsRouter
