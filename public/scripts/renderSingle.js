$(document).ready(() => {
  console.log("A");
  $('div').on("click", 'a.small-listing-button', (event) => {
    console.log("CLICK");
    const listingID = $(event.target).siblings('.id').html();
    $(".main-container").empty();
    $.get(`/listings/${listingID}`, (listing) => {
      $(".main-container").append(createListingBig(listing));
    });
    //$(".main-container").append(createListingBig());
  })
  const createListingBig = function (listing) {
    const articleContainer = $(`
      <article class="big-listing">
        <h2 class="big-title">${listing.title}</h5>
        <img class="big-img" src="${listing.picture_url}">
        <h5 class="big-price">$${listing.price}</h5>
        <p class="big-description">${listing.description}</p>
        <p class="big-date">Posted: ${listing.posted_date}</p>
      </article>
      `);
    return articleContainer;
  };
});
