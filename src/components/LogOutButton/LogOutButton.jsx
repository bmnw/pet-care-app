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
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      variant="contained"
      onClick={() => dispatch({ type: 'LOGOUT', toLogin: toLogin})}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
