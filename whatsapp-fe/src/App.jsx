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
import Home from './Home';


function App() {

  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();

  const changeLoggedUser = (username, password) => {
    console.log(username);
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

  return (
    <Routes>
      <Route path = '/' element = { <Home />} />
      <Route path = '/login' element = {<LoginPage changeLoggedUser = {changeLoggedUser} loggedUser = {loggedUser}/>} />
      <Route path = '/signup' element = {<SignUpPage signUpUser = {signUpUser} loggedUser = {loggedUser} />} />
      <Route path = ':username' element = {
        <div className="app">
          <div className="app_body">
            <Sidebar loggedUser = {loggedUser}/>
            <Chat />
          </div>
        </div>
      }/>
    </Routes>
  );
}

export default App;
