import db from "./config/database.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import compression from "compression";

const app = express();

const port = 8000;

const corsOptions = {
  origin: "http://localhost:8081",
};

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}


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