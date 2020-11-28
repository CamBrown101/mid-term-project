$(document).ready(() => {
  $(".icon").click(() => {
    $(".main-container").empty();
    createCategoryRows();
    homePageLoad();
  });
  $("#new-listing-button").click(() => {
    $("#new-listing").fadeIn();
  });
  $("#hide-new-listing").click(() => {
    $("#new-listing").fadeOut();
  });
});
