const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const { makeAdminArray, seedAdminUsers } = require('./test-helpers')

describe('Admins Endpoints', function () {
    let db

    const testAdminUsers = makeAdminArray()
    const testAdmin = {
        first_name: 'test1',
        last_name: 'test1',
        username: 'test1',
        email: 'test1@test.net',
        password: '!wW101010',
        permission: 'permission'
    }
    const expectedAdmin = {
        first_name: 'updated_first_name',
        last_name: 'updated_last_name',
        email: 'update@test.net'
    }

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE everest_admins RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE everest_admins RESTART IDENTITY CASCADE'))

    describe('GET /api/admins', () => {
        context('Given there are no admins', () => {
            it('returns 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/admins')
                    .expect(200, [])
            })
        })

        context('Given there are admins', () => {
            beforeEach('insert admins', () => seedAdminUsers(
                db,
                testAdminUsers
            ))
            it('responds with 200 and an array with all the admins', () => {
                return supertest(app)
                    .get('/api/admins')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                        const admin = res.body[0]
                        expect(admin).to.include.all.keys('id', 'first_name', 'last_name', 'username', 'email', 'password', 'date_created', 'date_modified')
                    })
            })
        })
    })

    describe('POST /api/admins', () => {

        it('responds with 200 and the new admin', () => {
            return supertest(app)
                .post('/api/admins')
                .send(testAdmin)
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.include.all.keys('id', 'first_name', 'last_name', 'username', 'email', 'password', 'date_created', 'date_modified')
                })
        })
    })

    describe('GET /api/admins/admin/:id', () => {
        context('Give no admin', () => {
            it('responds with 400 and an error message', () => {
                const id = 99999
                return supertest(app)
                    .get(`/api/admins/admin/${id}`)
                    .expect(404, { error: `Admin doesn't exist` })

            })
        })

        context('Given there is an admin', () => {
            beforeEach('insert admins', () => seedAdminUsers(
                db,
                testAdminUsers
            ))
            it('responds with 200 and an admin object', () => {
                const id = 1
                return supertest(app)
                    .get(`/api/admins/admin/${id}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.include.all.keys('id', 'first_name', 'last_name', 'username', 'email', 'password', 'date_created', 'date_modified')
                    })
            })
        })
    })

    describe('PATCH /api/admins/admin/:id', () => {
        context('Given no admin', () => {
            it('responds with 404 and an error message', () => {
                const id = 99999
                return supertest(app)
                    .patch(`/api/admins/admin/${id}`)
                    .send(expectedAdmin)
                    .expect(404, { error: `Admin doesn't exist` })

            })
        })

        context('Given there is an admin', () => {
            beforeEach('insert admins', () => seedAdminUsers(
                db,
                testAdminUsers
            ))
            it('responds with 201 and the updated admin', () => {
                const id = 1
                return supertest(app)
                    .patch(`/api/admins/admin/${id}`)
                    .send(expectedAdmin)
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                        const { first_name, last_name, email } = res.body
                        expect(first_name).to.equal(expectedAdmin.first_name)
                        expect(last_name).to.equal(expectedAdmin.last_name)
                        expect(email).to.equal(expectedAdmin.email)
                    })
            })
        })
    })

    describe('DELETE /api/admins/admin/:id', () => {
        context('Given there is an admin', () => {
            beforeEach('insert admins', () => seedAdminUsers(
                db,
                testAdminUsers
            ))
            it('responds with 201 and an updated array of admins', () => {
                const idToDelete = 1
                return supertest(app)
                    .delete(`/api/admins/admin/${idToDelete}`)
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                        const length = res.body.length
                        const expectedLength = testAdminUsers.length - 1
                        expect(length).to.equal(expectedLength)
                    })
            })
        })
    })

    describe('GET /api/admins/admin', () => {
        beforeEach('insert admins', () => seedAdminUsers(
            db,
            testAdminUsers
        ))

        it('responds with 200 and the current admin profile', () => {
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NjcwMjk4MjIsInN1YiI6InRlc3QxIn0.Hn9oCoUWAdS9ik_pm95uKVi6IMVLifJ24qYNTL1WhRU'
            return supertest(app)
                .get('/api/admins/admin')
                .set('Authorization', 'bearer ' + authToken)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.include.all.keys('id', 'first_name', 'last_name', 'username', 'email', 'password', 'date_created', 'date_modified')
                })
        })
    })
})