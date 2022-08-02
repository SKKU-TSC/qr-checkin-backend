const User = require('../models/user');

function presentationSocket(socketIo) {
  socketIo.on('connection', (socket) => {
    socket.on('displaySet', async (studentId) => {
      const user = await User.findOne({ where: { studentId: studentId } });
      if (user) {
        socketIo.sockets.emit('display', user);
      }
    });
  });
}

module.exports = presentationSocket;
