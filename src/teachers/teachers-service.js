const TeacherService = {
    getAllTeachers(db) {
        return db
            .from('everest_teachers')
            .select('*')
    },
    getById(db, id) {
        return db
            .from('everest_teachers')
            .where('id', id)
            .first()
    },
    hasUsername(db, username) {
        return db('everest_teachers')
            .where('username', username)
            .first()
            .then(username => !!username)
    },
    insertTeacher(db, newTeacher) {
        return db
            .insert(newTeacher)
            .into('everest_teachers')
            .returning('*')
    },
    updateTeacher(db, id, updatedTeacher) {
        return db('everest_teachers')
            .where('id', id)
            .update(updatedTeacher)
            .returning('username')
            .then(res => res)
    },
    deleteTeacher(db, id) {
        return db('everest_teachers')
            .where('id', id)
            .del()
    }

}

module.exports = TeacherService