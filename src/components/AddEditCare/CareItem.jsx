import {useState} from 'react';
import {useDispatch} from 'react-redux';
import EditCareDetailsForm from './EditCareDetailsForm.jsx';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import {GoDash} from 'react-icons/go';
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
                    {/* <ListItemIcon> */}
                        <GoDash fontSize="large" />
                    {/* </ListItemIcon> */}
                    <ListItemButton onClick={handleClickOpen} sx={{width: 200}}>
                        <ListItemText primaryTypographyProps={{fontSize: 18}}>
                            {item.description}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleClickOpen}>
                        <MoreHorizRoundedIcon fontSize="large" />
                    </ListItemButton>
                    <ThemeProvider theme={colorTheme}>
                        <ListItemButton onClick={(event) => deleteCareItem(item.id)}>
                            <DeleteIcon color="blue" fontSize="large" />
                        </ListItemButton>
                    </ThemeProvider>
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    fullWidth
                >
                    <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        {`Details for ${item.description}`}
                        <ThemeProvider theme={colorTheme}>
                            <Fab sx={{marginLeft: 1}} color="orange" onClick={() => setShowForm(!showForm)}>
                                <EditIcon />
                            </Fab>
                        </ThemeProvider>
                    </DialogTitle>
                    <DialogContent>
                        {
                            showForm ? (
                                <>
                                    <Typography>Frequency: {item.frequency}</Typography>
                                    <EditCareDetailsForm 
                                        item={item}
                                        petid={petid}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                    />
                                </> 
                            ) : (
                                <>
                                    Frequency: {item.frequency}
                                    <br />
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