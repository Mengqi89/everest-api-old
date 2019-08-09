const ApplicationsService = {
    getAllApplications(db) {
        return db
            .from('everest_applications')
            .join('everest_teachers', 'everest_teachers.id', '=', 'everest_applications.teacher')
            .select('*')
            .join('everest_jobs', 'everest_jobs.id', '=', 'everest_applications.job')
            .select('*')
            .join('everest_schools', 'everest_schools.id', '=', 'everest_jobs.school_id')
    },
    getApplicationById(db, applicationId) {
        return db
            .from('everest_applications')
            .where('everest_applications.id', applicationId)
            .join('everest_teachers', 'everest_teachers.id', '=', 'everest_applications.teacher')
            .join('everest_jobs', 'everest_jobs.id', '=', 'everest_applications.job')
            .join('everest_schools', 'everest_schools.id', '=', 'everest_jobs.school_id')
    },
    toggleAppApproval(db, applicationId, newApplicationField) {
        return db('everest_applications')
            .where('id', applicationId)
            .update(newApplicationField)
    }
}

module.exports = ApplicationsService