const express = require('express')
const TeacherService = require('./teachers-service')
const SchoolsService = require('../schools/schools-service')
const { requireTeacherAuth } = require('../middleware/jwt-auth')

const teacherRouter = express.Router()

teacherRouter
    .get('/', (req, res, next) => {
        TeacherService.getAllTeachers(req.app.get('db'))
            .then(teachers => res.json(teachers))
            .catch(next)
    })
    .get('/:teacherId', requireTeacherAuth, (req, res, next) => {
        const { teacherId } = req.params
        TeacherService.getById((req.app.get('db')), teacherId)
            .then(teacher => {
                if (!teacher) {
                    res.status(404).json({
                        error: 'Teacher not found'
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
                            .then(teacher => res.json(teacher))
                    })
            })
            .catch(next)
    })
    .patch('/:teacherId', (req, res, next) => {
        const { teacherId } = req.params
        const newTeacher = newTeacherFn(req)
        TeacherService.updateTeacher((req.app.get('db')), teacherId, newTeacher)
            .then(updatedTeacher => res.json(updatedTeacher))
            .catch(next)
    })
    .delete('/:teacherId', (req, res, next) => {
        const { teacherId } = req.params
        TeacherService.deleteTeacher((req.app.get('db')), teacherId)
            .then(row => {
                if (row === 0) {
                    res.status(404).json({
                        error: 'unable to delete teacher, teacher not found'
                    })
                }
                res.json(row)
            })
    })
    .get('/teacher/profile', requireTeacherAuth)

function newTeacherFn(req) {
    return ({
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
    )
}

module.exports = teacherRouter