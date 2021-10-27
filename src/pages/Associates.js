import React, { useContext } from "react";
import { useState, useEffect } from "react";
//import User from "../User.js"
import Scrollbar from '../Scrollbar.js';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../_dashboard/user';
import Label from '../Label';
import { Link } from "react-router-dom";
import { sentenceCase } from 'change-case';
import { Card,Table,Stack,Avatar,Button,Checkbox,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination, Box} from '@mui/material';
import { associateContext, associatesContext } from "../utils/userContext.js";

  const TABLE_HEAD = [
    { id: '' , label: "    ", alignRight: false },
    { id: '' , label: "    ", alignRight: false },
    { id: 'firstname', label: 'First Name', alignRight: false },
    { id: 'lastname', label: 'Last Name', alignRight: false },
    { id: 'title', label: 'Title', alignRight: false },

    { id: 'department', label: 'Department', alignRight: false },
    { id: 'emplStatus', label: 'Status', alignRight: false },
    
    { id: '' }
  ];

    const Associates = () => {

    const {associatesData, setAssociatesData} = useContext(associatesContext)
    // const [associatesData, setAssociatesData] = useState()
    const [isLoading, setIsLoading] = useState()
    const [filterName, setFilterName] = useState('')
    const [selected, setSelected] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    console.log("cont", associatesData)
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - associatesData.length) : 0;
        
      // useEffect(() => { 
      //   const getUsers = async () => {
      //       const usersFromServer = await fetchDetails()
      //       setAssociatesData(usersFromServer)
      //   }
      //   getUsers();
      // },[])

      // const fetchDetails = async () => {
      //     const res = await fetch(`http://localhost:5000/associates/?_sort=id&_order=asc&_embed=pictures`)
      //     const data = await res.json()
      //     return data
      // }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };

    const handleFilterByName = (event) => {
            setFilterName(event.target.value);
            console.log(event.target.value)
            
        };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);

        };
        
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

        // Filtering Users by search field
        // const filteredassociates = 
        //     userData.filter( user => user.includes(setFilterName).map( user => {
        //         const {id, FirstName, LastName, Title, Department, profilePic} = user}))

     // Delete User
    //  const deleteUser = (id) => {
    //      console.log('delete',id)
    //      setUserData(userData.filter((user) => user.id !== id))
    //  }
return (
    <>
    <Box pt={5}>

    <Container maxWidth="sl" >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
            Associates
          </Typography>
          <Button
            variant="contained">
            {/* component={RouterLink}
             to="#"
             startIcon={<Icon icon={plusFill} /> */}
            New User
          </Button>
        </Stack>
        {associatesData &&
            <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}/>
                {/* <Scrollbar> */}
                <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                        <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={associatesData.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        //onSelectAllClick={handleSelectAllClick}
                        />
                            <TableBody>
                            {/* {userData.map((user) => (
                                <User key={user.id} user={user} 
                                onDelete={deleteUser}/>
                                ))
                            } */}
                            {/* {userData.filter((user) => {if (user.FirstName.toLowerCase().includes(filterName.toLowerCase()) || (user.LastName.toLowerCase().includes(filterName.toLowerCase()) ) )
                                {return user}}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((filteredassociate) => { */}
                                {associatesData.filter((associate) => {if (associate.FirstName.toLowerCase().includes(filterName.toLowerCase()) || (associate.LastName.toLowerCase().includes(filterName.toLowerCase()) ) )
                                {return {associate}}}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((filteredassociate, index) => {
                                    // const { id, FirstName, LastName, Title, Department, EmplStatus, pictures} = filteredassociate;
                                    
                                    return ( 
                                       <TableRow
                                      key = {index}
                                      hover
                                    //   onClick={()=>details(index)}
                                    component={Link} to={`/Associates/${filteredassociate.id}`}>
                                    
                                  <TableCell align="left"/>
                                  <TableCell component="th" scope="row" padding="none">
                                  <Stack direction="row" alignItems="center" spacing={0}>
                                              {/* <img src={`data:image/png;base64,${largePicture}`} alt="Profile Pic"  height="50" className="avatar-crop" /> */}                                                  
                                              <Avatar src={`data:image/jpg;base64,${filteredassociate.pictures.map((pic,i) => (pic.largePicture))}`} alt="Profile Pic"  sx={{ width: 40, height: 40 }} />                                         
                                          </Stack>
                                      </TableCell>
                                      <TableCell align="left">
                                              <Typography variant="subtitle2" noWrap>
                                                  {filteredassociate.FirstName}
                                              </Typography>
                                          </TableCell>
                                      <TableCell align="left">
                                      <Typography variant="subtitle2" noWrap>
                                                  {filteredassociate.LastName}
                                              </Typography>
                                      </TableCell>
                                      <TableCell align="left">{filteredassociate.Title}</TableCell>
                                      <TableCell align="left">{filteredassociate.Department}</TableCell>
                                      <TableCell align="left">
                                          <Label
                                          variant="ghost"
                                          color={(filteredassociate.EmplStatus === 'Terminated' && 'error') || 'success'}
                                          >
                                          {sentenceCase(filteredassociate.EmplStatus)}
                                          </Label>
                                      </TableCell>
                                      <TableCell align="right">
                                          <UserMoreMenu />
                                      </TableCell>
                                  </TableRow>
                                    )
                                })
                            }
                                
                                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                            </TableBody>
                            </Table>
                </TableContainer>
                {/* </Scrollbar> */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={associatesData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Card>
         }
        </Container>
        </Box>
</>
)
}

export default Associates