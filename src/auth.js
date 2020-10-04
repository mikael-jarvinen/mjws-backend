const users = require('../users.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./settings')

const login = async (username, password) => {
  let token = ''
  users.forEach(user => {
    if (user.username === username) {
      const result = bcrypt.compare(password, user.password)
      if (result) {
        token = jwt.sign(user.id, JWT_SECRET)
      }
    }
  })
  return token
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