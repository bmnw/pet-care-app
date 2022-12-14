import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

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
          <Typography>Username:</Typography>
            <TextField
              sx={{backgroundColor: 'white'}}
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
        </div>
        <br />
        <div>
            <Typography>Password:</Typography>
            <TextField
              sx={{backgroundColor: 'white'}}
              type="password"
              name="password"
              id="outline-required"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <br />
        <div>
          <Button onClick={login} variant="contained" color="orange">LOGIN</Button>
        </div>
      </div>
    </Container>
  );
}

export default LoginForm;
