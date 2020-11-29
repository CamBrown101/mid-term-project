$(document).ready(() => {
  console.log("its working");
  $("#login-click").submit((event) => {
    event.preventDefault();
    const email = $("#login-email").val();
    const data = {
      email: email,
    };
    console.log(data);
    $.post("/login", data, (res) => {
      console.log(res);
    });
  });
});
