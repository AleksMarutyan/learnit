import React, { useState} from 'react';
import {TextField,Grid,Button,Typography} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
    container:{
       
    },
    nameText:{
      fontSize: "20px",
      color: "#3F51B5"
    },
    button:{
        marginTop: "30px"
    }
  }));
  

export default function KidRegister(){
    const classes = useStyles();
    
    const [form, setForm] = useState({
        kidName : '' , parentName: '', phoneNumber: '', address: '', old: '' , email: '' ,status: 'applicant'
    })
    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = () =>{
        fetch("http://localhost:5000/kidregister", {
            method: "post",
            body:JSON.stringify(form),
            headers:{"Content-Type": "application/json"}
        })
    }
    return(
      <form className={classes.root} noValidate autoComplete="off" >
          
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Grid item><Typography  className={classes.nameText}>Երեխայի Գրանցում</Typography></Grid> 
            <Grid item>
                <TextField
                    name="kidName"
                    label="Երեխայի անուն ազգանուն"
                    multiline
                    onChange ={changeHandler}
                />
            </Grid> 
            <Grid item>     
                <TextField
                    name="old"
                    label="Տարիք"
                    multiline
                    onChange ={changeHandler}
                />
            </Grid>          
            <Grid item>   
                <TextField
                    name="parentName"
                    label="Ծնողի անուն ազգանուն"
                    multiline
                    onChange ={changeHandler}
                />  
            </Grid>   
            <Grid item>      
                <TextField
                    name="phoneNumber"
                    label="Ծնողի հեռախոսահամար"
                    multiline
                    onChange ={changeHandler}
                />
            </Grid>
            <Grid item>      
                <TextField
                    name="email"
                    label="Էլ.փոստ"
                    multiline
                    onChange ={changeHandler}
                />
            </Grid>

            <Grid item>   
                <TextField
                    name="address"
                    label="Հասցե"
                    multiline
                    onChange ={changeHandler}
                />
            </Grid>       
           
            <Grid item>     
                <Button variant="contained" color="primary" className={classes.button}  onClick={registerHandler}>
                        Գրանցել
                </Button>
           </Grid>       
        </Grid>  
             
      </form>
    )
}