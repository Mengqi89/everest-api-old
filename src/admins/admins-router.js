const express = require('express')
const AdminsService = require('./admins-service')
const path = require('path')

const adminsRouter = express.Router()

adminsRouter
    .route('/')
    .get((req, res, next) => {
        AdminsService.getAllAdmins(req.app.get('db'))
            .then(admins => admins.map(admin => AdminsService.seriealizeAdmin(admin)))
            .then(admins => res.json(admins))
            .catch(next)
    })
    .post((req, res, next) => {
        const { first_name, last_name, username, email, password } = req.body
        const newAdmin = { first_name, last_name, username, email, password }
        const requiredFields = ['first_name', 'last_name', 'username', 'email', 'password']
        requiredFields.forEach(field => {
            if (newAdmin[field] === "") {
                return res
                    .status(400)
                    .json({
                        error: { message: `Missing '${field}' in request body` }
                    })
            }
        })//can post but error is not properly caught

        AdminsService.insertAdmin(req.app.get('db'), newAdmin)
            .then(newAdmin => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${newAdmin.username}`))
                    .json(AdminsService.seriealizeAdmin(newAdmin))
            })
            .catch(next)
    })

adminsRouter
    .route('/:username')
    .get((req, res, next) => {
        const username = req.params.username
        AdminsService.getAdminByUsername(req.app.get('db'), username)
            .then(admin => AdminsService.seriealizeAdmin(admin))
            .then(admin => res.json(admin))
            .catch(next)
    })//need to catch error here when no username is found
    .patch((req, res, next) => {
        const username = req.params.username
        const { first_name, last_name, email, password } = req.body
        const newAdmin = { first_name, last_name, email, password }

        const numberOfValues = Object.values(newAdmin).filter(Boolean).length
        if (numberOfValues === 0) {
            return res
                .status(400)
                .json({
                    error: { message: `Request body must contain either 'first_name', 'last_name', 'password', or 'email'` }
                })
        }
        AdminsService.updateAdmin(req.app.get('db'), username, newAdmin)
            .then(updatedAdmin => {
                res
                    .status(201)
                    .json(AdminsService.seriealizeAdmin(updatedAdmin))
            })
            .catch(next)
    })//can successfully update and get error message. However, when update succeeds, it returns 500 error. 
    .delete((req, res, next) => {
        const username = req.params.username

        AdminsService.deleteAdmin(req.app.get('db'), username)
            .then(admins => {
                res
                    .status(201)
                    .json(admins.map(AdminsService.seriealizeAdmin))
            })
            .catch(next)
    })

module.exports = adminsRouter