import React from 'react'
import "./style/SidebarChat.css"
import "./style/Friend.css"
import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';


function Friend(props) {

  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>{props.username}</h2>
        </div>
        <div className='buttonRequest'>
        <DeleteIcon onClick = {() => props.removeFriend(props.username)} />
        <SendIcon onClick = {() => {props.addChat(props.username); props.setChatUsername(props.username)}} />
        </div>
    </div>
  )
}

export default Friend