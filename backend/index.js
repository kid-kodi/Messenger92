const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

//Load public routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

//app configuration
const config = require("./config/config");
const errorHandler = require("./helpers/errorHandler");

mongoose.connect(
  config.mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const corsOptions = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "uploads")));

//use middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));

// Public api
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// global error handler
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Express server started ${config.port}`);
});
