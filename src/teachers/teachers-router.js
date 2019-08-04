const express = require('express')
const teacherService = require('./teachers-service')

const teacherRouter = express.Router()

teacherRouter
    .get('/', (req, res, next) => {
        teacherService.getAllTeachers(req.app.get('db'))
            .then(teachers => res.json(teachers))
            .catch(next)
    })
    .get('/:teacherId', (req, res, next) => {
        const { teacherId } = req.params
        teacherService.getById((req.app.get('db')), teacherId)
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
    .post('/register', (req, res, next) => {
        const newTeacher = newTeacherFn(req)
        teacherService.postTeacher((req.app.get('db')), newTeacher)
            .then(teacher => res.json(teacher))
            .catch(next)
    })
    .patch('/:teacherId', (req, res, next) => {
        const { teacherId } = req.params
        const newTeacher = newTeacherFn(req)
        teacherService.updateTeacher((req.app.get('db')), teacherId, newTeacher)
            .then(updatedTeacher => res.json(updatedTeacher))
            .catch(next)
    })
    .delete('/:teacherId', (req, res, next) => {
        const { teacherId } = req.params
        teacherService.deleteTeacher((req.app.get('db')), teacherId)
            .then(teacher => res.json(teacher))
    })


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