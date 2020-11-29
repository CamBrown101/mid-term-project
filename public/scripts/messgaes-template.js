const createMessagesContainer = () => {
  const messagesContainer = $(`
<div class="main-container">
  <section id="messages-container">
    <div class="messages">
      <form class="messages-form" method="POST" action="/messages/:listingid">
        <textarea class="message-input" placeholder="New Message"></textarea>
        <button id="message-submit" class="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  </section>
</div>
`);
  return messagesContainer;
};

const createSentMessage = (message) => {
  const sentMessageTemplate = $(`
          <div class="message sent">
            <p class="username">${message.sender_username}</p>
            <p class="message-content">${message.content}</p>
            <p class="timestamp">${message.timestamp}</p>
          </div>
`);
  return sentMessageTemplate;
};

const createRecievedMessage = (message) => {
  const recievedMessageTemplate = $(`
  <div class="message recieved">
    <p class="username">${message.reciever_username}</p>
    <p class="message-content">${message.content}</p>
    <p class="timestamp">${message.timestamp}</p>
  </div>
`);
  return recievedMessageTemplate;
};
