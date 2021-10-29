import React, { useContext } from "react";
import { useState} from "react";
import UserListHead from '../components/Associates/UserListHead';
import UserListToolbar from '../components/Associates/UserListToolbar';
import UserMoreMenu from '../components/Associates/UserMoreMenu';
import Label from '../components/Label';
import { Link } from "react-router-dom";
import { sentenceCase } from 'change-case';
import { Card,Table,Stack,Avatar,Button,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination, Box} from '@mui/material';
import {  associatesContext } from "../utils/context/contexts";
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

    const {associates:associatesData, setAssociates:setAssociatesData} = useContext(associatesContext)
    // const [associatesData, setAssociatesData] = useState()
    const [filterName, setFilterName] = useState('')
    const [selected, setSelected] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - associatesData.length) : 0;

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
console.log(associatesData)
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
                        />
                            <TableBody>
                                {associatesData.filter((associate) => {if (associate.FirstName.toLowerCase().includes(filterName.toLowerCase()) || (associate.LastName.toLowerCase().includes(filterName.toLowerCase()) ) )
                                {return {associate}}}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((filteredassociate, index) => {
                                    
                                    return ( 
                                       <TableRow
                                      key = {index}
                                      hover
                                        underline="none" component={Link } to={`/Associates/${filteredassociate.id}` } >
                                    
                                  <TableCell align="left"/>
                                  <TableCell component="th" scope="row" padding="none">
                                  <Stack direction="row" alignItems="center" spacing={0}>
                                              <Avatar src={filteredassociate.profilePicture} alt="Profile Pic"  sx={{ width: 40, height: 40 }} />                                         
                                              {/* <Avatar src={filteredassociate.FirstName} />                                          */}
                                          </Stack>
                                      </TableCell>
                                      <TableCell align="left" >
                                              <Typography variant="subtitle2" noWrap style={{ textDecoration: 'none' }}>
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