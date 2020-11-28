$(document).ready(() => {

homePageLoad()
});

//old render listings code
// $(document).ready(() => {
//   console.log("Document ready");
//   const renderListing = (listings) => {
//     $("#listings-row-0").empty();
//     $("#listings-row-1").empty();
//     $("#listings-row-2").empty();

//     for (let i = 0; i < 4; i++) {
//       $("#listings-row-0").append(createNewCard(listings[i]));
//       $("#listings-row-1").append(createNewCard(listings[i]));
//       $("#listings-row-2").append(createNewCard(listings[i]));
//     }
//   };
//   const loadListings = () => {
//     return $.ajax("/listings").then((listing) => {
//       renderListing(listing);
//     });
//   };
//   loadListings();
// });
