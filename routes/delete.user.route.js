const express = require("express");
const { ObjectId } = require("mongodb");
const client = require("../db/db");

const router = express.Router();

const usersCollection = client.db("task-data").collection("users");

router.delete("/deleteUser", async (req, res) => {
  const id = req.query.id;
  const filter = { _id: ObjectId(id) };
  const result = await usersCollection.deleteOne(filter);
  res.send({ success: true, result });
});

module.exports = router;
