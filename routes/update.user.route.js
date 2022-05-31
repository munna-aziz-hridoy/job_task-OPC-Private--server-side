const express = require("express");
const { ObjectId } = require("mongodb");
const client = require("../db/db");

const router = express.Router();

const usersCollection = client.db("task-data").collection("users");

router.patch("/updateUser", async (req, res) => {
  const id = req.query.id;
  const filter = { _id: ObjectId(id) };
  const updateUser = req.body;

  const updatedDoc = {
    $set: updateUser,
  };

  const result = await usersCollection.updateOne(filter, updatedDoc);
  res.send({ success: true, result });
});

module.exports = router;
