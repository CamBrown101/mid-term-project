$(document).ready(() => {
  let currentCount = 0;

  const getMessageCount = () => {
    const getCount = $.get(`messages/count`, (count) => {
      let newCount = count.rows[0].count;
      if (newCount > currentCount) {
      }

      let newCount = count.rows[0].count;
      console.log(newCount, "inside");
    });
    return getCount;
  };

  getMessageCount();
});
