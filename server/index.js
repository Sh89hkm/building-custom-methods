const express = require("express");
require("dotenv").config();

const connectToMongo = require("./db/connection");

const blogPostRoutes = require("./routes/blog-post");
const authorRoutes = require("./routes/author");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/blogposts", blogPostRoutes);
app.use("/api/authors", authorRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
