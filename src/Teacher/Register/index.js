import React, {useState} from 'react';
import axios from 'axios';   
import {Grid,TextField, Button,RadioGroup,Radio,FormControlLabel,Typography} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
    secondCont:{
        marginTop: "30px"
    },
    nameText:{
        fontSize: "20px",
        color: "#3F51B5"
    },
    inputCont:{
        marginTop: "30px"
    },
    buttonCont:{
        marginTop: "50px"
    }
  }));
  

export default function KidRegister(){
    const classes = useStyles();
    const [form, setForm] = useState({
        teachName: "", teachPhone: "", teachGroup:"" , teachPost:"", teachOld:"", teachWorktime:"",teacherImage:"" , teachEducation: ""
    })
    const changeHandler = event =>{
        if(event.target.name === "teacherImage")
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
        }
        let config = {
            headers:{'content-type': `multipart/form-data; boundary=123`},
            }
       axios
          .post('/teacherregister', formData,config)
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
                <Grid item><Typography  className={classes.nameText}>Ուսուցչի Գրանցում</Typography></Grid> 
                <Grid item>   
                    <TextField
                        name="teachName"
                        label="Անուն ազգանուն"
                        multiline
                        onChange ={changeHandler}
                    />
                </Grid>    
                <Grid item>    
                    <TextField
                        name="teachOld"
                        label="Տարիք"
                        multiline
                        onChange ={changeHandler}
                    />
                </Grid>
                <Grid item>  
                    <TextField
                        name="teachEducation"
                        label="Կրթություն"
                        multiline
                        onChange ={changeHandler}
                    />
                </Grid>    
                <Grid item>
                    <TextField
                        name="teachWorktime"
                        label="Աշխատանքային փորձ"
                        multiline
                        onChange ={changeHandler}
                    />
                </Grid>  
                <Grid item>  
                    <TextField
                        name="teachPhone"
                        label="Հեռախոսահամար"
                        multiline
                        onChange ={changeHandler}
                    />  
                </Grid>
                <Grid item container
                    direction = "row"
                    justify = "center"
                    alignItems="center"
                    className={classes.secondCont}
                >
                    <Grid item>
                        <RadioGroup name="teachGroup" onChange={changeHandler}>
                            <FormControlLabel value="փոքրերի խումբի" control={<Radio />} label="փոքրերի խումբ" />
                            <FormControlLabel value="մեծերի խումբի" control={<Radio />} label="մեծերի խումբ" />
                        </RadioGroup>
                    </Grid>
                    <Grid item>
                        <RadioGroup name="teachPost" onChange={changeHandler} >
                            <FormControlLabel value="դաստիարակ" control={<Radio />} label="դաստիարակ"/>
                            <FormControlLabel value="դայակ" control={<Radio />} label="դայակ"/>
                            <FormControlLabel value="բուժքույր" control={<Radio />} label="բուժքույր" />
                        </RadioGroup>
                    </Grid>    
                </Grid>    
                <Grid item className={classes.inputCont}>
                    <input
                        name="teacherImage"
                        type="file"
                        onChange={changeHandler}
                        placeholder="нтк"
                        className={classes.imageButton}
                    />
                </Grid>    
                <Grid item
                    className={classes.buttonCont}
                >    
                    <Button variant="contained" color="primary" type="submit"  className={classes.button}>
                            Գրանցել
                    </Button> 
                </Grid>    
            </Grid>         
        </form> 
    )
}