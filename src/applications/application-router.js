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
    .route('/:jobId/:teacherId')
    .get((req, res, next) => {
        const jobId = req.params.jobId
        const teacherId = req.params.teacherId
        ApplicationsService.getApplicationById(req.app.get('db'), jobId, teacherId)
            .then(application => res.json(application))
            .catch(next)
    })

module.exports = applicationsRouter