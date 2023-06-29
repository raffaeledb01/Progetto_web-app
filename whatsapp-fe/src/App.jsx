import React from 'react';
import logo from './logo.svg';
import Sidebar from './Sidebar';
import Chat from './Chat';
import "./style/App.css";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import Home from './Home';
import { io } from 'socket.io-client';
import { useRef } from 'react';
import LoadingPage from './LoadingPage';
import ErrorLoadingPage from './ErrorLoadingPage';

function App() {

  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  const [showChat, setShowChat] = useState(null);
  const [chatUsername, setChatUsername] = useState('') 
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const previousShowChat = useRef(showChat);
  

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to Socket.io');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io');
      });

      socket.on('error', (error) => {
        console.error('Socket.io Error:', error);
      });
    }
  }, [socket]);


  const fetchAllChats = () => {
    fetch(`http://localhost:3000/api/chats/all/${loggedUser.username}`)
        .then(res => {
          if (res.ok) return res.json();
          else throw new Error('Si è verificato un errore nella comunicazione con il server');
        })
        .then(obj => {
          setChats(obj);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
          setError(true);
        });
    }

  function changeLoggedUser(username, password) {
    fetch('http://localhost:3000/api/users/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    })
      .then(res => res.json())
      .then(user => {
        if (user.error === 'Utente non trovato') {
          alert('Utente non trovato');
        } else if (user.error === 'Password errata') {
          alert('Password errata');
        } else {
          setLoggedUser(user);
          navigate(`/${user.username}`);
          return user;
        }
      })
      .catch(error => {
        setError(error);
        console.error(error);
      });
  };


  const signUpUser = (username, password) => {
    fetch('http://localhost:3000/api/users/new', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(res => res.json())
    .then(user => {
      if (user.error === 'Utente già esistente') {
        alert('Utente già esistente, fare il Log in');
      } else {
        setLoggedUser(user);
        navigate(`/${user.username}`);
        return user;
      }
    })
    .catch(error => {
      setError(error);
      console.error(error);
    });
  };


  useEffect(() => {
    if (loggedUser) 
      fetchAllChats();
  }, [loggedUser]);
  

  useEffect(() => {
    if (socket && previousShowChat.current) {
      socket.emit('leaveRoom', previousShowChat.current);
    }
  
    if (socket && showChat) {
      socket.emit('joinRoom', showChat);
      console.log('Emit nell useEffect');
      fetch(`http://localhost:3000/api/messages/getAllMessages/${showChat}`)
        .then(res => res.json())
        .then(messages => {
          setLoading(false);
          setMessages(messages);
        })
        .catch(error => {
          setError(error);
          console.error(error);
        });
    }
  
    if (socket && showChat) {
      socket.on('newMessage', (roomId) => {
        console.log('on evento newMessage');
        console.log(showChat);
        console.log(roomId);
        if (showChat === roomId) {
          fetch(`http://localhost:3000/api/messages/getAllMessages/${showChat}`)
            .then(res => res.json())
            .then(messages => {
              setLoading(false);
              setMessages(messages);
            })
            .catch(error => {
              setError(error);
              console.error(error);
            });
        }
      });
    }
  
    previousShowChat.current = showChat;
  
    return () => {
      if (socket && previousShowChat.current) {
        socket.emit('leaveRoom', previousShowChat.current);
      }
    };
  }, [socket, showChat]);

  const addChat = (username) => {
      fetch('http://localhost:3000/api/chats/new', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'username': username, 'loggedUserId': loggedUser._id})
      })
      .then(res => {return res.json()})
      .then(obj => { setShowChat(obj._id)})
      .catch(error => {
        console.error(error);
      });
    }

  return (
    <Routes>
      <Route path = '/' element = { <Home />} />
      <Route path = '/login' element = {<Login changeLoggedUser = {changeLoggedUser} loggedUser = {loggedUser}/>} />
      <Route path = '/signup' element = {<SignUp signUpUser = {signUpUser} loggedUser = {loggedUser} />} />
      <Route path = ':username' element = {
        <div className="app">
          <div className="app_body">
            <Sidebar loggedUser = {loggedUser} setLoggedUser = {setLoggedUser} chats={chats} setShowChat = {setShowChat} addChat = {addChat} fetchAllChats = {fetchAllChats} setChatUsername= {setChatUsername} setLoading = {setLoading} /> 
            {loading ? <LoadingPage /> : error ? <ErrorLoadingPage /> :
            <Chat loggedUser = {loggedUser} messages = {messages} showChat = {showChat} chatUsername = {chatUsername} setShowChat = {setShowChat} setMessages = {setMessages} setLoading = {setLoading} socket = {socket}/> }
          </div>
        </div>
      }/>
    </Routes>
  );
}

export default App;
