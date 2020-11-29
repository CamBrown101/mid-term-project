$(document).ready(() => {
  //Clicking an item brings user to item page
  $("main").on("click", "a.small-listing-button", (event) => {
    console.log("CLICK");
    const listingID = $(event.target).siblings(".id").html();
    $(".main-container").empty();
    $.get(`/listings/${listingID}`, (data) => {
      console.log(data);
      $(".main-container").append(createListingBig(data.listing));
      console.log(data.listing.user_id, data.user_id);
      if (data.listing.user_id === data.user_id) {
        $("#message-seller-btn").hide();
      }
      $(".big-id").hide();
    });
  });

  //returning to home
  $("main").on("click", "btn.big-back", () => {
    $(".main-container").empty();
    window.location.replace("/");
  });
  $("main").on("click", "#fave-button", (event) => {
    const listing = $(event.target).siblings(".big-id").html();
    console.log(listing);
    $.post("/listings/favourites", { listing: listing }, () => {
      $(event.target).replace($(`<p>FAVORITED</p>`));
    });
    console.log("fave");
  });

  const createListingBig = function (listing) {
    const articleContainer = $(`
      <article class="big-listing">
        <btn class="btn btn-primary big-back">HOME</btn>
        <h2 class="big-title">${listing.title}</h5>
        <img class="big-img" src="${listing.picture_url}">
        <h5 class="big-price">$${listing.price}</h5>
        <p class="big-description">${listing.description}</p>
        <p class="big-date">Posted: ${listing.posted_date}</p>
        <btn class="btn btn-primary message-button" id="message-seller-btn">
        <p class="big-id">${listing.id}</p>
        Message seller</btn>
        <btn class="btn btn-primary" id="fave-button">Favorite</btn>
      </article>
      `);

    return articleContainer;
  };
});
