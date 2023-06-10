const express = require('express');
const http = require('http');
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const router = require('./routes/api')

const app = express();
const port = 3000;
const db_url = 'mongodb+srv://dibiraffaele2001:Raffaele2001.@raffaeledb01.ftalzdh.mongodb.net/app'

mongoose.connect(db_url);
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connesso al db')
})

app.use(express.json())

app.use('/api', router)

app.get('/', (req,res) => res.status(200).send('hello world'))

app.listen(port, () => console.log(`Listening on port ${port}`));