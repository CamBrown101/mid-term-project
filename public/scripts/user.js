const renderUserPage = (user) => {
  let isAdmin = "";
  if (user.is_admin) {
    isAdmin = "True";
  } else {
    isAdmin = "False";
  }
  const userPageTemplate = $(`
          <div class="user-screen">
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
          <div class="user-update">
          <div class="user-update-containter-one">
          </div>
          <div class="user-update-containter-one">
            <div class="user-name user-item"><h4 class="user-header">User name: </h4>${user.name}</div>
            <div class="user-email user-item"><h4 class="user-header">Email: </h4>${user.email}</div>
            <div class="user-admin user-item"><h4 class="user-header">Admin Privileges: </h4>${isAdmin}</div>
            <div class="user-bio"><h4 class="user-header">User Bio:</h4>\n${user.user_bio}</div>
          </div>
            </div>
`);
};

$(document).ready(() => {
  $(".username-logged-in").click((event) => {
    event.preventDefault();
    $.get(`/users/current/`, (data) => {
      $(".main-container").empty();
      $(".main-container").append(renderUserPage(data));
    });
  });
});
