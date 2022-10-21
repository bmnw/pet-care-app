import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const CompletedReminder = ({reminder, handleClickOpen, taskComplete}) => {

    return  <>
                <Grid container spacing={2} direction="row" display="flex" justifyContent="center">
                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Typography variant="h6" onClick={handleClickOpen}>{reminder.description}</Typography>
                    </Grid>
                    <Grid item>
                        <Switch checked color="success" size="large" onClick={() => taskComplete(reminder.id)}/>
                    </Grid>
                </Grid>
            </>
} 

export default CompletedReminder;