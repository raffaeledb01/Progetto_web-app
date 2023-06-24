import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


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
    /*
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
      <a href='./signup'>Sign up</a>
      
    </div>
    */

<Container component="main" maxWidth="sm">
<Box
  sx={{
    boxShadow: 3,
    borderRadius: 2,
    px: 4,
    py: 6,
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <Typography component="h1" variant="h5">
    Login
  </Typography>
  <Box component="form" noValidate sx={{ mt: 1 }}>
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
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={handleLogin}
    >
      Login
    </Button>
    <Grid container>
      <Grid item>
        <Link href="./signup" variant="body2">
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