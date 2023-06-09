import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Chat() {
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar />
            <div className='chat_header_info'>
                <h3>Room name</h3>
                <p>Last access</p>
            </div>
            <div className='chat_header_right'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className='chat_body'>
            <p className='chat_message'>
                <span className='chat_name'>Simone</span>
                Sono gay
                <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>
        </div>
    </div>
  )
}

export default Chat