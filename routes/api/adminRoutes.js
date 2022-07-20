const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "html", "login.html"));
});

module.exports = router;
