const clearForm = () => {
  $("#listing-title").val("");
  $("#listing-number").val("");
  $("#listing-description").val("");
  $("#listing-picture-url").val("");
  $("#listing-category").val("");
  $("#new-listing").fadeOut();
};

$(document).ready(() => {
  $(".new-listing-content").submit((event) => {
    event.preventDefault();
    console.log("click listing");
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

    console.log(data);
    console.log("listing");
    $.post("/listings", data, (listing) => {
<<<<<<< HEAD
      createCategoryRows();
=======
      console.log(listing);
      clearForm();
>>>>>>> db9e701fe80cb9cef79045f69cc04a0ef012ab5a
      homePageLoad();
    });
  });
});
