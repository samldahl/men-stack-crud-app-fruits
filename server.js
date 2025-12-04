// server.js

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));


// Set the view engine to EJS
app.set("view engine", "ejs");

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// server.js

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});


// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  console.log(req.body)
await Fruit.create(req.body);
res.redirect("/fruits/new");
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});