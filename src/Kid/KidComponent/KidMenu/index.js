import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Applicant from './Applicant';
import Registered from './Registered';
import Attending from './Attending';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
    marginTop: 30,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(kids) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Router>
        <Grid container>
          <Grid container item
            xs={2}
          >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Հաճախողներ"   {...a11yProps(0)} component={Link} to="/kidcomp/attending"/>
            <Tab label="Հեռթագրվածներ"   {...a11yProps(1)} component={Link} to="/kidcomp/registered"/>
            <Tab label="Դիմորդներ" {...a11yProps(2)} component={Link} to="/kidcomp/applicant"/>
          </Tabs>
          </Grid>
          <Grid container item
            xs={10}
          >
            <Switch>
              <Route exact path="/kidcomp/attending">
                <TabPanel value={value} index={0}>
                  <Attending/>
                </TabPanel>
              </Route>  
              <Route exact path="/kidcomp/registered">
              <TabPanel value={value} index={1}>
                  <Registered/>
                </TabPanel>
              </Route>  
              <Route exact path="/kidcomp/applicant">
                <TabPanel value={value} index={2}>
                  <Applicant
                  />
                </TabPanel>
              </Route>  
            </Switch>
          </Grid> 
        </Grid>  
      </Router>
    </div>
  );
}