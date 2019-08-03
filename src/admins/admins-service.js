const xss = require('xss')

const AdminsService = {
    getAllAdmins(db) {
        return db
            .from('everest_admins')
            .select('*')
    },
    getAdminByUsername(db, username) {
        return db
            .from('everest_admins')
            .where({ username })
            .first()
    },
    insertAdmin(db, newAdmin) {
        return db
            .insert(newAdmin)
            .into('everest_admins')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    updateAdmin(db, username, newAdminFields) {
        return db('everest_admins')
            .where({ username })
            .update(newAdminFields)
            .then(response => AdminsService.getAdminByUsername(db, username))
    },
    deleteAdmin(db, username) {
        return db('everest_admins')
            .where({ username })
            .del()
            .then(response => AdminsService.getAllAdmins(db))
    },
    seriealizeAdmin(admin) {
        return {
            id: admin.id,
            first_name: xss(admin.first_name),
            last_name: xss(admin.last_name),
            username: xss(admin.username),
            email: xss(admin.email),
            date_created: admin.date_created,
            date_modified: admin.date_modified
        }
    }
}

module.exports = AdminsService