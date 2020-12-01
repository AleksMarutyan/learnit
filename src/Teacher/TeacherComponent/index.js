import {React, useEffect, useState} from 'react';
import Axios from  'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  container:{
    marginTop: 30,
    marginLeft: 30,
  },
  header:{
    fontSize: 10
  },
  text:{
    fontSize: 15,
    fontWeight: "bold",
    color: "black"
  },
  text1:{
    marginLeft: 10
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [data, setTeacher] = useState([]);
  
  const handleDelete = (id,teachImage) =>{
    Axios.delete(`http://localhost:5000/teacherregister/${id}/${teachImage}`)
    document.getElementById(id).remove();
  }

  useEffect(()=>{
      fetch('http://localhost:5000/teacherregister')
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              setTeacher(data);
              console.log(data);
          });
  },[])



  return (

    <Grid 
      container
      direaction = "row"
      spacing = "3"
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      { data.map((teacher)=>{
        let image = require(`../../uploads/${teacher.teachImage}`);
        return( 
          <Grid 
            item 
            xs={3}
            id={teacher._id}
          >
            <Card className={classes.root} >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action ={
                  <Button  
                  variant="contained"
                  color="secondary"
                  className={classes.deleted} 
                  onClick={() => handleDelete(teacher._id,teacher.teachImage)}
                  >
                  </Button>
                }
                title={
                  <Typography>
                    {teacher.teachName}
                  </Typography>  
                }
                subheader ={teacher.teachPost +"  "+ teacher.teachGroup }
                className ={classes.header}
              />
              <CardMedia
                className={classes.media}
                image={image.default}
              >
              </CardMedia>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
              <span className={classes.text}>Տարիքը:</span><span className = {classes.text1}>{teacher.teachOld}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span className={classes.text}>Կրթություն:</span><span className = {classes.text1}>{teacher.teachEducation}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span className={classes.text}> Աշխատանքային փորձ:</span><span className = {classes.text1}>{teacher.teachWorktime}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span className={classes.text}>Հեռախոսահամար:</span><span className = {classes.text1}>{teacher.teachPhone}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>  
          )
        })
      }  
    </Grid>  
  );
}

