const models = require('./models');

module.exports = (socket) => {
  console.log("User Connected");
  //Create Room => Create a Socket Channel
  socket.on('create-room', (data) => {
    socket.join(data.room_code, () => {
      console.log("Host Joined Channel: " + data.room_code);
    });
    //Disconnecting => If host ? Delete Room from Database
    socket.on('disconnect', () => {
      socket.to(data.room_code).emit('room-terminated');
      models.Room.destroy({
       where: {
          room_Code: data.room_code
       }
      });
      console.log("Host Left Channel: " + data.room_code);
    });
  });
  //Join Room => Join the Socket Channel
  socket.on('join-room', (data) => {
    socket.join(data.room_code, () => {
      console.log("Client Joined Channel: " + data.room_code);
      socket.to(data.room_code).emit('user-joined');
    });
    //Disconnecting => If client ? Decrease people_Count by 1 in Database 
    socket.on('disconnect', () => {
      console.log("Client Left Channel: " + data.room_code);
      models.Room.update({
        people_Count : 1
      },{ 
          where: {
            room_Code : data.room_code
          }
        });
      socket.to(data.room_code).emit('user-left');
    });
  });
  //signal streaming client
  socket.on("stream", (data) => {
    socket.to(data.room_code).emit("stream", data);
	  console.log("streaming from " + socket.id+ "to room: "+ data.room_code);
  });
  //signal viewing client
  socket.on("view", (data) => {
    socket.to(data.room_code).emit("viewing", socket.id);
	  console.log(socket.id + " is viewing room " + data.room_code);
  });
  //directing SDP offer
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  //directing SDP answer
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  //sending ICE candidate message
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.emit("disconnectPeer", socket.id);
  });
}
