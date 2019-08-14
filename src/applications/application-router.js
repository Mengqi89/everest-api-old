const express = require('express')
const ApplicationsService = require('./application-service')

const applicationsRouter = express.Router()

applicationsRouter
    .route('/admin')
    .get((req, res, next) => {
        ApplicationsService.getAllApplications(req.app.get('db'))
            .then(applications => res.json(applications))
            .catch(next)
    })

applicationsRouter
    .route('/school/:schoolId')
    .get((req, res, next) => {
        const { schoolId } = req.params
        ApplicationsService.getApplicationsForSchool(req.app.get('db'), schoolId)
            .then(applications => res.json(applications))
            .catch(next)
    })

applicationsRouter
    .route('/teacher/:teacherId')
    .get((req, res, next) => {
        const { teacherId } = req.params
        ApplicationsService.getApplicationsForTeacher(req.app.get('db'), teacherId)
            .then(applications => res.json(applications))
            .catch(next)
    })

applicationsRouter
    .route('/:applicationId')
    .get((req, res, next) => {
        const { applicationId } = req.params
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
    .delete((req, res, next) => {
        const applicationId = req.params.applicationId
        console.log(applicationId)

        ApplicationsService.deleteApplication(req.app.get('db'), applicationId)
            .then(applications => {
                res
                    .status(201)
                    .json(applications)
            })
            .catch(next)
    })

module.exports = applicationsRouter