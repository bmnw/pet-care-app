import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import UpdateName from './UpdateName.jsx';
import CareItem from './CareItem.jsx';
import AddCareButton from './AddCareButton.jsx';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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
                <br />
                {
                    careItems.map(item => {
                        return  ( 
                                    <CareItem 
                                        key={item.id}
                                        item={item}
                                        petid={petid}
                                    />
                                )
                    })
                }
                <br />
                <AddCareButton />
                <br />
                {
                    pet.map(pet => {
                        return <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button 
                                        sx={{width: 200}} 
                                        color='secondary' 
                                        variant="contained" 
                                        onClick={(event) => history.push(`/petprofile/${petid}`)}
                                    >
                                            {pet.pet_name}'s PROFILE
                                    </Button>
                                </Box>
                    })
                }
            </div>
} // end AddEditCare

export default AddEditCare;