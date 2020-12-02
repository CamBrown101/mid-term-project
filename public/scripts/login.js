//basic functionality for logging in/out
$(document).ready(() => {

  //Makes get request to login to check if logged in
  $.get("/login", (data) => {
    if (data) {
      const username = data.name;
      $("#login").hide();
      $("#logout").show();
      $(".username-logged-in").text(`${username}`);
    } else {
      $("#login").show();
      $("#logout").hide();
    }
  });

//logout button functionality
  $("#logout-btn").click(() => {
    $.get("/logout", () => {
      location.reload();
    });
  });
});
