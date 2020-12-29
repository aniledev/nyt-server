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
  // no parameter is required; we ca provide a default search value
  const { search = "", sort } = req.query;

  // if there is a sort paramter, it must be validated (sort is not required)
  if (sort) {
    if (!["title", "rank"].includes(sort)) {
      return res.status(400).send("Sort must be one of title or rank");
    }
  }

  // use the filter method to return an array of book titles that include the search string; lowercase the book list and the search string for convenience
  let results = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  //After the books are filtered by the search, then we can sort
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
