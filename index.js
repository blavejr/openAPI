const { ApolloServer, gql } = require("apollo-server");
const graphqlSchema = require("./schema");
const { getUserId } = require("./utils");
const admin = require("firebase-admin");
const usersQuery = require("./resolvers/users/Query");
const usersMutation = require("./resolvers/users/Mutation");
const peopleDB = require("./people.json").people;

const resolvers = {
  Query: {
    ...usersQuery
  },
  Mutation: {
    ...usersMutation
  }
};

const server = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers,
  context: async ({ req, connection }) => {
    const userId = await getUserId(req, connection, admin.auth);

    return {
      auth: admin.auth,
      storage: admin.storage,
      db: peopleDB,
      userId,
    };
  },
  formatError: error => {
    console.log(error);
    return error;
  }
});
server.listen().then(({ url }) => {
  console.log(`The server is running at ${url}`);
});
