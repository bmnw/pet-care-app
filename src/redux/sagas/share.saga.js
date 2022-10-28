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


function* shareSaga() {
    yield takeLatest('FETCH_ALL_USERNAMES', fetchAllUsernames);
}

export default shareSaga;