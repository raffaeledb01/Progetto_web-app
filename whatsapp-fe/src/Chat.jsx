import React from 'react'
import "./style/Chat.css"
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Message from './Message'

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
            <Message author='Simone' content='Sono gay' sent='true' />

            <Message author = 'Simone' content = 'Messaggio ricevuto' />

            <p className='chat_message chat_receiver'>
                <span className='chat_name'>Simone</span>
                Vero
                <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>
        </div>

        <div className='chat_footer'>
            <InsertEmoticonIcon />
            <form>
                <input
                placeholder="Scrivi un messaggio"
                type="text"
                />
                <button type="submit">
                    Invia
                </button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat