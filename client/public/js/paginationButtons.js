export default function generatePaginationButtons(
  itemsArray,
  itemsPerPage = 5
) {
  const numberOfPages = Math.ceil(itemsArray.length / itemsPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    const newButton = `<button class="button page">${i}</button>`;
    $(".pagination-numbers").append(newButton);
  }
  $(".pagination-numbers.hide").removeClass("hide");
  document.querySelector(".button.page").classList.add("active");
  generateQuestionsAndAnswers(itemsArray, 0, 10);
  $(".button.page").click((e) => {
    $(".button.page").removeClass("active");
    e.target.classList.add("active");
    const pageNumber = Number(e.target.textContent);
    const [firstIndex, lastIndex] = getArrayIndices(pageNumber, itemsArray.length, itemsPerPage);
    generateQuestionsAndAnswers(itemsArray, firstIndex, lastIndex);
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

function generateQuestionsAndAnswers(itemsArray, firstIndex, lastIndex) {
  $(".question-box").remove();
  $(".answer-box").remove();
  let isAdmin = false;
  if (window.location.pathname === "/admin" ) isAdmin = true;
  itemsArray.slice(firstIndex, lastIndex).forEach((listItem, index) => {
    const questionsAndAnswers = 
    `<div class="question-box" data-question="${listItem.questionNumber}">
      <a class="email-link" href="">Ask about this question</a>
      ${isAdmin ? showAdminButtons(listItem.questionNumber) : ""}
      <h2 class="question">${listItem.question}</h2>
    </div>
    <div class="answer-box close" data-question="${listItem.questionNumber}">
      <h3 class="answer">${
        listItem.answer ? listItem.answer : "We are still seeking this answer."
      }</h3>
    </div>`;
    $(".question-answer-container").append(questionsAndAnswers);
    $(`.edit-button[data-question=${listItem.questionNumber}]`).click(() => {
      window.location.pathname = `/question/${listItem._id}`
    })
  });
  $(".question-answer-container.hide").removeClass("hide");
  $(".question-box").click(({ target }) => {
    if ($(target).is("button") || $(target).is("a")) {
      return;
    } else {
      let questionEl = $(target).is("div") ? target : target.closest(".question-box");
      const questionNumber = questionEl.dataset.question;
      const selectedAnswer = $(`.answer-box[data-question=${questionNumber}]`)
      if (!selectedAnswer.hasClass("close")) {
        $(`.answer-box[data-question=${questionNumber}]`).addClass("close");
        return;
      }
      $(".answer-box").addClass("close");
      selectedAnswer.removeClass("close");
    }
  });
}

function showAdminButtons(questionNumber) {
  return (
    `<div class="admin-buttons">
      <button class="edit-button" data-question="${questionNumber}">Edit</button>
      <button class="delete-button" data-question="${questionNumber}">Delete</button>
    </div>
    `
  )
}