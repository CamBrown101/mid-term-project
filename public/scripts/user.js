const renderUserPage = (user) => {
  let isAdmin = "";
  if (user.is_admin) {
    isAdmin = "True";
  } else {
    isAdmin = "False";
  }
  const userPageTemplate = $(`
          <div class="user-screen">
            <div class="user-name user-item">${user.name}</div>
            <div class="user-email user-item">${user.email}</div>
            <div class="user-admin user-item">${isAdmin}</div>
            <img class="user-image" src="${user.user_image}"></p>
            <div class="user-bio">${user.user_bio}</div>
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
    });
  });
});
