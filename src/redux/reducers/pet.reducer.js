import { combineReducers } from 'redux';

const userPets = (state = [], action) => {
    console.log('userPets reducer', action.payload);
    if(action.type === 'SET_PETS'){
        return action.payload;
    }
    return state;
}

export default combineReducers({
    userPets
  });