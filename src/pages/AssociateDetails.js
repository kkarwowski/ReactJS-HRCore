import AssociateHeader from "../components/Associate/associateHeader";
import { useEffect, useState, React, useContext } from "react";
import { useParams } from "react-router-dom";
import { transform, isEqual, isObject } from "lodash";
import { Timestamp } from "firebase/firestore";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Fab,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import {
  associateContext,
  editedContext,
  loadingContext,
  updatedAssociateContext,
  updateAssociatesContext,
} from "../utils/context/contexts";
import { db } from "../utils/firebase";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { useAuth } from "../utils/context/AuthContext";

const AssociateDetails = () => {
  const { userData } = useAuth();
  const history = useNavigate();

  const { loadingProgress, setLoadingProgress } = useContext(loadingContext);
  const { id } = useParams();
  const [associateData, setAssociateData] = useState();
  const [edited, setEdited] = useState(false);
  const [warn, setWarn] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [updatedAssociate, setUpdatedAssociate] = useState();
  const { updateAssociates, setUpdateAssociates } = useContext(
    updateAssociatesContext
  );
  useEffect(() => {
    const getAssociate = async () => {
      const associateFromServer = await fetchDetails();
      setAssociateData({ ...associateFromServer, id: id });
      setUpdatedAssociate({ ...associateFromServer, id: id });
    };

    getAssociate();
  }, []);

  const fetchDetails = async () => {
    const associateCollectionRef = doc(db, "Associates", id);
    setLoadingProgress(true);
    const data = await getDoc(associateCollectionRef);
    return data.data();
  };

  const handleClose = () => {
    setWarn(false);
  };
  const matchUpdatedAndCurrent = (obj1, obj2) => {
    return isEqual(obj1, obj2);
  };

  const GetDifferences = (object, base) => {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? GetDifferences(value, base[key])
            : value;
      }
    });
  };

  const RecordChanges = async (Data) => {
    for (const [key, value] of Object.entries(Data)) {
      const changesObject = {
        ChangedBy: userData.FirstName + " " + userData.LastName,
        Timestamp: Timestamp.fromDate(new Date()),
        Category: key,
        Value: value,
        AssociateID: updatedAssociate.id,
      };
      const docRef = await addDoc(collection(db, "Changes"), changesObject);
    }
  };

  const updateFirebaseAndState = async () => {
    // setIsUpdating(true);
    const Differences = GetDifferences(updatedAssociate, associateData);
    if (Differences) {
      if ("Salary" in Differences) {
        const picked = (({ Salary }) => ({ Salary }))(Differences);
        RecordChanges(picked);
      }
      if ("Title" in Differences) {
        const picked = (({ Title }) => ({ Title }))(Differences);
        RecordChanges(picked);
      }
      if ("Department" in Differences) {
        const picked = (({ Department }) => ({ Department }))(Differences);
        RecordChanges(picked);
      }
    }
    setDoc(doc(db, "Associates", `${associateData.id}`), updatedAssociate)
      .then(() => {
        setAssociateData(updatedAssociate);
        setEdited(false);
        setUpdateAssociates((updateAssociates) => updateAssociates + 1);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setAlert(true);
        setEdited(false);
      });
  };

  useEffect(() => {
    if (!matchUpdatedAndCurrent(updatedAssociate, associateData)) {
      setEdited(true);
    } else {
      setEdited(false);
    }
  }, [updatedAssociate]);

  const handleBack = () => {
    if (edited) {
      setWarn(true);
    } else {
      history("/dashboard/associates");
    }
  };
  return (
    <>
      <updatedAssociateContext.Provider
        value={{
          updatedAssociate,
          setUpdatedAssociate,
          matchUpdatedAndCurrent,
        }}
      >
        <associateContext.Provider value={{ associateData, setAssociateData }}>
          <editedContext.Provider value={{ edited, setEdited }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Grid item>
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
                    {errorMessage}
                  </Alert>
                </Snackbar>
              </Grid>
              <Grid item>
                {edited && (
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="medium"
                    onClick={() => updateFirebaseAndState()}
                  >
                    <SaveIcon />
                  </Fab>
                )}
              </Grid>
            </Grid>
            <Dialog
              open={warn}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"You have unsaved data!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please save your data or it will be lost.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Stay and Save</Button>
                <Button
                  onClick={() => history("/dashboard/associates")}
                  color="error"
                >
                  Cancel Changes
                </Button>
              </DialogActions>
            </Dialog>
            {associateData && <AssociateHeader handleBack={handleBack} />}
          </editedContext.Provider>
        </associateContext.Provider>
      </updatedAssociateContext.Provider>
    </>
  );
};

export default AssociateDetails;
