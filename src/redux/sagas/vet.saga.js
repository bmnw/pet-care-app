import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVetNotes () {
    console.log('in fetchVetNotes saga');
}

function* vetSaga() {
    yield takeLatest('FETCH_VET_NOTES', fetchVetNotes);
}

export default vetSaga;