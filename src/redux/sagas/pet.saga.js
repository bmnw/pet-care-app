import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPet (action) {
    console.log('in addPet saga', action.payload);
    try {
        yield axios.post('/api/pet', action.payload);
        // yield put ({type: 'FETCH_PETS'});
        action.toDashboard();
    } catch (error) {
        console.log('error in addPet saga', error);
        alert('Something went wrong adding your pet.');
    }
} // end addPet saga

function* petSaga() {
    yield takeLatest('ADD_PET', addPet);
}

export default petSaga;