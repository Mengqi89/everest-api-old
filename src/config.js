module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000, // feeds into server.js
  DB_URL: process.env.DB_URL || 'postgresql://Mengqi89@localhost/everest',
  JWT_SECRET: process.env.JWT_SECRET || 'my-own-special-jwt-secret',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8000/api",
  CLIENT_ORIGIN: 'http://localhost:3000',
}