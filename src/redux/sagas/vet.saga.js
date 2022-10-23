import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVetNotes (action) {
    console.log('in fetchVetNotes saga');
    try{
        const vetNotes = yield axios.get(`/api/vet/${action.payload}`); // action.payload is petid
        yield put ({type: 'SET_VET_NOTES', payload: vetNotes.data});
    } catch (error) {
        console.log('error in fetchVetNotes saga', error);
        alert('Something went wrong displaying the vet notes.');
    }
}

function* submitVetNote (action) {
    console.log('in submitVetNote saga');
    try{
        yield axios.post('/api/vet', action.payload);
        action.toVetNotes(action.payload.pet_id);
    } catch (error) {
        console.log('error in submitVetNote saga', error);
        alert('Something went wrong adding this vet note.');
    }
}

function* deleteVetNote (action) {
    console.log('in deleteVetNote saga', action.payload);
    try{
        yield axios.delete(`/api/vet/${action.payload.id}`);
        yield put ({type: 'FETCH_VET_NOTES', payload: action.payload.pet_id});
        action.handleClickClose();
    } catch (error) {
        console.log('error in deleteVetNote saga', error);
        alert('Something went wrong deleting this vet note.');
    }
}

function* vetSaga() {
    yield takeLatest('FETCH_VET_NOTES', fetchVetNotes);
    yield takeLatest('SUBMIT_VET_NOTE', submitVetNote);
    yield takeLatest('DELETE_VET_NOTE', deleteVetNote);
}

export default vetSaga;