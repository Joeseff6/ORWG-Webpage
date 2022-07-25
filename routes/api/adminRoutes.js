const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcryptjs");

router.post("/", async(req, res) => {
  console.log(req.body)
  try {
    const { adminPassword } = await db.Admin.findOne({adminUsername: req.body.adminAttempt});
    bcrypt.compare(req.body.passwordAttempt, adminPassword, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const validationMessage = res ? "Validation success!" : "Wrong password";
        console.log(validationMessage);
      }
    });
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = router;
