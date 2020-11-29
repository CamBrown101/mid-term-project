$(document).ready(() => {
  $('#login').hide()
  $('#logout').hide()


  $.get('/login', (data) => {
    if(data) {
      const username = data.name;
      $('#login').hide()
      $('#logout').show()
      $('.usernameLoggedIn').text(`Logged in as ${username}`)
    } else {
      $('#login').show()
    }
  });

  $('#logout-btn').click(()=>{
    $.get('/logout', ()=> {
      console.log('Logged Out')
      location.reload();
    })
  })
});
