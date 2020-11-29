$(document).ready(() => {
  $("#login").hide();
  $("#log-out").hide();
  $.get("/login", (data) => {
    if (data) {
      const username = data.name;
      $("#login").hide();
      $("#log-out").show();
      $(".usernameLoggedIn").text(`Logged in as ${username}`);
    } else {
      $("#login").show();
    }
  });

  $(".login-btn").submit((event) => {
    event.preventDefault();
  });
  $(".logout-btn").submit((event) => {
    event.preventDefault();
  });
});
