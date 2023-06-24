import React from 'react';
import logo from './logo.svg';
import Sidebar from './Sidebar';
import Chat from './Chat';
import "./style/App.css";
import {Routes, Route} from 'react-router-dom';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import { useState } from 'react';
import Home from './Home';


function App() {

  const [loggedUser, setLoggedUser] = useState(null);

  const changeLoggedUser = (username, password) => {
    fetch('http://localhost:3000/api/users/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    })
        .then(res =>  res.json())
        .then(user => !user.error && setLoggedUser(user))
  }

  function signUpUser(username, password) {
    fetch('http://localhost:3000/api/users/new', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(res =>  res.json())
    .then(user => !user.error && setLoggedUser(user))
  }


  return (
    <Routes>
      <Route path = '/login' element = {<LoginPage changeLoggedUser = {changeLoggedUser} loggedUser = {loggedUser}/>} />
      <Route path = ':username' element = { 
      <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  } />
  <Route path = '/' element = { <Home />} />
    <Route path = '/signup' element = {<SignUpPage signUpUser = {signUpUser} loggedUser = {loggedUser} />} />
    </Routes>
  );
}

export default App;
