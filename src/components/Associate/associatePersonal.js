import { FormControl, InputLabel,Input,FormHelperText, TextFiel, Select, MenuItem, TextField} from '@mui/material';
import { Divider, Button, Grid, Item, Card, CardHeader, CardContent, Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { associateContext, associatesContext } from '../../utils/userContext';
import { useContext } from 'react';
import useFetch from '../../utils/useFetch';
const PersonalInfo= (props) => {
  const {associateData, setAssociateData} = useContext(associateContext)
  const {associatesData, setAssociatesData} = useContext(associatesContext)
  const {data:allOffices} = useFetch('http://localhost:5000/offices')
  const onUpdate = (event) => {
    // 
    console.log("name ",event.target.id," value ",event.target.value)
    console.log("event",event)
    setAssociateData({
      ...associateData,[event.target.name]:event.target.value
    })
    console.log("new user", associateData)
  }

  const SaveDetails = async (id) => {
    const res = await fetch(`http://localhost:5000/associates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(associateData)
    })
    
    console.log(res.status)
    // return res.status
}
const onSubmit = (event) => {
  event.preventDefault()
  SaveDetails(associateData.id)
  // setAssociatesData({...associatesData[associateData.id],associateData})
    console.log(associatesData)
}

{console.log("all",allOffices)}


return(

<Box sx={{ p: 1, pb: 1 }} dir="ltr">
              <FormControl>
                <form onSubmit={e =>onSubmit(e)}>
              <Grid
              sx={{ p: 1, pb: 5, pt:2 }}
                  container
                  columnSpacing={2}
                  rowSpacing={2}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start">
                      <Grid item >
                      <Button variant="contained" type="submit">Save</Button>
                      </Grid>

                      <Grid item  xs={2} xm={2}>
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="FirstName"
                        label="First Name"
                        defaultValue={associateData.FirstName}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="LastName"
                        label="Last Name"
                        defaultValue={associateData.LastName}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="Title"
                        label="Title"
                        defaultValue={associateData.Title}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="Department"
                        label="Department"
                        defaultValue={associateData.Department}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="PhoneNumber"
                        label="Phone Number"
                        defaultValue={associateData.PhoneNumber}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="smal"
                        name="WorkEmail"
                        label="Work Email"
                        defaultValue={associateData.WorkEmail}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="PrivateEmail"
                        label="Private Email"
                        defaultValue={associateData.PrivateEmail}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="City"
                        label="City"
                        defaultValue={associateData.City}
                        onChange={e => onUpdate(e)}/>
                      </Grid>
                      {allOffices &&
                      <Grid item >
                        <TextField
                          value={associateData.Office}
                          onChange={(e) => onUpdate(e)}
                          select // tell TextField to render select
                          name="Office"
                          label="Office">
                            {allOffices.map((office, index) => (
                              <MenuItem key={index} value={`${office.name}`}>
                                {office.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        
                        </Grid>
                        }
                      <Grid item >
                        <TextField
                          value={associateData.EmplStatus}
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
                          value={associateData.Gender}
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
                          defaultValue={associateData.StartDate}
                          format="DD-MM-YYYY"
                          onChange={e => onUpdate(e)}
                          // onChange={(newValue) => {
                          //   setValue(newValue);
                          // }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      </Grid>
                      
                      {/* <Grid item xs={3}> */}
                      <br></br>
              </Grid>
              <Divider variant="middle"  sx={{ pb: 5 }} />
              sdfsdf
              <Grid
              sx={{ p: 1, pt: 5 }}
                  container
                  columnSpacing={2}
                  rowSpacing={2}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start">
              
                    <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="Department"
                        label="Ddfg"
                        defaultValue={"sdf"}/>
                    </Grid>
                    <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="Department"
                        label="Ddfg"
                        defaultValue={"sdf"}/>
                    </Grid>
                    <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="Department"
                        label="Ddfg"
                        defaultValue={"sdf"}/>
                    </Grid>
                    <Grid item >
                        <TextField
                        style ={{width: '100%'}}
                        size="small"
                        name="Department"
                        label="Ddfg"
                        defaultValue={"sdf"}/>
                    </Grid>

                </Grid>
                </form>
             </FormControl> 
            </Box>
)
}

export default PersonalInfo


