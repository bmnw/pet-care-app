import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginPage() {
  const history = useHistory();

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
          <ThemeProvider theme={colorTheme}>
          <Button
            variant="contained"
            color="white"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
          </ThemeProvider>
        </center>
      </Grid>
    </div>
  );
}

export default LoginPage;
