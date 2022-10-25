import {useState} from 'react';
import {useDispatch} from 'react-redux';
import EditCareDetailsForm from './EditCareDetailsForm.jsx';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedSharpIcon from '@mui/icons-material/FeedSharp';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ListItemButton from '@mui/material/ListItemButton';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CareItem = ({item, petid}) => {

    const dispatch = useDispatch();

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

    // variable for dialog edit form conditional rendering
    const [showForm, setShowForm] = useState(false);

    // variable and functions for dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const deleteCareItem = (itemId) => {
        console.log('in deleteCareItem', itemId, petid);
        dispatch({type: 'DELETE_CARE_ITEM', payload: {id: itemId, pet_id: Number(petid)}});
    } // end deleteCareItem

    return  <div style={{marginLeft: 15}}>
                <ListItem>
                    <ListItemIcon>
                        <ArrowForwardIosSharpIcon />
                    </ListItemIcon>
                    <ListItemButton onClick={handleClickOpen} sx={{width: 160}}>
                        <ListItemText>
                            {item.description}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleClickOpen}>
                        <FeedSharpIcon fontSize="large" />
                    </ListItemButton>
                    <ListItemButton onClick={(event) => deleteCareItem(item.id)}>
                        <DeleteIcon color="error" fontSize="large" />
                    </ListItemButton>
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    fullWidth
                >
                    <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
                        {`Details for ${item.description}`}
                        <ThemeProvider theme={colorTheme}>
                            <Button color="orange" variant="contained" size="medium" onClick={() => setShowForm(!showForm)}>
                                <EditSharpIcon/>
                            </Button>
                        </ThemeProvider>
                    </DialogTitle>
                    <DialogContent>
                        {
                            showForm ? (
                                <>
                                    <Typography>Frequency: {item.frequency}</Typography>
                                    <br />
                                    <Typography>Current Details: {item.details}</Typography>
                                    <EditCareDetailsForm 
                                        item={item}
                                        petid={petid}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                    />
                                </> 
                            ) : (
                                <>
                                    <Typography>Frequency: {item.frequency}</Typography>
                                    <br />
                                    {`${item.details}`}
                                </> 
                            )
                        }
                    </DialogContent>
                </Dialog>                
            </div>
}

export default CareItem;