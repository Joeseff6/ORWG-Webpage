let resizeTimeoutId;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeoutId);
  $(".sun").removeClass("animate-sun");
  resizeTimeoutId = setTimeout(() => {
    $(".sun").addClass("animate-sun");
  }, 500);
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
