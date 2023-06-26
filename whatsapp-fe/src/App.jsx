import React from 'react';
import logo from './logo.svg';
import Sidebar from './Sidebar';
import Chat from './Chat';
import "./style/App.css";
import {Routes, Route, useNavigate} from 'react-router-dom';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import Home from './Home';


function App() {

  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  const [showChat, setShowChat] = useState(null);
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      fetch(`http://localhost:3000/api/chats/all/${loggedUser.username}`)
        .then(res => {
          if (res.ok) return res.json();
          else throw new Error('Si è verificato un errore nella comunicazione con il server');
        })
        .then(obj => {
          //setLoading(false);
          setChats(obj);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
          setError(true);
        });
    }
  }, [loggedUser]);

  const changeLoggedUser = (username, password) => {
    fetch('http://localhost:3000/api/users/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(res => res.json())
    .then(user => {setLoggedUser(user);
      return user;
    })
    .then(user => {navigate(`/${user.username}`)})
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
      setLoggedUser(user);
      return user;
    })
    .then(user => {
      navigate(`/${user.username}`);
    })
    .catch(error => {
      setError(error);
      console.error(error);
    });
  };

useEffect(() => {
  if(showChat) {
    fetch(`http://localhost:3000/api/messages/getAllMessages/${showChat}`) 
    .then(res => res.json())
    .then(messages => {setLoading(false); setMessages(messages)})
    .catch(error => {
      setError(error);
      console.error(error);
    })}}, [showChat, addMessage])

    function addMessage(content, chatId) {
      fetch('http://localhost:3000/api/messages/new', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              author: loggedUser._id,
              content: content,
              chatId: chatId
          })
      })
  }
  



  return (
    <Routes>
      <Route path = '/' element = { <Home />} />
      <Route path = '/login' element = {<LoginPage changeLoggedUser = {changeLoggedUser} loggedUser = {loggedUser}/>} />
      <Route path = '/signup' element = {<SignUpPage signUpUser = {signUpUser} loggedUser = {loggedUser} />} />
      <Route path = ':username' element = {
        <div className="app">
          <div className="app_body">
            <Sidebar loggedUser = {loggedUser} chats={chats} setShowChat = {setShowChat} /> 
            {loading ? <span>Caricamento in corso...</span> : error ? <span>Errore nel caricamento dei messaggi</span> :
            <Chat loggedUser = {loggedUser} messages = {messages} showChat = {showChat} addMessage = {addMessage}/>}
          </div>
        </div>
      }/>
    </Routes>
  );
}

export default App;
