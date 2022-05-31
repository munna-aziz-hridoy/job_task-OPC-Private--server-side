const express = require("express");
const client = require("../db/db");

const router = express.Router();

const usersCollection = client.db("task-data").collection("users");

router.get("/allUser", async (req, res) => {
  const users = await usersCollection.find({}).toArray();
  res.send(users);
});

module.exports = router;
