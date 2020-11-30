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
  const recievedMessageTemplate = $(`
  <div class="message recieved">
    <p class="username">${message.receiver}</p>
    <p class="message-content">${message.message}</p>
    <p class="timestamp">${message.timestamp}</p>
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
            <p class="conversation-messages conversation-item"><img class="conversation-message-icon" src="/img/message.png"></p>
            <div class="conversation-listing-id">${item.listing_id}</div>
          </div>
`);
  return sentMessageTemplate;
};

$(document).ready(() => {
  let listingId = 0;
  $("main").on("click", "#message-seller-btn", (event) => {
    event.preventDefault();
    listingId = $("#message-seller-btn").siblings(".big-id").text();
    $.get(`/messages/${listingId}`, (data) => {
      messageRender(data);
      let messagesLength = data.messages.length;
      const checkNewMessage = () => {
        console.log("Fire");
        $.get(`/messages/${listingId}`, (data) => {
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
        });
        if ($(".messages").length === 0) {
          clearTimeout(timeOut);
        }
      };
      const timeOut = setInterval(checkNewMessage, 3000);
    });
  });

  $("main").on("submit", ".messages-form", (event) => {
    event.preventDefault();
    const message = $(".message-input").val();
    $(".message-input").val("");
    $.get(`/listings/owner/${listingId}`, (data) => {
      const ownerId = data.user_id;
      const send = {
        message,
        ownerId,
      };
      $.post(`/messages/${listingId}`, send, (message) => {});
    });
  });

  $("#convo-btn").click((event) => {
    event.preventDefault();
    $.get(`/messages/`, (data) => {
      const conversations = data.messages;
      $(".main-container").empty();
      $(".main-container").append(createConversationContainer());
      for (const item of conversations) {
        $(".conversations").append(createConversations(item));
        $(".conversation-listing-id").hide();
      }
    });
  });

  $("main").on("click", ".conversation", (event) => {
    listingId = $(event.currentTarget)
      .children(".conversation-listing-id")
      .html();
    $.get(`/messages/${listingId}`, (data) => {
      messageRender(data);

      // Checks to see if there is a new message and renders it
      let messagesLength = data.messages.length;
      const checkNewMessage = () => {
        console.log("Fire");
        $.get(`/messages/${listingId}`, (data) => {
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
        });
        if ($(".messages").length === 0) {
          clearTimeout(timeOut);
        }
      };
      const timeOut = setInterval(checkNewMessage, 3000);
    });

    const timeOut = setInterval(checkNewMessage, 3000);
  });
});
