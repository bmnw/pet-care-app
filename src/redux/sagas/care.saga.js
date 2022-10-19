import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* submitCareItem (action) {
    console.log('in submitCareItem saga', action.payload);
    try {
        yield axios.post('/api/care', action.payload); // post request
        action.clearInputs(); // clearing Add Care Item form inputs
        yield put ({type: 'FETCH_PET_CARE_ITEMS', payload: action.payload.pet_id}); // refreshing the list of care items
        alert('Care item has been added.'); // alerting user to success
    } catch (error) {
        console.log('error in submitCareItem saga', error);
        alert('Something went wrong submitting this care item.');
    }
}

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

function* deleteCareItem (action) {
    console.log('in deleteCareItem saga', action.payload.id);
    console.log(typeof(action.payload.pet_id));
    try {
        yield axios.delete(`/api/care/${action.payload.id}`);
        yield put({type: 'FETCH_PET_CARE_ITEMS', payload: action.payload.pet_id});
    } catch (error) {
        console.log('error in deleteCareItem saga', error);
        alert('Something went wrong deleting this care item.');
    }
}

function* careSaga() {
    yield takeLatest('FETCH_PET_CARE_ITEMS', fetchPetCareItems);
    yield takeLatest('SUBMIT_CARE_ITEM', submitCareItem);
    yield takeLatest('DELETE_CARE_ITEM', deleteCareItem);
}

export default careSaga;