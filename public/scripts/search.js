$(Document).ready(() => {

  const createNewCard = function (listing) {
    const articleContainer = $(`
      <article class="card-container">
        <h5 class="card-title">${listing.title}</h5>
        <img src="${listing.photo_url}">
        <p class="card-description">${listing.description}</p>
        <a src="#" class="btn btn-primary">Do Something</a>
      </article>
      `);
    return articleContainer;
  };

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
        $('.results-container').empty();
         $.get(`/listings/?text=${searchString}`, (listing => {
          console.log(listing)
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



