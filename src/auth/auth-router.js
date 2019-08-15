const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .post('/login/schools', jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body;
    const loginSchool = { username, password };

    for (const [key, value] of Object.entries(loginSchool))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    AuthService.getSchoolUsername(req.app.get('db'), loginSchool.username)
      .then(dbSchool => {
        if (!dbSchool)
          return res.status(400).json({
            error: 'Incorrect username or password'
          });

        return AuthService.comparePasswords(
          loginSchool.password,
          dbSchool.password
        ).then(compareMatch => {
          if (!compareMatch)
            return res.status(400).json({
              error: 'Incorrect username or password'
            });

          const sub = dbSchool.username;

          const payload = { user_id: dbSchool.id };
          res.send({
            authToken: AuthService.createJwt(sub, payload)
          });
        });
      })
      .catch(next);
  })
  .post('/login/admins', jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body;
    const loginAdmin = { username, password };
    for (const [key, value] of Object.entries(loginAdmin))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    AuthService.getAdminUsername(req.app.get('db'), loginAdmin.username)
      .then(dbAdmin => {
        if (!dbAdmin)
          return res.status(400).json({
            error: 'Incorrect username or password'
          });

        return AuthService.comparePasswords(
          loginAdmin.password,
          dbAdmin.password
        ).then(compareMatch => {
          if (!compareMatch)
            return res.status(400).json({
              error: 'Incorrect username or password'
            });

          const sub = dbAdmin.username;
          const payload = { user_id: dbAdmin.id };
          res.send({
            authToken: AuthService.createJwt(sub, payload)
          });
        });
      })
      .catch(next);
  })
  .post('/login/teachers', jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body;
    const loginTeacher = { username, password };
    for (const [key, value] of Object.entries(loginTeacher))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    AuthService.getTeacherWithUsername(
      req.app.get('db'),
      loginTeacher.username
    )
      .then(teacher => {
        if (!teacher)
          return res.status(400).json({
            error: 'Incorrect username or password',
          })

        return AuthService.comparePasswords(
          loginTeacher.password,
          teacher.password
        ).then(compareMatch => {
          if (!compareMatch)
            return res.status(400).json({
              error: 'Incorrect username or password'
            });

          const sub = teacher.username
          const payload = { user_id: teacher.id }
          res.send({
            authToken: AuthService.createJwt(sub, payload)
          })
        })
      })
      .catch(next)
  })

module.exports = authRouter;
