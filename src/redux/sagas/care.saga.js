import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPetCareItems (action) {
    console.log('in fetchPetCareItems saga', action.payload);
    try {
        const careItems = yield axios.get(`/api/care/${action.payload}`);
        yield put({type: 'SET_PET_CARE_ITEMS', payload: careItems.data});
    } catch (error) {
        console.log('error in fetchPetCareItems saga', error);
        alert('Something went wrong displaying the care items.');
    }
}

function* careSaga() {
    yield takeLatest('FETCH_PET_CARE_ITEMS', fetchPetCareItems);
}

export default careSaga;