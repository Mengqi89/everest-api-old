const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
    .post('/login/schools', jsonBodyParser, (req, res, next) => {
        const { username, password } = req.body
        const loginSchool = { username, password }

        for (const [key, value] of Object.entries(loginSchool))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        AuthService.getSchoolUsername(
            req.app.get('db'),
            loginSchool.username
        )
            .then(dbSchool => {
                if (!dbSchool)
                    return res.status(400).json({
                        error: 'Incorrect username or password',
                    })

                return AuthService.comparePasswords(loginSchool.password, dbSchool.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect username or password',
                            })

                        const sub = dbSchool.username
                        const payload = {
                            user_id: dbSchool.id,
                            // user_type: 'school' 
                        }
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                        })
                    })
            })
            .catch(next)
    })


module.exports = authRouter