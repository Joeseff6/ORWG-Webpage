import generatePaginationButtons from "./paginationButtons.js";

let resizeTimeoutId;

$(window).resize(() => {
  clearTimeout(resizeTimeoutId);
  $(".sun").removeClass("animate-sun");
  resizeTimeoutId = setTimeout(() => {
    $(".sun").addClass("animate-sun");
  }, 500);
});

window.addEventListener("load", async () => {
  try {
    let questions = await $.ajax({
      url: "/api/questions",
      method: "GET",
      dataType: "json",
    });
    generatePaginationButtons(questions, 10);
  } catch(err) {
    console.log(err);
  }
})
