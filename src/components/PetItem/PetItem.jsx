import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const PetItem = ({pet}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const selectPet = (inputId) => {
        console.log('in selectPet');
        dispatch({type: 'FETCH_THIS_PET', payload: inputId, toPetProfile: toPetProfile});
    } // end selectPet

    const toPetProfile = (inputId) => {
        console.log('in toPetProfile');
        history.push(`/petprofile/${inputId}`);
    } // end toPetProfile

    return  <>
                <Card 
                    elevation={10} 
                    sx={{margin: 2, 
                    width: 150}}
                    onClick={(event) => selectPet(pet.id)}
                >
                    <CardMedia
                        component="img"
                        height="150"
                        image={pet.image}
                    />
                    <CardContent>
                        <Typography variant="h5">{pet.pet_name}</Typography>
                    </CardContent>
                </Card>
            </>
}

export default PetItem;