// DEPENDENCIES
const cors = require("cors");
const express = require("express");

const storeappController = require("./controllers/storeappController")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.use("/apps", storeappController);


app.get("/", (_, res) => {
  res.status(200).send("Welcome to AmaKid App Store!");
});

app.get("*", (_, res) => {
  res.status(404).send("This page has not been found");
});

// EXPORT
module.exports = app;
