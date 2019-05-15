const { gql } = require("apollo-server");

module.exports = gql`
  # This is a comment just in case
  type User {
    name: String
    age: String
  }

  input UserInput {
    name: String
    age: String
  }

  type Query {
    users: [User]!
  }

  type Mutation {
    addUser(details: UserInput!): [User]!
  }
`;
