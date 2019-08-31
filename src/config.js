module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://postgres:ilki@localhost/everest',
  JWT_SECRET: process.env.JWT_SECRET || 'my-own-special-jwt-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '20s',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8000/api",
  CLIENT_ORIGIN: 'https://everest.everest.now.sh',
  authToken_Teacher: process.env.authToken_Teacher,
  authToken_School: process.env.authToken_School,
  authToken_Admin: process.env.authToken_Admin
}
