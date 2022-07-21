const router = require("express").Router();
const db = require("../../models"); 

router.get("/", async(req, res) => {
  const questions = await db.Questions.find({});
  res.status(200).json(questions);
})

module.exports = router;