import events from "./events";

/* socket 관련 event handling을 해주는 controller 파일 */

const socketController = socket => {
  // nickname 설정
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname });
  });
};

export default socketController;
