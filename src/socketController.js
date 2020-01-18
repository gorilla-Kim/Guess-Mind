import events from "./events";
import { chooseWord } from "./words";

/* socket 관련 event handling을 해주는 controller 파일 */

// 유저들의 ID가 저장되는 리스트
let sockets = [];
let rooms = [
  {
    inProgress: false,
    roomName: "A",
    roomLeader: null,
    sockets: []
  },
  {
    inProgress: false,
    roomName: "B",
    roomLeader: null,
    sockets: []
  },
  {
    inProgress: false,
    roomName: "C",
    roomLeader: null,
    sockets: []
  }
];
let inProgress = false;
let word = null;
let leader = null;
let timeout = null;

// timeout을 위한 객체변수
const times = {
  startTime: 5000,
  paintTime: 30000
};
const roomType = {
  SET_LEADER: "SET_LEADER",
  INSERT_SOCKET: "INSERT_SOCKET",
  DELETE_SOCKET: "DELETE_SOCKET",
  UPDATE_PROGRESS: "UPDATE_PROGRESS"
};
// room객체를 얻는 함수
const getRoom = roomName => rooms.filter(room => room.roomName === roomName)[0];
// room setting reducer
const setRoom = (roomName, type, data) => {
  rooms = rooms.map(room => {
    if (room.roomName === roomName) {
      switch (type) {
        case roomType.SET_LEADER:
          room.roomLeader = data;
          break;
        case roomType.INSERT_SOCKET:
          room.sockets.push(data);
          break;
        case roomType.DELETE_SOCKET:
          room = room.sockets.filter(room.roomName !== roomName);
          break;
        case roomType.UPDATE_PROGRESS:
          room.inProgress = data;
          break;
        default:
          break;
      }
    }
    return room;
  });
};

// 게임 진행자를 랜덤으로 선출
const chooseLeader = roomSockets =>
  roomSockets[Math.floor(Math.random() * roomSockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  // 특정 방 인원들에게만 emit를 합니다.
  const roomSocketEmit = (roomName, event, data) =>
    io.to(roomName).emit(event, data);

  const startGame = roomName => {
    const room = getRoom(roomName);
    if (room.sockets.length > 1) {
      if (!room.inProgress) {
        // inProgress = true;
        setRoom(roomName, roomType.UPDATE_PROGRESS, true);
        console.log("⚡  Room Info :::", room);
        setRoom(roomName, roomType.SET_LEADER, chooseLeader(room.sockets));
        // leader = chooseLeader(room[0].sockets);
        word = chooseWord();
        // superBroadcast(events.gameStarting);
        roomSocketEmit(roomName, events.gameStarting);
        setTimeout(() => {
          // superBroadcast(events.gameStarted);
          roomSocketEmit(roomName, events.gameStarted);
          io.to(room.roomLeader.id).emit(events.leaderNotif, { word });
          // 30초 뒤에 게임종료
          timeout = setTimeout(() => {
            // 제한시간안에 못맞출시 leader point+5
            addPoints(room.roomLeader.id, 5, roomName);
            endGame(roomName);
          }, times.paintTime);
          // 5초 뒤에 게임이 시작됩니다.
        }, times.startTime);
      }
    }
  };
  const endGame = roomName => {
    setRoom(roomName, roomType.UPDATE_PROGRESS, false);
    inProgress = false;
    roomSocketEmit(roomName, events.gameEnded);
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    // game restart
    setTimeout(() => startGame(roomName), times.startTime);
  };
  const addPoints = (id, point, roomName) => {
    const room = getRoom(roomName);
    room.sockets = room.sockets.map(socket => {
      if (socket.id === id) {
        socket.points += point;
      }
      return socket;
    });
    roomSocketEmit(roomName, events.playerUpdate, { sockets: room.sockets });
    endGame(roomName);
    clearTimeout(timeout);
  };

  // nickname 설정
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname });
    superBroadcast(events.getRoomNames, rooms);
    // broadcast(events.newUser, { nickname });
    // superBroadcast(events.playerUpdate, { sockets });
    // startGame(socket.roomName, socket.roomName);
  });

  // Room 입장시
  socket.on(events.joinGameRoom, ({ roomName }) => {
    socket.roomName = roomName;
    // 해당 유저를 특정이름의 방에 입장시키기.
    socket.join(roomName);
    // 새로 생성한 방이라면...
    if (rooms.filter(room => room.roomName === roomName).length === 0) {
      const newRoom = {
        inProgress: false,
        roomName: roomName,
        roomLeader: null,
        sockets: []
      };
      rooms.push(newRoom);
      superBroadcast(events.getRoomNames, rooms);
    }
    rooms = rooms.map(room => {
      if (room.roomName === roomName) {
        room.sockets.push({
          id: socket.id,
          points: 0,
          nickname: socket.nickname
        });
      }
      return room;
    });
    const room = getRoom(roomName);
    // 같은 방 인원들에게 알리기.
    roomSocketEmit(roomName, events.newUser, { nickname: socket.nickname });
    roomSocketEmit(roomName, events.playerUpdate, { sockets: room.sockets });
    startGame(socket.roomName);
  });

  // 퇴장시... disconnect & disconnected
  socket.on(events.disconnect, () => {
    rooms = rooms.map(room => {
      if (room.roomName === socket.roomName) {
        room.sockets = room.sockets.filter(aSocket => aSocket.id !== socket.id);
      }
      return room;
    });
    const room = getRoom(socket.roomName);
    if (room) {
      if (room.sockets.length === 1) {
        endGame(room.roomName);
      } else if (room.leader && socket.id === room.leader.id) {
        endGame(room.roomName);
      }
      roomSocketEmit(socket.roomName, events.playerUpdate, {
        sockets: room.sockets
      });
    }
    roomSocketEmit(socket.roomName, events.disconnected, {
      nickname: socket.nickname
    });
  });
  // 메시지를 전송
  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      roomSocketEmit(socket.roomName, events.newMsg, {
        message: `🥇 Winner is ${socket.nickname}, word was: ${word}`,
        nickname: "😀 Bot"
      });
      addPoints(socket.id, 10, socket.roomName);
    } else {
      roomSocketEmit(socket.roomName, events.newMsg, {
        message,
        nickname: socket.nickname
      });
    }
  });
  // 그리기 시작좌표 받기
  socket.on(events.beginPath, ({ x, y }) =>
    roomSocketEmit(socket.roomName, events.beganPath, { x, y })
  );
  // 그리고 있는 좌표 받기(시작이후 좌표)
  socket.on(events.strokePath, ({ x, y, color }) => {
    roomSocketEmit(socket.roomName, events.strokedPath, { x, y, color });
  });
  socket.on(events.fill, ({ color }) => {
    roomSocketEmit(socket.roomName, events.filled, { color });
  });
};

export default socketController;
