document.getElementById("login-form").addEventListener("submit", async(e) => {
  e.preventDefault();
  const adminAttempt = $("#username").val();
  const passwordAttempt = $("#password").val();
  try {
      await $.ajax({
      url: "/api/admin",
      method: "POST",
      data: {
        adminAttempt,
        passwordAttempt,
      }
    })
    window.location.replace("/admin");
  } catch({ responseJSON }) {
    $(".error-message").text(responseJSON.message);
    $(".error-box").removeClass("hide");
  }
})