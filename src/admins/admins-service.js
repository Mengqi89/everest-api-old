const xss = require('xss')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
const bcrypt = require('bcryptjs')

const AdminsService = {
    hasUsername(db, username) {
        return db('everest_admins')
            .where({ username })
            .first()
            .then(username => !!username)
    },
    getAllAdmins(db) {
        return db
            .from('everest_admins')
            .select('*')
    },
    getAdminById(db, id) {
        return db
            .from('everest_admins')
            .select('*')
            .where('id', id)
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
    updateAdmin(db, id, newAdminFields) {
        return db('everest_admins')
            .where('id', id)
            .update(newAdminFields)
            .then(response => AdminsService.getAdminById(db, id))
    },
    deleteAdmin(db, id) {
        return db('everest_admins')
            .where('id', id)
            .del()
            .then(response => AdminsService.getAllAdmins(db))
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain one upper case, lower case, number and special character'
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeAdmin(admin) {
        return {
            id: admin.id,
            first_name: xss(admin.first_name),
            last_name: xss(admin.last_name),
            username: xss(admin.username),
            email: xss(admin.email),
            password: xss(admin.password),
            date_created: admin.date_created,
            date_modified: admin.date_modified
        }
    }
}

module.exports = AdminsService