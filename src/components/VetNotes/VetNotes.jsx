import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const VetNotes = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_VET_NOTES', payload: petid});
    }, []);

    return  <div>
                <Nav />
                {
                    pet.map(detail => {
                        return  <Grid container spacing={2} direction="column" alignContent="center">
                                    <Grid item>
                                        <Typography variant="h5">Vet Notes for {detail.pet_name}</Typography>
                                    </Grid>
                                </Grid>
                    })
                }
                <br />
                {
                    pet.map(detail => {
                        return  <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Button sx={{width: 125}} variant="contained" onClick={(event) => history.push(`/petprofile/${petid}`)}>{detail.pet_name}'s Profile</Button>
                                    </Grid>
                                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <Button sx={{width: 125}} variant="contained" onClick={(event) => history.push(`/add-vet-note/${petid}`)}>ADD NOTE</Button>
                                    </Grid>
                                </Grid>
                    })
                }
            </div>
}

export default VetNotes;