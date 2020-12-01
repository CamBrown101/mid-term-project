const renderSort = (listings) => {
  $(".main-container").empty();
  $(".main-container").append(`<div class="results-container"></div>`);
  listings.forEach((element) => {
    $(".results-container").append(createNewCard(element));
    $(".id").hide();
  });
};

$(document).ready(() => {
  $("#sort-price").change(function () {
    const options = $("#sort-price").val();
    if (options === "ASC" || options === "DESC") {
      const optionsObj = {
        options: options,
      };
      $.get(`/sort/price`, optionsObj, (data) => {
        $(".main-container").empty();
        //reset other drop down select menus
        $("#sort-date").prop("selectedIndex", 0);
        $("#sort-category").prop("selectedIndex", 0);
        renderSort(data);
      });
    }
  });

  $("#sort-date").change(function () {
    const options = $("#sort-date").val();
    if (options === "ASC" || options === "DESC") {
      const optionsObj = {
        options: options,
      };
      $.get(`/sort/date`, optionsObj, (data) => {
        $(".main-container").empty();
        //reset other drop down select menus
        $("#sort-price").prop("selectedIndex", 0);
        $("#sort-category").prop("selectedIndex", 0);
        renderSort(data);
      });
    }
  });

  $("#sort-category").change(function () {
    const options = $("#sort-category").val();
    if (options !== "category") {
      const optionsObj = {
        options: options,
      };
      $.get(`/sort/category`, optionsObj, (data) => {
        $(".main-container").empty();
        //reset other drop down select menus
        $("#sort-price").prop("selectedIndex", 0);
        $("#sort-date").prop("selectedIndex", 0);
        renderSort(data);
      });
    }
  });
});

/* <select class="nav-item" id="sort-price" name="price">
<option value="price">Sort by price</option>
<option value="ascending">Ascending</option>
<option value="descending">Descending</option>
</select>

<select class="nav-item" id="sort-date" name="date">
<option value="date">Sort by date</option>
<option value="ascending">Ascending</option>
<option value="descending">Descending</option>
</select>

<select class="nav-item" id="sort-category" name="category">
<option value="category">Category</option>
<option value="bikes">Bikes</option>
<option value="computers">Computers</option>
<option value="games">Games</option> */
