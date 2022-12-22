import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';

function LogOutButton(props) {

  const history = useHistory();

  const toLogin = () => {
    console.log('in toLogin');
    history.push('/login');
  } // end toLogin

  const dispatch = useDispatch();
  return (
    <Button
      sx={{width: 100, text: 'white'}}
      variant="contained"
      color="white"
      onClick={() => dispatch({ type: 'LOGOUT', toLogin: toLogin})}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
