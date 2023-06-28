const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const router = require('./routes/api')
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001"
    }
})

const port = 3000;
const db_url = 'mongodb+srv://dibiraffaele2001:Raffaele2001.@raffaeledb01.ftalzdh.mongodb.net/app'

mongoose.connect(db_url);
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connesso al db')
})

app.use(cors());

app.use(express.json())

app.use('/api', router)

io.on('connection', (socket) => {
    console.log('Nuova connessione Socket.io:', socket.id);

    socket.on('joinRoom', (roomId) => {
        console.log('siamo nella stanza '+ roomId)
      socket.join(roomId);
      console.log(`Utente ${socket.id} connesso alla room ${roomId}`);
    });
  
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`Utente ${socket.id} disconnesso dalla room ${roomId}`);
    });
  
    socket.on('sendMessage', (roomId) => {
        const room = socket.adapter.rooms.get(roomId);
        console.log('sono entrato nel server')
        if (room && room.size > 1) {
          const clientsInRoom = Array.from(room).filter((clientId) => clientId !== socket.id);
          console.log('sono nell if del socket.on')
          io.to(clientsInRoom[0]).emit('newMessage');
        }
      });
  
    socket.on('disconnect', () => {
      console.log('Disconnessione Socket.io:', socket.id);
    });
  });

  httpServer.listen(port, () => console.log(`Listening on port ${port}`));