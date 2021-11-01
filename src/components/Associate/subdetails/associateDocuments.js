import { filter } from 'lodash';
import { useState, useContext, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Item, Card, CardHeader } from '@mui/material';
import Label from '../../Label'
import { TableRow,TableBody,TableCell,Container,Typography,TableContainer, Table, Checkbox,TablePagination, Snackbar, Alert, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getStorage, ref, listAll, getMetadata, getDownloadURL, uploadBytes, deleteObject, uploadBytesResumable } from "firebase/storage";
import { associateContext, loadingContext } from '../../../utils/context/contexts';
import UserListToolbar from './UserListToolbar';
import UserListHead from './UserListHead'
import CircularProgress from '@mui/material/CircularProgress';
import { Icon } from '@iconify/react';
import filePdfBox from '@iconify/icons-mdi/file-pdf-box';
import fileExcelBox from '@iconify/icons-mdi/file-excel-box';
import fileWordBox from '@iconify/icons-mdi/file-word-box';
import imageIcon from '@iconify/icons-mdi/image';
import { HorizontalRule } from '@mui/icons-material';


const TABLE_HEAD = [
  // { id: '' },
  { id: 'fileName', label: 'Name', alignRight: false },  //name
  { id: 'size', label: 'Size', alignRight: false }, //company
  { id: 'type', label: 'Type', alignRight: false }, //company
  { id: 'uploadDate', label: 'Upload Date', alignRight: false }, //role
  { id: '' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const AssociateDocuments = () => {

  const {associateData} = useContext(associateContext)
  const prettyBytes = require ('pretty-bytes');
  const [fileList, setFileList] = useState([])
  const storage = getStorage();
  const listRef = ref(storage, `documents/${associateData.id}`);
  const [alert, setAlert] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {loadingProgress, setLoadingProgress} = useContext(loadingContext)
  const iconSize = {width:30, height:30}

  const onDeleteFiles = () => {
    selected.forEach((filename) => {
      console.log("deleting file =", filename)
      setFileList( fileList.filter(file => file.fileName !== filename) )
      deleteFileFromFirebase(filename)
    })
    setDeleteSuccess(true)
    setSelected([])
  }

  const deleteFileFromFirebase = (fileName) => {
    const deleteRef = ref(storage, `documents/${associateData.id}/${fileName}`);
    deleteObject(deleteRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }
  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
     const uploadName = event.target.files[0].name
        if (fileList.length > 0)
            {
            if (fileList.some(e => e.fileName === uploadName)) {
              setAlert(true)
            }
            else{
              uploadFile(event.target.files[0], uploadName)
            }
        }
      else{
        uploadFile(event.target.files[0], uploadName)
      }
    }
  };

  // const uploadFile = (file, uploadName) => {
  //   const storageRef = ref(listRef, `${uploadName}`);
  //   uploadBytes(storageRef, file).then((snapshot) => {
  //     GetMetadata(storageRef)
  //     }
  //   );
  //   setUploadSuccess(true)
  //   console.log("uploadFile", uploadName)
  //  }
   const uploadFile = (file, uploadName) => {
    const storageRef = ref(listRef, `${uploadName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingProgress(progress)
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoadingProgress(null)
            console.log('File available at', downloadURL);
            GetMetadata(uploadTask.snapshot.ref)
            setUploadSuccess(true)

          });
        }
    );
    
   }

  const DownloadFile = (fileName) => {
    
    getDownloadURL(ref(storage, `documents/${associateData.id}/${fileName}`))
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    })
    .catch((error) => {
      // Handle any errors
    });
    }

    useEffect(() => {
      const getAssociates = async () => {
        ListFiles()
      }
      getAssociates()
    }, [])

    const GetMetadata = (theRef) => {
      getMetadata(theRef)
          .then((metadata) => {
              setFileList(fileList => [... fileList, {"fileName": metadata.name, "size":  prettyBytes(metadata.size), "uploadDate": metadata.timeCreated, "fullPath": metadata.fullPath, "type": metadata.contentType  }])
          })
    }

  const ListFiles = () => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          GetMetadata(itemRef)
        });
      }).catch((error) => {
       console.log("err", error)
      }
      );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = fileList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectFile= (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log("selected", name)
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    console.log(newSelected)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fileList.length) : 0;

  const filteredUsers = applySortFilter(fileList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

    return (
      <Box>
        <Typography variant="inherit">Documents</Typography>
        <Divider variant="middle"  sx={{ pb: 2}} />

        <Snackbar open={alert} autoHideDuration={5000} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <Alert variant="filled"  severity="error" onClose={() => setAlert(false)}  sx={{ width: '100%', mt:7 }}>
            File of this name detected. Please rename your file and upload again!
          </Alert>
        </Snackbar>
        <Snackbar open={uploadSuccess} autoHideDuration={2000} onClose={ () => setUploadSuccess(false)}  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <Alert variant="filled" severity="success" sx={{ width: '100%', mt:7 }}>
            File upload successful!
          </Alert>
        </Snackbar>
        <Snackbar open={deleteSuccess} autoHideDuration={2000} onClose={ () => setDeleteSuccess(false)}  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <Alert variant="filled" severity="success" sx={{ width: '100%', mt:7 }}>
            Successfully deleted file
          </Alert>
        </Snackbar>
        {fileList && 
        <Container>

          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            upload={uploadFile}
            onSelectFile={onSelectFile}
            onDeleteFiles={onDeleteFiles}
          />

          {/* <Scrollbar> */}
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={fileList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { fullPath, fileName, size, type, uploadDate } = row;
                      const isItemSelected = selected.indexOf(fileName) !== -1;
                      const formattedDate = new Date(uploadDate)
                      return (
                        <TableRow
                          hover
                          key={fileName}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleSelectFile(event, fileName)}
                            />
                          </TableCell>
                          <TableCell align="left">{fileName}</TableCell>
                          <TableCell align="left">{size}</TableCell>
                          <TableCell align="left">
                            {type == "application/pdf" ? (
                               <Icon icon={filePdfBox} width={iconSize.width} height={iconSize.height} />)
                               : type == "image/png" ||type == "image/jpeg"  ? (<Icon icon={imageIcon}  width={iconSize.width} height={iconSize.height} />) 
                               : type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (<Icon icon={fileExcelBox}  width={iconSize.width} height={iconSize.height} />) 
                               : type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (<Icon icon={fileWordBox} width={iconSize.width} height={iconSize.height} />) 
                               : type }
                            </TableCell>
                          <TableCell align="left">{formattedDate.toLocaleDateString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        {/* <SearchNotFound searchQuery={filterName} /> */}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={fileList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

      </Container>}
      </Box>
        )
    }
export default AssociateDocuments