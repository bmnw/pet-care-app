import { combineReducers } from 'redux';

const vetNotes = (state = [], action) => {
    console.log('in vetNotes reducer');
    if(action.type === 'SET_VET_NOTES'){
        return action.payload;
    } else if (action.type === 'UNSET_USER'){
        return [];
    }
    return state;
}

export default combineReducers({
    vetNotes,
  });