import React, {useState} from 'react';
import axios from 'axios';   
import {Grid,TextField, Button,Typography} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles} from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
    nameText:{
        fontSize: "20px",
        color: "#3F51B5"
    },
    textInput:{
        width: "275px",
        marginTop: "20px",
        height: "auto"
    },
    fileInput:{
        paddingTop: "30px"
    },
    button:{
        marginTop: "30px"
    }
  }));
  

export default function OcassionRegister(){
    const classes = useStyles();
    const [form, setForm] = useState({
       ocassionText: "", ocassionTime:"" , ocassionImage: "" , listKey: 1
    })
    const changeHandler = event =>{
        if(event.target.name === "ocassionImage")
         {
             setForm({...form, [event.target.name]: event.target.files[0]})
         }
        else
         {
             setForm({...form, [event.target.name]: event.target.value})
         }   
    }
    const registerHandler = (e) =>{
        e.preventDefault();
       
        const formData = new FormData();
        for ( var key in form ) {
            formData.append(key, form[key]);
            console.log(form[key])
        }
        let config = {
            headers:{'content-type': `multipart/form-data; boundary=123`},
            }   
       axios
          .post('/ocassionregister', formData,config)
          .then((res) => console.log(res.data))
          .catch((err)=>{
              console.log(err);
          })
    }
    return(  
        <form className={classes.root} onSubmit={registerHandler} encType="multipart/form-data">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center" 
                className={classes.container}
            >
                <Grid item><Typography  className={classes.nameText}>Occassion grancum</Typography></Grid> 
                <Grid item>   
                    <TextField
                        name="ocassionTime"
                        label="Միջոցառման օրը"
                        multiline
                        onChange ={changeHandler}
                    />
                </Grid>    
                <Grid item>    
                    <TextareaAutosize
                        name="ocassionText"
                        rows={20}
                        aria-label="maximum height"
                        placeholder="Միջոցառման բնութագիրը"
                        className={classes.textInput}
                        onChange ={changeHandler}
                    />
                </Grid>
                <Grid item className={classes.fileInput}>
                    <input
                        name="ocassionImage"
                        type="file"
                        onChange={changeHandler}
                        placeholder="нтк"
                        className={classes.imageButton}
                    />
                </Grid>    
                
                <Grid item>    
                    <Button variant="contained" color="primary" type="submit"  className={classes.button}>
                            Գրանցել
                    </Button> 
                </Grid>    
            </Grid>         
        </form> 
    )
}