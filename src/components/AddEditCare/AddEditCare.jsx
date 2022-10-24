import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import UpdateName from './UpdateName.jsx';
import CareItem from './CareItem.jsx';
import AddCareButton from './AddCareButton.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Typography } from '@mui/material';

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
                <Typography variant="h6" sx={{marginLeft: 3}}>
                    All Care Items
                </Typography>
                <List sx={{width: '100%'}}>
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
                </List>
                <br />
                <AddCareButton />
                <br />
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        sx={{width: 200}} 
                        color='secondary' 
                        variant="contained" 
                        onClick={(event) => history.push(`/petprofile/${petid}`)}
                    >
                        BACK TO PET PROFILE
                    </Button> 
                </Box>
            </div>
} // end AddEditCare

export default AddEditCare;