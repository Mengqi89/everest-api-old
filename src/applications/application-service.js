const ApplicationsService = {
  getAllApplications(db) {
    return (
      db
        // .from('everest_applications')
        // .join('everest_teachers', 'everest_teachers.id', '=', 'everest_applications.teacher')
        // .select('*')
        // .join('everest_jobs', 'everest_jobs.id', '=', 'everest_applications.job')
        // .select('*')
        // .join('everest_schools', 'everest_schools.id', '=', 'everest_jobs.school_id')
        .from('everest_applications as apps')
        .select(
          'apps.id as app_id',
          'apps.job_id as app_job',
          'apps.school_id as app_school',
          'schools.school_name',
          'jobs.id as job_id',
          'jobs.job_title as job_title',
          'teachers.first_name as teacher_first',
          'teachers.last_name as teacher_last',
          'teachers.id as teacher_id'
        )
        .innerJoin('everest_schools as schools', 'apps.school_id', 'schools.id')
        .innerJoin('everest_jobs as jobs', 'apps.job_id', 'jobs.id')
        .innerJoin(
          'everest_teachers as teachers',
          'apps.teacher_id',
          'teachers.id'
        )
    );
  },
  getApplicationsForSchool(db, schoolId) {
    return db
      .from('everest_applications as apps')
      .select(
        'apps.id as app_id',
        'apps.job_id as app_job',
        'apps.school_id as app_school',
        'schools.school_name',
        'jobs.id as job_id',
        'jobs.job_title as job_title',
        'teachers.first_name as teacher_first',
        'teachers.last_name as teacher_last',
        'teachers.id as teacher_id'
      )
      .innerJoin('everest_schools as schools', 'apps.school_id', 'schools.id')
      .innerJoin('everest_jobs as jobs', 'apps.job_id', 'jobs.id')
      .innerJoin(
        'everest_teachers as teachers',
        'apps.teacher_id',
        'teachers.id'
      )
      .where('schools.id', schoolId);
  },
  getApplicationById(db, applicationId) {
    return db
      .from('everest_applications as apps')
      .select(
        'apps.id as app_id',
        'apps.job_id as app_job',
        'apps.school_id as app_school',
        'schools.school_name',
        'jobs.id as job_id',
        'jobs.job_title as job_title',
        'teachers.first_name as teacher_first',
        'teachers.last_name as teacher_last',
        'teachers.id as teacher_id'
      )
      .innerJoin('everest_schools as schools', 'apps.school_id', 'schools.id')
      .innerJoin('everest_jobs as jobs', 'apps.job_id', 'jobs.id')
      .innerJoin(
        'everest_teachers as teachers',
        'apps.teacher_id',
        'teachers.id'
      )
      .where('apps.id', applicationId)
      .first();
  },
  toggleAppApproval(db, applicationId, newApplicationField) {
    return db('everest_applications')
      .where('id', applicationId)
      .update(newApplicationField);
  },
  deleteApplication(db, applicationId) {
    return db
      .from('everest_applications')
      .where('id', applicationId)
      .del();
  },
  insertApplication(db, application) {
    return db
      .insert(application)
      .into('everest_applications')
      .returning('*')
      .then(res => res);
  }
};

module.exports = ApplicationsService;
