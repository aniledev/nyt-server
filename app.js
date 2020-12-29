// import express
const express = require("express");
//import morgan
const morgan = require("morgan");
// import the books-data js file
const books = require("./books-data.js");
//import app that is built in object of express so we can use it
const app = express();

//use morgan as middleware and use the common formating option
app.use(morgan("common"));

//create GET request using express app object, path and handler
app.get("/books", (req, res) => {
  // return the entire list of books to see if the server works
  res.json(books);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
