import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllUsernames () {
    console.log('in fetchAllUsernames saga');
    try {
        const allUsernames = yield axios.get('/api/share');
        yield put ({type: 'SET_ALL_USERNAMES', payload: allUsernames.data});
    } catch (error) {
        console.log('error in fetchAllUsernames saga', error);
        alert('Something went wrong.');
    }
}

function* shareProfile (action) {
    console.log('in shareProfile saga', action.payload);
    try {
        yield axios.post(`/api/share/`, action.payload);
        action.shareSuccess();
        yield put ({type: 'FETCH_ALL_USERNAMES'});
    } catch (error) {
        console.log('error in shareProfile saga', error);
        alert('This username already has access to this pet.');
    }
}


function* shareSaga() {
    yield takeLatest('FETCH_ALL_USERNAMES', fetchAllUsernames);
    yield takeLatest('SHARE_PROFILE', shareProfile);
}

export default shareSaga;