const ApplicationsService = {
    getAllApplications(db) {
        return db
            .from('everest_applications')
            .join('everest_teachers', 'everest_teachers.teacher_id', '=', 'everest_applications.teacher')
            .select('*')
            .join('everest_jobs', 'everest_jobs.job_id', '=', 'everest_applications.job')
            .select('*')
            .join('everest_schools', 'everest_schools.school_id', '=', 'everest_jobs.schoolid')
    },
    getApplicationsForSchool(db, schoolId) {
        return ApplicationsService.getAllApplications(db)
            .where('school_id', schoolId)
            .select('*')

    },
    getApplicationsForTeacher(db, teacherId) {
        return ApplicationsService.getAllApplications(db)
            .where('teacher', teacherId)
            .select('*')

    },
    getApplicationById(db, applicationId) {
        return db
            .from('everest_applications')
            .where('everest_applications.application_id', applicationId)
            .join('everest_teachers', 'everest_teachers.teacher_id', '=', 'everest_applications.teacher')
            .join('everest_jobs', 'everest_jobs.job_id', '=', 'everest_applications.job')
            .join('everest_schools', 'everest_schools.school_id', '=', 'everest_jobs.schoolid')
    },
    toggleAppApproval(db, applicationId, newApplicationField) {
        return db('everest_applications')
            .where('application_id', applicationId)
            .update(newApplicationField)
    },
    deleteApplication(db, applicationId) {
        return db('everest_applications')
            .where('application_id', applicationId)
            .del()
            .then(response => ApplicationsService.getAllApplications(db))
    }
}

module.exports = ApplicationsService