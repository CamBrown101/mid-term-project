
$(Document).ready(() => {
  console.log("Aya");
  const createListingBig = function (listing) {
    const articleContainer = $(`<article class="card-container">
      <h5 class="card-title">${listing.title}</h5>
      <img src="${listing.photo_url}">
      <p class="card-description">${listing.description}</p>
      <a src="#" class="btn btn-primary">Do Something</a>
      </article>`);
    return articleContainer;
  };

  $('.small-listing-button').click((event) => {
    event.preventDefault();
    console.log("CLICK");
  })
});
