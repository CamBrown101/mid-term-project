//Creates HTML for a new card listing
const createSortedCard = function (listing) {
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

const convertForTitle = (string) => {
  if (string === "ASC") {
    return "ascending";
  } else if (string === "DESC") {
    return "descending";
  }
};
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

/* <select class="nav-item" id="sort-price" name="price">
<option value="price">Sort by price</option>
<option value="ascending">Ascending</option>
<option value="descending">Descending</option>
</select>

<select class="nav-item" id="sort-date" name="date">
<option value="date">Sort by date</option>
<option value="ascending">Ascending</option>
<option value="descending">Descending</option>
</select>

<select class="nav-item" id="sort-category" name="category">
<option value="category">Category</option>
<option value="bikes">Bikes</option>
<option value="computers">Computers</option>
<option value="games">Games</option> */
