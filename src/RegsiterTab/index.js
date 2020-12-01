import KidRegister from "../Kid/Register/index"
import OcassionRegister from '../Ocassion/index'
import TeacherRegister from '../Teacher/Register/index';
import {Grid} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        marginTop:"50px",
    }
  }));

export default function RegisterTab(){
    const classes = useStyles();
    return(
        <Grid 
         container
         className={classes.container}
        >
            <Grid 
              item
              xs={4}
            >
                <KidRegister/>
            </Grid>
            <Grid 
              item
              xs={4}    
            >   
                <TeacherRegister/>
            </Grid>
            <Grid 
              item
              xs={4}    
            >
                <OcassionRegister/>
            </Grid>
        </Grid>
    )
}