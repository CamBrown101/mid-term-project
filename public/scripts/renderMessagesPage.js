$(document).ready(() => {
  const messages = {
    content: "hello",
    timestamp: 1234,
    reciever_username: "qubdjksa",
    sender_username: "sadasda",
  };

  $("main").on("click", "#message-seller-btn", (event) => {
    $(".main-container").empty();
    $(".main-container").append(createMessagesContainer());
    $(".messages").append(createSentMessage(messages));
    $(".messages").append(createRecievedMessage(messages));
  });
});
