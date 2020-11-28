//Loads the initial listings on the home page by category

$(document).ready(() => {
const renderListings = (listings) => {
  $().empty();
  listings.forEach((element) => {
    id.append(createNewCard(listings))
  })
}
const loadListings = () => {
  return $.ajax('/listings', { method: 'GET'})
  .then((listings) => {
    renderListings(listings)
  })
}
})