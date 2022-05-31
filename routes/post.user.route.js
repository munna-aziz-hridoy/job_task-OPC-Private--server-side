const express = require("express");
const client = require("../db/db");

const router = express.Router();

const usersCollection = client.db("task-data").collection("users");

router.post("/addUser", async (req, res) => {
  const user = req.body;
  const result = await usersCollection.insertOne(user);
  res.send(result);
});

module.exports = router;
