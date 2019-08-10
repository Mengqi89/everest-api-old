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
        const { approvalStatus } = req.body
        if (approvalStatus === true) {
            const newApplicationField = {
                application_approved: false
            }
            ApplicationsService.toggleAppApproval(req.app.get('db'), applicationId, newApplicationField)
                .then(numRowsAffected => res.json(numRowsAffected))
                .catch(next)
        } else {
            const newApplicationField = {
                application_approved: true
            }
            ApplicationsService.toggleAppApproval(req.app.get('db'), applicationId, newApplicationField)
                .then(numRowsAffected => res.json(numRowsAffected))
                .catch(next)
        }

    })

module.exports = applicationsRouter