//Creates HTML for a new card listing
const createNewCard = function (listing) {
  const articleContainer = $(`
    <article class="card-container">
      <h5 class="card-title">${listing.title}</h5>
      <img src="${listing.photo_url}">
      <p class="card-description">${listing.description}</p>
      <a src="#" class="btn btn-primary">Do Something</a>
    </article>
    `);
  return articleContainer;
};

//Clears results container
const clearResultsContainer = () => {
  $('.results-container').empty();
};
//Renders listings for home page
const renderListing = (listings) => {
  $("#listings-row-0").empty();
  $("#listings-row-1").empty();
  $("#listings-row-2").empty();

  for (let i = 0; i < 4; i++) {
    $("#listings-row-0").append(createNewCard(listings[i]));
    $("#listings-row-1").append(createNewCard(listings[i]));
    $("#listings-row-2").append(createNewCard(listings[i]));
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
  $('.main-container').append(`
  <div id="listings-row-0" class="card-row"></div> 
  <div id="listings-row-1" class="card-row"></div> 
  <div id="listings-row-2" class="card-row"></div>
  `)
}