import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import Textfield from '@mui/material/Textfield';
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
          <Button onClick={login} variant="contained">LOGIN</Button>
        </div>
      </div>
    </Container>
  );
}

export default LoginForm;
