import React, { useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {Grid,Button, TableHead, TableBody, TableContainer, TableCell, TableRow} from '@material-ui/core';

const title = {
  monday: "Երկուշաբթի",
  tuesday: "Երեքշաբթի",
  wednesday: "Չորեքշաբթի",  
  thursday: "Հինգշաբթի",
  friday: "Ուրբաթ"
}
const title1= {
    monday: "monday",
    tuesday: "tuesday",
    wednesday: "wednesday",  
    thursday: "thursday",
    friday: "friday"
}
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    input:{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        outline: "none",
    },
    tablecell:{
        width: "100px",
        height: "50px",
        tableLayout: "fixed",
    },
    head:{
        backgroundColor: "#3F51B5",
        color: "#FFFFFF",
        fontSize: "22px"
    },
    headerName:{
        fontSize: "18px",
        fontWeight: "bold"
    },
    button:{
        width: "100px",
    }
  }));
 
export default function FoodlistTable({day,values}){
   
    const classes = useStyles({});
    var [food, setfood] = useState( 
          {   
             first11:  "",
             second11: "",
             third11:  "",
       
             first12:  "",
             second12: "",
             third12:  "",
   
             first13:  "",
             second13: "",
             third13:  "",
          }  
    )
    const changeHandler = event =>{
        setfood({...food, [event.target.name]: event.target.value})
    }

    
    //const arr = ['first11','second11','third11','first12','second12','third12','first13','second13','third13',];
    const rewriteHandler= () =>{
        var arr1 = document.getElementsByClassName(title1[day]);
        for(let i = 0 ; i < arr1.length; i++)
        {
           food = 0; 
           arr1[i].childNodes[0].value = " ";
        }
    }

    const registerHandler = () =>{
        fetch("http://localhost:5000/foodlistregister", {
            method: "post",
            body:JSON.stringify({[day]:food,listKey:1}),  
            headers:{"Content-Type": "application/json"}
        })
    }
    useEffect(()=>{
            if(values){
                setfood(values)
            }
    },[values])
    return(
    
    <Grid container> 
      <form className={classes.root} noValidate autoComplete="off" >
            <TableContainer>
                <TableHead  className={classes.head}>
                    <TableCell className={classes.headerName}>{title[day]}</TableCell>
                    <TableCell>1-ին ուտեստ</TableCell>
                    <TableCell>2-րդ ուտեստ</TableCell>
                    <TableCell>3-րդ ուտեստ</TableCell>
                    <TableCell></TableCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.tablecell}>Նախաճաշ</TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="first11" onChange={changeHandler} value={food.first11}></input></TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="first12" onChange={changeHandler} value={food.first12}></input></TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="first13" onChange={changeHandler} value={food.first13}></input></TableCell>  
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tablecell}>Ճաշ</TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="second11" onChange={changeHandler} value={food.second11}></input></TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="second12" onChange={changeHandler} value={food.second12}></input></TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="second13" onChange={changeHandler} value={food.second13}></input></TableCell> 
                        <TableCell><Button variant="contained" color="primary" className={classes.button} onClick={rewriteHandler}>Մաքրել</Button></TableCell> 
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tablecell}>Ետճաշիկ</TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="third11" onChange={changeHandler} value={food.third11}></input></TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="third12" onChange={changeHandler} value={food.third12}></input></TableCell>
                        <TableCell className={classes.tablecell,title1[day]}><input className={classes.input} name="third13" onChange={changeHandler} value={food.third13}></input></TableCell>  
                        <TableCell><Button  variant="contained" color="primary" className={classes.button} onClick={registerHandler}>Պահպանել</Button></TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>
      </form>
    </Grid>  
    )
}