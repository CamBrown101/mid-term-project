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
    clearForm();
    $.post("/listings", data, (listing) => {
      console.log(listing);
    });
  });
});
