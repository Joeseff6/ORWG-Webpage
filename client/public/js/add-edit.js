if (document.getElementById("edit-form")) {
  document.getElementById("edit-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const question = $("#question").val();
    const answer = $("#answer").val();
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
  });
}

if (document.getElementById("add-form")) {
  document.getElementById("add-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const question = $("#question").val();
    const answer = $("#answer").val();
    await $.ajax({
      url: `/api/questions/`,
      method: "POST",
      dataType: "json",
      data: {
        question: question,
        answer: answer
      }
    });
    window.location.pathname = "/admin";
  });
}

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