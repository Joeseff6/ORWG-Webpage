function onFormSubmit() {
  $("form").submit(async (e) => {
    e.preventDefault();
    const adminAttempt = $("#username").val();
    const passwordAttempt = $("#password").val();
    try {
        response = await $.ajax({
        url: "/api/admin",
        method: "POST",
        data: {
          adminAttempt,
          passwordAttempt,
        }
      })
    } catch({ responseJSON }) {
      $(".error-message").text(responseJSON.message);
      $(".error-box").removeClass("hide");
    }
  })
}

onFormSubmit();