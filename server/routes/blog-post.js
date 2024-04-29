const express = require("express");
const router = express.Router();

const blogPostController = require("../controllers/blog-post");

// Note: All endpoints here will have the prefix /api/blogposts

router.get("/", blogPostController.getAllBlogPosts);

router.post("/", blogPostController.addBlogPost);

// router.get("/:id/similar-blogposts", blogPostController.getBlogPostsWithSimilarTags);

// router.get("/:id/created-at-gmt", blogPostController.getCreatedAtTimeGMT);

module.exports = router;
