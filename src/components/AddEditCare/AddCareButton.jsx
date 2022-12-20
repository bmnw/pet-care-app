import { useState } from 'react';
import AddCareForm from './AddCareForm.jsx';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AddCareButton = () => {

    const [showForm, setShowForm] = useState(false);

    const colorTheme = createTheme({
        palette: {
          orange: {
            main: '#E27511',
          },
          white: {
            main: '#F9F5F0',
          },
          blue: {
            main: '#3D85C6',
            contrastText: '#F9F5F0'
          }
        }
      });

    return  <>  
                <ThemeProvider theme={colorTheme}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Fab color="orange" variant="extended" onClick={() => setShowForm(!showForm)}>
                      <AddIcon sx={{ mr: 1 }}/>
                      Add Care
                    </Fab>
                  </Box>
                </ThemeProvider>
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