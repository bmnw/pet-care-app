import { combineReducers } from 'redux';

const petCareItems = (state = [], action) => {
    console.log('in petCareItems reducer');
    console.log(action.payload);
    if(action.type === 'SET_PET_CARE_ITEMS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    petCareItems
  });