const request = require("supertest");
const expect = require("chai").expect;
const {ObjectId} = require("mongodb");

const app = require("../index");
const BlogPostModel = require("../models/blog-post");

const blogPosts = [
  {
    "_id" : ObjectId("619b77dd5c639f35dd2d37c4"),
    "title" : "Blog 1",
    "content" : "Lorem ipsum dolor sit amet",
    "tags" : [
      "coding"
    ],
    "author" : {
      "firstName" : "Ali",
      "lastName" : "Hasan",
      "age" : 23,
      "gender" : "Male",
      "nationality" : "Iraqi",
      "areasOfExpertise" : [
        "Engineering",
        "Tech",
        "Science"
      ],
      "_id" : ObjectId("619b77dd5c639f35dd2d37c5")
    },
    "createdAt" : "2021-11-22T16:28:37.555+05:30",
    "updatedAt" : "2021-11-22T17:27:49.280+05:30",
    "__v" : 0
  },
  {
    "_id" : ObjectId("619b77dd5c639f35dd2d37c6"),
    "title" : "Design Blog 1",
    "content" : "Lorem ipsum dolor sit amet",
    "tags" : [
      "drawing"
    ],
    "author" : {
      "firstName" : "Huda",
      "lastName" : "Duda",
      "age" : 25,
      "gender" : "Female",
      "nationality" : "Iraqi",
      "areasOfExpertise" : [
        "Arts"
      ],
      "_id" : ObjectId("619b77dd5c639f35dd2d37c7")
    },
    "createdAt" : "2021-11-22T16:28:37.555+05:30",
    "__v" : 0
  },
  {
    "_id" : ObjectId("619b77dd5c639f35dd2d37c8"),
    "title" : "Design Blog 2",
    "content" : "Lorem ipsum dolor sit amet",
    "tags" : [
      "design",
      "coding"
    ],
    "author" : {
      "firstName" : "Huda",
      "lastName" : "Duda",
      "age" : 25,
      "gender" : "Female",
      "nationality" : "Iraqi",
      "areasOfExpertise" : [
        "Engineering",
        "Programming"
      ],
      "_id" : ObjectId("619b77dd5c639f35dd2d37c9")
    },
    "createdAt" : "2021-11-22T16:28:37.555+05:30",
    "__v" : 0
  },
  {
    "_id" : ObjectId("619b77dd5c639f35dd2d37ca"),
    "title" : "Design Blog 3",
    "content" : "Lorem ipsum dolor sit amet",
    "tags" : [
      "coding"
    ],
    "author" : {
      "firstName" : "Lara",
      "lastName" : "Aydin",
      "age" : 28,
      "gender" : "Female",
      "nationality" : "Iraqi",
      "areasOfExpertise" : [
        "Engineering"
      ],
      "_id" : ObjectId("619b77dd5c639f35dd2d37cb")
    },
    "createdAt" : "2021-11-22T16:28:37.555+05:30",
    "__v" : 0
  },
];

describe("Blog posts API", () => {
  before("Pre-load database", (done) => {
    blogPosts.forEach(async blogPost => {
      const newBlogPost = new BlogPostModel(blogPost);
      await newBlogPost.save();
    });
    setTimeout(() => done(), 1500);
  });

  it("GET /api/blogposts/:id/similar-blogposts should return all similar blogposts", (done) => {
    const id = "619b77dd5c639f35dd2d37c4";
    const expectedMatchTitles = ["Design Blog 2", "Design Blog 3"];
    request(app)
      .get(`/api/blogposts/${id}/similar-blogposts`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        const matchedTitles = res.body.map(blogPost => blogPost.title);
        expect(matchedTitles).to.deep.equal(expectedMatchTitles);
        expect(matchedTitles).to.not.include("Blog 1");
        done();
      });
  });

  it("GET /api/authors/:id/similar-authors should return all similar authors", (done) => {
    const id = "619b77dd5c639f35dd2d37c7";
    request(app)
      .get(`/api/authors/${id}/similar-authors`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(0);
        done();
      });
  });

  it("GET /api/authors/:id should return author details", (done) => {
    const id = "619b77dd5c639f35dd2d37cb";
    request(app)
      .get(`/api/authors/${id}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.firstName).to.equal("Lara");
        expect(res.body.lastName).to.equal("Aydin");
        expect(res.body.fullName).to.equal("Lara Aydin");
        done();
      });
  });

  it("PUT /api/authors/:id should update author's full name", (done) => {
    const id = "619b77dd5c639f35dd2d37c7";
    request(app)
      .put(`/api/authors/${id}`)
      .set("Content-Type", "application/json")
      .send({ newFullName: "Marwa Alex" })
      .expect(204, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("GET /api/blogposts/:id/created-at-gmt should return created at time in GMT", (done)=> {
    const id = "619b77dd5c639f35dd2d37c8";
    request(app)
      .get(`/api/blogposts/${id}/created-at-gmt`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a("string");
        expect(res.body).to.equal("Mon, 22 Nov 2021 10:58:37 GMT");
        done();
      });
  });

  it("GET /api/authors/:id should show updated full name", (done) => {
    const id = "619b77dd5c639f35dd2d37c7";
    request(app)
      .get(`/api/authors/${id}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.firstName).to.equal("Marwa");
        expect(res.body.lastName).to.equal("Alex");
        expect(res.body.fullName).to.equal("Marwa Alex");
        done();
      });
  });

  it("updating first name should also update full name", async () => {
    const id = "619b77dd5c639f35dd2d37c8";
    const updatedBlogPost = await BlogPostModel.findOneAndUpdate(
      { _id: id },
      { $set: { "author.firstName": "Marwa", "author.lastName": "Alex" } },
      { new: true }
    ).exec();
    expect(updatedBlogPost).to.be.an("object");
    expect(updatedBlogPost.author.firstName).to.equal("Marwa");
    expect(updatedBlogPost.author.lastName).to.equal("Alex");
    expect(updatedBlogPost.author.fullName).to.equal("Marwa Alex");
  });

});