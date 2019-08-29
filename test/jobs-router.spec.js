const knex = require('knex')
const app = require('../src/app')
const { makeJobArray, makeSchoolArray } = require('./test-helpers')

describe('Jobs Endpoints', () => {
    let db

    const testJobs = makeJobArray()
    const testJob = testJobs[0]
    const testSchools = makeSchoolArray()
    const {
        job_title,
        course,
        grade_level,
        textbook_used,
        number_of_courses_to_teach,
        number_of_sections,
        max_class_size,
        total_hours_of_class_per_week,
        extra_duties_required,
        hours_of_extra_duties_per_week,
        minimum_degree_required,
        preferred_degree,
        minimum_experience_required,
        preferred_experience_level,
        native_english_speaker,
        other_qualification,
        base_pay_per_month,
        bonuses,
        plane_ticket_provided_to_china,
        plane_ticket_provided_from_china,
        plane_ticket_reimbursment,
        paid_time_off,
        sick_days,
        personal_days,
        time_off_for_holidays,
        total_salary,
        job_school_id
    } = testJobs[0]
    const newJob = {
        job_title,
        course,
        grade_level,
        textbook_used,
        number_of_courses_to_teach,
        number_of_sections,
        max_class_size,
        total_hours_of_class_per_week,
        extra_duties_required,
        hours_of_extra_duties_per_week,
        minimum_degree_required,
        preferred_degree,
        minimum_experience_required,
        preferred_experience_level,
        native_english_speaker,
        other_qualification,
        base_pay_per_month,
        bonuses,
        plane_ticket_provided_to_china,
        plane_ticket_provided_from_china,
        plane_ticket_reimbursment,
        paid_time_off,
        sick_days,
        personal_days,
        time_off_for_holidays,
        total_salary,
        job_school_id
    }

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE everest_jobs, everest_schools RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE everest_jobs, everest_schools RESTART IDENTITY CASCADE'))

    describe('GET /api/jobs', () => {
        context('Given there are no jobs', () => {
            it('responds with 200 and an empty array', () => {
                return supertest(app)
                    .get('/api/jobs')
                    .expect(200, [])
            })
        })

        context('Given there are jobs', () => {
            beforeEach('insert schools and jobs', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
            })
            it('responds with 200 and an array of jobs', () => {
                return supertest(app)
                    .get('/api/jobs')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('array')
                    })
            })
        })
    })

    describe('POST /api/jobs', () => {

        beforeEach('insert schools', () => {
            return db
                .into('everest_schools')
                .insert(testSchools)
        })

        it('responds with 201 and the new job object', () => {
            return supertest(app)
                .post('/api/jobs')
                .send(newJob)
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('object')
                })
        })
    })

    describe('GET /api/jobs/:job_id', () => {
        context('Given there are no jobs', () => {
            it('responds with 404 and an error message', () => {
                const job_id = 10000000
                return supertest(app)
                    .get(`/api/jobs/${job_id}`)
                    .expect(404, { error: `Job doesn't exist` })
            })
        })

        context('Given there are jobs', () => {
            beforeEach('insert schools and jobs', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
            })
            it('responds with 200 and the requested job', () => {
                const job_id = 1
                return supertest(app)
                    .get(`/api/jobs/${job_id}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })

    describe('DELETE /api/jobs/:job_id', () => {
        context('Given there are no jobs', () => {
            it('responds with 404 and an error message', () => {
                const job_id = 10000000
                return supertest(app)
                    .delete(`/api/jobs/${job_id}`)
                    .expect(404, { error: `Job doesn't exist` })
            })
        })

        context('Given there are jobs', () => {
            beforeEach('insert schools and jobs', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
            })
            it('responds with 204', () => {
                const job_id = 1
                return supertest(app)
                    .delete(`/api/jobs/${job_id}`)
                    .expect(204)
            })
        })
    })

    describe('PATCH /api/jobs/:job_id', () => {
        context('Given there are no jobs', () => {
            it('responds with 404 and an error message', () => {
                const job_id = 10000000
                return supertest(app)
                    .patch(`/api/jobs/${job_id}`)
                    .send(testJob)
                    .expect(404, { error: `Job doesn't exist` })
            })
        })

        context('Given there are jobs', () => {
            beforeEach('insert schools and jobs', () => {
                return db
                    .into('everest_schools')
                    .insert(testSchools)
                    .then(() => {
                        return db
                            .into('everest_jobs')
                            .insert(testJobs)
                    })
            })
            it('responds with 200', () => {
                job_id = 1
                return supertest(app)
                    .patch(`/api/jobs/${job_id}`)
                    .send(testJob)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                    })
            })
        })
    })
})