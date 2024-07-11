const express = require('express')
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const socket=require('socket.io');
const userRoutes=require('./routes/userRoutes');
const messageRoutes=require('./routes/messageRoutes');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT=5000;


app.use('/api/auth',userRoutes);
app.use('/api/messages',messageRoutes);

const MONGO_URL= 'mongodb://localhost:27017';
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL,{}).then(()=>{
    console.log('db connected');
}).catch((err)=>{
    console.log(err.message);
});


const server=app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
});


const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,

    },
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    });
});