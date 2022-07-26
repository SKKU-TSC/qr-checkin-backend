const express = require('express');
const http = require('http');
const app = express();
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const passport = require('passport');
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
const authRouter = required('./routes/auth');
const adminRouter = required('./routes/admin');
const clientRouter = required('./routes/client');

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);

//웹소켓 서버 연결 부분
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

//브라우저가 1개만 있으면 되므로 모든 sockets으로 정보를 뿌릴 필요는 없음.
wsServer.on('connection', (socket) => {
  console.log(wsServer.sockets.length);
});
