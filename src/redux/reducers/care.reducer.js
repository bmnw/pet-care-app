import { combineReducers } from 'redux';

const petCareItems = (state = [], action) => {
    console.log('in petCareItems reducer');
    console.log(action.payload);
    if(action.type === 'SET_PET_CARE_ITEMS') {
        return action.payload;
    } else if (action.type === 'UNSET_USER') {
        return [];
    }
    return state;
}

const reminders = (state = [], action) => {
    console.log('in reminders reducer');
    if(action.type === 'SET_REMINDERS'){
        return action.payload;
    } else if (action.type === 'UNSET_USER') {
        return [];
    }
    return state;
}

export default combineReducers({
    petCareItems,
    reminders
  });