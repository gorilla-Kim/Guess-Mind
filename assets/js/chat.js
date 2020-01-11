// recevied new message event func
export const handleMessageNotifi = data => {
  const { message } = data;
  console.log(`Client : ${message}`);
};
