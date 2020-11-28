//Loads the initial listings on the home page by category
const renderListing = function (listing) {
  const articleContainer = $(`<article class="card-container">
    <h5 class="card-title">${listing.title}</h5>
    <img src="${listing.photo_url}">
    <p class="card-description">${listing.description}</p>
    <a src="#" class="btn btn-primary">Do Something</a>
    </article>`);
  return articleContainer;
};

$(document).ready(() => {
  const renderListings = (listings) => {
    $().empty();
    listings.forEach((element) => {
      id.append(createNewCard(listings));
    });
  };
  const loadListings = () => {
    return $.ajax("/listings", { method: "GET" }).then((listings) => {
      renderListing(listings);
    });
  };
});
