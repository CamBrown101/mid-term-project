//Creates HTML for a new card listing
const createNewCard = function (listing) {
  //Convert date to readable format with moment.js
  const local = moment(listing.posted_date)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  const time = moment(local).fromNow();

  const articleContainer = $(`
    <article class="card-container wow animate__fadeIn animate_fadeOut animate__animated" data-wow-duration="2s">
      <div class="card-upper">
      <object class="listing-image" data="${listing.picture_url}" type="image/png">
      <img class="listing-image" src="/img/test.png">
      </object>
      </div>
      <div class="card-lower">
        <h5 class="card-title card-label">${listing.title}</h5>
        <p class="card-description card-label">${listing.description}</p>
        <p class="card-price card-label">Price: $${listing.price}</p>
        <p class="card-date card-label">Posted: ${time}</p>
        <div class="id">${listing.id}</div>
        <a src="#"  class="small-listing-button  user-view-button">View Item</a>

        </div>

    </article>
    `);
  return articleContainer;
};

//reset select menus
const selectReset = () => {
  $("#sort-date").prop("selectedIndex", 0);
  $("#sort-category").prop("selectedIndex", 0);
  $("#sort-price").prop("selectedIndex", 0);
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
    const favouritesArray = res;
    if (favouritesArray.length >= 4) {
      const buildArray = () => {
        arrayToRender = [];
        arrayToRender = [
          favouritesArray[0],
          favouritesArray[1],
          favouritesArray[2],
          favouritesArray[3],
        ];
        let firstItem = favouritesArray.shift();
        favouritesArray.push(firstItem);
      };

      const renderNextFour = () => {
        $("#listings-row-favourites").empty();
        buildArray();
        renderListings(arrayToRender, "favourites");
        if ($(".card-row").length === 0) {
          clearTimeout(timeOut);
        }
      };

      //Initial load
      buildArray();
      $(".listings-favourites")
        .append(`<h3 id="favourites-title" class="favourites-title category-heading">Favourites</h3>
    <div id="listings-row-favourites" class="card-row wow animate__fadeIn animate__animated"></div>`);
      renderListings(arrayToRender, "favourites");

      //sets interval
      let timeOut = setInterval(renderNextFour, 5000);
      $(".listings-favourites").mouseenter(() => {
        clearTimeout(timeOut);
      });
      $(".listings-favourites").mouseleave(() => {
        timeOut = setInterval(renderNextFour, 5000);
      });
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

//renders chat page with messages
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
  <div class="listings-favourites wow animate__fadeIn animate__animated"></div>
  <h3 class="category-heading">New Listings</h3>
  <div id="listings-row-0" class="card-row wow animate__fadeIn animate__animated"></div>
  <h3 class="category-heading">Games</h3>
  <div id="listings-row-1" class="card-row wow animate__fadeIn animate__animated"></div>
  <h3 class="category-heading">Bikes</h3>
  <div id="listings-row-2" class="card-row wow animate__fadeIn animate__animated"></div>
  `);
};
