import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoute";
import authorRoutes from "./routes/authorRoute";
import authorResolvers from "./resolvers/AuthorResolvers";
import postResolvers from "./resolvers/PostResolvers";
import { typeDefs, resolvers } from "./resolvers/graphql";
import config from "./config";

// Configure Express app
const configureApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/authors", authorRoutes);
  app.use("/posts", postRoutes);
  return app;
};

// Configure MongoDB connection
const configureMongoDB = async () => {
  try {
    // await mongoose.connect("mongodb://mongoadmin:secret@localhost:27017", {
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    // });

    await mongoose.connect(
      `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}`,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

async function startServer() {
  // const resolvers = { ...authorResolvers, ...postResolvers };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  configureMongoDB();
  const app = configureApp();
  apolloServer.applyMiddleware({ app });

  app.listen({ port: config.SERVER_PORT }, () =>
    console.log(`🚀 Server ready at port ${config.SERVER_PORT}`)
  );
}

startServer();
