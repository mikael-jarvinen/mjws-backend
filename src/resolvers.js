const Login = require('./auth').login
const { AuthenticationError } = require('apollo-server-express')
const { getContent, newContent } = require('./contentService')

module.exports = {
  Query: {
    ping: () => 'pong',
    login: async (root, args) => 
      await Login(args.username, args.password),
    whoami: (root, args, context) => context.user,
    content: () => getContent().content
  },
  Mutation: {
    newContent: (root, args, context) => {
      if (context.user.id) {
        return newContent(args.content)
      } else {
        throw new AuthenticationError('you must be logged in')
      }
    }
  }
}