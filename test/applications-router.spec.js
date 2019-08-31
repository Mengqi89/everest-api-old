const knex = require('knex')
const app = require('../src/app')
const { makeApplicationArray, makeTeacherArray, makeSchoolArray, makeJobArray } = require('./test-helpers')
const { authToken_Teacher, authToken_School } = require('../src/config')

describe('Applications Endpoints', () => {
    let db

    const testApplications = makeApplicationArray()
    const testApplication = testApplications[0]
    const newApplication = {
        job_id: 1,
        school_id: 2
    }

    const testTeachers = makeTeacherArray()
    const testSchools = makeSchoolArray()
    const testJobs = makeJobArray()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE everest_jobs, everest_schools, everest_teachers, everest_applications RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE everest_jobs, everest_schools, everest_teachers, everest_applications RESTART IDENTITY CASCADE'))

    describe('GET /api/applications/admin', () => {
        context('Given there are no applications', () => {
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/applications/admin')
                    .expect(200, [])
            })
        })

        context('Given there are applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
                    .then(() => {
                        return db
                            .into('everest_applications')
                            .insert(testApplications)
                    })
            })
            it('responds with 200 and an array of applications', () => {
                return supertest(app)
                    .get('/api/applications/admin')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                    })
            })
        })
    })

    describe('GET /api/applications/school', () => {
        const authToken = authToken_School

        context('Given there are no applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
            })
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/applications/school')
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200, [])
            })
        })

        context('Given there are applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
                    .then(() => {
                        return db
                            .into('everest_applications')
                            .insert(testApplications)
                    })
            })
            it('responds with 200 and an array of applications', () => {
                return supertest(app)
                    .get('/api/applications/school')
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                    })
            })
        })
    })

    describe('GET /api/applications/teacher', () => {
        const authToken = authToken_Teacher

        context('Given there are no applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
            })
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/applications/teacher')
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200, [])
            })
        })

        context('Given there are applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
                    .then(() => {
                        return db
                            .into('everest_applications')
                            .insert(testApplications)
                    })
            })
            it('responds with 200 and an array of applications', () => {
                return supertest(app)
                    .get('/api/applications/teacher')
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                    })
            })
        })
    })

    describe('POST /api/applications/', () => {
        beforeEach('insert schools, teachers, jobs and applications', () => {
            return db
                .into('everest_schools')
                .insert(testSchools)
                .then(() => {
                    return db
                        .into('everest_teachers')
                        .insert(testTeachers)
                })
                .then(() => {
                    return db
                        .into('everest_jobs')
                        .insert(testJobs)
                })
        })
        it('responds with 201 and the new application object', () => {
            const authToken = authToken_Teacher

            return supertest(app)
                .post('/api/applications/')
                .set('Authorization', 'bearer ' + authToken)
                .send(newApplication)
                .expect(201)
        })



    })

    describe('GET /api/applications/:application_id', () => {
        context('Given there are no applications', () => {
            it('responds with 404 and an error message', () => {
                const application_id = 1000000
                return supertest(app)
                    .get(`/api/applications/${application_id}`)
                    .expect(404, { error: `Application doesn't exist` })
            })
        })

        context('Given there are applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
                    .then(() => {
                        return db
                            .into('everest_applications')
                            .insert(testApplications)
                    })
            })
            it('responds with 200 and the requested application object', () => {
                const application_id = 1
                return supertest(app)
                    .get(`/api/applications/${application_id}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })

    describe('PATCH /api/applications/:application_id', () => {
        const newApplicationField = {
            application_approved: true
        }
        beforeEach('insert schools, teachers, jobs and applications', () => {
            return db
                .into('everest_schools')
                .insert(testSchools)
                .then(() => {
                    return db
                        .into('everest_teachers')
                        .insert(testTeachers)
                })
                .then(() => {
                    return db
                        .into('everest_jobs')
                        .insert(testJobs)
                })
                .then(() => {
                    return db
                        .into('everest_applications')
                        .insert(testApplications)
                })
        })
        it('responds with 200 and the requested application object', () => {
            const application_id = 1
            return supertest(app)
                .patch(`/api/applications/${application_id}`)
                .send(newApplicationField)
                .expect(200)
                .then(res => {
                    expect(res.body).to.equal(1)
                })
        })
    })

    describe('DELETE /api/applications/:application_id', () => {
        context('Given there are no applications', () => {
            it('responds with 404 and an error message', () => {
                const application_id = 1000000
                return supertest(app)
                    .delete(`/api/applications/${application_id}`)
                    .expect(404, { error: `Application doesn't exist` })
            })
        })

        context('Given there are applications', () => {
            beforeEach('insert schools, teachers, jobs and applications', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_teachers')
                            .insert(testTeachers)
                    })
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
                    .then(() => {
                        return db
                            .into('everest_applications')
                            .insert(testApplications)
                    })
            })
            it('responds with 202 and the amount of rows affected', () => {
                const application_id = 1
                return supertest(app)
                    .delete(`/api/applications/${application_id}`)
                    .expect(202)
                    .then(res => {
                        expect(res.body).to.equal(1)
                    })
            })
        })
    })
})