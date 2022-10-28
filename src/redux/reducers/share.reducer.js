import { combineReducers } from 'redux';

const allUsernames = (state = [], action) => {
    console.log('in allUsernames reducer');
    if(action.type === 'SET_ALL_USERNAMES'){
        return action.payload;
    } else if(action.type === 'UNSET_USER') {
        return [];
    }
    return state;
}

export default combineReducers({
    allUsernames
});