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
    getApplicationById(db, jobId, teacherId) {
        return this.getAllApplications(db)
            .where('job', jobId)
            .where('teacher', teacherId)
            .first()
    }
}

module.exports = ApplicationsService