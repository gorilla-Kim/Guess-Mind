import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayer = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname} : ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => addPlayer(sockets);
export const handleGameStarted = () => {
  notifs.innerText = "";
  disableCanvas();
  hideControls();
  enableChat();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the leader❗, ⚡paint: ${word}`;
};

export const handleGameEnded = () => {
  notifs.innerText = "";
  notifs.innerText = "😀  Game Ended!";
  disableCanvas();
  hideControls();
  resetCanvas();
};

export const handleGameStarting = () =>
  (notifs.innerText = "😀  Game will start soon!");
