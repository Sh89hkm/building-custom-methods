const BlogPostModel = require("../models/blog-post");

// Add your controllers below

const getAuthorDetails = async (req, res) => {
    const authorId = req.params.id
    // console.log("authorId: ", authorId)
    try {
        const blogPost = await BlogPostModel.findOne({ "author._id": authorId }).select({author: 1,});
        res.json(blogPost.author);
        // Retrieve the blog post containing the author
        // const blogPost = await BlogPostModel.findOne({ "author._id": authorId }, "author");
        // Extract author details from the blog post and include fullName virtual field
        // const author = blogPost.author.toObject(); // Convert to plain JavaScript object to access virtual fields
        // author.fullName = blogPost.author.fullName; // Include fullName virtual field
        // console.log("author: ", author)
        // res.json(author);
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
  };

const updateAuthorFullName = async (req, res) => {
    const authorId = req.params.id;
    // console.log("postId: ", id)
    const newFullName = req.body.newFullName;
    // console.log("newFullName: ", newFullName)
    try {
        // Retrieve the blog post containing the author
        const blogPost = await BlogPostModel.findOne({ "author._id": authorId });
        // console.log("blogPost: ", blogPost)
        // update the author's full name
        blogPost.author.fullName = newFullName;
         // update the author's first name and last name in the post
        // const updatedBlogPost = await BlogPostModel.findOneAndUpdate({ "author._id": authorId }, blogPost, { new: true });
        // console.log("updatedBlogPost: ", updatedBlogPost)
        // res.json(updatedBlogPost);
        await blogPost.save();
        res.status(204).send();
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
};

const getAuthorsWithSimilarExpertise = async (req, res) => {
    const authorId = req.params.id;
    // console.log("authorId: ", id)
    try {
        const post = await BlogPostModel.findOne({"author._id": authorId});
        // console.log("blogPost: ", post);
        const similarAuthors = await post.findSimilarAuthors();
        // console.log("similarAuthors", similarAuthors);
        res.json(similarAuthors);
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
};

module.exports = {
    getAuthorDetails,
    updateAuthorFullName,
    getAuthorsWithSimilarExpertise
  };