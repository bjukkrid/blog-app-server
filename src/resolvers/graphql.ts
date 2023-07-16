import { gql } from "apollo-server-express";
import { IAuthor } from "../interfaces/authorInterface";
import { IPost } from "../interfaces/postInterface";
import Author from "../models/author";
import Post from "../models/post";

const typeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    author: Author!
    imageUrl: String!
  }

  type Author {
    _id: ID!
    name: String!
    posts: [Post!]!
  }

  type Query {
    posts: [Post!]!
    authors: [Author!]!
    post(id: ID!): Post
    author(id: ID!): Author
  }

  type Mutation {
    createPost(
      title: String!
      content: String!
      author: String!
      imageUrl: String!
    ): Post!
    updatePost(
      id: ID!
      title: String
      content: String
      author: String
      imageUrl: String
    ): Post
    deletePost(id: ID!): ID
    createAuthor(name: String!): Author!
    updateAuthor(id: ID!, name: String!): Author
    deleteAuthor(id: ID!): ID
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      const posts = await Post.find().populate("author");
      return posts;
    },
    authors: async () => {
      const authors = await Author.find().populate("posts");
      return authors;
    },
    post: async (_: any, { id }: any) => {
      const post = await Post.findById(id).populate("author");
      return post;
    },
    author: async (_: any, { id }: any) => {
      const author = await Author.findById(id).populate("posts");
      return author;
    },
  },
  Mutation: {
    createPost: async (_: any, { title, content, author, imageUrl }: any) => {
      const newPost = await Post.create({ title, content, author, imageUrl });
      const updatedAuthor = await Author.findByIdAndUpdate(
        author,
        { $push: { posts: newPost._id } },
        { new: true }
      );
      return newPost;
    },
    updatePost: async (
      _: any,
      { id, title, content, author, imageUrl }: any
    ) => {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, author, imageUrl },
        { new: true }
      );
      return updatedPost;
    },
    deletePost: async (_: any, { id }: any) => {
      await Post.findByIdAndDelete(id);
      return id;
    },
    createAuthor: async (_: any, name: string) => {
      const newAuthor = await Author.create(name);
      return newAuthor;
    },
    updateAuthor: async (_: any, { id, author }: any) => {
      const updatedAuthor = await Author.findByIdAndUpdate(id, author, {
        new: true,
      });
      return updatedAuthor;
    },
    deleteAuthor: async (_: any, { id }: any) => {
      await Author.findByIdAndDelete(id);
      return id;
    },
  },
};

export { typeDefs, resolvers };
