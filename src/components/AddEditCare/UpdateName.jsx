import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Textfield from '@mui/material/Textfield';

const UpdateName = ({pet, updatedName, setUpdatedName}) => {

    return  <>
                <Grid
                                container
                                spacing={2}
                                direction="column"
                                justifyContent="center"
                                key={pet.id}
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
                                    <Button variant="contained">UPDATE NAME</Button>
                                </Grid>
                            </Grid>
            </>
}

export default UpdateName;