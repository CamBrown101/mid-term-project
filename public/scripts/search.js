$(Document).ready(() => {
    //jQuery variables
    const resultsContainerHtml = $(`<div class="results-container"></div>`)
    const $mainContainer = $('.main-container');
    
    //Loops through results and adds new cards
    const renderListing = (listings) => {
      $mainContainer.empty();
      $mainContainer.append(resultsContainerHtml);
      listings.forEach((element) => {
        const $resultsContainer = $('.results-container');
        $resultsContainer.append(createNewCard(element));
      });
    };
  
    //Takes search input and sends to server to query results from database
    $('#item-search').submit((event)=>{
      const searchString = $('#text').val()

      //Empty string check
      if(searchString.trim()) {
        event.preventDefault();
        clearResultsContainer();
         $.get(`/listings/?text=${searchString}`, (listing => {
          renderListing(listing);
        }))
      }
    })
    


    //Ajax call where results were not coming back properly **waiting on mentor**
    // $('#item-search').submit((event)=>{
    //   event.preventDefault();
    //   $('.main-container').empty()
    //    $.get('/listings', (listing) => {
    //     console.log(listing)
    //     renderListing(listing);
    //   })
    // })
})



