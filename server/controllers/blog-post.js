const BlogPostModel = require("../models/blog-post");

// The controller to fetch all blogposts has been written for you
const getAllBlogPosts = async (_, res) => {
  try {
    const blogPosts = await BlogPostModel.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// The controller to add a new blogpost has been written for you
const addBlogPost = async (req, res) => {
  const blogPostData = req.body;
  try {
      const newBlogPost = await BlogPostModel.create(blogPostData);
      res.status(201).json(newBlogPost);
  } catch (err) {
      res.status(422).json({ message: err.message });
  }
};

// Add your controllers below

const getBlogPostsWithSimilarTags = async (req, res) => {
  const postId = req.params.id;
  // console.log("postId: ", postId)
  try {
      // const blogPosts = await BlogPostModel.find();
      // console.log("all blogPosts: ", blogPosts)
      const post = await BlogPostModel.findById(postId)
      // console.log("blogPost: ", post)
      const similarPosts = await post.findSimilarBlogPosts();
      // console.log("similarPosts: ", similarPosts)
      res.json(similarPosts);
  } catch (err) {
      res.status(422).json({ message: err.message });
  }
};

const getCreatedAtTimeGMT = async (req, res) => {
  const postId = req.params.id
  // console.log("postId: ", postId)
  try {
      const blogPost = await BlogPostModel.findById(postId)
      // console.log("blogPost: ", blogPost)
      // Extract author details from the blog post and include fullName virtual field
      // const blogPostTimeGMT = blogPost.toObject(); // Convert to plain JavaScript object to access virtual fields
      // const createdAtTimeGMT = blogPost.createdAtTimeGMT; // Include fullName virtual field
      // console.log("createdAtTimeGMT: ", blogPost.createdAtTimeGMT)
      if (blogPost) res.json(blogPost.createdAtTimeGMT);
      else res.status(422).json({ message: "Not found" });
  } catch (err) {
      res.status(422).json({ message: err.message });
  }
};

module.exports = {
  getAllBlogPosts,
  addBlogPost,
  getBlogPostsWithSimilarTags,
  getCreatedAtTimeGMT
};