import events from "./events";

/* socket 관련 event handling을 해주는 controller 파일 */

const socketController = socket => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // nickname 설정
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });
  // 퇴장시... disconnect & disconnected
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
  });
};

export default socketController;
