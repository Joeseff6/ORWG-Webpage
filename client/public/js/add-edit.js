document.getElementById("add-edit-form").addEventListener("submit", async(e) => {
  e.preventDefault();
  const question = $("#question").val();
  const answer = $("#answer").val();
  console.log(capitalizedString(question))
  console.log(answer)

  const id = window.location.pathname.split("/")[2];
  await $.ajax({
    url: `/api/questions/${id}`,
    method: "PUT",
    dataType: "json",
    data: {
      question: question,
      answer: answer
    }
  });
  window.location.pathname = "/admin";
})

function capitalizedString(string) {
  if (!string) return "";
  return string[0].toUpperCase() + string.slice(1, string.length);
}

document.getElementById("question").addEventListener("input", ({ target })=> {
  target.value = capitalizedString(target.value);
})

document.getElementById("answer").addEventListener("input", ({ target })=> {
  target.value = capitalizedString(target.value);
})