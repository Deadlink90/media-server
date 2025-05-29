const { checkToken } = require("./helpers/JWT");
const ChatMensajes = require("./models/chat.model");
//cap 11
const chatMensajes = new ChatMensajes();

const sockets = (io) => {
  io.on("connection", async (socket) => {
    const user = await checkToken(socket.handshake.headers["x-access-token"]);
    if (!user) return socket.disconnect();

    //add user connected
    chatMensajes.conectarUsuario(user);
    io.emit("server:active-users", chatMensajes.usuariosArr);
    socket.emit("server:receive-message", chatMensajes.ultimos10);

    //connect to room id
    //by default, there are two rooms : global and by socket.id
    //we create another one by user.id
    socket.join(user.id);

    //receive message
    socket.on("client:send-message", ({ message, uid }) => {
      if (uid) {
        //private message
        //with the function "to()" we send data to a client which is
        //connected to a especific room, in this case we sent data 
        //to the client who is connected to the uid room
        //we can also send data to the room socket.id: to(socket.id);
        socket.to(uid).emit('server:receive-private-message',{from:user.name,message})
      } else {
        //public message
        chatMensajes.enviarMensaje(user.id, user.name, message);
        io.emit("server:receive-message", chatMensajes.ultimos10);
      }
    });

    //delete user disconencted
    socket.on("disconnect", () => {
      chatMensajes.desconectarUsuario(user.id);
      io.emit("server:active-users", chatMensajes.usuariosArr);
    });
  });
};

module.exports = {
  sockets,
};
