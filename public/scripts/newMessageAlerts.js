const getMessageCount = () => {
  $.get(`messages/count`, (count) => {
    return count.rows[0];
  });
};
$(document).ready(() => {
  console.log(getMessageCount());
});
