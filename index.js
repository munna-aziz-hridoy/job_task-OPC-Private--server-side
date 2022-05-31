// import nessecery modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

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

// mongodb config

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lq3tm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect(() => {
  console.log("DB connected");
});

// app listening to the port

app.listen(port, () => {
  console.log("Server is running, :D");
});
