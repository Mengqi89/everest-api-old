const app = require('../src/app')
const jwt = require('jsonwebtoken')
const knex = require('knex')
const { makeAdminArray, seedAdminUsers, makeTeacherArray, seedTeacherUsers, makeSchoolArray, seedSchoolUsers } = require('./test-helpers')

describe('Auth Endpoints', () => {
    let db

    const testAdminUsers = makeAdminArray()
    const testAdmin = testAdminUsers[0]

    const testTeacherUsers = makeTeacherArray()
    const testTeacher = testTeacherUsers[0]

    const testSchoolUsers = makeSchoolArray()
    const testSchool = testSchoolUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE everest_admins, everest_teachers, everest_schools RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE everest_admins, everest_teachers, everest_schools RESTART IDENTITY CASCADE'))

    describe('POST /api/auth/login/admins', () => {
        beforeEach('insert admins', () => seedAdminUsers(
            db,
            testAdminUsers
        ))
        it('responds 200 and a JWT auth token', () => {
            const adminValidCreds = {
                username: testAdmin.username,
                password: testAdmin.password
            }
            const expectedToken = jwt.sign(
                { user_id: testAdmin.id },
                process.env.JWT_SECRET,
                {
                    subject: testAdmin.username,
                    algorithm: 'HS256'
                })
            return supertest(app)
                .post('/api/auth/login/admins')
                .send(adminValidCreds)
                .expect(200, {
                    authToken: expectedToken
                })
        })
    })

    describe('POST /api/auth/login/teachers', () => {
        beforeEach('insert teachers', () => seedTeacherUsers(
            db,
            testTeacherUsers
        ))
        it('responds 200 and a JWT auth token', () => {
            const teacherValidCreds = {
                username: testTeacher.username,
                password: testTeacher.password
            }
            const expectedToken = jwt.sign(
                { user_id: testTeacher.id },
                process.env.JWT_SECRET,
                {
                    subject: testTeacher.username,
                    algorithm: 'HS256'
                })
            return supertest(app)
                .post('/api/auth/login/teachers')
                .send(teacherValidCreds)
                .expect(200, {
                    authToken: expectedToken
                })
        })
    })

    describe('POST /api/auth/login/schools', () => {
        beforeEach('insert schools', () => seedSchoolUsers(
            db,
            testSchoolUsers
        ))
        it('responds 200 and a JWT auth token', () => {
            const schoolValidCreds = {
                username: testSchool.username,
                password: testSchool.password
            }
            const expectedToken = jwt.sign(
                { user_id: testSchool.id },
                process.env.JWT_SECRET,
                {
                    subject: testSchool.username,
                    algorithm: 'HS256'
                })
            return supertest(app)
                .post('/api/auth/login/schools')
                .send(schoolValidCreds)
                .expect(200, {
                    authToken: expectedToken
                })
        })
    })

})