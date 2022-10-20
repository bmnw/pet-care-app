import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ReminderItem = ({reminder}) => {
    return <>   
                <Grid container spacing={2} direction="row" display="flex" justifyContent="center">
                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Typography>{reminder.description}</Typography>
                    </Grid>
                    <Grid item>
                        <CheckCircleOutlineIcon  fontSize="large"/>
                    </Grid>
                </Grid>
            </>
}

export default ReminderItem;