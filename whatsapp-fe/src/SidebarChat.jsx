import React from 'react'
import "./style/SidebarChat.css"
import { Avatar } from '@mui/material'



function SidebarChat(props) {

  const nameChat = props.data.partecipants.filter(u => u._id !== props.loggedUser._id)[0].username;
  const idChat = props.data._id;

  const handleClick = (e) => {
    e.preventDefault();
    props.setShowChat(idChat);
    props.setChatUsername(nameChat)
  }

  return (
    <div className='sidebarChat' onClick = {handleClick}>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>{nameChat}</h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
}

export default SidebarChat