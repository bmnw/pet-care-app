import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import UpdateName from './UpdateName.jsx';
import CareItem from './CareItem.jsx';
import AddCareButton from './AddCareButton.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AddEditCare = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const careItems = useSelector(store => store.care.petCareItems);

    const [updatedName, setUpdatedName] = useState('');

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

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_PET_CARE_ITEMS', payload: petid});
    }, []);

    return  <div>
                <Nav />
                {
                    pet.map(pet => {
                        return  (
                                    <UpdateName 
                                        key={pet.id}
                                        pet={pet}
                                        updatedName={updatedName}
                                        setUpdatedName={setUpdatedName}
                                    />
                                )
                    })
                }
                <br />
                <br />
                <AddCareButton />
                <br />
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center'}}>
                        All Care Items
                    </Typography>
                </Box>
                <List sx={{width: '100%'}}>
                {
                    careItems.map(item => {
                        return  ( 
                                    <CareItem 
                                        key={item.id}
                                        item={item}
                                        petid={petid}
                                    />
                                )
                    })
                }
                </List>
                <br />
                <ThemeProvider theme={colorTheme}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button 
                            color="white"
                            size="large" 
                            variant="contained" 
                            onClick={(event) => history.push(`/petprofile/${petid}`)}
                        >
                            PET PROFILE
                        </Button> 
                    </Box>
                </ThemeProvider>
             
            </div>
} // end AddEditCare

export default AddEditCare;