const JobsService = {
    getAllJobs(knex) {
        return knex.from('everest_jobs')
            .select('*')
            .join('everest_schools', 'everest_schools.id', '=', 'everest_jobs.job_school_id')
            .select('location')

    },
    insertJob(knex, newJob) {
        return knex.insert(newJob)
            .into('everest_jobs')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('everest_jobs')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteJob(db, id) {
        return db('everest_jobs')
            .where('id', id)
            .delete()
            .then(res => JobsService.getAllJobs(db))
    },
    updateJob(db, id, newJobsFields) {
        return db('everest_jobs')
            .where('id', id)
            .update(newJobsFields)

    },

    serializeJob(job) {
        return {
            job_id: job.id,
            job_school_id: job.job_school_id,
            job_title: job.job_title,
            course: job.course,
            grade_level: job.grade_level,
            textbook_used: job.textbook_used,
            number_of_courses_to_teach: job.number_of_courses_to_teach,
            number_of_sections: job.number_of_sections,
            max_class_size: job.max_class_size,
            total_hours_of_class_per_week: job.total_hours_of_class_per_week,
            extra_duties_required: job.extra_duties_required,
            hours_of_extra_duties_per_week: job.hours_of_extra_duties_per_week,
            minimum_degree_required: job.minimum_degree_required,
            preferred_degree: job.preferred_degree,
            minimum_experience_required: job.minimum_experience_requiredR,
            preferred_experience_level: job.preferred_experience_level,
            native_english_speaker: job.native_english_speaker,
            other_qualification: job.other_qualification,
            base_pay_per_month: job.base_pay_per_month,
            bonuses: job.bonuses,
            plane_ticket_provided_to_china: job.plane_ticket_provided_to_china,
            plane_ticket_provided_from_china: job.plane_ticket_provided_from_china,
            plane_ticket_reimbursment: job.plane_ticket_reimbursment,
            paid_time_off: job.paid_time_off,
            sick_days: job.sick_days,
            personal_days: job.personal_days,
            time_off_for_holidays: job.time_off_for_holidays,
            total_salary: job.total_salary,
            location: job.location
        }
    }
}

module.exports = JobsService