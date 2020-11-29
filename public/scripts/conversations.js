const createConversationContainer = () => {
  const messagesContainer = $(`
  <section id="messages-container">
    <div class="inner-message-conatiner">
      <div class="conversations">
      </div>
      
    </div>
  </section>
`);
  return messagesContainer;
};

const createConversations = (message) => {
  const sentMessageTemplate = $(`
          <div class="conversation">
            <p class="conversation-title">${message.listing_title}</p>
            <p class="conversation-sender">${message.sender_name}</p>
            <p class="conversation-receiver">${message.receiver_name}</p>
          </div>
`);
  return sentMessageTemplate;
};

$(document).ready(() => {
  $("#convo-btn").click((event) => {
    event.preventDefault();
    $.get(`/messages/`, (listing) => {
      console.log(listing);
      $(".main-container").empty();
      $(".main-container").append(createConversationContainer());
      $(".messages").append(createConversations(listing));
    });
  });
});
