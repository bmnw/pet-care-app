import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function RegisterPage() {
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
        <Typography sx={{textAlign: 'center'}} variant="h4">Welcome to Waffle's Spot!</Typography>
        <br />
        <RegisterForm />
        <br />
        <br />
        <center>
          <Button
            variant="contained"
            onClick={() => {
              history.push('/login');
            }}
          >
            RETURN TO LOGIN
          </Button>
        </center>
      </Grid>
    </div>
  );
}

export default RegisterPage;
