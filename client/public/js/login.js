function onFormSubmit() {
  $("form").submit(async (e) => {
    e.preventDefault();
    const adminAttempt = $("#username").val();
    const passwordAttempt = $("#password").val();
    await $.ajax({
      url: "/api/admin",
      method: "POST",
      data: {
        adminAttempt,
        passwordAttempt,
      }
    })
  })
}

onFormSubmit();