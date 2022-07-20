const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionsSchema = new Schema({
  questionNumber: {
    type: String,
    required,
    unique,
  },
  question: {
    type: String,
    required
  },
  answer: String,
})

const Questions = mongoose.model("Questions", QuestionsSchema);

module.exports = Questions;