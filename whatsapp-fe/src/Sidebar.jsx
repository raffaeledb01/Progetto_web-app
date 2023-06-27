import React, { useEffect, useState } from 'react'
import "./style/Sidebar.css"
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatsContainer from './ChatsContainer';
import FriendsContainer from './FriendsContainer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Sidebar(props) {

    const [showFriends, setShowFriends] = useState(false);
    const [showListChats, setShowListChats] = useState(true);
    const [friends, setFriends] = useState([]);
    const [inputValueFriend, setInputValueFriend] = useState('');

    const handleClickFriends = (e) => {
        e.preventDefault();
        setShowFriends(true);
        setShowListChats(false);
    }

    const handleClickChats = (e) => {
        e.preventDefault();
        setShowListChats(true);
        setShowFriends(false);
        
    }

    const handleClickAddFriend = (e) => {
        e.preventDefault()
        addFriend(inputValueFriend)
        setInputValueFriend('')
    }

    const addFriend = (username) => {
        fetch('http://localhost:3000/api/users/addFriend', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
          })
          .then(res => { res.json()})
          .then(() => fetchFriends())
          .catch(error => {
            console.error(error);
          });
    }

    const fetchFriends = () => {
      fetch(`http://localhost:3000/api/users/getFriends/${props.loggedUser._id}`)
            .then(res => {
              if (res.ok) return res.json();
              else throw new Error('Si è verificato un errore nella comunicazione con il server');
            })
            .then(obj => {
              setFriends(obj.friends);
            })
            .catch(error => {
              console.log(error);
            });
    }

    useEffect(() => {
        if (showFriends && !showListChats) {
          fetchFriends();
      }}, [showFriends]);
    

    return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src='https://sisinflab.poliba.it/wp-content/uploads/2021/12/profile-photo-circle-360x270.jpg'/>
            <div className='sidebar_header_right'>
                <IconButton onClick = {handleClickFriends}>
                    <PeopleIcon />
                </IconButton>
                <IconButton onClick = {handleClickChats}>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className='sidebar_search'>
           <div className='sidebar_search_container'>
            {showFriends ? <form onSubmit={handleClickAddFriend}><PersonAddIcon  />
            <input 
            type='text' 
            value = {inputValueFriend} 
            onChange = {(e => {
                e.preventDefault()
                console.log('ristamp')
                setInputValueFriend(e.target.value)
            })} 
            placeholder='Aggiungi amico tramite username' /></form> :
            <><SearchIcon /><input type='text' placeholder='Cerca Chat' /></>
            }
                
           </div>
        </div>
        <div className='sidebarChats'>
            {showFriends ? <FriendsContainer friends = {friends} loggedUser = {props.loggedUser} /> : 
            <ChatsContainer chats={props.chats} loggedUser = {props.loggedUser} setShowChat = {props.setShowChat}/> }       
        </div>
    </div>
  )
}

export default Sidebar