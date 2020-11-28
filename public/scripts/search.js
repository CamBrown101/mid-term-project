$(Document).ready(() => {

  const createNewCard = function (listing) {
    const articleContainer = $(`<article class="card-container">
      <h5 class="card-title">${listing.title}</h5>
      <img src="${listing.photo_url}">
      <p class="card-description">${listing.description}</p>
      <a src="#" class="btn btn-primary">Do Something</a>
      </article>`);
    return articleContainer;
  };
    const renderListing = (listings) => {
      $('.main-container').empty();
      listings.forEach((element) => {
        $('.main-container').append(createNewCard(element));
      });
    };
  
    $('#item-search').submit((event)=>{
      const searchString = $('#text').val()
      event.preventDefault();
      $('.main-container').empty()
       $.get(`/listings/?text=${searchString}`, (listing => {
        console.log(listing)
        renderListing(listing);
      }))
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



