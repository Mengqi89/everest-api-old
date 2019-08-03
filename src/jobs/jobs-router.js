const path = require('path')
const express = require('express')
const xss = require('xss')
const JobsService = require('./jobs-service')

const jobsRouter = express.Router()
const jsonParser = express.json()

jobsRouter
    .route('/')
    .get((req, res, next) => {
        JobsService.getAllJobs(req.app.get('db'))
            .then(jobs => jobs.map(job => JobsService.serializeJob(job)))
            .then(jobs => res.json(jobs))
            .catch(next)
        })
     
    .post(jsonParser, (req, res, next) => {
        const {job_title, total_salary, course, grade_level} = req.body
        const newJob = {job_title, total_salary, course, grade_level}
        
          for (const [key, value] of Object.entries(newJob))
            if (value === '')
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })


        JobsService.insertJob(
            req.app.get('db'),
            newJob
        ).then(job => {
            res.status(201)
            .location(path.posix.join(req.originalUrl, `/${job.id}`))
            .json(JobsService.serializeJob(job))
        })
        .catch(next)
    })

    jobsRouter
        .route('/:job_id')
        .all((req, res, next) => {
            JobsService.getById(
                req.app.get('db'),
                req.params.job_id
            )
                .then(job => {
                    if (!job) {
                        return res.status(404).json({
                            error: {message: `Job doesn't exist`}
                        })
                    }
                    res.job = job
                    next()
                })
                .catch(next)
        })
        .get((req, res, next) => {
            res.json(JobsService.serializeJob(res.job))
        })
        .delete((req, res, next) => {
            JobsService.deleteJob(
                req.app.get('db'),
                req.params.job_id
            )
                .then(numRowsAffected => {
                    res.status(204).end()
                })
                .catch(next)
        })
        .patch(jsonParser, (req, res, next) => {
            const jobToUpdate = req.body
            const requiredFields = ['job_title', 'total_salary', 'course', 'grade_level']
            requiredFields.forEach(field => {
              if (jobToUpdate[field] === null)
                return res.status(400).json({
                  error: { message: `Missing '${field}' in request body` }
                })
        })
        JobsService.updateJob(
            req.app.get('db'),
            req.params.job_id,
            jobToUpdate
        )
            .then(numRowsAffected => {
                JobsService.getById(req.app.get('db'), req.params.job_id)
                .then(job => res.json(job))
            })
            .catch(next)
        })

module.exports = jobsRouter