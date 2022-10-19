import {useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const CareItem = ({item, petid}) => {

    const dispatch = useDispatch();

    const deleteCareItem = (itemId) => {
        console.log('in deleteCareItem', itemId, petid);
        dispatch({type: 'DELETE_CARE_ITEM', payload: {id: itemId, pet_id: Number(petid)}});
    } // end deleteCareItem

    return  <div style={{marginLeft: 15}}>
                <Grid 
                    sx={{marginBottom: 3, display: "flex", justifyContent: "flex-end"}}
                    container
                    direction="row"
                >
                    <Grid item>
                        <Typography variant="h6">{item.description}</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={(event) => deleteCareItem(item.id)}><DeleteIcon/></Button>
                    </Grid>
                </Grid>
                
            </div>
}

export default CareItem;