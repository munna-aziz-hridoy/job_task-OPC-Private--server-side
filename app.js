// import nessecery modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getUsers = require("./routes/get.users.route");
const postUsers = require("./routes/post.user.route");
const deleteUser = require("./routes/delete.user.route");
const client = require("./db/db");

// create app
const app = express();

// midleware for using json and overwrite cors policy
app.use(express.json());
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const run = async () => {
  await client.connect();
  app.use(getUsers);
  app.use(postUsers);
  app.use(deleteUser);
};

run().catch(console.dir);

module.exports = app;
