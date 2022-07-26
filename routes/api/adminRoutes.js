const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcryptjs");

async function initAdminPassword() {
  try {
    const admin = await db.Admin.findOne();
    if (admin.adminPassword) {
      return;
    } else {
      console.log("Admin password not found. Generating now.");
      let adminPassword = process.env.ADMIN_PASSWORD;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err.message);
        } else {
          bcrypt.hash(adminPassword, salt, async (err, hash) => {
            try {
              await db.Admin.updateOne(
                { adminUsername: process.env.ADMIN_USERNAME },
                { $set: { adminPassword: hash } }
              );
              console.log("Admin password generated!");
            } catch (err) {
              console.log(err.message);
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

initAdminPassword();

router.post("/", async(req, res) => {
  try {
    const admin = await db.Admin.findOne({adminUsername: req.body.adminAttempt});
    bcrypt.compare(req.body.passwordAttempt, admin.adminPassword, (err, isMatching) => {
      if (err) {
        console.log(err.message);
      } else {
        if (isMatching) {
          res.status(200).end();
        } else {
          res.status(400).json({message: "Please check your credentials and try again."});
        }
      }
    });
  } catch (err) {
    console.log(err.message)
    res.status(400).json({message: "Admin was not found. Please try again."})
  }
})

module.exports = router;