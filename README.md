# Building custom methods

## Objectives

- Practice building custom methods using mongoose
- Practice building virtual fields using mongoose

## Overview

So far we have practiced CRUD operations using Mongoose and Express. In this lab, we will create custom methods to handle some of the data in the database.

## Working with docker

This app is bootstraped with docker and docker-compose. It containerize the server, as well as the database.

### To start the server

run the command `yarn && yarn start`. This will install all the dependencies and build the docker image

### To install packages

when you run `yarn add PACKAGE` the package will be installed in docker as well automatically. However if you run into issues, you need to stop the server first with `yarn stop` then you can run `yarn build` to rebuild the docker image and start again.

### To prune the containers and data

> ⚠️ WARNING: This is a destructuve command that would delete the containers and all the data inside like database data, and uploads
> you can run `yarn prune` to shutdown the server and delete all the volumes associated with it. This serves as a start fresh command, that will return your server environment to original. It will not affect your code changes though.


## Starter Code

In this assignment folder, you will find:

1. Express server setup in `/index.js` with 2 separate routers, one for blogpost API routes and one for author API routes.
2. The database connection is setup in `db/connection.js`.
3. The routes are configured and connected to a controller inside the `routes` folder.
4. The initial version of the data model is created in `models/blog-post.js`. We are using the embedded approach with _author embedded inside blog post_.

## Instructions

- Add the code in the `models` folder to create the custom methods for BlogPost and Author.
- Add the code in the `controllers` folder to create controller functions to handle the requests.

### Part 0: Getting all the related blogposts with similar tags

You must have seen related blogposts recommended to the reader when they finish reading the current blogpost. Build a custom method to get all the blogposts with similar tags and create the controller function to fetch these.

For example, if the current blog post has tags `["tag1", "tag2"]` then get all the blog posts with the tags `"tag1"` and/or `"tag2"`.

Endpoint: `GET /api/blogposts/POST_ID/similar-blogposts`

Response format: `Array of similar blogposts`

### Part 1: Getting all the authors with the same areas of expertise

Just like related blogposts, the reader can also see recommended similar authors. Build a custom method to get all the authors with the similar areas of expertise and create the controller function to fetch these.

For example, if the current author is expert in `["area1", "area2"]` then get all the authors who are expert in `"area1"` and/or `"area2"`.

Endpoint: `GET /api/authors/AUTHOR_ID/similar-authors`

Response format: `Array of similar authors`

### Part 2: Getting the author full name

Build a virtual field called `fullName` which has a get function to get the full name of the author and build the controller function to get the author's details which includes the full name.

Endpoint: `GET /api/authors/AUTHOR_ID`

Response format:
```
{
    "firstName": "String",
    "lastName": "String",
    "fullName": "String",
    "age": Number,
    "gender": "String",
    "nationality": "String",
    "areasOfExpertise": ["String"],
    "_id": "String"
}
```

### Part 3: Updating the author full name

Write the set function for the `fullName` virtual field to update both the first name and last name on the author object, and build the controller function to update the author full name on a specifc blogpost.

Endpoint: `PUT /api/authors/AUTHOR_ID`

Response format: `HTTP status code 204`

### Part 4: Getting the time of creation of a blogpost in a different timezone

Create a virtual field called `createdAtGMT` to get the time of a blog-post creation in GMT (Turkey time -3) and create the controller function to fetch it.

Endpoint: `GET /api/blogposts/POST_ID`

Response format: `GMT time as string`

For example, if `createdAtTime` is 2021-11-22T13:58:00+03:00 (Turkey time), then GMT time string would be "Mon, 22 Nov 2021 10:58:00 GMT".

## Submission

Run `yarn test` to test your code. If it shows all tests have passed then you're good to go.

You can also manually test your application by verifying the database operations using any MongoDB GUI tool or Mongo shell.

Once you're ready to submit the assignment, follow these steps on your terminal:

1. Stage your changes to be committed: `git add .`
2. Commit your final changes: `git commit -m "solve assignment"`
3. Push your commit to the main branch of your assignment repo: `git push origin main`

After your changes are pushed, return to this assignment on Canvas for the final step of submission.
