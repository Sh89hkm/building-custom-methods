const mongoose = require("mongoose");

const blogAuthor = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  areasOfExpertise: {
    type: [String],
  },
});

const blogPost = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
    },
    likes: {
      type: Number,
    },
    author: blogAuthor,
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogpost", blogPost);
