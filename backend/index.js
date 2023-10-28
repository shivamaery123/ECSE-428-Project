const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require("hpp");
const compression = require("compression");
const db = require("./config/database.js");
const user_router = require("./routes/user_routes");
const User = require("./models/User");
const port = 8000;

// Middleware Setup

// Setup compression - compress response size

app.use(compression());

// Setup hpp - prevent parameter pollution

app.use(hpp());

// Setup Morgan - request logging

app.use(morgan("dev"));

// Setup helmet - setup security-related http headers

app.use(helmet());

// Setup Cors - control frontend access to backend

app.use(cors());

// Setup parsing of json bodies

app.use(express.json());

// Set up user router

app.use("/users", user_router);

app.get("/", (req, res) => {
  res.send("Checking if backend is setup");
});

// Middleware
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});

// Sync DB with models

db.sync()
  .then(() => {
    console.log("Users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
