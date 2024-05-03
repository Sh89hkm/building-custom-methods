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
},
// These properties must be added to ensure that virtual fields are returned in the read queries
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
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

// Instance method to find similar blog posts
blogPost.methods.findSimilarBlogPosts = function() {
  return this.model("blogpost").find({ tags: { $in: this.tags }, _id: { $ne: this._id } });
};
// Instance method to find similar Authors
blogPost.methods.findSimilarAuthors = function() {
  return this.model("blogpost").find({ "author.areasOfExpertise": { $in: this.author.areasOfExpertise }, "author._id": { $ne: this.author._id } });
};

blogAuthor.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
}).set(function(fullName) {
    this.set("firstName", fullName.substr(0, fullName.indexOf(" ")));
    this.set("lastName", fullName.substr(fullName.indexOf(" ") + 1));
  // this.firstName = fullName.substr(0, fullName.indexOf(" "));
  // this.lastName = fullName.substr(fullName.indexOf(" ") + 1);
});

blogPost.virtual("createdAtTimeGMT").get(function() {
  return this.createdAt.toGMTString();
  // return this.createdAt.toUTCString();
  // const timeInGMT = new Date(this.createdAt.getTime())
  // const timeInGMT = new Date(this.createdAt.getTime() - (3*60*60*1000))
  // console.log("timeGMT: ", timeInGMT)
  // console.log("timeGMT toUTCString: ", timeInGMT.toUTCString())
  // console.log("timeGMT toGMTString: ", timeInGMT.toGMTString())
  // return timeInGMT.toGMTString();
});

// blogPost.methods.findSimilarBlogPosts = function () {
//   return this.model("blogpost").find({ tags: { $in: this.tags }, _id: { $ne: this._id } }).exec();
// };

// Static method to find similar blog posts
// blogPost.statics.findSimilarBlogPosts = async function(postId) {
//   try {
//       const post = await this.findById(postId);
//       if (!post) {
//           throw new Error('Blog post not found');
//       }
      
//       const similarPosts = await this.find({ tags: { $in: post.tags }, _id: { $ne: post._id } });
//       return similarPosts;
//   } catch (error) {
//       throw error;
//   }
// };

module.exports = mongoose.model("blogpost", blogPost);
