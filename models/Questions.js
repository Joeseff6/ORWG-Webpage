const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionsSchema = new Schema({
  questionNumber: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: String,
})

const Questions = mongoose.model("Questions", QuestionsSchema);

module.exports = Questions;