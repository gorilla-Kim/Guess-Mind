import events from "./events";

/* socket 관련 event handling을 해주는 controller 파일 */

const socketController = socket => {
  // nickname 설정
  socket.on(events.setNickname, ({ nickname }) => {
    console.log(`⭐  Welcome User : (${nickname})`);
    socket.nickname = nickname;
  });
};

export default socketController;
