import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Textfield from '@mui/material/Textfield';

const UpdateName = ({pet, updatedName, setUpdatedName}) => {

    const dispatch = useDispatch();
    let {petid} = useParams();

    const updateName = (nameInput) => {
        console.log('in updateName', nameInput, petid);
        dispatch({type: 'UPDATE_PET_NAME', payload: {pet_name: nameInput, id: petid}, clearInput: clearInput});
    } // end updateName

    const clearInput = () => {
        console.log('in clearInput');
        setUpdatedName('');
    } // end clearInput

    return  <>
                <Grid
                                container
                                spacing={2}
                                direction="column"
                                justifyContent="center"
                            >
                                <Grid item
                                    sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
                                >
                                    <Typography variant="h5">Update {pet.pet_name}'s Care</Typography>
                                </Grid>
                                <br />
                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <Typography>PET NAME:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Textfield 
                                            sx={{backgroundColor: 'white'}}
                                            required
                                            value={updatedName}
                                            onChange={(event) => setUpdatedName(event.target.value)}    
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                    <Button onClick={(event) => updateName(updatedName)} variant="contained">UPDATE NAME</Button>
                                </Grid>
                            </Grid>
            </>
}

export default UpdateName;