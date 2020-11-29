$(document).ready(() => {
  console.log("its working");
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
    $.post("/listings", data, (listing) => {
      console.log(listing);
    });
  });
});
