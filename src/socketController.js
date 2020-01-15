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
  // 메시지를 전송
  socket.on(events.sendMsg, ({ message }) =>
    broadcast(events.newMsg, { message, nickname: socket.nickname })
  );
  // 그리기 시작좌표 받기
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  // 그리고 있는 좌표 받기(시작이후 좌표)
  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
    console.log(x, y);
  });
  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
