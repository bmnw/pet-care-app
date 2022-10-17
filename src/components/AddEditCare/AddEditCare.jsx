import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import UpdateName from './UpdateName.jsx';

const AddEditCare = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const careItems = useSelector(store => store.care.petCareItems);

    const [updatedName, setUpdatedName] = useState('');

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_PET_CARE_ITEMS', payload: petid});
    }, []);

    return  <div>
                <Nav />
                {
                    pet.map(pet => {
                        return  (
                                    <UpdateName 
                                        key={pet.id}
                                        pet={pet}
                                        updatedName={updatedName}
                                        setUpdatedName={setUpdatedName}
                                    />
                                )
                    })
                }
                {
                    careItems.map(item => {
                        return  (
                                    <span>{item.description}</span>
                                )
                    })
                }
            </div>
} // end AddEditCare

export default AddEditCare;