const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcryptjs");

async function initAdmin() {
  try {
    const admin = await db.Admin.findOne();
    console.log(admin)
    if (admin) return;
    console.log("Admin not found. Initializing admin now.");
    const adminUsername = process.env.MONGO_ADMIN_PASSWORD || process.env.ADMIN_USERNAME;
    const adminPassword = process.env.MONGO_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err.message);
      } else {
        bcrypt.hash(adminPassword, salt, async(err, hash) => {
          try {
            await db.Admin.create({
              adminUsername: adminUsername,
              adminPassword: hash,
            })
            console.log("Admin initialized!");
          } catch (err) {
            console.log(err.message);
          }
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

initAdmin();

router.post("/", async(req, res) => {
  try {
    const admin = await db.Admin.findOne({adminUsername: req.body.adminAttempt});
    bcrypt.compare(req.body.passwordAttempt, admin.adminPassword, (err, isMatching) => {
      if (err) {
        console.log(err.message);
      } else {
        if (isMatching) {
          req.session.loggedIn = true;
          res.status(200).json({ message: "Admin logged in!" });
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

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).end();
})

module.exports = router;