let resizeTimeoutId;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeoutId);  
  $(".sun").removeClass("animate-sun");
  resizeTimeoutId = setTimeout(() => {
    $(".sun").addClass("animate-sun");
  }, 500)
})