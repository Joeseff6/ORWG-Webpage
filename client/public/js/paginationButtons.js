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
  itemsArray.slice(firstIndex, lastIndex).forEach((listItem) => {
    const questionsAndAnswers = 
    `<div class="question-box" data-question="${listItem.questionNumber}" data-id=${listItem._id}>
      <a class="email-link" href="">Ask about this question</a>
      ${isAdmin ? showAdminButtons(listItem.questionNumber, listItem._id) : ""}
      <h2 class="question">${listItem.question}</h2>
    </div>
    <div class="answer-box close" data-question="${listItem.questionNumber}">
      <h3 class="answer">${
        listItem.answer ? listItem.answer : "We are still seeking this answer."
      }</h3>
    </div>`;
    $(".question-answer-container").append(questionsAndAnswers);
  });

  // Open and close answer functionality
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

  // Edit button functionality
  $(`.edit-button`).click((e) => {
    window.location.pathname = `/question/${e.target.dataset.id}`
  });

  // Delete button functionality (open modal)
  $(`.delete-button`).click((e) => {
    const id = e.target.dataset.id;
    const question = document.querySelector(`.question-box[data-id="${id}"] .question`).innerText;
    displayModal(id, question);
  });

  // Delete question when delete button is clicked
  if (document.querySelector(".delete-modal-button")) {
    document.querySelector(".delete-modal-button").addEventListener("click", async(e) => {
      try {
        const id = e.target.dataset.id
        await $.ajax({
          url: `/api/questions/${id}`,
          method: "DELETE",
        });
        $(".delete-modal button").remove();
        document.querySelector(".delete-modal-message").innerText = "Question has been deleted";
        document.querySelector(".delete-modal-question").innerText = "";
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      } catch(err) {
        console.log(err.message);
      }
    })
  };
  $(".question-answer-container.hide").removeClass("hide");
}

function showAdminButtons(questionNumber, id) {
  return (
    `<div class="admin-buttons">
      <button class="edit-button" data-question="${questionNumber}" data-id="${id}">Edit</button>
      <button class="delete-button" data-question="${questionNumber}" data-id="${id}">Delete</button>
    </div>
    `
  )
}

function displayModal(id, question) {
  document.querySelector(".delete-modal-question").innerText = `"${question}"`;
  document.querySelector(".delete-modal-button").dataset.id = id;
  document.querySelector(".delete-modal").showModal();
}

function closeModal() {
  document.querySelector(".delete-modal").close();
}

$(".delete-modal-cancel").click(closeModal);

