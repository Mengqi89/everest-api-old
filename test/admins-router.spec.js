const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const { makeAdminArray, seedAdminUsers } = require('./test-helpers')

describe('Admins Endpoints', function () {
    let db

    const testAdminUsers = makeAdminArray()
    const testAdmin = {
        'id': 1,
        'first_name': 'test1',
        'last_name': 'test1',
        'username': 'test1',
        'email': 'test1@test.net',
        'password': '!wW101010',
        'permission': 'permission'
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
            console.log(testAdminUsers)
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
        })
    })
})