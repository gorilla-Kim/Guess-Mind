import { handleMessageNotifi } from "./chat";

// eslint-disable-next-line no-undef
const socket = io("/");

// create new message event func
const sendMessage = message => {
  socket.emit("newMessage", { message });
  console.log(`Me : ${message}`);
};

socket.on("messageNotifi", handleMessageNotifi);

// Setting user nickname event func
const setNickname = nickname => {
  socket.emit("setNickname", { nickname });
};
