import React from 'react'
import "./style/SidebarChat.css"
import { Avatar } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';



function Request(props) {

  return (
    <div className='sidebarChat'>
        <Avatar src = {props.img} />
        <div className='sidebarChat_info'>
            <h2>{props.username}</h2>
        </div>
        <div className='buttonRequest'>
        <CheckCircleIcon onClick = {() => props.acceptRequest(props.username)} />
        <CancelIcon onClick = {() => props.declineRequest(props.username)} />
        </div>
    </div>
  )
}

export default Request