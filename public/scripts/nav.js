$(document).ready(() => {
  new WOW().init();
  $(".icon").click(() => {
    $(".main-container").empty();
    createCategoryRows();
    homePageLoad();
  });
});
