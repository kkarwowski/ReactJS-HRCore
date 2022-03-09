import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { filter } from "lodash";
import {
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Table,
  Checkbox,
  TablePagination,
  Snackbar,
  Grid,
  Alert,
  Divider,
  Card,
  TextField,
  MenuItem,
  Button,
  Select,
} from "@mui/material";
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import DownloadIcon from "@mui/icons-material/Download";
import { loadingContext } from "../../../utils/context/contexts";
import UserListToolbar from "./UserListToolbar";
import UserListHead from "./UserListHead";
import { Icon } from "@iconify/react";
import filePdfBox from "@iconify/icons-mdi/file-pdf-box";
import fileExcelBox from "@iconify/icons-mdi/file-excel-box";
import fileWordBox from "@iconify/icons-mdi/file-word-box";
import imageIcon from "@iconify/icons-mdi/image";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Scrollbar from "../../Scrollbar";
import { useAuth } from "../../../utils/context/AuthContext";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
const TABLE_HEAD = [
  { id: "fileName", label: "Name", alignRight: false },
  { id: "size", label: "Size", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "uploadDate", label: "Upload Date", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "" },
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
  return order === "desc"
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
    return filter(
      array,
      (_user) =>
        _user.fileName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const AssociateDocuments = ({ userID }) => {
  const [isLoading, setLoading] = useState(false);
  const prettyBytes = require("pretty-bytes");
  const [fileList, setFileList] = useState([]);
  const storage = getStorage();
  const listRef = ref(storage, `documents/${userID}`);
  const [alert, setAlert] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { setLoadingProgress } = useContext(loadingContext);
  const [additionalMeta, setAdditionalMeta] = useState();
  const iconSize = { width: 30, height: 30 };
  const [PopupOpen, setPopupOpen] = useState(false);
  const { handleSubmit, reset, control } = useForm();
  const [file, setFile] = useState(null);
  const [uploadName, setUploadName] = useState();
  const [working, setWorking] = useState(false);
  const [allCategories, setAllCategories] = useState();
  const { isDemo } = useAuth();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fileList.length) : 0;

  const filteredUsers = applySortFilter(
    fileList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    height: "60vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 20,
    p: 4,
  };
  const onSubmit = (data) => uploadFile(data);

  const getAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "DocumentCategories"));
    const all = querySnapshot.docs.map((doc) => doc.data().Name);
    setAllCategories(all);
  };
  const onDeleteFiles = () => {
    selected.forEach((filename) => {
      setFileList(fileList.filter((file) => file.fileName !== filename));
      {
        !isDemo && deleteFileFromFirebase(filename);
      }
    });
    setDeleteSuccess(true);
    setSelected([]);
  };
  const handleClose = () => {
    setPopupOpen(false);
  };

  const deleteFileFromFirebase = async (fileName) => {
    const deleteRef = ref(storage, `documents/${userID}/${fileName}`);
    deleteObject(deleteRef)
      .then(() => {})
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    // Delete from Associate_Document_Metadata
    const q = query(
      collection(db, "Associate_Document_Metadata"),
      where("AssociateID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((Doc) => {
      if (Doc.data().FileName === fileName) {
        deleteDoc(doc(db, "Associate_Document_Metadata", Doc.id));
      }
    });
  };
  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadName = event.target.files[0].name;
      if (fileList.length > 0) {
        if (fileList.some((e) => e.fileName === uploadName)) {
          setAlert(true);
        } else {
          setPopupOpen(true);
          setFile(event.target.files[0]);
          setUploadName(uploadName);
        }
      } else {
        setPopupOpen(true);
        setFile(event.target.files[0]);
        setUploadName(uploadName);
      }
    }
  };

  const generateSelectOptions = () => {
    return allCategories
      .sort((a, b) => (a > b ? 1 : -1))
      .map((option) => {
        return (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        );
      });
  };

  const UploadDocumentMetadata = async (Meta) => {
    const dataToUpload = {
      AssociateID: userID,
      Category: Meta.Metadata,
      FileName: uploadName,
    };
    await addDoc(collection(db, "Associate_Document_Metadata"), dataToUpload);
    setPopupOpen(false);
    reset();
  };

  const uploadFile = (data) => {
    const storageRef = ref(listRef, `${uploadName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    UploadDocumentMetadata(data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingProgress(progress);
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoadingProgress(null);
          GetMetadata(uploadTask.snapshot.ref);
          GetDocMetadata(userID);
          setUploadSuccess(true);
          setFile(null);
        });
      }
    );
  };

  const DownloadFile = (fileName) => {
    getDownloadURL(ref(storage, `documents/${userID}/${fileName}`))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.open("GET", url, true);
        xhr.onload = (event) => {
          function saveBlob(blob, fileName) {
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName;
            a.dispatchEvent(new MouseEvent("click"));
          }
          const blob = xhr.response;
          saveBlob(blob, fileName);
        };
        xhr.send();
      })
      .catch((error) => {
        console.log("download error", error);
      });
  };

  useEffect(() => {
    setLoading(true);
    const getMeta = async () => {
      await GetDocMetadata(userID);
    };
    const getFiles = async () => {
      ListFiles();
    };
    const getCategories = async () => {
      await getAllCategories();
    };
    Promise.all([getMeta(), getFiles(), getCategories()]);
    setLoading(false);
  }, []);

  const GetDocMetadata = async (userID) => {
    const q = query(
      collection(db, "Associate_Document_Metadata"),
      where("AssociateID", "==", userID)
    );
    const querySnapshot = await getDocs(q);
    const all = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docID: doc.id,
    }));
    setAdditionalMeta(all);
  };

  const GetMetadata = (theRef) => {
    getMetadata(theRef).then((metadata) => {
      setFileList((fileList) => [
        ...fileList,
        {
          fileName: metadata.name,
          size: prettyBytes(metadata.size),
          uploadDate: metadata.timeCreated,
          fullPath: metadata.fullPath,
          type: metadata.contentType,
        },
      ]);
    });
  };

  const ListFiles = () => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          GetMetadata(itemRef);
        });
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const handleSelectFile = (event, name) => {
    const selectedIndex = selected.indexOf(name);
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

  const updateDocCategory = async (e, docID) => {
    setWorking(true);
    const documentRef = doc(db, "Associate_Document_Metadata", docID);
    await updateDoc(documentRef, {
      Category: e.target.value,
    });
    setWorking(false);
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={PopupOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={PopupOpen}>
          <Box sx={style}>
            <form>
              <Grid
                container
                direction="column"
                alignContent="center"
                alignItems="center"
                rowSpacing={3}
              >
                <Grid item>
                  <Typography>
                    Please select category of uploaded file:
                  </Typography>
                </Grid>

                <Grid item>
                  <Controller
                    name={"Metadata"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={onChange}
                        value={value}
                        size="small"
                        sx={{ minWidth: 300 }}
                      >
                        {generateSelectOptions()}
                      </Select>
                    )}
                  />
                </Grid>

                <Grid item>
                  <Button onClick={handleSubmit(onSubmit)} variant="contained">
                    Submit
                  </Button>
                </Grid>

                {/* <Button onClick={() => reset()} variant={"outlined"}> */}
                {/* Reset */}
                {/* </Button> */}
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Typography variant="overline">Documents</Typography>
      <Divider variant="middle" sx={{ pb: 2 }} />
      <Snackbar
        open={alert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setAlert(false)}
          sx={{ width: "100%", mt: 7 }}
        >
          File of this name already exists. Please rename your file and upload
          again!
        </Alert>
      </Snackbar>
      <Snackbar
        open={uploadSuccess}
        autoHideDuration={2000}
        onClose={() => setUploadSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%", mt: 7 }}
        >
          File upload successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={2000}
        onClose={() => setDeleteSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%", mt: 7 }}
        >
          Successfully deleted file
        </Alert>
      </Snackbar>

      <Container sx={{ pt: 2 }}>
        <Card sx={{ boxShadow: 0 }} variant="outlined">
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onSelectFile={onSelectFile}
            onDeleteFiles={onDeleteFiles}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, minHeight: 100 }}>
              {fileList && (
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const { fileName, size, type, uploadDate, category } =
                          row;
                        const isItemSelected =
                          selected.indexOf(fileName) !== -1;
                        const formattedDate = new Date(uploadDate);
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
                                onChange={(event) =>
                                  handleSelectFile(event, fileName)
                                }
                              />
                            </TableCell>
                            <TableCell align="left">{fileName}</TableCell>
                            <TableCell align="left">{size}</TableCell>
                            <TableCell align="left">
                              {type === "application/pdf" ? (
                                <Icon
                                  color="red"
                                  icon={filePdfBox}
                                  width={iconSize.width}
                                  height={iconSize.height}
                                />
                              ) : type === "image/png" ||
                                type === "image/jpeg" ? (
                                <Icon
                                  icon={imageIcon}
                                  width={iconSize.width}
                                  height={iconSize.height}
                                />
                              ) : type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                                <Icon
                                  icon={fileExcelBox}
                                  color="green"
                                  width={iconSize.width}
                                  height={iconSize.height}
                                />
                              ) : type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                <Icon
                                  color="#4782da"
                                  icon={fileWordBox}
                                  width={iconSize.width}
                                  height={iconSize.height}
                                />
                              ) : (
                                type
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {formattedDate.toLocaleDateString()}
                            </TableCell>
                            {additionalMeta &&
                              additionalMeta.map((meta) => {
                                const { Category, FileName, docID } = meta;

                                if (fileName === FileName) {
                                  return (
                                    <TableCell align="left">
                                      <TextField
                                        disabled={working}
                                        size="small"
                                        id={docID}
                                        fullWidth
                                        // style={{ minWidth: 150 }}
                                        defaultValue={Category}
                                        onChange={(e, id) =>
                                          updateDocCategory(e, docID)
                                        }
                                        select
                                      >
                                        {generateSelectOptions()}
                                      </TextField>
                                    </TableCell>
                                  );
                                }
                              })}
                            <TableCell align="left">
                              <IconButton
                                onClick={() => DownloadFile(fileName)}
                              >
                                <DownloadIcon color="primary" />
                              </IconButton>
                            </TableCell>
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
              )}
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={fileList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Box>
  );
};
export default AssociateDocuments;
