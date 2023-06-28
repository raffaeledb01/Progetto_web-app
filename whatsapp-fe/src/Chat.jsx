import React, { useState } from 'react'
import "./style/Chat.css"
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Message from './Message'
import MessagesContainer from './MessagesContainer';



function Chat(props) {
    const [inputValue, setInputValue] = useState('')
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar />
            <div className='chat_header_info'>
                <h3>Room Name</h3>
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
            <MessagesContainer messages = {props.messages} loggedUser = {props.loggedUser} showChat = {props.showChat} />
        </div>

        <div className='chat_footer'>
            <InsertEmoticonIcon />
            <form onSubmit={ (e) => {
                e.preventDefault()
                props.addMessage(inputValue, props.showChat)
                setInputValue('')
                
              }}>
                <input
                placeholder="Scrivi un messaggio"
                type="text"
                name = 'message'
                value = {inputValue}
                onChange={(e => {
                    e.preventDefault();
                    setInputValue(e.target.value)

                })}
                
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