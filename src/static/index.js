// eslint-disable-next-line no-undef
const socket = io("/");

// create new message event func
const sendMessage = message => {
  socket.emit("newMessage", { message });
  console.log(`Me : ${message}`);
};

// recevied new message event func
const handleMessageNotifi = data => {
  const { message, nickname } = data;
  console.log(`${nickname} : ${message}`);
};
socket.on("messageNotifi", handleMessageNotifi);

// Setting user nickname event func
const setNickname = nickname => {
  socket.emit("setNickname", { nickname });
};