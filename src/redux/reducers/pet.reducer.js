import { combineReducers } from 'redux';

const userPets = (state = [], action) => {
    console.log('userPets reducer', action.payload);
    if(action.type === 'SET_PETS'){
        return action.payload;
    } else if (action.type === 'UNSET_USER'){
        return [];
    }
    return state;
}

const petDetails = (state = [], action) => {
    console.log('in petDetails reducer');
    if(action.type === 'SET_PET_DETAILS'){
        return action.payload;
    } else if(action.type === 'UNSET_USER'){
        return [];
    }
    return state;
}

export default combineReducers({
    userPets,
    petDetails
  });