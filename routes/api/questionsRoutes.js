const router = require("express").Router();
const db = require("../../models"); 

router.get("/", async(req, res) => {
  const questions = await db.Questions.find({});
  res.status(200).json(questions);
})

router.put("/:id", async(req, res) => {
  try {
    await db.Questions.findByIdAndUpdate(req.params.id, {
      question: req.body.question,
      answer: req.body.answer,
    })
    res.status(200).json({ message: "Question and answer updated!"});
  } catch(err) {
    console.log(err.message);
  }
})

module.exports = router;