$(document).ready(() => {
  //jQuery variables
  const resultsContainerHtml = $(`<div class="results-container"></div>`);
  const $mainContainer = $(".main-container");
  const $searchBar = $('.search-bar')
  //Show button on click
  $('.hamburger').click(() => {
    $searchBar.fadeToggle('slow')
  })



  //Loops through results and adds new cards
  const renderListing = (listings) => {
    $mainContainer.empty();
    $mainContainer.append(resultsContainerHtml);
    listings.forEach((element) => {
      const $resultsContainer = $(".results-container");
      $resultsContainer.append(createNewCard(element));
    });
  };

  //Takes search input and sends to server to query results from database
  $('#item-search').submit((event)=>{
    event.preventDefault();
    const searchString = $('#text').val()
    const data = {
      text: searchString
    };
    
    // Empty string check
    if(searchString.trim()) {
      clearResultsContainer();
       $.get('/listings', data, (listing => {
        renderListing(listing);
        $searchBar.fadeToggle('slow', () => {
          $searchBar.hide();
        });;
      }))
    } 
  })
});
