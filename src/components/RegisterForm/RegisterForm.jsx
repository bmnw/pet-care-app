import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Textfield from '@mui/material/Textfield';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
          {/* <label htmlFor="username"> */}
          <Typography>Username:</Typography>
            <Textfield
              sx={{backgroundColor: 'white'}}
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          {/* </label> */}
        </div>
        <br />
        <div>
          {/* <label htmlFor="password"> */}
          <Typography>Password:</Typography>
            <Textfield
              type="password"
              sx={{backgroundColor: 'white'}}
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          {/* </label> */}
        </div>
        <br />
        <div>
          <Button variant="contained" onClick={registerUser}>SIGN UP!</Button>
        </div>
      </div>
    </Container>
  );
}

export default RegisterForm;
