import React, { useEffect, useState } from 'react'
import "./style/Sidebar.css"
import DonutLargeIcon from "@mui/icons-material/DonutLarge"
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import ChatsContainer from './ChatsContainer';

function Sidebar(props) {

    
    return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src='https://sisinflab.poliba.it/wp-content/uploads/2021/12/profile-photo-circle-360x270.jpg'/>
            <div className='sidebar_header_right'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className='sidebar_search'>
           <div className='sidebar_search_container'>
                <SearchIcon />
                <input type='text' placeholder='Cerca Chat' />
           </div>
        </div>
        <div className='sidebarChats'>
                <ChatsContainer chats={props.chats} loggedUser = {props.loggedUser} setShowChat = {props.setShowChat}/>
        </div>
    </div>
  )
}

export default Sidebar