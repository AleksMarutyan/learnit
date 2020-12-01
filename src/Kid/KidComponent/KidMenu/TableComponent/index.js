
import Axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

//////////////// STYLES ////////////////////////////
const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize:25
  },
  body: {
    fontSize: 17,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  deleted: {
    fontSize : 12
  },
  container:{
    width: "1000px",
  }
});


export default function CustomizedTables(props) {
  const classes = useStyles();
  const handleDelete = (id) =>{
    Axios.delete(`http://localhost:5000/kidregister/${id}`)
    document.getElementById(id).remove();
  }
  const handleClick = (id,value) =>{
    Axios.put(`http://localhost:5000/kidregister/status`, {
        id : id,
        status : value
    })
  }
  
  return (
    <div>
      <Table fixedheader='false' style={{ tableLayout: 'auto' }} aria-label="customized table" >
          <TableHead  className={classes.head}>
              <TableRow>
                  <StyledTableCell >Երեխայի Ա.Ա.</StyledTableCell>
                  <StyledTableCell align="left">Ծնողի Ա.Ա. </StyledTableCell>
                  <StyledTableCell align="left">Հեռախոսահամար</StyledTableCell>
                  <StyledTableCell align="left">Էլ.փոստ</StyledTableCell>
                  <StyledTableCell align="left">Հասցե</StyledTableCell>
                  <StyledTableCell align="left">Կարգավիճակ</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
          { props.kids.map((element) => {
              let stateValue = element.status;
              let id = element._id;
              return( <StyledTableRow key={element._id} id ={element._id}>                          
                        <StyledTableCell align="left">{element.kidName}</StyledTableCell>
                        <StyledTableCell align="left">{element.parentName}</StyledTableCell>
                        <StyledTableCell align="center">{element.phoneNumber}</StyledTableCell>
                        <StyledTableCell align="center">{element.email}</StyledTableCell>
                        <StyledTableCell align="center">{element.address}</StyledTableCell>
                        <StyledTableCell align="right">
                          <FormControl component="fieldset" key={element._id}>
                            <RadioGroup  defaultValue={stateValue}> 
                                <FormControlLabel value="attending" control={<Radio />} label="Հաճախող" onClick = {() => handleClick(id,"attending")}/>
                                <FormControlLabel value="registered" control={<Radio />} label="Հեռթագրված" onClick = {() => handleClick(id,"registered")}/>
                                <FormControlLabel value="applicant" control={<Radio />} label="Դիմորդ" onClick = {() => handleClick(id,"applicant")}/>
                            </RadioGroup>
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button  
                          variant="contained"
                          color="secondary"
                          className={classes.deleted} 
                          onClick={() => handleDelete(element._id)}
                          >
                              Ջնջել
                          </Button>
                        </StyledTableCell> 
                      </StyledTableRow>
                  )          
              })
          }
          </TableBody>
      </Table>
    </div>
  )
}