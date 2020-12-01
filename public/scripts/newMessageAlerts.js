$(document).ready(() => {
  const getMessageCount = () => {
    const getCount = $.get(`messages/count`, (count) => {
      const newCount = count.rows[0];
      console.log(newCount, "inside");
      return newCount;
    });
    return getCount;
  };
});
