$(document).ready(() => {
  //jQuery variables
  const $searchBar = $(".search-bar");
  //Show button on click
  $(".hamburger").click(() => {
    $searchBar.fadeToggle("slow");
  });

  const renderListing = (listings) => {
    $(".main-container").empty();
    $(".main-container").append(`<div class="results-container"></div>`);
    listings.forEach((element) => {
      $(".results-container").append(createNewCard(element));
      $(".id").hide();
    });
  };
  //Loops through results and adds new cards

  //Takes search input and sends to server to query results from database
  $("#item-search").submit((event) => {
    console.log("hello");
    event.preventDefault();
    const searchString = $("#search-input").val();
    const data = {
      text: searchString,
    };

    // Empty string check
    if (searchString.trim()) {
      clearResultsContainer();
      $.get("/listings", data, (listing) => {
        renderListing(listing);
        $searchBar.fadeToggle("slow", () => {
          $searchBar.hide();
        });
      });
    }
  });

  $("#get-faves-button").click((event) => {
    event.preventDefault();
    clearResultsContainer();
    $.get("/listings/favourites", (listing) => {
      $(".results-container").remove()
      renderListing(listing);
      // $searchBar.fadeToggle("slow", () => {
      //   $searchBar.hide();
      // });
    });
  });
});
