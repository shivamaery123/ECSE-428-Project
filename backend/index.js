const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require("hpp");
const compression = require("compression");
const port = 8000;

const corsOptions = {
  origin: "http://localhost:8081",
};

// Middleware Setup

// Setup compression - compress response size

app.use(compression());

// Setup hpp - prevent parameter pollution

app.use(hpp);

// Setup Morgan - request logging

app.use(morgan("dev"));

// Setup helmet - setup security-related http headers

app.use(helmet());

// Setup Cors - control frontend access to backend

app.use(cors(corsOptions));

// Setup parsing of json bodies

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Checking if backend is setup");
});

// Middleware
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
