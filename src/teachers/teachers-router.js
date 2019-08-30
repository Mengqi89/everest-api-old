const express = require('express')
const TeacherService = require('./teachers-service')
const SchoolsService = require('../schools/schools-service')
const { requireTeacherAuth, requireAdminAuth } = require('../middleware/jwt-auth')


const teacherRouter = express.Router()

teacherRouter
    .get('/', (req, res, next) => {
        TeacherService.getAllTeachers(req.app.get('db'))
            .then(teachers => res.json(teachers))
            .catch(next)
    })
    .get('/teacher', requireTeacherAuth, (req, res, next) => {
        const { id } = req.user
        TeacherService.getById(req.app.get('db'), id)
            .then(teacher => {
                if (!teacher) {
                    res.status.json({ error: `Teacher does't exist` })
                    next()
                } else (
                    res.json(teacher)
                )
            })
    })
    .get('/teacher/:teacher_id', requireAdminAuth, (req, res, next) => {
        const { teacher_id } = req.params
        TeacherService.getById((req.app.get('db')), teacher_id)
            .then(teacher => {
                if (!teacher) {
                    res.status(404).json({
                        error: `Teacher doesn't exist`
                    })
                }
                res.json(teacher)
            })
            .catch(next)
    })
    .post('/', (req, res, next) => {
        const {
            username,
            password,
            first_name,
            last_name,
            age,
            sex,
            nationality,
            race,
            native_speaker,
            married,
            highest_degree,
            field_of_degree,
            school,
            certification,
            years_of_experience,
            years_in_china,
            years_teaching_abroad
        } = req.body

        for (const field of [
            'username',
            'password',
            'first_name',
            'last_name',
            'age',
            'sex',
            'nationality',
            'race',
            'native_speaker',
            'married',
            'highest_degree',
            'field_of_degree',
            'school',
            'certification',
            'years_of_experience',
            'years_in_china',
            'years_teaching_abroad'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })

        const passwordError = SchoolsService.validatePassword(password)

        if (passwordError)
            return res.status(400).json({ error: passwordError })

        TeacherService.hasUsername(req.app.get('db'), username)
            .then(hasUsername => {
                if (hasUsername)
                    return res.status(400).json({ error: `Username already taken` })

                return SchoolsService.hashPassword(password)
                    .then(hashedPassword => {
                        const newTeacher = {
                            username,
                            password: hashedPassword,
                            first_name,
                            last_name,
                            age,
                            sex,
                            nationality,
                            race,
                            native_speaker,
                            married,
                            highest_degree,
                            field_of_degree,
                            school,
                            certification,
                            years_of_experience,
                            years_in_china,
                            years_teaching_abroad

                        }
                        return TeacherService.insertTeacher((req.app.get('db')), newTeacher)
                            .then(teacher => res.status(201).json(teacher))
                    })
            })
            .catch(next)
    })
    .patch('/teacher/:teacher_id', (req, res, next) => {
        //need to hash password
        const { teacher_id } = req.params
        const newTeacher = newTeacherFn(req)
        const { password } = req.body

        const passwordError = SchoolsService.validatePassword(password)

        if (passwordError) {
            return res.status(404).json(passwordError)
        }

        SchoolsService.hashPassword(password)
            .then(hashedPassword => {
                newTeacher.password = hashedPassword

                TeacherService.updateTeacher((req.app.get('db')), teacher_id, newTeacher)
                    .then(updatedTeacher => {
                        if (!updatedTeacher) {
                            return res.status(404).json({ error: `Teacher doesn't exist` })
                        } else {
                            return res.status(200).json(updatedTeacher)
                        }
                    })
                    .catch(next)
            })


    })
    .delete('/:teacher_id', (req, res, next) => {
        const { teacher_id } = req.params
        TeacherService.deleteTeacher((req.app.get('db')), teacher_id)
            .then(numRowsAffected => {
                if (numRowsAffected === 0) {
                    return res.status(404).json({
                        error: `Teacher doesn't exist`
                    })
                } else {
                    return res.status(200).json(numRowsAffected)
                }
            })
    })


function newTeacherFn(req) {
    return ({
        username,
        first_name,
        last_name,
        age,
        sex,
        nationality,
        race,
        native_speaker,
        married,
        highest_degree,
        field_of_degree,
        school,
        certification,
        years_of_experience,
        years_in_china,
        years_teaching_abroad
    } = req.body
    )
}

module.exports = teacherRouter