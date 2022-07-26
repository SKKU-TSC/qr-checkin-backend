const express = require('express');
const http = require('http');

const app = express();
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const passport = require('passport');
const User = require('./models/user');

const port = process.env.PORT || 3000;

//써드파티 미들웨어 설정
app.use(express.json());
dotenv.config();
app.use(passport.initilaize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//라우팅
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

//웹소켓 서버 연결 부분
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

//웹소켓 구현
wsServer.on('connection', (socket) => {
  socket.on('display', async (studentId) => {
    const user = await User.findOne({ where: { studentId: studentId } });
    wsServer.sockets.emit('display', user);
  });
});
