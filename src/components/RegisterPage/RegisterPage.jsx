import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container>
       <img src={'images/logo-cropped.jpg'} style={{width: 150, height: 100}}/>
      <Typography variant="h4">Welcome to Waffle's Spot!</Typography>
      <RegisterForm />

      <center>
        <Button
          variant="contained"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </Container>
  );
}

export default RegisterPage;
