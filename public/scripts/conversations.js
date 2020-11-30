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

const createConversations = (item) => {
  const sentMessageTemplate = $(`
          <div class="conversation">
            <p class="conversation-title">${item.title}</p>
            <p class="conversation-sender">${item.sender}</p>
            <p class="conversation-receiver">${item.receiver}</p>
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
