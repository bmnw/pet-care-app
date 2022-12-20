import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const colorTheme = createTheme({
    palette: {
      orange: {
        main: '#E27511',
      },
      white: {
        main: '#F9F5F0',
      },
      blue: {
        main: '#3D85C6',
      }
    }
  });

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Container>
      <div className="formPanel">
        <Typography variant="h5">Register User</Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <br />
        <div>
          <Typography>Username:</Typography>
            <TextField
              sx={{backgroundColor: 'white'}}
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
        </div>
        <br />
        <div>
          <Typography>Password:</Typography>
            <TextField
              type="password"
              sx={{backgroundColor: 'white'}}
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <br />
        <div>
          <ThemeProvider theme={colorTheme}>
            <Button variant="contained" onClick={registerUser} color="orange">SIGN UP!</Button>
          </ThemeProvider>
        </div>
      </div>
    </Container>
  );
}

export default RegisterForm;
