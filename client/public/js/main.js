import generatePaginationButtons from "./paginationButtons.js";
let resizeTimeoutId, searchTimeoutId;

$(window).resize(() => {
  clearTimeout(resizeTimeoutId);
  $(".sun").removeClass("animate-sun");
  resizeTimeoutId = setTimeout(() => {
    $(".sun").addClass("animate-sun");
  }, 500);
});

window.addEventListener("load", async () => {
  try {
    const questions = await fetchQuestions();
    generatePaginationButtons(questions, 10);
  } catch(err) {
    console.log(err);
  }
})

async function fetchQuestions() {
  try {
    const questions = await $.ajax({
      url: "/api/questions",
      method: "GET",
      dataType: "json",
    });
    return questions;
  } catch(err) {
    console.log(err);
  }
}

document.querySelector("#search").addEventListener("input",(e) => {
  clearTimeout(searchTimeoutId);
  const options = {
    keys: [
      "questionNumber",
      "question",
    ]
  }
  searchTimeoutId = setTimeout(async() => {
    try {
      const pattern = e.target.value;
      const questions = await fetchQuestions();
      const fuse = new Fuse(questions, options);
      $(".button.page").remove();
      if (!fuse.search(pattern).length) {
        generatePaginationButtons(questions, 10);
      } else {
        generatePaginationButtons(fuse.search(pattern), 10);
      }
    } catch(err) {
      console.log(err);
    }
  }, 500)
})