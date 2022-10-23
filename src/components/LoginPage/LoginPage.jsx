import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function LoginPage() {
  const history = useHistory();

  return (
    <div style={{margin: 10, marginTop: 20}}>
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src={'images/logo-cropped-2.jpg'} style={{width: 150, height: 100, border: 'solid'}}/>
        <br />
        <Typography variant="h4">Waffle's Spot</Typography>
        <br />
        <LoginForm />
        <br />
        <br />
        <center>
          <Typography>New to Waffle's Spot?</Typography>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </center>
      </Grid>
    </div>
  );
}

export default LoginPage;
