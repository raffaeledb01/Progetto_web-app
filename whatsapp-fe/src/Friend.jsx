import React from 'react'
import "./style/SidebarChat.css"
import { Avatar } from '@mui/material'



function Friend(props) {

  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>{props.username}</h2>
        </div>
    </div>
  )
}

export default Friend