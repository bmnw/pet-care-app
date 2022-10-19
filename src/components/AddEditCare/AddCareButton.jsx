import { useState } from 'react';
import AddCareForm from './AddCareForm.jsx';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const AddCareButton = () => {

    const [showForm, setShowForm] = useState(false);

    return  <>
                <Grid>
                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Button onClick={() => setShowForm(!showForm)} variant="contained">ADD CARE ITEM</Button>
                    </Grid>
                </Grid>
                {
                    showForm ? (
                        <></>
                    ) : (
                        <AddCareForm />
                    )
                }                  
            </>
}

export default AddCareButton;