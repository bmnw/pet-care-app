import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { alignProperty } from '@mui/material/styles/cssUtils';

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

function* fetchThisPet (action) {
    console.log('in fetchThisPet saga');
    try {
        const petDetails = yield axios.get(`/api/pet/${action.payload}`);
        yield put({type: 'SET_PET_DETAILS', payload: petDetails.data});
        action.toPetProfile(action.payload);
    } catch (error) {
        console.log('error in fetchThisPet saga', error);
        alert("Something went wrong pulling up this pet's profile.");
    }
}

function* refreshPetDetails (action) {
    console.log('in refreshPetDetails saga');
    try {
        const petDetails = yield axios.get(`/api/pet/${action.payload}`);
        yield put({type: 'SET_PET_DETAILS', payload: petDetails.data});
    } catch (error) {
        console.log('error in fetchThisPet saga', error);
        alert("Something went refreshing this pet's profile.");
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

function* updatePetName (action) {
    console.log('in updatePetName saga', action.payload.id);
    try {
        yield axios.put(`/api/pet/${action.payload.id}`, action.payload);
        yield put ({type: 'REFRESH_PET_DETAILS', payload: action.payload.id});
        action.clearInput();
    } catch (error) {
        console.log('error in updatePetName saga', error);
        alert("Something went wrong updating your pet's name.");
    }
}    

function* deletePetProfile (action) {
    console.log('in deletePetProfile saga', action.payload);
    try{
        yield axios.delete(`/api/pet/${action.payload}`);
        action.toDashboard();
    } catch (error) {
        console.log('error in deletePetProfile saga', error);
        alert('Something went wrong removing this profile.');
    }
}

function* petSaga() {
    yield takeLatest('ADD_PET', addPet);
    yield takeLatest('FETCH_PETS', fetchPets);
    yield takeLatest('FETCH_THIS_PET', fetchThisPet);
    yield takeLatest('REFRESH_PET_DETAILS', refreshPetDetails);
    yield takeLatest('DELETE_PET_PROFILE', deletePetProfile);
    yield takeLatest('UPDATE_PET_NAME', updatePetName);
}

export default petSaga;