import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Nav from '../Nav/Nav.jsx';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './AddPet.css';


const AddPet = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petImage, setPetImage] = useState('');

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
          }
        }
      });

    const submitPet = () => {
        console.log('in submitPet');
        console.log(petName, petType, petImage);
        // validate all inputs have a value
        if(petName && petType){
            dispatch({type: 'ADD_PET', payload: {pet_name: petName, pet_type: petType, image: petImage}, toDashboard: toDashboard});
        } else {
            alert('Both pet name and pet type are required to add a new pet.');
        }
    } // end submitPet

    const toDashboard = () => {
        console.log('in toDashboard');
        history.push('/user');
    } // end toDashboard

    // setting the petType and petImage
    const selectPetType = (petInput) => {
        console.log('in selectPetType', petInput);
        setPetType(petInput);
        if (petInput === 'cat'){
            setPetImage('/images/cat-2.jpg');
        } else if (petInput === 'dog') {
            setPetImage('/images/dog-2.jpg');
        } else if(petInput === 'rabbit') {
            setPetImage('/images/rabbit-2.jpg');
        } else {
            setPetImage('/images/other-7.jpg');
        }
    }

    return  <div>
                <Nav />
                <Container>
                    <Typography sx={{textAlign: "center"}} variant="h5">Add a new pet!</Typography>
                    <br />
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography sx={{display: 'flex', alignItems:'center', width: 100}}>PET NAME:</Typography> 
                        <TextField 
                                    sx={{backgroundColor: 'white'}}
                                    required
                                    label="Required"
                                    value={petName}
                                    onChange={(event) => setPetName(event.target.value)}    
                        />
                    </Box>
                    <br />
                    <br />
                    <Box sx={{display: 'flex', justifyContent: 'center', marginLeft:10, marginRight: 10, bgcolor: 'white'}}>
                        <FormControl fullWidth required variant="outlined">
                            <InputLabel>Type of Pet</InputLabel>
                            <Select
                                label="Type of Pet"
                                value={petType}
                                onChange={(event) => selectPetType(event.target.value)}
                            >
                                <MenuItem value="cat">CAT</MenuItem>
                                <MenuItem value="dog">DOG</MenuItem>
                                <MenuItem value = "rabbit">RABBIT</MenuItem>
                                <MenuItem value="other">OTHER</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <br />
                    <br />
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <ThemeProvider theme={colorTheme}>
                            <Button sx={{marginRight: 1}} onClick={() => history.push("/user")} className="add-pet-btn" size="large" variant="contained" color="white">
                                CANCEL
                            </Button>
                            <Button sx={{marginLeft: 1}} onClick={submitPet} className="add-pet-btn" size="large" variant="contained" color="orange">
                                ADD PET
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Container>
            </div>
} // end AddPet

export default AddPet;