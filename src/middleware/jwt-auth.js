const AuthService = require('../auth/auth-service')

function requireAdminAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''
  let bearerToken
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    AuthService.getAdminUsername(req.app.get('db'), payload.sub)
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' })
        req.user = user;
        next();
        return null;

      })
      .catch(err => {
        next(err)
      });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' })
  }
}

function requireSchoolAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken)
    AuthService.getSchoolUsername(
      req.app.get('db'),
      payload.sub,
    )
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' })
        req.user = user
        next()
      })
      .catch(err => {
        next(err)
      })
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' })
  }
}

function requireTeacherAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''
  let bearerToken
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken)
    AuthService.getTeacherWithUsername(
      req.app.get('db'),
      payload.sub,
    )
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' })
        req.user = user
        next()
      })
      .catch(err => {
        next(err)
      })
  } catch (error) {
    res.status(401).json({ error })
  }
}


module.exports = {
  requireAdminAuth,
  requireSchoolAuth,
  requireTeacherAuth
}
