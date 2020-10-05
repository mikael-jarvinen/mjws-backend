const users = require('../users.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./settings')
const { AuthenticationError } = require('apollo-server-express')

const login = async (username, password) => {
  for (const user of users) {
    if (user.username === username) {
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        return jwt.sign(user.id, JWT_SECRET)
      }
    }
  }
  throw new AuthenticationError('Wrong password or username')
}

const getUser = async (token) => {
  const user = jwt.verify(token, JWT_SECRET, (err, decodedId) => {
    if (!err) {
      return users.find(u => u.id === decodedId)
    } else {
      return {
        username: '',
        id: ''
      }
    }
  })

  return {
    username: user.username,
    id: user.id
  }
}

module.exports = { login, getUser }