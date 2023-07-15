import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoute";
import authorResolvers from "./resolvers/AuthorResolvers";
import postResolvers from "./resolvers/PostResolvers";

// Define your GraphQL schema
const typeDefs = gql`
  type Author {
    _id: ID!
    name: String!
    posts: [Post]!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: Author!
    imageUrl: String!
  }

  type Query {
    getAllAuthors: [Author]!
    getAuthorById(id: ID!): Author!
    getAllPosts: [Post]!
    getPostById(id: ID!): Post!
  }

  type Mutation {
    createAuthor(name: String!): Author!
    updateAuthor(id: ID!, name: String!): Author!
    deleteAuthor(id: ID!): DeleteResponse!

    createPost(
      title: String!
      content: String!
      author: ID!
      imageUrl: String!
    ): Post!
    updatePost(
      id: ID!
      title: String!
      content: String!
      author: ID!
      imageUrl: String!
    ): Post!
    deletePost(id: ID!): DeleteResponse!
  }

  type DeleteResponse {
    message: String!
  }
`;

// Configure Express app
const configureApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/posts", postRoutes);
  return app;
};

// Configure MongoDB connection
const configureMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://mongoadmin:secret@localhost:27017", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

async function startServer() {
  const resolvers = { ...authorResolvers, ...postResolvers };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  configureMongoDB();
  const app = configureApp();
  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
}

startServer();
