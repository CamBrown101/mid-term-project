//Clears out form on submit
const clearForm = () => {
  $("#listing-title").val("");
  $("#listing-number").val("");
  $("#listing-description").val("");
  $("#listing-picture-url").val("");
  $("#listing-category").val("");
  $("#new-listing").fadeOut();
};

//Renders form
const createNewListingForm = function () {
  const newListingForm = $(`
  <div class="new-listing-container">
<section id="new-listing" class="wow animate__fadeIn animate__animated">
  <h2 id="new-listing-title">Create a new listing</h2>
<form class="new-listing-content" method="POST" action="/listings">
    <input
      type="text"
      name="title"
      id="listing-title"
      placeholder="What are you selling?"
      required
    />

    <input
      type="number"
      name="price"
      id="listing-number"
      placeholder="How much is it?"
      required
    />

    <input
      type="text"
      name="description"
      id="listing-description"
      placeholder="Write a brief description."
      required
    />

    <input
      type="url"
      name="picture_url"
      id="listing-picture-url"
      placeholder="Pic?"
      required
    />

    <select id="listing-category" name="category">
      <option value="bikes">Bikes</option>
      <option value="computers">Computers</option>
      <option value="games">Games</option>
    </select>
    
    <button id="new-listing-click" class="btn styled-button" type="submit">
      Submit
    </button>
    <div id="hide-new-listing" class="btn">Cancel</div>

    </form>
</section>
</div>
    `);
  return newListingForm;
};

$(document).ready(() => {
  //Loads new listing form
  $("#new-listing-button").click(() => {
    $(".search-bar").fadeOut();
    $(".main-container").empty();
    $(".main-container").append(createNewListingForm());
  });

  //reloads home screen
  $("#new-listing").on("click", "#hide-new-listing", () => {
    $(".main-container").empty();
    createCategoryRows();
    homePageLoad();
  });

  //POSTs new listing to server
  $("main").on("submit", ".new-listing-content", (event) => {
    event.preventDefault();

    const title = $("#listing-title").val();
    const price = $("#listing-number").val();
    const description = $("#listing-description").val();
    const picture = $("#listing-picture-url").val();
    const category = $("#listing-category").val();

    const data = {
      title: title,
      price: price,
      description: description,
      picture_url: picture,
      category: category,
    };

    $.post("/listings", data, (listing) => {
      createCategoryRows();
      clearForm();
      homePageLoad();
    });
  });
});
