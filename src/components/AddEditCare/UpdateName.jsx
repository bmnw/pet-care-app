import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Textfield from '@mui/material/Textfield';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UpdateName = ({pet, updatedName, setUpdatedName}) => {

    const dispatch = useDispatch();
    let {petid} = useParams();

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

    const updateName = (nameInput) => {
        console.log('in updateName', nameInput, petid);
        if(nameInput){
          dispatch({type: 'UPDATE_PET_NAME', payload: {pet_name: nameInput, id: petid}, clearInput: clearInput});
        } else {
          alert('Please enter a new name.');
        }
    } // end updateName

    const clearInput = () => {
        console.log('in clearInput');
        setUpdatedName('');
    } // end clearInput

    return  <>
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Typography variant="h5">Update {pet.pet_name}'s Care</Typography>
                </Box>
                <br />
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Typography sx={{display: "flex", alignItems: "center", width: 100}}>PET NAME:</Typography>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={updatedName}
                        onChange={(event) => setUpdatedName(event.target.value)}    
                    />
                </Box>
                <br />
                <ThemeProvider theme={colorTheme}>
                    <Box sx={{display:"flex", justifyContent:"center"}}>
                        <Button onClick={(event) => updateName(updatedName)} variant="contained" color="white">UPDATE NAME</Button>
                    </Box>
                </ThemeProvider>
            </>
}

export default UpdateName;