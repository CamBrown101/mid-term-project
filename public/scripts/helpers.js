//Creates HTML for a new card listing
const createNewCard = function (listing) {
  const articleContainer = $(`
    <article class="card-container">
      <h5 class="card-title">${listing.title}</h5>
      <object class="listing-image" data="${listing.picture_url}" type="image/png">
      <img id="listing-image" src="/img/test.png">
      </object>
      <p class="card-description">${listing.description}</p>
      <a src="#" class="btn btn-primary small-listing-button">View Item</a>
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

  $.get("/listings/favourites", (res) => {
    if (res.length >= 3) {
      if (res.length > 4) {
        res = res.slice(res.length - 4, res.length);
      }
      $(".listings-favourites")
        .append(`<h3 class="category-heading">Favourites</h3>
    <div id="listings-row-favourites" class="card-row"></div>`);
      renderListings(res.reverse(), "favourites");
    }
  });

  let categoryArr = ["newest", "games", "bikes"];

  for (let i = 0; i < 3; i++) {
    let data = { category: categoryArr[i] };
    $.get("/listings", data).then((listings) => {
      renderListings(listings, i);
    });
  }
};

const messageRender = (data) => {
  const messages = data.messages;
  const id = data.user_id;
  $(".main-container").empty();
  $(".main-container").append(createMessagesContainer());
  messages.forEach((message) => {
    if (id === message.sender_id) {
      $(".messages").append(createSentMessage(message));
    } else {
      $(".messages").append(createRecievedMessage(message));
    }
  });
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
  <div class="listings-favourites"></div>
  <h3 class="category-heading">New Listings</h3>
  <div id="listings-row-0" class="card-row"></div>
  <h3 class="category-heading">Games</h3>
  <div id="listings-row-1" class="card-row"></div>
  <h3 class="category-heading">Bikes</h3>
  <div id="listings-row-2" class="card-row"></div>
  `);
};
