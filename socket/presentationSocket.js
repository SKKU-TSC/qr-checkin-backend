const User = require('../models/user');

function presentationSocket(socketIo) {
  socketIo.on('connection', (socket) => {
    socket.on('display', async (studentId) => {
      const user = await User.update(
        { isCheckedIn: true },
        { where: { studentId: studentId, isCheckedIn: false } }
      );
      if (user) {
        socketIo.sockets.emit('display', user);
      }
    });
  });
}

module.exports = presentationSocket;
