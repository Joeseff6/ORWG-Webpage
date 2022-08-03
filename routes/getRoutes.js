const router = require("express").Router();
const isLoggedIn = require("../utils/isLoggedIn");
const isNotLogged = require("../utils/isNotLogged");
const db = require("../models/index");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    res.render("partials/questions", { loggedIn: false });
} catch (err) {
    console.log(err.message);
  }
});

router.get("/login", isLoggedIn, (req, res) => {
  res.render("partials/login");
});

router.get("/admin", isNotLogged, async (req, res) => {
  try {
    res.render("partials/questions", { loggedIn: true });
} catch (err) {
    console.log(err.message);
  }
});

router.get("/admin/:id", isNotLogged, async (req, res) => {
  try {
    console.log(req.params)
    let question = await db.Questions.findById(req.params.id);
    console.log(question);
    res.render("partials/addQuestion");
} catch (err) {
    console.log(err.message);
  }
});

module.exports = router;