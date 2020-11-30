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

$(document).ready(() => {
  $(".username-logged-in").click((event) => {
    event.preventDefault();
    $.get(`/users/current/`, (data) => {
      $(".main-container").empty();
      $(".main-container").append(renderUserPage(data));
      $(".main-container").append(renderUserUpdateForm(data));
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
    $.post("/users/", data, (data) => {
      $(".main-container").empty();
      $(".main-container").append(renderUserPage(data));
      $(".main-container").append(renderUserUpdateForm(data));
    });
  });
});
