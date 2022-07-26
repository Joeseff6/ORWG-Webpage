const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcryptjs");

router.post("/", async(req, res) => {
  try {
    const admin = await db.Admin.findOne({adminUsername: req.body.adminAttempt});
    bcrypt.compare(req.body.passwordAttempt, admin.adminPassword, (err, isMatching) => {
      if (err) {
        console.log(err.message);
      } else {
        if (isMatching) {
          res.status(200).json({message: "Successful login!"});
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