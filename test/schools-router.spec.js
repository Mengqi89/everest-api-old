const knex = require('knex')
const app = require('../src/app')
const { makeSchoolArray, makeNewSchool, seedSchoolUsers } = require('./test-helpers')
const { authToken_School } = require('../src/config')

describe('Schools Endpoints', () => {
    let db

    const testSchools = makeSchoolArray()
    const testSchool = testSchools[0]
    const newSchool = makeNewSchool()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE everest_schools RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE everest_schools RESTART IDENTITY CASCADE'))

    describe('GET /api/schools', () => {
        context('Given there are no schools', () => {
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/jobs')
                    .expect(200, [])
            })
        })

        context('Given there are schools', () => {
            beforeEach('insert schools', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)

            })
            it('responds with 200 and an array of schools', () => {
                return supertest(app)
                    .get('/api/schools')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                    })
            })
        })
    })

    describe('POST /api/schools', () => {
        it('responds with 201 and the new job object', () => {
            return supertest(app)
                .post('/api/schools')
                .send(newSchool)
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })
    })

    describe('GET /api/schools/school/:school_id', () => {
        context('Given there are no schools', () => {
            it('responds with 404 and an error message', () => {
                const school_id = 10000000
                return supertest(app)
                    .get(`/api/schools/school/${school_id}`)
                    .expect(404, { error: `School doesn't exist` })
            })
        })

        context('Given there are schools', () => {
            beforeEach('insert schools', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
            })
            it('responds with 200 and the requested school', () => {
                const school_id = 1
                return supertest(app)
                    .get(`/api/schools/school/${school_id}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })

    describe('DELETE /api/schools/school/:school_id', () => {
        context('Given there are no schools', () => {
            it('responds with 404 and an error message', () => {
                const school_id = 10000000
                return supertest(app)
                    .delete(`/api/schools/school/${school_id}`)
                    .expect(404, { error: `School doesn't exist` })
            })
        })

        context('Given there are Schools', () => {
            beforeEach('insert schools', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
            })
            it('responds with 204', () => {
                const school_id = 1
                return supertest(app)
                    .delete(`/api/schools/school/${school_id}`)
                    .expect(204)
            })
        })
    })

    describe('PATCH /api/schools/school/:school_id', () => {
        context('Given there are no schools', () => {
            it('responds with 404 and an error message', () => {
                const school_id = 10000000
                return supertest(app)
                    .patch(`/api/schools/school/${school_id}`)
                    .send(testSchool)
                    .expect(404, { error: `School doesn't exist` })
            })
        })

        context('Given there are jobs', () => {
            beforeEach('insert schools', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
            })
            it('responds with 200', () => {
                school_id = 1
                return supertest(app)
                    .patch(`/api/schools/school/${school_id}`)
                    .send(testSchool)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })

    describe('GET /api/schools/school', () => {
        beforeEach('insert schools', () => seedSchoolUsers(
            db,
            testSchools
        ))

        it('responds with 200 and the current school profile', () => {
            const authToken = authToken_School
            return supertest(app)
                .get('/api/schools/school')
                .set('Authorization', 'bearer ' + authToken)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })
    })
})