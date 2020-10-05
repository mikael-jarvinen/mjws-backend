const { gql } = require('apollo-server-express')

module.exports = gql`
type Query {
  ping: String
  login(
    username: String!
    password: String!
  ): String!
  whoami: User
  content: String!
}

type User {
  username: String!
  id: ID!
}

type Mutation {
  newContent(
    content: String!
  ): String!
}
`