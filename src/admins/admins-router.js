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
            .then(admins => res.status(200).json(admins))
            .catch(next)
    })
    .post((req, res, next) => {
        const { first_name, last_name, username, email, password, permission } = req.body
        const newAdmin = { first_name, last_name, username, email, password, permission }
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
                    return res.status(409).json({ error: 'Username already taken' })
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
            .then(admin => {
                if (!admin) {
                    return res
                        .status(404)
                        .json({
                            error: `Admin doesn't exist`
                        })
                    next()
                } else {
                    return res.json(AdminsService.serializeAdmin(admin))
                }
            })
            .catch(next)
    })
    .patch((req, res, next) => {
        const id = req.params.id
        const { first_name, last_name, email } = req.body
        const newAdmin = { first_name, last_name, email }

        const requiredFields = ['first_name', 'last_name', 'email']
        requiredFields.forEach(field => {
            if (newAdmin[field] === "") {
                return res
                    .status(401)
                    .json({
                        error: `Missing '${field}' in request body`
                    })
            }
        })

        AdminsService.updateAdmin(req.app.get('db'), id, newAdmin)
            .then(updatedAdmin => {
                if (!updatedAdmin) {
                    return res
                        .status(404)
                        .json({ error: `Admin doesn't exist` })
                    next()
                } else {
                    return res
                        .status(201)
                        .json(AdminsService.serializeAdmin(updatedAdmin))
                }
            })
            .catch(next)

        // const passwordError = AdminsService.validatePassword(password)

        // if (passwordError) {
        //     return res.status(400).json({ error: passwordError })
        // }

        // AdminsService.hashPassword(password)
        //     .then(hashedPassword => {
        //         const updatedAdmin = {
        //             first_name,
        //             last_name,
        //             password: hashedPassword,
        //             email
        //         }
        //         return AdminsService.updateAdmin(req.app.get('db'), id, updatedAdmin)
        //             .then(updatedAdmin => {
        //                 res
        //                     .status(201)
        //                     .json(AdminsService.serializeAdmin(updatedAdmin))
        //             })
        //             .catch(next)
        //     })
    })
    .delete((req, res, next) => {
        const id = req.params.id
        AdminsService.deleteAdmin(req.app.get('db'), id)
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