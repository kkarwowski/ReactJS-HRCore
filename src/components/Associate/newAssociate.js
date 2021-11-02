import { useContext, useState } from 'react';
import { associatesContext, officesContext } from '../../utils/context/contexts';
import { Container, FormControl, MenuItem, TextField, Grid, Box, Card, Typography, Divider} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



const NewAssociate = () => {
    const {allOffices} = useContext(officesContext)
    const { associates, setAssciates} = useContext(associatesContext)
    const [newAssociate, setNewAssocaite] = useState()
    
    const onUpdate = (event) => {
        console.log("name ",event.target.name," value ",event.target.value)
        setNewAssocaite({
          ...newAssociate,[event.target.name]:event.target.value
        })
      }
    const handleSave =()=> {
        uploadToFirebase()
    }
    const uploadToFirebase = () => {

    }

    return (
        <Container>
        <h1>lala</h1>
        <Card>
        <FormControl>
                  {/* <form onSubmit={e =>onSubmit(e)}> */}
                  <Typography variant="inherit" sx={{ p: 2, pb: 1 }}>Basic Information</Typography>

                <Grid
                sx={{ p: 1, pb: 2 }}
                    container
                    columnSpacing={2}
                    rowSpacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                        {/* <Grid item >
                        {edited && <Button variant="contained" type="submit">Save</Button>}
                        </Grid> */}

                        <Grid item  xs={2} xm={2}>
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="FirstName"
                          label="First Name"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="LastName"
                          label="Last Name"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="Title"
                          label="Title"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="Department"
                          label="Department"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="PhoneNumber"
                          label="Phone Number"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="smal"
                          name="WorkEmail"
                          label="Work Email"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="PrivateEmail"
                          label="Private Email"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        <Grid item >
                          <TextField
                          required
                          style ={{width: '100%'}}
                          size="small"
                          name="City"
                          label="City"
                          defaultValue={""}
                          onChange={e => onUpdate(e)}/>
                        </Grid>
                        {allOffices &&
                        <Grid item >
                          <TextField
                            value={""}
                            onChange={(e) => onUpdate(e)}
                            select // tell TextField to render select
                            required
                            name="Office"
                            label="Office">
                              {allOffices.map((office, index) => (
                                <MenuItem key={index} value={`${office}`}>
                                  {office}
                                </MenuItem>
                              ))}
                            </TextField>
                          
                          </Grid>
                          }
                        <Grid item >
                          <TextField
                          required
                            value={""}
                            size="5"
                            onChange={(e) => onUpdate(e)}
                            select // tell TextField to render select
                            name="EmplStatus"
                            label="Employment Status">
                              <MenuItem key={1} value="Employed">
                                Employed
                              </MenuItem>
                              <MenuItem key={2} value="Terminated">
                                Terminated
                              </MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item >
                          <TextField
                            value={""}
                            onChange={(e) => onUpdate(e)}
                            select // tell TextField to render select
                            name="Gender"
                            label="Gender">
                              <MenuItem key={1} value="Male">
                                Male
                              </MenuItem>
                              <MenuItem key={2} value="Female">
                                Female
                              </MenuItem>
                            </TextField>
                          </Grid>
                        <Grid item >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Start Date"
                            name="StartDate"
                            defaultValue={null}
                            format="DD-MM-YYYY"
                            onChange={e => onUpdate(e)}
                            // onChange={(newValue) => {
                            //   setValue(newValue);
                            // }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={top100Films}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Manager" />}
                        />
                        </Grid>
                        </Grid>
                           
        <Box sx={{ pt: 3, pb: 1 }} dir="ltr">
          <Divider variant="middle"  sx={{ pb:0}} />
              <Typography variant="inherit" sx={{ p: 2, pb: 1 }}  >Emergency Information</Typography>
                    <Grid
                      sx={{ p: 1, pb: 5, pt:2 }}
                      container
                      columnSpacing={2}
                      rowSpacing={2}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start">
                      <Grid item  xs={2} xm={2}>
                      <TextField
                      style ={{width: '100%'}}
                      size="small"
                      name="FirstName"
                      label="First Name"
                      defaultValue={""}
                      onChange={e => onUpdate(e)}/>
                    </Grid>
                    <Grid item >
                      <TextField
                      style ={{width: '100%'}}
                      size="small"
                      name="LastName"
                      label="Last Name"
                      defaultValue={""}
                      onChange={e => onUpdate(e)}/>
                    </Grid>
                    <Grid item >
                      <TextField
                      style ={{width: '100%'}}
                      size="small"
                      name="Relationship"
                      label="Relationship"
                      defaultValue={""}
                      onChange={e => onUpdate(e)}/>
                    </Grid>
                    <Grid item >
                      <TextField
                      style ={{width: '100%'}}
                      size="small"
                      name="TelephoneNumber"
                      label="Telephone Nummber"
                      defaultValue={""}
                      onChange={e => onUpdate(e)}/>
                    </Grid>
                  </Grid>              
        </Box>
        </FormControl> 
        </Card>
        </Container>
    )
}

export default NewAssociate