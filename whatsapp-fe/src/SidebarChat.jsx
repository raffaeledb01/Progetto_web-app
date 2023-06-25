import React from 'react'
import "./style/SidebarChat.css"
import { Avatar } from '@mui/material'

function SidebarChat(props) {
  console.log(props.loggedUser)
  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>{props.data.partecipants.filter(u => u !== props.loggedUser._id)}</h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
}

export default SidebarChat