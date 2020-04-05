require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.warn("Mongoose connected");
});

// Middleware to parse JSON
app.use(cors());
app.use(bodyParser.json());

// Home route
const homeRoute = require("./routes/home");
app.use("/", homeRoute);

// History route
const historyRoute = require("./routes/history");
app.use("/history", historyRoute);

app.listen(port);
