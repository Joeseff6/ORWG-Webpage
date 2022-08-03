document.getElementById("login-form").addEventListener("submit", async(e) => {
  e.preventDefault();
  const adminAttempt = $("#username").val().toLowerCase();
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
  } catch ({ responseJSON }) {
    $(".error-box").remove();
    const errorEl = 
    `<div class="error-box hide">
      <p class="error-message"></p>
    </div>`;
    $("#login-form").prepend(errorEl);
    $(".error-message").text(responseJSON.message);
    setTimeout(() => {
      $(".error-box.hide").removeClass("hide");
    }, 100);
  }
})