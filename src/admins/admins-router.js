const express = require('express')
const AdminsService = require('./admins-service')
const path = require('path')
const { requireAdminAuth } = require('../middleware/jwt-auth')

const adminsRouter = express.Router()

adminsRouter
    .route('/')
    .get((req, res, next) => {
        AdminsService.getAllAdmins(req.app.get('db'))
            .then(admins => admins.map(admin => AdminsService.serializeAdmin(admin)))
            .then(admins => res.json(admins))
            .catch(next)
    })
    .post((req, res, next) => {
        const { first_name, last_name, username, email, password, permission } = req.body
        const newAdmin = { first_name, last_name, username, email, password, permission }
        console.log(newAdmin)
        const requiredFields = ['first_name', 'last_name', 'username', 'email', 'password', 'permission']
        requiredFields.forEach(field => {
            if (newAdmin[field] === "") {
                return res
                    .status(401)
                    .json({
                        error: `Missing '${field}' in request body`
                    })
            }
        })

        if (permission !== 'permission') {
            return res
                .status(400)
                .json({
                    error: `Permission code is wrong.`
                })
        }

        const passwordError = AdminsService.validatePassword(password)

        if (passwordError) {
            return res.status(400).json({ error: passwordError })
        }

        AdminsService.hasUsername(req.app.get('db'), username)
            .then(hasUsername => {
                if (hasUsername) {
                    return res.status.json({ error: 'Username already taken' })
                }
                return AdminsService.hashPassword(password)
                    .then(hashedPassword => {
                        const newAdmin = {
                            username,
                            password: hashedPassword,
                            last_name,
                            first_name,
                            email
                        }

                        return AdminsService.insertAdmin(
                            req.app.get('db'),
                            newAdmin
                        )
                            .then(newAdmin => {
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${newAdmin.username}`))
                                    .json(AdminsService.serializeAdmin(newAdmin))
                            })
                    })
            })
            .catch(next)
    })

adminsRouter
    .route('/admin/:id')
    .get((req, res, next) => {
        const id = req.params.id
        AdminsService.getAdminById(req.app.get('db'), id)
            .then(admin => AdminsService.serializeAdmin(admin))
            .then(admin => res.json(admin))
            .catch(next)
    })//need to catch error here when no id is found
    .patch((req, res, next) => {
        const username = req.params.username
        const { first_name, last_name, email, password } = req.body
        const newAdmin = { first_name, last_name, email, password }

        const numberOfValues = Object.values(newAdmin).filter(Boolean).length
        if (numberOfValues === 0) {
            return res
                .status(400)
                .json({
                    error: `Request body must contain either 'first_name', 'last_name', 'password', or 'email'`
                })
        }
        AdminsService.updateAdmin(req.app.get('db'), username, newAdmin)
            .then(updatedAdmin => {
                res
                    .status(201)
                    .json(AdminsService.serializeAdmin(updatedAdmin))
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const username = req.params.username

        AdminsService.deleteAdmin(req.app.get('db'), username)
            .then(admins => {
                res
                    .status(201)
                    .json(admins.map(AdminsService.serializeAdmin))
            })
            .catch(next)
    })

adminsRouter
    .route('/admin')
    .all(requireAdminAuth)
    .get((req, res, next) => {
        const { id } = req.user
        console.log(id)
        AdminsService.getAdminById(req.app.get('db'), id)
            .then(admin => {
                if (!admin) {
                    res
                        .status(400)
                        .json({
                            error: `Admin doesn't exist`
                        })
                    next()
                } else {
                    res.json(AdminsService.serializeAdmin(admin))
                }
            })
    })

module.exports = adminsRouter