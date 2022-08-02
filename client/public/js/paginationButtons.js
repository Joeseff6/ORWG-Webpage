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
    // <% if (loggedIn) { %>
    //   <h1><%= "Hello" %></h1>
    // <% } %>
    const questionsAndAnswers = 
    `<div class="question-box" data-question="${index + 1}">
      <a class="email-link" href="">Ask about this question</a>
      ${isAdmin ? showAdminButtons() : ""}
      <h2 class="question">${listItem.question}</h2>
    </div>
    <div class="answer-box close" data-question="${listItem.questionNumber}">
      <h3 class="answer">${
        listItem.answer ? listItem.answer : "We are still seeking this answer."
      }</h3>
    </div>`;
    $(".question-answer-container").append(questionsAndAnswers);
  });
  $(".question-box").click(({ target }) => {
    let questionEl = $(target).is("div") ? target : target.closest(".question-box");
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

function showAdminButtons() {
  return (
    `<div class="admin-buttons">
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    </div>
    `
  )
}