// eslint-disable-next-line no-undef
const socket = io("/");

// create new message event func
const sendMessage = message => {
  socket.emit("newMessage", { message });
};
// recevied new message event func
const handleMessageNotifi = data => {
  const { message } = data;
  console.log(`Client : ${message}`);
};
socket.on("messageNotifi", handleMessageNotifi);
