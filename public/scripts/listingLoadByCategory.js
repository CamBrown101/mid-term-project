//Loads the initial listings on the home page by category
const createNewCard = function (listing) {
  const articleContainer = $(`<article class="card-container">
    <h5 class="card-title">${listing.title}</h5>
    <img src="${listing.photo_url}">
    <p class="card-description">${listing.description}</p>
    <a src="#" class="btn btn-primary">Do Something</a>
    </article>`);
  return articleContainer;
};

// $(document).ready(() => {
// console.log("Document ready");
// const rowId = [0, 1, 2];

// const listingRowId = $(`#listings-row-${rowId}`);

// const renderListingsByCategory = () => {
//   for (let i = 0; i < rowId.length; i++) {
//     //Send the rowID to the server to use in query
//     return $.post("/listings", rowId[i]).then((listings) => {
//       //Clear the row
//       listingRowId.empty();

//       //Add html to each row individualy
//       listings.forEach((element) => {
//         listingRowId.append(createNewCard(element));
//       });
//     });
//   }
// };
// renderListingsByCategory();

// const renderListing = (listings) => {
//   $("#listings-row-1").empty();
//   listings.forEach((element) => {
//     $("#listings-row-1").append(createNewCard(element));
//   });
// };

// // const loadListings = () => {
// //   return $.post("/listings", 0).then((listing) => {
// //     console.log(listing);
// //     renderListing(listing);
// //   });
// // };

// loadListings();
// const loadListings = () => {};
// loadListings();
// return $.ajax("/listings").then((listing) => {
//   console.log(listing);
//   renderListing(listing);
// });

// });

$(document).ready(() => {
  console.log("Document ready");
  const renderListing = (listings) => {
    $("#listings-row-1").empty();
    listings.forEach((element) => {
      $("#listings-row-1").append(createNewCard(element));
    });
  };
  const loadListings = () => {
    return $.ajax("/listings").then((listing) => {
      renderListing(listing);
    });
  };
  loadListings();
});
