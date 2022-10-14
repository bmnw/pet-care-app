import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const history = useHistory();

  return (
    <Container sx={{}}>
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
