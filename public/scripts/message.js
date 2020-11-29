$(document).ready(() => {
  $("main").on("click", "#message-seller-btn", (event) => {
    event.preventDefault();
    const listingId = $("#message-seller-btn").children("p").text();
    console.log(listingId);
    $.get(`/messages/${listingId}`, (listing) => {
      console.log(listing);
    });
  });
});
