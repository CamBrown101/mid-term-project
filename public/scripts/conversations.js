const createConversationContainer = () => {
  const messagesContainer = $(`
  <section id="messages-container">
    <div class="inner-message-conatiner">
      <div class="conversations">
      <h4 class="conversation-title-label">Listing</h4>
      <h4 class="conversation-receiver-label">Owner</h4>
      <h4 class="conversation-sender-label">User</h4>
      <h4 class="conversation-messages-label">Messages</h4>
      </div> 
    </div>
  </section>
`);
  return messagesContainer;
};

const createConversations = (item) => {
  const sentMessageTemplate = $(`
          <div class="conversation">
            <p class="conversation-title conversation-item">${item.title}</p>
            <p class="conversation-receiver conversation-item">${item.receiver}</p>
            <p class="conversation-sender conversation-item">${item.sender}</p>
            <p class="conversation-messages conversation-item"></p>
          </div>
`);
  return sentMessageTemplate;
};

$(document).ready(() => {
  $("#convo-btn").click((event) => {
    event.preventDefault();
    $.get(`/messages/`, (conversations) => {
      console.log(conversations);
      $(".main-container").empty();
      $(".main-container").append(createConversationContainer());
      for (const item of conversations) {
        $(".conversations").append(createConversations(item));
      }
    });
  });
});
