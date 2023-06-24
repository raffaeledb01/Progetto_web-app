import React, { useState } from 'react';

const SignUpPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    
  };

  const handleSignUp = (e) => {
   e.preventDefault();
    props.signUpUser(username, password)
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleSignUp}>Sign Up</button>
      </form>
      <a href = './login'>Login</a>
    </div>
  );
};

export default SignUpPage;
