const textToSpeech = require('@google-cloud/text-to-speech');
const User = require('../models/user');

const client = new textToSpeech.TextToSpeechClient();
const ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const logic = async (user, socketIo) => {
  const ttsRequest = {
    input: {
      text: `${
        ENGLISH.includes(user.name[0]) ? user.name.toLowerCase() : user.name
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
};

function testSocket(socketIo) {
  socketIo.on('connect', (socket) => {
    User.findAll().then((users) =>
      users.forEach((user) => {
        setTimeout(() => logic(user, socketIo), 10000);
      })
    );
  });
}

module.exports = testSocket;
