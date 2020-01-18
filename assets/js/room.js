import { getSocket } from "./sockets";

// 생성된 룸들을 표시할 리스트
const jsRooms = document.getElementById("jsRooms");
const jsCreateRoom = document.getElementById("jsCreateRoom");
const body = document.querySelector("body");

const joinRoom = roomName => {
  getSocket().emit(window.events.joinGameRoom, { roomName });
  body.className = "enterRoom";
};

export const appendRoomNames = rooms => {
  jsRooms.innerHTML = "";
  rooms.map(room => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>✅ Room: ${room.roomName}</span>
    `;
    jsRooms.appendChild(li);
  });
};

const handlecreateRoom = e => {
  e.preventDefault();
  const input = jsCreateRoom.querySelector("input");
  const { value } = input;
  joinRoom(value);
  input.value = "";
};

if (jsCreateRoom) {
  jsCreateRoom.addEventListener("submit", handlecreateRoom);
}
