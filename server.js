const express = require('express');
const http = require('http');

const app = express();
const cookieParser = require('cookie-parser');

const { Server } = require('socket.io');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const passportConfig = require('./passport');
const User = require('./models/user');
const { sequelize } = require('./models');

const port = process.env.PORT || 8000;

//CORS
// const whiteList = ['http://localhost:3000'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true); //cors허용
//     } else {
//       callback(new Error('Not allowed Origin')); //cors 비허용
//     }
//   },
// };
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: true, // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

//데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

//써드파티 미들웨어 설정
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

// if (process.env.NODE_ENV === 'production') {
//   //proxy 적용시
//   sessionOption.proxy = true;
//   //https 적용시
//   sessionOption.cookie.secure = true;
// }
app.use(session(sessionOption));
app.use(express.json());

dotenv.config();
passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false })); // 데이터타입 multipart/form-data - req.body 사용 가능
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy'); //proxy적용시
  app.use(helmet({ contentSecurityPolicy: false })); //요청응답 관련 보안
  app.use(hpp());
}

//App
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//라우팅
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

// //웹소켓 서버 연결 부분
// const httpServer = http.createServer(app);
// const wsServer = new Server(httpServer);

// //웹소켓 구현
// wsServer.on('connection', (socket) => {
//   socket.on('display', async (studentId) => {
//     const user = await User.findOne({ where: { studentId: studentId } });
//     wsServer.sockets.emit('display', user);
//   });
// });

// 웹소켓 강동헌

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('display', async (studentId) => {
    const user = await User.findOne({ where: { studentId: studentId } });
    io.sockets.emit('display', user);
  });
});

httpServer.listen(8001);
