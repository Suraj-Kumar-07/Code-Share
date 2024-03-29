const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { addUser, getuserinroom, removeUser, getUser, isEmpty } = require('./users');
const { addcode, removecode, getcode } = require("./code");
const { getSessionid, addsession, removesession } = require('./session')
const opentok = require("opentok");
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


const OT = new opentok(process.env.API_KEY, process.env.SECRET);
console.log(OT)
const port = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room, dp }, callback) => {

    const { error, user } = addUser({ id: socket.id, name, room, dp });
    if (error)
      return callback(error)

    socket.join(user.room);//useris in room
    io.to(user.room).emit('roomData', {
      users: getuserinroom(user.room)
    })
    const { erro, codee } = getcode(user.room);
    if (erro) {
      console.log(erro);
    }
    else if (codee) {

      io.to(user.room).emit('code', {
        source: codee.source,
        inp: codee.inp,
        out: codee.out
      })
    }


    callback();
  });
  //   socket.on('joinwhite',({room})=>{
  // socket.join(room);

  //   })
  //   //whiteboard
  //   socket.on('canvas-data', (data,room)=> {

  //     io.to(room).emit('canvas-data', data);

  //   })


  // messages
  socket.on('sendMessage', ({ message }, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.name, text: message
    });
    callback();
  });


  // code
  socket.on("sendCode", ({ source, inp, out }) => {
    const user = getUser(socket.id);
    if (user !== undefined) {
      removecode(user.room);

      addcode(user.room, source, inp, out);


      io.to(user.room).emit('code', {
        source: source,
        inp: inp,
        out: out
      });
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      const check = isEmpty(user.room);


      io.to(user.room).emit('roomData', {

        users: getuserinroom(user.room)
      })

      if (check) {
        removecode(user.room);
        removesession(user.room);
      }
    }
  })
});
// app.get('*', (req, res) => {  // have to add in header const path=require('path)
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
// });

app.post('/token', async (req, res) => {
  console.log('hi')
  const { room } = req.body;
  console.log(room)
  OT.createSession(async (err, session) => {
    console.log(session, err)
    const token1 = OT.generateToken(session.sessionId, { role: 'publisher' })
    const { ispresent, sessioninfo } = addsession(session.sessionId, room, token1);
    const { sessionId, token } = getSessionid(room);
    res.json({
      apikey: 47747111,
      sessionId: sessionId,
      token: token
    })
  })
})

httpServer.listen(port, () => {
  console.log("server is running on ", port)
});
// module.exports=httpServer;