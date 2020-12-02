//Renders the page for a single listing
const createListingBig = function (listing) {
  const local = moment(listing.posted_date)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  const time = moment(local).fromNow();
  const articleContainer = $(`
    <article class="big-listing">
      <btn class="btn btn-primary big-back">HOME</btn>
      <h2 class="big-title">${listing.title}</h5>
      <div class="image-wrapper">
      <object class="listing-image" data="${listing.picture_url}" type="image/png">
      <img class="big-img" src="/img/test.png">
      </object>
      </div>
      <h5 class="big-price">$${listing.price}</h5>
      <p class="big-description">${listing.description}</p>
      <p class="big-user-id">${listing.user_id}</p>
      <p class="big-date">Posted: ${time}</p>
      <p class="big-user-name">Seller: ${listing.name}</p>
      <btn class="btn btn-primary message-button" id="message-seller-btn">Message seller</btn>
      <p class="big-id">${listing.id}</p>
      <p class="seller-id">${listing.user_id}</p>
      <btn class="btn btn-primary" id="fave-button">Favorite</btn>
      <btn class="btn btn-warning" id="sold-button">Sold</btn>
      <btn class="btn btn-danger" id="delete-button">Delete</btn>
    </article>
    `);
  return articleContainer;
};

$(document).ready(() => {
  //Clicking an item brings user to listing page
  $("main").on("click", "a.small-listing-button", (event) => {

    const listingID = $(event.target).siblings(".id").html();

    $(".main-container").empty();

    $.get(`/listings/${listingID}`, (data) => {
      //loading page
      $(".main-container").append(createListingBig(data.listing));
      $(".big-user-id").hide();
      $(".big-id").hide();

      //getting info for logged in user and showing correct UI
      $.get(`/users/current`, (user) => {
        if (user.is_admin) {
          $("#delete-button").show();
          $("#sold-button").show();
        }
        if (!user) {
          $("#message-seller-btn").hide();
          $("#fave-button").hide();
        }
      });

      //if logged in as owner of listing
      if (data.listing.user_id === data.user_id) {
        $("#message-seller-btn").hide();
        $("#delete-button").show();
        $("#sold-button").show();
      }

      if (data.listing.is_sold) {
        $(".image-wrapper").append('<h3 class="sold-indicator">SOLD!</h3>');
        $("#sold-button").hide();
      }
    });

    //Check if listing favourited
    $.get(`/listings/favourites/${listingID}`, (data) => {
      if (data) {
        $("#fave-button").replaceWith(
          `<btn class="btn btn-primary" id="fave-delete-button">Un-favourite</btn>`
        );
      }
    });
  });

  //Returning to home
  $("main").on("click", "btn.big-back", () => {
    $(".main-container").empty();
    createCategoryRows();
    homePageLoad();
  });

  //Functionality of favourite button
  $("main").on("click", "#fave-button", (event) => {
    const listing = $(".big-id").text();
    $.post("/listings/favourites", { listing: listing }, () => {
      $(event.target).replaceWith(
        `<btn class="btn btn-primary" id="fave-delete-button">Un-favourite</btn>`
      );
    });
  });

  //Functionality to remove favourite
  $("main").on("click", "#fave-delete-button", (event) => {
    const listing = $(".big-id").text();
    $.post(
      `/listings/favourites/${listing}/delete`,
      { listing: listing },
      () => {
        $(event.target).replaceWith(
          `<btn class="btn btn-primary" id="fave-button">Favorite</btn>`
        );
      }
    );
  });

  //Delete button functionality
  $("main").on("click", "#delete-button", (event) => {
    const listingid = $(".big-id").text();
    const idObject = { listingid };
    $.post("/listings/delete", idObject, () => {
      window.location.replace("/");
    });
  });

  //Navigate to userpage of owner of listing
  $("main").on("click", ".big-user-name", (event) => {
    const id = $(".big-user-id").text();
    event.preventDefault();
    $.get(`/users/${id}`, (data) => {
      $(".main-container").empty();
      $(".main-container").append(renderUserPage(data));
    });
  });

  //Mark Sold Functionality
  $("main").on("click", "#sold-button", (event) => {
    const listingid = $(".big-id").text();
    const idObject = { listingid };
    $.post("/listings/sold", idObject, (data) => {
      if (data.rows[0].is_sold) {
        $(".image-wrapper").append('<h3 class="sold-indicator">SOLD!</h3>');
        $("#sold-button").hide();
      }
    });
  });
});
