import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const history = useHistory();

  return (
    <Container>
      <img src={'images/logo-cropped.jpg'} style={{width: 150, height: 100}}/>
      <Typography variant="h4">Waffle's Spot</Typography>
      <LoginForm />
      <center>
        <Button
          variant="contained"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </Container>
  );
}

export default LoginPage;
