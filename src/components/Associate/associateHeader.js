import { Grid, Card, CardContent, Box } from '@mui/material';
import { useState, useContext } from 'react';
import Label from '../Label';
import { sentenceCase } from 'change-case';
import { Typography, Link } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import { associateContext } from '../../utils/context/contexts';
import AssociateSubdetails from './subdetails/associateSubdetails';
import AssociateInfo from '../Associate/subdetails/associatePersonal';
import AssociatePic from './associatePicture';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AssociateHeader = (props) => {
    const [value, setValue] = useState(0);
    const {associateData, setAssociateData} = useContext(associateContext)
    const handleChangetoTab = (event, newValue) => {
      setValue(newValue);
    };

  const diffDates = require ('diff-dates')
  const Todayy = new Date();
  const otherDate = new Date(associateData.StartDate);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const dateDiffYears = diffDates(Todayy,otherDate, "years")
    return (
        <>
        <Grid container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          rowSpacing={2}
          columnSpacing={2} pt={5}>
          
          <Grid item xs={12} ms={12}>
                <Card> 
                  <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center">
                    <Grid Item sx={{pl:0}} >
                      {/* <UserPic status={props.EmplStatus} UserPicture={props.pictures.map((pic,i) => (pic.largePicture))}/> */}
                      {/* <AssociatePic status={associateData.EmplStatus} UserPicture={associateData.pictures.map((pic,i) => (pic.largePicture))}/> */}
                      <AssociatePic />
                    </Grid>
                    <Grid Item >
                    <CardContent>
                      <Grid container
                        direction="column"
                        columnSpacing={1}
                        justifyContent="space-between"
                        alignItems="flex-start">
                          <Grid Item>
                          <Grid container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start">
                                  <Grid Item>
                                    <Typography variant="h3">
                                      {associateData.FirstName} {associateData.LastName}
                                    </Typography>
                                   
                                  </Grid>
                                  <Grid item sx={{pl:1}} >
                                    <Label
                                      variant="ghost"
                                      color={(associateData.EmplStatus == 'Terminated' && 'error') || 'success'}>
                                      {sentenceCase(associateData.EmplStatus)}
                                    </Label>
                                  </Grid>
                            </Grid>
                                  <Typography variant="h6">
                                  {associateData.Title}
                                  </Typography>
                          <br/>
                          {associateData.Department} | {associateData.City}
                          </Grid>
                          <Grid Item sx={{pt:3}}>
                          <p>Started  {dateDiffYears} years ago </p>
                          </Grid>
                          {/* Icons */}
                          <Grid Item>
                                <Grid container direction="rows" alignContent="center" justifyItems="center" sx={{pt:3}}>
                                <Grid Item Item xs={6}>
                                  <Link target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${associateData.WorkEmail}`}>
                                      <img src="https://img.icons8.com/fluency/30/000000/microsoft-teams-2019.png" sx={{pr:2}}/>
                                    </Link>
                                  </Grid>
                                  <Grid Item xs={6}>
                                    <Link href={`mailto:${associateData.WorkEmail}`}>
                                      <EmailIcon fontSize="large"/>
                                    </Link>
                                  </Grid>
                                </Grid>
                              </Grid>
                          {/* Tab Menu*/}
                              <Grid Item>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', pt:3 }}>
                                  <Tabs value={value} onChange={handleChangetoTab} aria-label="basic tabs example">
                                    <Tab label="Personal" {...a11yProps(0)} />
                                    <Tab label="Emergency Info" {...a11yProps(1)} />
                                    <Tab label="Notes" {...a11yProps(2)} />
                                    <Tab label="Documents" {...a11yProps(3)} />
                                  </Tabs>
                                </Box>
                              </Grid>
                        </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                </Card>
          </Grid>
          {/* Tab Panels in seperate card*/}
          <Grid item xs={2}>
              <Card>
                {associateData&& <AssociateSubdetails ManagerID={associateData.Manager} UserID={associateData.id} Department={associateData.Department} />}
              </Card>
          </Grid>
          <Grid item xs={10}>
                <Card>
                  <TabPanel value={value} index={0}>
                    {/* <AssociateInfo/> */}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                  Documents
                  </TabPanel>
                </Card>
          </Grid>
          </Grid>
        </>
    )
}
export default AssociateHeader