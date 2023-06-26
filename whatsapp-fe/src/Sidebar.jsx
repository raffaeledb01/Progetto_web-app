import React, { useEffect, useState } from 'react'
import "./style/Sidebar.css"
import DonutLargeIcon from "@mui/icons-material/DonutLarge"
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';

function Sidebar(props) {

    const [chats, setChats] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        fetch('http://localhost:3000/api/chats/all/' + props.loggedUser.username)
        .then(res => console.log(res))
        .then(res => {
            if (res.ok) return res.json();
            else throw new Error('Si è verificato un errore nella comunicazione con il server');
        })
        .then(obj => {
          setLoading(false)
          setChats(obj)
        })
        .catch(error => {
          setLoading(false)
          setError(true)
        })
      }, [])
    

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
            {chats.map( chat => <SidebarChat data={chat} loggedUser = {props.loggedUser}/>)}
        </div>
    </div>
  )
}

export default Sidebar