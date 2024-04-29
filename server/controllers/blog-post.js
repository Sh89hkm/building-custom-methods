const BlogPostModel = require("../models/blog-post");

// The controller to fetch all blogposts has been written for you
const getAllBlogPosts = async (_, res) => {
  const blogPosts = await BlogPostModel.find();
  res.json(blogPosts);
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

module.exports = {
  getAllBlogPosts,
  addBlogPost
};