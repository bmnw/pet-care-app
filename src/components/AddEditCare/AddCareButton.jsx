import { useState } from 'react';
import AddCareForm from './AddCareForm.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddCareButton = () => {

    const [showForm, setShowForm] = useState(false);

    return  <>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={() => setShowForm(!showForm)} variant="contained">ADD CARE ITEM</Button>
                </Box>
                {
                    showForm ? (
                        <AddCareForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                    />
                    ) : (
                       <></>
                    )
                }                  
            </>
}

export default AddCareButton;