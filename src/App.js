import React from 'react';
import KidMenu from './Kid/KidComponent/KidMenu/index';
import TeacherComponent from './Teacher/TeacherComponent/index';
import Foodlist from './Foodlist/index';
import RegisterTab from './RegsiterTab/index';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
     {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
   <Router> 
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs  centered value={value} onChange={handleChange} >
          <Tab label="Գրանցում" {...a11yProps(0)} component={Link} to="/teachkidreg"/>
          <Tab label="Գրանցված երեխաներ" {...a11yProps(1)} component={Link} to="/kidcomp"/>
          <Tab label="Ուսուցիչներ" {...a11yProps(2)} component={Link} to="/teachers"/>
          <Tab label="Ճաշացանկ" {...a11yProps(3)} component={Link} to="/food"/>     
        </Tabs>
      </AppBar>
      <Switch>
          <Route path="/teachkidreg">
            <TabPanel value={value} index={0}>
              <RegisterTab/>
            </TabPanel>  
          </Route>
          <Route path="/kidcomp">
            <TabPanel value={value} index={1}>
              <KidMenu/>
            </TabPanel>  
          </Route>
          <Route path="/teachers">
            <TabPanel value={value} index={2}>
              <TeacherComponent/>
            </TabPanel>  
          </Route>
          <Route path="/food">
            <TabPanel value={value} index={3}>
               <Foodlist/>
            </TabPanel>  
          </Route>
        </Switch>
    </div>
   </Router> 
  );
}

export default App;


