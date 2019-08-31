const knex = require('knex')
const app = require('../src/app')
const { makeTeacherArray, seedTeacherUsers, makeAdminArray } = require('./test-helpers')
const { authToken_Teacher, authToken_Admin } = require('../src/config')

describe('Teachers Endpoints', () => {
    let db

    const testTeachers = makeTeacherArray()
    const newTeacher = testTeachers[0]

    const testAdmins = makeAdminArray()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE everest_teachers, everest_admins RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE everest_teachers, everest_admins RESTART IDENTITY CASCADE'))

    describe('GET /api/teachers', () => {
        context('Given there are no teachers', () => {
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/teachers')
                    .expect(200, [])
            })
        })

        context('Given there are teachers', () => {
            beforeEach('insert teachers', () => seedTeacherUsers(
                db,
                testTeachers
            ))
            it('responds with 200 and an array of teachers', () => {
                return supertest(app)
                    .get('/api/teachers')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                    })
            })
        })
    })

    describe('POST /api/teachers', () => {
        it('responds with 201 and the new teacher object', () => {
            return supertest(app)
                .post('/api/teachers')
                .send(newTeacher)
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })
    })

    describe('GET /api/teachers/teacher/:teacher_id', () => {
        const authToken = authToken_Admin
        beforeEach('insert teachers and admins', () => seedTeacherUsers(
            db,
            testTeachers
        ).then(() => {
            return db
                .into('everest_admins')
                .insert(testAdmins)
        })
        )
        context('Given there are no teachers', () => {
            it('responds with 404 and an error message', () => {
                const teacher_id = 10000000
                return supertest(app)
                    .get(`/api/teachers/teacher/${teacher_id}`)
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(404, { error: `Teacher doesn't exist` })
            })
        })

        context('Given there are teachers', () => {
            it('responds with 200 and the requested teacher', () => {
                const teacher_id = 1
                return supertest(app)
                    .get(`/api/teachers/teacher/${teacher_id}`)
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })

    describe('DELETE /api/teachers/teacher/:teacher_id', () => {
        context('Given there are no teachers', () => {
            it('responds with 404 and an error message', () => {
                const teacher_id = 10000000
                return supertest(app)
                    .delete(`/api/teachers/${teacher_id}`)
                    .expect(404, { error: `Teacher doesn't exist` })
            })
        })

        context('Given there are teachers', () => {
            beforeEach('insert teachers', () => seedTeacherUsers(
                db,
                testTeachers
            ))
            it('responds with 204', () => {
                const teacher_id = 1
                return supertest(app)
                    .delete(`/api/teachers/${teacher_id}`)
                    .expect(200, '1')
            })
        })
    })

    describe('PATCH /api/teachers/teacher/:teacher_id', () => {
        context('Given there are no teachers', () => {
            it('responds with 404 and an error message', () => {
                const teacher_id = 10000000
                return supertest(app)
                    .patch(`/api/teachers/teacher/${teacher_id}`)
                    .send(newTeacher)
                    .expect(404, { error: `Teacher doesn't exist` })
            })
        })

        context('Given there are jobs', () => {
            beforeEach('insert teachers', () => seedTeacherUsers(
                db,
                testTeachers
            ))
            it('responds with 200', () => {
                teacher_id = 1
                return supertest(app)
                    .patch(`/api/teachers/teacher/${teacher_id}`)
                    .send(newTeacher)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })

    describe('GET /api/teachers/teacher', () => {
        beforeEach('insert teachers', () => seedTeacherUsers(
            db,
            testTeachers
        ))
        it('responds with 200 and the current teacher profile', () => {
            const authToken = authToken_Teacher
            return supertest(app)
                .get('/api/teachers/teacher')
                .set('Authorization', 'bearer ' + authToken)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })
    })
})