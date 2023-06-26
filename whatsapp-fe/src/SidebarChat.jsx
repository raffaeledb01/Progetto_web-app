import React from 'react'
import "./style/SidebarChat.css"
import { Avatar } from '@mui/material'

function SidebarChat(props) {

  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>{props.data.partecipants.filter(u => u._id !== props.loggedUser._id)[0].username}</h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
}

export default SidebarChat