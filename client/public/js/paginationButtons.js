export default function generatePaginationButtons(
  itemsArray,
  itemsPerPage = 5
) {
  console.log(itemsArray);
  if (itemsPerPage > itemsArray.length)
    throw new Error(
      "The number of items per page should not exceed the number of items"
    );
  const numberOfPages = Math.ceil(itemsArray.length / itemsPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    const newButton = `<button class="button page">${i}</button>`;
    $(".pagination-numbers").append(newButton);
  }
  document.querySelector(".button.page").classList.add("active");
  $(".button.page").click((e) => {
    $(".button.page").removeClass("active");
    e.target.classList.add("active");
    console.log(e.target)
  })
  generateQuestionsAndAnswers(itemsArray, itemsPerPage);
}

function generateQuestionsAndAnswers(itemsArray, itemsPerPage = 5) {
  itemsArray.slice(0, itemsPerPage).forEach((item) => {
    const questionsAndAnswers = `<div class="question-box" data-question="${item.questionNumber}">
      <a class="email-link" href="">Ask us about this question</a>
      <h2 class="question">#${item.questionNumber + ": " + item.question}</h2>
    </div>
    <div class="answer-box close" data-question="${item.questionNumber}">
      <h3 class="answer">${
        item.answer ? item.answer : "We are still seeking this answer."
      }</h3>
    </div>`;
    $(".question-answer-container").append(questionsAndAnswers);
  });
  $(".question-box").click(({ target }) => {
    let questionEl = $(target).is("div")
      ? target
      : target.parentNode;
    const questionNumber = questionEl.dataset.question;
    const selectedAnswer = $(`.answer-box[data-question=${questionNumber}]`)
    if (!selectedAnswer.hasClass("close")) {
      $(`.answer-box[data-question=${questionNumber}]`).addClass("close");
      return;
    }
    $(".answer-box").addClass("close");
    selectedAnswer.removeClass("close");
  });
  
}
