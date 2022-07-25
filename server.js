require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const routes = require("./routes");
const db = require("./models");

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "public")));

app.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "html", "login.html"));
});

app.use(routes);

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

async function validatePassword() {
  try {
    const { adminPassword } = await db.Admin.findOne();
    const passwordAttempt = "letmein";
    const actualPassword = process.env.ADMIN_PASSWORD;
    bcrypt.compare(passwordAttempt, adminPassword, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const validationMessage = res ? "Validation success!" : "Wrong password";
        console.log(validationMessage);
      }
    });
    bcrypt.compare(actualPassword, adminPassword, (err, res) => {
      if (err) {
        console.log(err.message);
      } else {
        const validationMessage = res ? "Validation success!" : "Wrong password";
        console.log(validationMessage);
      }
    });
  } catch (err) {
    console.log(err.message)
  }
}

validatePassword();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/orwgDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
