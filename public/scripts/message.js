const createMessagesContainer = () => {
  const messagesContainer = $(`
  <section id="messages-container">
    <div class="inner-message-conatiner">
      <div class="messages">
      </div>
      <form class="messages-form" method="POST" action="/messages/:listingid">
        <textarea class="message-input" placeholder="New Message"></textarea>
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
  const sentMessageTemplate = $(`
          <div class="message sent">
            <p class="username">${message.sender}</p>
            <p class="message-content">${message.message}</p>
            <p class="timestamp">${message.timestamp}</p>
          </div>
`);
  return sentMessageTemplate;
};

const createRecievedMessage = (message) => {
  console.log(message);
  const recievedMessageTemplate = $(`
  <div class="message recieved">
    <p class="username">${message.receiver}</p>
    <p class="message-content">${message.message}</p>
    <p class="timestamp">${message.timestamp}</p>
  </div>
`);
  return recievedMessageTemplate;
};

$(document).ready(() => {
  let listingId = 0;
  $("main").on("click", "#message-seller-btn", (event) => {
    event.preventDefault();
    listingId = $("#message-seller-btn").siblings(".big-id").text();
    console.log(listingId);
    $.get(`/messages/${listingId}`, (data) => {
      messageRender(data);
    });
  });

  $("main").on("submit", ".messages-form", (event) => {
    event.preventDefault();
    const message = $(".message-input").val();
    $.get(`/listings/owner/${listingId}`, (data) => {
      const ownerId = data.user_id;
      console.log(ownerId);
      const send = {
        message,
        ownerId,
      };
      $.post(`/messages/${listingId}`, send, (message) => {
        console.log(message);
      });
    });
  });
});
// $(".messages").append(createSentMessage(message));
// $(".messages").append(createRecievedMessage(messages));
