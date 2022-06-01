const express = require("express");
const mailgun = require("mailgun-js");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const client = require("../db/db");

const router = express.Router();

const usersCollection = client.db("task-data").collection("users");

const emailClient = mailgun({
  apiKey: process.env.EMAIL_SENDER_API,
  domain: process.env.EMAIL_SENDER_DOMAIN,
});

const sendEmail = (emailData) => {
  const mailData = {
    from: "JOB Task By Munna Aziz <munna.aziz.hridoy@gmail.com>",
    ...emailData,
  };
  emailClient.messages().send(mailData, (err, body) => {
    if (err) {
      console.log(err.message);
      return;
    }
  });
  emailClient.messages();
};

const createEmailTable = (usersData) => {
  return `<div style="width: 100vw, padding: '16px', margin: 0 auto">
  <table style="width: 100%, border: '2px solid gray', border-collapse: collapse}>
      <thead style="width: 100%">
        <tr>
          <th style="border: '2px solid gray'">ID</th>
          <th style="border: '2px solid gray'">Name</th>
          <th style="border: '2px solid gray'">Phone Number</th>
          <th style"border: '2px solid gray'">Email</th>
          <th style="border: '2px solid gray'">Hobbies</th>
        </tr>
      </thead>
      <tbody>
        ${usersData?.map((user, index) => {
          const { name, email, hobbies, phone } = user;
          return `  <tr>
              <td style="border: '2px solid gray'">${index + 1}</td>
              <td style="border: '2px solid gray'">
                <p>${name}</p>
              </td>
              <td style="border: '2px solid gray'">
                <p>${phone}</p>
              </td>
              <td style="border: '2px solid gray'">
                <p>${email}</p>
              </td>
              <td style="border: '2px solid gray'">
                <p>${hobbies}</p>
              </td>
            </tr>`;
        })}
      </tbody>
    </table>
  </div>`;
};

router.post("/sendEmail", async (req, res) => {
  const selectedIds = req.body.ids;

  const filteredIds = selectedIds.map((id) => ObjectId(id));

  const filter = {
    _id: {
      $in: [...filteredIds],
    },
  };

  const selectedData = await usersCollection.find(filter).toArray();
  const html = createEmailTable(selectedData);
  const emailData = {
    to: "taha.iu.bd@gmail.com",
    subject: "JOb task assignment data (Munna Aziz)",
    text: "Data from task",
    html,
  };
  sendEmail(emailData);
  res.send({ success: true });
});

module.exports = router;
