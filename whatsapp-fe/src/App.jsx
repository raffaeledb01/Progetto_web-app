import React from 'react';
import logo from './logo.svg';
import Sidebar from './Sidebar';
import Chat from './Chat';
import "./style/App.css"

function App() {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
