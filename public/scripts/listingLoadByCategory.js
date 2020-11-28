//Loads the initial listings on the home page by category
const createNewCard = function (listing) {
  const articleContainer = $(`<article class="card-container">
    <h5 class="card-title">${listing.title}</h5>
    <img src="${listing.photo_url}">
    <p class="card-description">${listing.description}</p>
    <a src="#" class="btn btn-primary">Do Something</a>
    </article>`);
  return articleContainer;
};

$(document).ready(() => {
  console.log("Document ready");
  const renderListing = (listings) => {
    $("#listings-row-1").empty();
    listings.forEach((element) => {
      $("#listings-row-1").append(createNewCard(element));
    });
  };
  const loadListings = () => {
    return $.post("/categories", 0).then((listing) => {
      console.log(listing);
      renderListing(listing);
    });
  };
  loadListings();
  // return $.ajax("/listings").then((listing) => {
  //   console.log(listing);
  //   renderListing(listing);
  // });
});
