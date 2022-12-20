import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LogOutButton(props) {

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
        contrastText: '#F9F5F0'
      }
    }
  });

  const toLogin = () => {
    console.log('in toLogin');
    history.push('/login');
  } // end toLogin

  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={colorTheme}>
      <Button
        sx={{width: 100, text: 'white'}}
        variant="contained"
        color="white"
        onClick={() => dispatch({ type: 'LOGOUT', toLogin: toLogin})}
      >
        Log Out
      </Button>
    </ThemeProvider>

  );
}

export default LogOutButton;
