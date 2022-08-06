$(".logout-button").click(async () => {
  try {
    await $.ajax({
    url: "/api/admin/logout",
    method: "POST",
    });
    window.location.replace("/");
  } catch(err) {
    console.log(err.message);
  }
});