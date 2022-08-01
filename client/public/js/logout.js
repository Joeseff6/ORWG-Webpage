$(".logout-button").click(async () => {
  console.log("clicked button")
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