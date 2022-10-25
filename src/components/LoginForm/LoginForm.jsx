import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import Textfield from '@mui/material/Textfield';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
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

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container>
      <div className="formPanel">
        <Typography variant="h5">Login</Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <br />
        <div>
          {/* <label htmlFor="username"> */}
          <Typography>Username:</Typography>
            <Textfield
              sx={{backgroundColor: 'white'}}
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          {/* </label> */}
        </div>
        <br />
        <div>
          {/* <label htmlFor="password"> */}
            <Typography>Password:</Typography>
            <Textfield
              sx={{backgroundColor: 'white'}}
              type="password"
              name="password"
              id="outline-required"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          {/* </label> */}
        </div>
        <br />
        <div>
          <ThemeProvider theme={colorTheme}>
            <Button onClick={login} variant="contained" color="orange">LOGIN</Button>
          </ThemeProvider>
          {/* <Button onClick={login} variant="contained">LOGIN</Button> */}
        </div>
      </div>
    </Container>
  );
}

export default LoginForm;
