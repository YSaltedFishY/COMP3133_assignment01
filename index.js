const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');
const { ApolloServer } = require('apollo-server-express');

const SERVER_PORT = process.env.PORT || 3000
const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://Admin:pDiGDgich3CcFvBw@cluster0.2tyy8.mongodb.net/comp3133__StudentID_assigment1?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

const server = new ApolloServer({typeDefs, resolvers})

server.start().then(() => {
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`));
});