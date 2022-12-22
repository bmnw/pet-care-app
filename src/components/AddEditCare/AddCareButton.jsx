import { useState } from 'react';
import AddCareForm from './AddCareForm.jsx';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const AddCareButton = () => {

    const [showForm, setShowForm] = useState(false);

    return  <>  
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Fab color="orange" variant="extended" onClick={() => setShowForm(!showForm)}>
                  <AddIcon sx={{ mr: 1 }}/>
                  Add Care
                </Fab>
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