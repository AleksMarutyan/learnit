import React,{useState,useEffect} from 'react';
import FoodlistTable from './FoodlistTable/index';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const arr = [ 'monday',
'tuesday',
'wednesday',  
'thursday',
'friday'];

const useStyles = makeStyles((theme) => ({
    root:{
      marginTop: 30,
    }

}));

export default function Foodlist() {
  const classes = useStyles();
  const number = 1; 
  const [values, setValues] = useState({})
  useEffect(()=>{ fetch('http://localhost:5000/foodlistregister')
  .then((response) => {
      return response.json();
  })
  .then(([data]) => {
      setValues(data);
     
  });    
  },[])
  return( 

    <Grid
      container
      direaction = "row"
      spacing = "6"
      justify="center"
      alignItems="center"
      className = {classes.root}
    >
       {arr.map(day=> 
          <Grid 
            item
            xs={6}
          >
            <FoodlistTable
                day={day}
                key={day}
                listKey ={number}
                values={values[day]}
            />
          </Grid>
        )} 
    </Grid>
  )
}