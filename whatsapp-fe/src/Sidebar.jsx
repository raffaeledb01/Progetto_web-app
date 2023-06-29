import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "./style/Sidebar.css"
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import ChatsContainer from './ChatsContainer';
import FriendsContainer from './FriendsContainer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RequestsContainer from './RequestsContainer';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar(props) {

    const [showFriends, setShowFriends] = useState(false);
    const [showListChats, setShowListChats] = useState(true);
    const [friends, setFriends] = useState([]);
    const [inputValueFriend, setInputValueFriend] = useState('');
    const [requests, setRequests] = useState([]);
    const [showRequests, setShowRequests] = useState(false)
    const navigate = useNavigate()

    const handleClickFriends = (e) => {
        e.preventDefault();
        setShowFriends(true);
        setShowListChats(false);
        setShowRequests(false);
    }

    const handleClickChats = (e) => {
        e.preventDefault();
        setShowListChats(true);
        setShowFriends(false);
        setShowRequests(false);
        
    }

    const handleClickAddFriend = (e) => {
      e.preventDefault();
      let trimmedValueFriend = inputValueFriend.trim();
      if (trimmedValueFriend !== '') {
        addFriend(inputValueFriend);
        setInputValueFriend('');
      }
    }

    const handleClickRequests = (e) => {
      e.preventDefault()
      setShowRequests(true)
      setShowListChats(false)
      setShowFriends(false)
    }

    const handleLogout = (e) => {
      e.preventDefault();
      props.setLoggedUser(null);
      props.setLoading(true);
      navigate('/');
    }

    const addFriend = (username) => {
        fetch('http://localhost:3001/api/users/addFriend', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
          })
          .then(res => res.json())
          .catch(error => {
            console.error(error);
          });
    }

    const fetchFriends = () => {
      fetch(`http://localhost:3001/api/users/getFriends/${props.loggedUser._id}`)
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

    const fetchRequests = () => {
      fetch(`http://localhost:3001/api/users/getRequests/${props.loggedUser._id}`)
            .then(res => {
              if (res.ok) return res.json();
              else throw new Error('Si è verificato un errore nella comunicazione con il server');
            })
            .then(obj => {
              setRequests(obj.requests);
            })
            .catch(error => {
              console.log(error);
            });
    }

    useEffect(() => {
      
        if (showFriends && !showListChats && !showRequests) {
          fetchFriends();
      }}, [showFriends]);

      useEffect(() => {
        if (!showFriends && !showListChats && showRequests) {
          fetchRequests();
      }}, [showRequests]);

      useEffect(() => {
        if (!showFriends && showListChats && !showRequests) {
          props.fetchAllChats();
      }}, [showListChats])


      const acceptRequest = (username) => {
        fetch('http://localhost:3001/api/users/acceptRequest', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
        })
        .then(res => res.json())
        .then(() => fetchRequests())
        .catch(error => {
          console.error(error);
        });
      }

      const declineRequest = (username) => {
        fetch('http://localhost:3001/api/users/declineRequest', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
        })
        .then(res => res.json())
        .then(() => fetchRequests())
        .catch(error => {
          console.error(error);
        });
      }

      const removeFriend = (username) => {
        fetch('http://localhost:3001/api/users/removeFriend', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
        })
        .then(res => res.json())
        .then(() => fetchFriends())
        .catch(error => {
          console.error(error);
        });
      }

    return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src= {props.loggedUser.img}/>
            <h3>{props.loggedUser.username}</h3>
            <div className='sidebar_header_right'>
                <IconButton onClick = {handleClickFriends}>
                    <PeopleIcon />
                </IconButton>
                <IconButton onClick = {handleClickChats}>
                    <ChatIcon />
                </IconButton>
                <IconButton onClick = {handleClickRequests}>
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton onClick = {handleLogout}>
                    <LogoutIcon />
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
                setInputValueFriend(e.target.value)
            })} 
            placeholder='Aggiungi amico tramite username' /></form> : showListChats ?
            <><SearchIcon /><input type='text' placeholder='Cerca Chat' /></> : <></>
            }
                
           </div>
        </div>
        <div className='sidebarChats'>
            {showFriends ? <FriendsContainer friends = {friends} loggedUser = {props.loggedUser} removeFriend = {removeFriend} addChat = {props.addChat} setChatUsername= {props.setChatUsername} setChatImg = {props.setChatImg} setLoading = {props.setLoading}/> : showListChats ? 
            <ChatsContainer chats={props.chats} loggedUser = {props.loggedUser} setShowChat = {props.setShowChat} setChatUsername= {props.setChatUsername} setChatImg = {props.setChatImg}/> :
            <RequestsContainer requests = {requests} loggedUser = {props.loggedUser} acceptRequest = {acceptRequest} declineRequest = {declineRequest}/>}       
        </div>
    </div>
  )
}

export default Sidebar