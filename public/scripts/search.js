$(Document).ready(() => {

    const resultsContainerHtml = $(`<div class="results-container"></div>`)
    const $mainContainer = $('.main-container');
    
    const renderListing = (listings) => {
      $mainContainer.empty();
      $mainContainer.append(resultsContainerHtml);
      listings.forEach((element) => {
        const $resultsContainer = $('.results-container');
        $resultsContainer.append(createNewCard(element));
      });
    };
  
    $('#item-search').submit((event)=>{
      const searchString = $('#text').val()

      if(searchString.trim()) {
        event.preventDefault();
        clearResultsContainer();
         $.get(`/listings/?text=${searchString}`, (listing => {
          renderListing(listing);
        }))
      }
    })
    



    // $('#item-search').submit((event)=>{
    //   event.preventDefault();
    //   $('.main-container').empty()
    //    $.get('/listings', (listing) => {
    //     console.log(listing)
    //     renderListing(listing);
    //   })
    // })
})



