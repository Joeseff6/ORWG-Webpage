const router = require("express").Router();
const db = require("../../models"); 

router.get("/", async(req, res) => {
  const questions = await db.Questions.find({});
  res.status(200).json(questions);
})

router.post("/", async(req,res) => {
  try {
    const currentQuestions = await db.Questions.find();
    await db.Questions.create({
      questionNumber: String(currentQuestions.length + 1),
      question: req.body.question,
      answer: req.body.answer,
    })
    res.status(200).json({ message: "Question created!"})
  } catch(err) {
    console.log(err.message);
  }
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
    res.status(400).json({ message: "Could not update question" });
  }
})

router.delete("/:id", async(req, res) => {
  try {
    await db.Questions.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question delete successfully"});
  } catch(err) {
    console.log(err.message);
    res.status(400).json({ message: "Could not delete question" });
  }
})

module.exports = router;