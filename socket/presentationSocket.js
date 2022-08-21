const textToSpeech = require('@google-cloud/text-to-speech');
const User = require('../models/user');

const client = new textToSpeech.TextToSpeechClient();
const ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function presentationSocket(socketIo) {
  socketIo.on('connection', (socket) => {
    socket.on('displaySet', async (studentId) => {
      const user = await User.findOne({ where: { studentId: studentId } });
      if (user) {
        const ttsRequest = {
          input: {
            text: `${
              ENGLISH.includes(user.name[0])
                ? user.name.toLowerCase()
                : user.name
            }, ${user.major}`,
          },
          voice: {
            languageCode: `ko-KR`,
          },
          audioConfig: {
            audioEncoding: 'LINEAR16',
            speakingRate: 1,
          },
        };
        const [response] = await client.synthesizeSpeech(ttsRequest);
        const socketRequest = {
          data: user,
          voiceTTS: response,
        };
        socketIo.sockets.emit('display', socketRequest);
      }
    });
  });
}

module.exports = presentationSocket;
