$(document).ready(() => {
  let listingId = 1;
  $("main").on("click", "#message-seller-btn", (event) => {
    event.preventDefault();
    listingId = $("#message-seller-btn").children("p").text();
    console.log(listingId);
    $.get(`/messages/${listingId}`, (listing) => {
      console.log(listing);
    });
  });

  $("message-submit").submit((event) => {
    event.preventDefault();
    console.log("new-message-click-working");
    const message = $(".message-input").val();
    const data = {
      message: message,
    };

    $.post(`/listings/${listingId}`, data, (message) => {
      console.log(message);
    });
  });
});
