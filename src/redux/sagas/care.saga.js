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

function* fetchReminders (action) {
    console.log('in fetchReminders saga', action.payload);
    try{
        const reminders = yield axios.get(`/api/care/reminders/${action.payload}`);
        yield put ({type: 'SET_REMINDERS', payload: reminders.data});
    } catch (error) {
        console.log('error in fetchReminders saga', error);
        alert('Something went wrong displaying your reminders.');
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

function* markAsComplete (action) {
    console.log('in markAsComplete saga', action.payload);
    try {
        yield axios.put(`/api/care/${action.payload.id}`); // sets pet_care_item date_complete to CURRENT_DATE
        yield put({type: 'FETCH_REMINDERS', payload: action.payload.pet_id}); // fetches all care items for the current day
    } catch (error) {
        console.log('error in markAsComplete saga', error);
        alert('Something went wrong recording that you finished that.');
    }
}

function* careSaga() {
    yield takeLatest('FETCH_PET_CARE_ITEMS', fetchPetCareItems);
    yield takeLatest('SUBMIT_CARE_ITEM', submitCareItem);
    yield takeLatest('DELETE_CARE_ITEM', deleteCareItem);
    yield takeLatest('FETCH_REMINDERS', fetchReminders);
    yield takeLatest('MARK_AS_COMPLETE', markAsComplete);
}

export default careSaga;