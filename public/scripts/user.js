const renderUserPage = (user) => {
  let isAdmin = "";
  if (user.is_admin) {
    isAdmin = "True";
  } else {
    isAdmin = "False";
  }
  const userPageTemplate = $(`
          <div class="user-screen users-main">
          <div class="user-image-container">
            <img class="user-image" src="${user.user_image}"></p>
          </div>
          <div class="user-info-container">
            <div class="user-name user-item"><h4 class="user-header">User name: </h4>${user.name}</div>
            <div class="user-email user-item"><h4 class="user-header">Email: </h4>${user.email}</div>
            <div class="user-admin user-item"><h4 class="user-header">Admin Privileges: </h4>${isAdmin}</div>
            <div class="user-bio"><h4 class="user-header">User Bio:</h4>\n${user.user_bio}</div>
          </div>
            </div>
`);
  return userPageTemplate;
};

const renderUserUpdateForm = (user) => {
  const userPageTemplate = $(`
          <div class="user-update users-main">
          <h2 class="user-update-header">Update your details: </h2>
          <form class="update-user-content" method="POST" action="/users">
              <label for="update-user-name">Username</label>
              <input
                type="text"
                name="username"
                class="user-update-input"
                id="update-user-name"
                value="${user.name}"
              />
              <label for="update-user-email">Email</label>
              <input
                type="text"
                name="email"
                class="user-update-input"
                id="update-user-email"
                value="${user.email}"
              />
              <label for="update-user-bio">Bio</label>
              <input
                type="text"
                name="bio"
                class="user-update-input"
                id="update-user-bio"
                value="${user.user_bio}"
              />
              <label for="update-user-image">Profile picture</label>
              <input
                type="text"
                name="image"
                class="user-update-input"
                id="update-user-image"
                value="${user.user_image}"
              />
              <button id="update-user-form" class="btn btn-primary" >
                Update
              </button>
            </form>
          </div>
`);
  return userPageTemplate;
};

const newUserListing = (listing) => {
  const newListing = $(`
    <article class="user-listing-parent users-main">
      <div class="user-listing-container-one">
        <object class="user-listing-image" data="${listing.picture_url}" type="image/png">
        <img class="user-listing-image" src="/img/test.png">
        </object>
      </div>
      <div class="user-listing-container-two">
        <h5 class="user-listing-title"><h4 class="user-h4">Listing: </h4>${listing.title}</h5>
        <p class="user-listing-description"><h4 class="user-h4">Description: </h4>\n${listing.description}</p>
        <div class="id">${listing.id}</div>
        <div class="user-listing-price"><h4 class="user-h4">Price: </h4>$${listing.price}</div>
        <a src="#" class="btn btn-primary small-listing-button">View Item</a>
      </div>
     </article>
    `);
  return newListing;
};

const renderUserListings = (listings) => {
  for (const item of listings) {
    $(`.main-container`).append(newUserListing(item));
    $(".id").hide();
  }
};

$(document).ready(() => {
  $(".username-logged-in").click((event) => {
    event.preventDefault();
    $.get(`/users/current/`, (data) => {
      $(".main-container").empty();
      $(".main-container").append(renderUserPage(data));
      $(".main-container").append(renderUserUpdateForm(data));
      $.get("/users/listings/", (data) => {
        console.log(data);
        renderUserListings(data);
      });
    });
  });

  $("main").on("click", "#update-user-form", (event) => {
    // // $(".update-user-content").submit((event) => {
    event.preventDefault();
    const name = $("#update-user-name").val();
    const email = $("#update-user-email").val();
    const bio = $("#update-user-bio").val();
    const picture = $("#update-user-image").val();

    const data = {
      name: name,
      email: email,
      bio: bio,
      picture: picture,
    };
    $.post("/users/", data, (user) => {
      console.log(user);
      $(".main-container").empty();
      $(".main-container").append(renderUserPage(user));
      $(".main-container").append(renderUserUpdateForm(user));
    });
  });
});