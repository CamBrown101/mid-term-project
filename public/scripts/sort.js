//Creates HTML for a new sorted card listing

//Convert from select value for sort title string
const convertForTitle = (string) => {
  if (string === "ASC") {
    return "ascending";
  } else if (string === "DESC") {
    return "descending";
  }
  return string;
};

//Render sorted listings with title
const renderSort = (listings, title) => {
  $(".main-container").empty();
  $(".main-container").append(`<h2 class="sort-header">${title}</h2>`);
  $(".main-container").append(`<div class="results-container"></div>`);
  listings.forEach((element) => {
    $(".results-container").append(createNewCard(element));
    $(".id").hide();
  });
};

const getSorted = (sortBy, options) => {
  $.get(`/sort/${sortBy}`, { options }, (data) => {
    $(".main-container").empty();
    //reset drop down select menus
    $("#sort-price").prop("selectedIndex", 0);
    $("#sort-date").prop("selectedIndex", 0);
    $("#sort-category").prop("selectedIndex", 0);
    const title = `Sort by ${sortBy} ${convertForTitle(options)}`;
    renderSort(data, title);
  });
};

$(document).ready(() => {
  //Sort by price select menu handler
  $("#sort-price").change(function () {
    const options = $("#sort-price").val();
    getSorted("price", options);
  });

  //Sort by date select menu handler
  $("#sort-date").change(function () {
    const options = $("#sort-date").val();
    getSorted("date", options);
  });

  //Sort by category select menu handler
  $("#sort-category").change(function () {
    const options = $("#sort-category").val();
    getSorted("category", options);
  });

  // //Front page category title click handlers
  // $("main").on("click", "#games-title", function () {
  //   getSorted("category", "games");
  // });

  // $("main").on("click", "#bikes-title", function () {
  //   getSorted("category", "bikes");
  // });

  // $("main").on("click", "#new-listings-title", function () {
  //   getSorted("new", "category");
  // });
});
