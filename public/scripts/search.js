$(document).ready(() => {

  //Render all listing objects in given array
  const renderListing = (listings) => {
    $(".main-container").empty();
    $(".main-container").append(`<div class="results-container"></div>`);
    //Loops through results and adds new cards
    listings.forEach((element) => {
      $(".results-container").append(createNewCard(element));
      $(".id").hide();
    });
  };

  //Takes search input and sends to server to query results from database
  $("#item-search").submit((event) => {
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
      });
    }
  });

  //Takes user to page displaying their favourited listings
  $("#get-faves-button").click((event) => {
    event.preventDefault();
    clearResultsContainer();
    $.get("/listings/favourites", (listing) => {
      $(".results-container").remove()
      renderListing(listing);
    });
  });
});
