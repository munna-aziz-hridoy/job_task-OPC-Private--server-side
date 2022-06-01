const express = require("express");
const client = require("../db/db");

const router = express.Router();

const usersCollection = client.db("task-data").collection("users");

router.post("/addUser", async (req, res) => {
  const user = req.body;
  const exists = await usersCollection.findOne({ email: user?.email });
  if (exists) {
    return res.send({ success: false, message: "User already exists" });
  }
  const result = await usersCollection.insertOne(user);
  res.send({ success: true, result });
});

module.exports = router;
