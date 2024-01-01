const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const http = require('http')
const dotenv = require('dotenv')
const socketIo = require('socket.io')
const mongoose = require('mongoose');

const path = require('path')
dotenv.config();

//routes
const banRouter = require('./src/router/banRouter');
const carRouter = require('./src/router/carRouter');
const authRouter = require('./src/router/authRouter');
const userRouter = require('./src/router/userRouter');
const messageRouter = require('./src/router/messageRouter');
const CategoryRouter = require('./src/router/categoryRouter');


const app = express();
const PORT = process.env.PORT || 4001;

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    // origin: "http://localhost:3000", 
    // methods: ["GET", "POST"]
    }
})

//to save files for public
app.use(express.static(path.join(__dirname, 'src', 'public')))

//middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes use
app.use('/api/ban', banRouter);
app.use('/api/car', carRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/category', CategoryRouter);

// websocket functions
let activeUsers = [];

io.on("connection", (socket) => {
    socket.on("new-user-added", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
      }
  
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
  
      io.emit("get-users", activeUsers);
    });
  
    socket.on("exit", (id) => {
      activeUsers = activeUsers.filter((user) => user.userId !== id);
  
      io.emit("get-users", activeUsers);
    });
  });

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {})
.then(() => {
    server.listen(PORT, () => console.log(`Server stared on port: ${PORT}`));
})
.catch(error => console.log(error));
