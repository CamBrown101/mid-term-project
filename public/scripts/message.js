let messagesLength;
$(document).ready(() => {
  let listingId = 0;
  let buyerId = 0;
  $("main").on("click", "#message-seller-btn", (event) => {
    event.preventDefault();
    listingId = $("#message-seller-btn").siblings(".big-id").text();
    const receiver_id = $(".seller-id").text();
    console.log(receiver_id, "receiver_id");
    const reqData = {
      receiver_id,
    };
    $.get(`/messages/${listingId}`, reqData, (data) => {
      messagesLength = data.messages.length;
      if (data.messages[0] !== undefined) buyerId = data.messages[0].sender_id;
      messageRender(data);
      const checkNewMessage = () => {
        console.log("Fire");
        $.get(`/messages/${listingId}`, reqData, (data2) => {
          renderNewMessage(data2);
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
    if (message.trim()) {
      $(".message-input").val("");
      $.get(`/listings/owner/${listingId}`, (data) => {
        const ownerId = data.owner;
        const userId = data.user_id;
        const send = {
          message,
        };
        send.receiver = ownerId;
        if (ownerId === userId) {
          send.receiver = buyerId;
        }
        $.post(`/messages/${listingId}`, send, (message) => {});
      });
    }
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
        $(".sender-id").hide();
        $(".receiver-id").hide();
      }
    });
  });

  $("main").on("click", ".conversation", (event) => {
    const senderId = $(event.currentTarget).children(".sender-id").html();
    const receiverId = $(event.currentTarget).children(".receiver-id").html();
    console.log(senderId, receiverId);
    const dataObject = {
      sender_id: senderId,
      receiver_id: receiverId,
    };
    listingId = $(event.currentTarget)
      .children(".conversation-listing-id")
      .html();

    $.get(`/messages/${listingId}`, dataObject, (data) => {
      if (data.messages[0] !== undefined) buyerId = data.messages[0].sender_id;
      messageRender(data);
      messagesLength = data.messages.length;

      // Checks to see if there is a new message and renders it
      const checkNewMessage = () => {
        console.log("Fire");
        $.get(`/messages/${listingId}`, dataObject, (data) => {
          renderNewMessage(data);
        });
        if ($(".messages").length === 0) {
          clearTimeout(timeOut);
        }
      };

      const timeOut = setInterval(checkNewMessage, 3000);
    });
  });
});
