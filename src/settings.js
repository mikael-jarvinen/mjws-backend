try {
  require('dotenv').config()
} catch (e) {
  console.log('ERROR loading env variables from .env')
}

let PORT = 4000
if (process.env.PORT) {
  PORT = process.env.PORT
}

let JWT_SECRET = process.env.JWT_DEV
if (process.env.NODE_ENV === 'production') {
  JWT_SECRET = process.env.JWT
}

module.exports = {
  PORT,
  JWT_SECRET
}