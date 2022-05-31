// import nessecery modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// create app and declear port
const app = express();
const port = process.env.PORT || 5000;

// midleware for using json and overwrite cors policy
app.use(express.json());
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// app listening to the port

app.listen(port, () => {
  console.log("Server is running, :D");
});
