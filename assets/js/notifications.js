const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");

  notification.innerHTML = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

// 새로운 유저 유입알림
export const handleNewUser = ({ nickname }) => {
  if (localStorage.nickname !== nickname){
    fireNotification(`⭐   new user joined (${nickname})`, "rgb(0, 122, 255)");
  }
};

// 로그아웃된 유저 알림
export const handleDisconnected = ({ nickname }) =>
  fireNotification(`⚡   user left!! (${nickname})`, "rgb(255, 149, 0)");
