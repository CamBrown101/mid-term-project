const createMessagesContainer = () => {
  const messagesContainer = $(`
  <section id="messages-container">
    <div class="inner-message-conatiner">
      <div class="messages">
      </div>
      <form class="messages-form" method="POST" action="/messages/:listingid">
        <input type="text" class="message-input" placeholder="New Message"></textarea>
        <button id="message-submit" class="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  </section>
`);
  return messagesContainer;
};

const createSentMessage = (message) => {
  const local = moment(message.time).local().format("YYYY-MM-DD HH:mm:ss");
  const time = moment(local).fromNow();
  const sentMessageTemplate = $(`
    <div class="message sent wow animate__fadeIn animate__animated">
      <p class="username">${message.sender}</p>
      <p class="message-content">${message.message}</p>
      <p class="timestamp">${time}</p>
    </div>
`);
  return sentMessageTemplate;
};

const createRecievedMessage = (message) => {
  const local = moment(message.time).local().format("YYYY-MM-DD HH:mm:ss");
  const time = moment(local).fromNow();
  const recievedMessageTemplate = $(`
  <div class="message recieved wow animate__fadeIn animate__animated">
    <p class="username">${message.sender}</p>
    <p class="message-content">${message.message}</p>
    <p class="timestamp">${time}</p>
  </div>
`);
  return recievedMessageTemplate;
};

const createConversationContainer = () => {
  const messagesContainer = $(`
  <section id="messages-container">
    <div class="inner-message-conatiner">
      <div class="conversations">
      <h4 class="conversation-title-label">Listing</h4>
      <h4 class="conversation-receiver-label">Owner</h4>
      <h4 class="conversation-sender-label">User</h4>
      <h4 class="conversation-messages-label">New Messages</h4>
      </div>
    </div>
  </section>
`);
  return messagesContainer;
};

const createConversations = (item) => {
  const sentMessageTemplate = $(`
    <div class="conversation wow animate__fadeIn animate__animated">
      <p class="conversation-title conversation-item">${item.title}</p>
      <p class="conversation-receiver conversation-item">${item.receiver}</p>
      <p class="conversation-sender conversation-item">${item.sender}</p>
      <p class="conversation-messages conversation-item"><img class="conversation-message-icon" src="/img/message.png"></p>
      <div class="conversation-listing-id">${item.listing_id}</div>
      <div class="sender-id">${item.sender_id}</div>
      <div class="receiver-id">${item.receiver_id}</div>
    </div>
`);
  return sentMessageTemplate;
};

const renderNewMessage = (data) => {
  if (messagesLength < data.messages.length) {
    const messagesToRender = data.messages.length - messagesLength;
    const messages = [];
    for (
      let i = data.messages.length - messagesToRender;
      i < data.messages.length;
      i++
    ) {
      messages.push(data.messages[i]);
    }
    messagesLength = data.messages.length;
    const id = data.user_id;
    messages.forEach((message) => {
      if (id === message.sender_id) {
        $(".messages").append(createSentMessage(message));
      } else {
        $(".messages").append(createRecievedMessage(message));
      }
    });
  }
};
