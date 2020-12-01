const clearForm = () => {
  $("#listing-title").val("");
  $("#listing-number").val("");
  $("#listing-description").val("");
  $("#listing-picture-url").val("");
  $("#listing-category").val("");
  $("#new-listing").fadeOut();
};

const createNewListingForm = function (listing) {
  const newListingForm = $(`
<section id="new-listing">
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
      placeholder="What are you selling?"
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
    <button id="new-listing-click" class="btn btn-primary" type="submit">
      Submit
    </button>
    </form>
    <div id="hide-new-listing" class="btn btn-danger">Cancel</div>
</section>
    `);
  return newListingForm;
};

$(document).ready(() => {
  $("#new-listing-button").click(() => {
    $(".search-bar").fadeOut();
    $(".main-container").empty();
    $(".main-container").append(createNewListingForm());
  });
  $("#new-listing").on("click", "#hide-new-listing", () => {
    $(".main-container").empty();
    createCategoryRows();
    homePageLoad();
  });

  $("#new-listing").submit((event) => {
    event.preventDefault();
    const title = $("#listing-title").val();
    const price = $("#listing-number").val();
    const description = $("#listing-description").val();
    const picture = $("#listing-picture-url").val();
    const category = $("#listing-category").val();

    const data = {
      user_id: 1,
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
