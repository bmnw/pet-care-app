import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPets () {
    console.log('in fetchPets saga');
    try {
        const pets = yield axios.get('/api/pet');
        yield put({type: 'SET_PETS', payload: pets.data});
    } catch (error) {
        console.log('error in fetchPets saga', error);
        alert('Something went wrong displaying your pets');
    }
}

function* addPet (action) {
    console.log('in addPet saga', action.payload);
    try {
        yield axios.post('/api/pet', action.payload);
        yield put ({type: 'FETCH_PETS'});
        action.toDashboard();
    } catch (error) {
        console.log('error in addPet saga', error);
        alert('Something went wrong adding your pet.');
    }
} // end addPet saga

function* petSaga() {
    yield takeLatest('ADD_PET', addPet);
    yield takeLatest('FETCH_PETS', fetchPets);
}

export default petSaga;