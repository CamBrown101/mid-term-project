const createListing = function (listing) {
  const articleContainer = $(`<article class="card-container">
    <h5 class="card-title">${listing.title}</h5>
    <img src="${listing.photo_url}">
    <p class="card-description">${listing.description}</p>
    <a src="#" class="btn btn-primary">View Item</a>
    </article>`);
  return articleContainer;
};
