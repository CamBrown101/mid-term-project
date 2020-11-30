//Creates HTML for a new card listing
const createNewCard = function (listing) {
  const articleContainer = $(`
    <article class="card-container">
      <h5 class="card-title">${listing.title}</h5>
      <img src="${listing.picture_url}">
      <p class="card-description">${listing.description}</p>
      <a src="#" class="btn btn-primary small-listing-button">Do Something</a>
      <div class="id">${listing.id}</div>
    </article>
    `);
  return articleContainer;
};

//Clears results container
const clearResultsContainer = () => {
  $(".results-container").empty();
};

//Renders listings for home page
const homePageLoad = () => {
  $("#new-listing").hide();

  const renderListings = (listings, index) => {
    $(`#listings-row-${index}`).empty();
    for (const item of listings) {
      $(`#listings-row-${index}`).append(createNewCard(item));
      $(".id").hide();
    }
  };
  let categoryArr = ["newest", "games", "bikes"];

  for (let i = 0; i < 3; i++) {
    let data = { category: categoryArr[i] };
    $.get("/listings", data).then((listings) => {
      renderListings(listings, i);
    });
  }
};

//Loads listings using the renderListings function
const loadListings = () => {
  return $.ajax("/listings").then((listing) => {
    renderListing(listing);
  });
};

//Create category row Html
const createCategoryRows = () => {
  $(".main-container").append(`
  <div id="listings-row-0" class="card-row"></div>
  <div id="listings-row-1" class="card-row"></div>
  <div id="listings-row-2" class="card-row"></div>
  `);
};

//Get owner Id from listing Id
const getOwnerIdByListingId = (listingId) => {
  $.get(`/listings/owner/${listingId}`, (data) => {
    const ownerId = data.owner;
    return ownerId;
  });
};
