const teacherService = {
    getAllTeachers(db) {
        return db
            .from('teachers')
            .select('*')
    },
    getById(db, id) {
        return db
            .from('teachers')
            .where('id', id)
            .first()
    },
    postTeacher(db, newTeacher) {
        return db
            .insert(newTeacher)
            .into('teachers')
            .returning('*')
    },
    updateTeacher(db, id, updatedTeacher) {
        return db('teachers')
            .where('id', id)
            .update(updatedTeacher)
            .returning('username')
            .then(res => res)
    },
    deleteTeacher(db, id) {
        return db('teachers')
            .where('id', id)
            .del()
    }

}

module.exports = teacherService