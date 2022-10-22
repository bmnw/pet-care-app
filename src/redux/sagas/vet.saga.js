import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVetNotes (action) {
    console.log('in fetchVetNotes saga');
    try{
        const vetNotes = yield axios.get(`/api/vet/${action.payload}`); // action.payload is petid
        yield put ({type: 'SET_VET_NOTES', payload: vetNotes.data});
    } catch (error) {
        console.log('error in fetchVetNotes saga', error);
        alert('Something went wrong displaying the vet notes.')
    }
}

function* vetSaga() {
    yield takeLatest('FETCH_VET_NOTES', fetchVetNotes);
}

export default vetSaga;