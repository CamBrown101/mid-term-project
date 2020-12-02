//Creates HTML for a new sorted card listing
const createSortedCard = function (listing) {

  //Convert date to readable format with moment.js
  const local = moment(listing.posted_date)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  const time = moment(local).fromNow();

  const articleContainer = $(`
    <article class="card-container">
      <h5 class="card-title">${listing.title}</h5>
      <object class="listing-image" data="${listing.picture_url}" type="image/png">
      <img id="listing-image" src="/img/test.png">
      </object>
      <p class="card-description">${listing.description}</p>
      <a src="#" class="btn btn-primary small-listing-button">View Item</a>
      <h5 class="big-price">$${listing.price}</h5>
      <p class="big-date">Posted: ${time}</p>
      <div class="id">${listing.id}</div>
    </article>
    `);
  return articleContainer;
};

//Convert from select value for sort title string
const convertForTitle = (string) => {
  if (string === "ASC") {
    return "ascending";
  } else if (string === "DESC") {
    return "descending";
  }
};

//Render sorted listings with title
const renderSort = (listings, title) => {
  $(".main-container").empty();
  $(".main-container").append(`<h2 class="sort-header">${title}</h2>`);
  $(".main-container").append(`<div class="results-container"></div>`);
  listings.forEach((element) => {
    $(".results-container").append(createSortedCard(element));
    $(".id").hide();
  });
};

$(document).ready(() => {
  //Sort by price select menu handler
  $("#sort-price").change(function () {
    const options = $("#sort-price").val();
    if (options === "ASC" || options === "DESC") {
      const optionsObj = {
        options: options,
      };

      $.get(`/sort/price`, optionsObj, (data) => {
        $(".main-container").empty();
        //reset other drop down select menus
        $("#sort-date").prop("selectedIndex", 0);
        $("#sort-category").prop("selectedIndex", 0);
        const converted = convertForTitle($("#sort-price").val());
        const title = `Sort by price ${converted}`;
        renderSort(data, title);
      });
    }
  });

  //Sort by date select menu handler
  $("#sort-date").change(function () {
    const options = $("#sort-date").val();
    if (options === "ASC" || options === "DESC") {
      const optionsObj = {
        options: options,
      };
      $.get(`/sort/date`, optionsObj, (data) => {
        $(".main-container").empty();
        //reset other drop down select menus
        $("#sort-price").prop("selectedIndex", 0);
        $("#sort-category").prop("selectedIndex", 0);
        const converted = convertForTitle($("#sort-date").val());
        const title = `Sort by date ${converted}`;
        renderSort(data, title);
      });
    }
  });

  //Sort by category select menu handler
  $("#sort-category").change(function () {
    const options = $("#sort-category").val();
    if (options !== "category") {
      const optionsObj = {
        options: options,
      };
      $.get(`/sort/category`, optionsObj, (data) => {
        $(".main-container").empty();
        //reset other drop down select menus
        $("#sort-price").prop("selectedIndex", 0);
        $("#sort-date").prop("selectedIndex", 0);
        const title = `Sort by category ${$("#sort-category").val()}`;
        renderSort(data, title);
      });
    }
  });
});
