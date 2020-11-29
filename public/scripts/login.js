$(document).ready(() => {
  $.get('/', (data) => {
    console.log(data);
  });

  $(".login-btn").submit((event) => {
    event.preventDefault();

  });
});
