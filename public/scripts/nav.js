$(document).ready(()=>{
  $('.icon').click(()=>{
    $(".main-container").empty();
    createCategoryRows();
    loadListings();
  })
})