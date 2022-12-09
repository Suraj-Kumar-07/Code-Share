import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {addUser,getuserinroom,removeUser,getUser,isEmpty} from './user.js';
import opentok from "opentok";
import { getSessionid, addsession, removesession } from "./session.js";
import {addcode,removecode,getcode} from './code.js'

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = 'bfae57d1febfc27d70b252700341ef81093def2f'
const API_KEY = "47601141";
// video api
const openTok = new opentok(
  API_KEY,
  SECRET 
);


const port = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  socket.on("join", ({name, room}, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      users: getuserinroom(user.room),
    });
    // For code Edittor
    const { err, code } = getcode(user.room);
    if (err) {
      console.log(err);
    } else if (code) {
      io
        .to(user.room)
        .emit("code", { source: code.source, inp: code.inp, out: code.out });
    }
    callback();
  });


  // messages
  socket.on("sendMessage", ({ message }, callback) => {
    
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
    });
    callback();
  });

  // code
  socket.on("sendCode", ({ source, inp, out }) => {
    const user = getUser(socket.id);
    if (user !== undefined) {
      removecode(user.room);
      addcode(user.room, source, inp, out);
      io.to(user.room).emit("code", {
        source: source,
        inp: inp,
        out: out,
      });
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      const check = isEmpty(user.room);

      io.to(user.room).emit("roomData", {
        users: getuserinroom(user.room),
      });

      if (check) {
        removecode(user.room);
        removesession(user.room);
      }
    }
  });
});


app.get('/join',(req,res)=>{
  res.sendFile(__dirname+'/client/build/index.html')
})

app.get('/room',(req,res)=>{
  res.sendFile(__dirname+'/client/build/index.html')
})

app.post('/token',async(req,res)=>{
  const {room}=req.body;
  openTok.createSession((err,session)=>{
    const token1=openTok.generateToken(session.sessionId,{role:'publisher',expireTime:new Date().getTime() / 1000 + 1 * 24 * 60 * 60}) //1day
    const {ispresent,sessioninfo}=addsession(session.sessionId,room,token1);

    const {sessionId,token}= getSessionid(room);
    res.json({
       apikey:API_KEY,
       sessionId:sessionId,
       token:token
    })

 })
})

httpServer.listen(port,()=>{
    console.log("server is running")
});

