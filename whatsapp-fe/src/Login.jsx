import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./style/Login.css";
import { useNavigate } from 'react-router-dom';



const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault()
    props.changeLoggedUser(username, password);
    setUsername('');
    setPassword('');
    
  };


  return (

<Container component="main" maxWidth="sm" className="container">
      <Box className="box">
        <Typography component="h1" variant="h5" className="title">
          Log in
        </Typography>
        <Box component="form" noValidate className="form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
            className="text-field"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            className="text-field"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
            onClick={handleLogin}
          >
           Log in 
          </Button>
          <Grid container>
            <Grid item>
              <Link href="./signup" variant="body2" className="link">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;