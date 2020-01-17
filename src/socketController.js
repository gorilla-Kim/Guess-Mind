import events from "./events";
import { chooseWord } from "./words";

/* socket 관련 event handling을 해주는 controller 파일 */

// 유저들의 ID가 저장되는 리스트
let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let timeout = null;

// timeout을 위한 객체변수
const times = {
  startTime: 5000,
  paintTime: 30000
};

// 게임 진행자를 랜덤으로 선출
const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);

  const startGame = () => {
    if (sockets.length > 1) {
      if (!inProgress) {
        inProgress = true;
        leader = chooseLeader();
        word = chooseWord();
        superBroadcast(events.gameStarting);
        setTimeout(() => {
          superBroadcast(events.gameStarted);
          io.to(leader.id).emit(events.leaderNotif, { word });
          // 30초 뒤에 게임종료
          timeout = setTimeout(() => {
            // 제한시간안에 못맞출시 leader point+5
            addPoints(leader.id, 5);
            // endGame();
          }, times.paintTime);
          // 5초 뒤에 게임이 시작됩니다.
        }, times.startTime);
      }
    }
  };
  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    // game restart
    setTimeout(() => startGame(), times.startTime);
  };
  const addPoints = (id, point) => {
    sockets = sockets.map(socket => {
      if (socket.id === id) {
        socket.points += point;
      }
      return socket;
    });
    superBroadcast(events.playerUpdate, { sockets });
    endGame();
    clearTimeout(timeout);
  };

  // nickname 설정
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname });
    broadcast(events.newUser, { nickname });
    superBroadcast(events.playerUpdate, { sockets });
    startGame();
  });
  // 퇴장시... disconnect & disconnected
  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    if (sockets.length === 1) {
      endGame();
    } else if (leader && socket.id === leader.id) {
      endGame();
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    superBroadcast(events.playerUpdate, { sockets });
  });
  // 메시지를 전송
  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        message: `🥇 Winner is ${socket.nickname}, word was: ${word}`,
        nickname: "😀 Bot"
      });
      addPoints(socket.id, 10);
    } else {
      broadcast(events.newMsg, { message, nickname: socket.nickname });
    }
  });
  // 그리기 시작좌표 받기
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  // 그리고 있는 좌표 받기(시작이후 좌표)
  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });
  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
