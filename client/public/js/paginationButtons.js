export default function generatePaginationButtons(
  itemsArray,
  itemsPerPage = 5
) {
  const numberOfPages = Math.ceil(itemsArray.length / itemsPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    const newButton = `<button class="button page">${i}</button>`;
    $(".pagination-numbers").append(newButton);
  }
  document.querySelector(".button.page").classList.add("active");
  generateQuestionsAndAnswers(itemsArray, [0, itemsPerPage]);
  $(".button.page").click((e) => {
    $(".button.page").removeClass("active");
    e.target.classList.add("active");
    const pageNumber = Number(e.target.textContent);
    const sliceIndices = getArrayIndices(pageNumber, itemsArray.length, itemsPerPage);
    generateQuestionsAndAnswers(itemsArray, sliceIndices);
  })
}

function getArrayIndices(pageNumber, itemsArrayLength, itemsPerPage) {
  if (pageNumber === 1) {
    return [0, itemsPerPage];
  } else if (pageNumber === Math.ceil(itemsArrayLength / itemsPerPage)) {
    return [
      (pageNumber - 1) * itemsPerPage,
      (pageNumber - 1) * itemsPerPage + (itemsArrayLength - (pageNumber - 1) * itemsPerPage)
    ]
  } else {
    return [(pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage];
  }
}

function generateQuestionsAndAnswers(itemsArray, sliceIndices) {
  $(".question-box").remove();
  $(".answer-box").remove();
  itemsArray.slice(sliceIndices[0], sliceIndices[1]).forEach((listItem) => {
    const questionsAndAnswers = `<div class="question-box" data-question="${listItem.questionNumber}">
      <a class="email-link" href="">Ask us about this question</a>
      <h2 class="question"><span class="highlight-text">Question #${listItem.questionNumber}</span></h2>
      <h3>${listItem.question}</h3>
    </div>
    <div class="answer-box close" data-question="${listItem.questionNumber}">
      <h3 class="answer">${
        listItem.answer ? listItem.answer : "We are still seeking this answer."
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