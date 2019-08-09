const express = require('express')
const ApplicationsService = require('./application-service')

const applicationsRouter = express.Router()

applicationsRouter
    .route('/')
    .get((req, res, next) => {
        ApplicationsService.getAllApplications(req.app.get('db'))
            .then(applications => res.json(applications))
            .catch(next)
    })


applicationsRouter
    .route('/:applicationId')
    .get((req, res, next) => {
        const applicationId = req.params.applicationId
        ApplicationsService.getApplicationById(req.app.get('db'), applicationId)
            .then(application => res.json(application))
            .catch(next)
    })
    .patch((req, res, next) => {
        const applicationId = req.params.applicationId
        const newApplicationField = {
            application_approved: true
        }
        ApplicationsService.approveApplication(req.app.get('db'), applicationId, newApplicationField)
            .then(numRowsAffected => res.json(numRowsAffected))
            .catch(next)
    })

module.exports = applicationsRouter