$(document).ready(() => {
  $.get("/login", (data) => {
    if (data) {
      const username = data.name;
      $("#login").hide();
      $("#logout").show();
      $(".username-logged-in").text(`Logged in as ${username}`);
    } else {
      $("#login").show();
      $("#logout").hide();
    }
  });
  $(".login-btn").submit((event) => {
    event.preventDefault();
  });
  $("#logout-btn").click(() => {
    $.get("/logout", () => {
      location.reload();
    });
  });
});
