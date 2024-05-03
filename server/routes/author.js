const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author");

// Note: All endpoints here will have the prefix /api/authors

router.get("/:id", authorController.getAuthorDetails);

router.put("/:id", authorController.updateAuthorFullName);

router.get("/:id/similar-authors", authorController.getAuthorsWithSimilarExpertise);

module.exports = router;
