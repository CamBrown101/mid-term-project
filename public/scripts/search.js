$(document).ready(() => {
  //Render all listing objects in given array
  const renderListing = (listings) => {
    $(".main-container").empty();
    $(".main-container").append(`<div class="results-container"></div>`);
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

  $("body").on("submit", ".filter", (event) => {
    event.preventDefault();
    const searchString = $("#search-input").val();
    let maxPrice = $("#price-max").val();
    let minPrice = $("#price-min").val();

    if (!Number.isInteger(parseInt(maxPrice))) maxPrice = Number.MAX_SAFE_INTEGER;
    console.log(maxPrice);
    $.get("/listings", {text: searchString}, (listings) => {
      const filteredListings = listings.filter(listing => listing.price >= minPrice && listing.price <= maxPrice);
      renderListing(filteredListings);
    });
  })

  //Takes user to page displaying their favourited listings
  $("#get-faves-button, #favourites-title").click((event) => {
    event.preventDefault();
    clearResultsContainer();
    $.get("/listings/favourites", (listing) => {
      $(".results-container").remove();
      renderListing(listing);
    });
  });
});
