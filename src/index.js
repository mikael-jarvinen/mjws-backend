const express = require('express')
const path = require('path')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const context = require('./context')

const PORT = process.env.port || 4000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})
const app = express()

server.applyMiddleware({ app })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'), err => {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    }
  })
})

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`)
})