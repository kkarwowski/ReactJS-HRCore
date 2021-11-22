import AssociateHeader from "../components/Associate/associateHeader";
import { useEffect, useState, React, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Fab,
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
import { getDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { isEqual } from "lodash";

const AssociateDetails = () => {
  const { loadingProgress, setLoadingProgress } = useContext(loadingContext);
  const { id } = useParams();
  const [associateData, setAssociateData] = useState();
  const history = useNavigate();
  const [edited, setEdited] = useState(false);
  const [warn, setWarn] = useState(false);

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

  const handleBack = () => {
    if (edited) {
      setWarn(true);
    } else {
      history("/dashboard/associates");
    }
  };
  const handleClickOpen = () => {
    setWarn(true);
  };

  const handleClose = () => {
    setWarn(false);
  };
  const matchUpdatedAndCurrent = (obj1, obj2) => {
    return isEqual(obj1, obj2);
  };
  const updateFirebaseAndState = async () => {
    // setIsUpdating(true);
    const result = await updateDoc(
      doc(db, "Associates", `${associateData.id}`),
      updatedAssociate
    );
    setAssociateData(updatedAssociate);
    setEdited(false);
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
    // setIsUpdating(false);
  };

  useEffect(() => {
    if (!matchUpdatedAndCurrent(updatedAssociate, associateData)) {
      console.log("no match");
      setEdited(true);
    } else {
      console.log("match");
      setEdited(false);
    }
  }, [updatedAssociate]);
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
            <Button
              onClick={() =>
                console.log(
                  "updated",
                  updatedAssociate,
                  "associateData",
                  associateData
                )
              }
            >
              Log
            </Button>
            {edited && (
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => updateFirebaseAndState()}
              >
                <SaveIcon />
              </Fab>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={handleBack}
              size="medium"
            >
              Back
            </Button>
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
            {associateData && <AssociateHeader />}
          </editedContext.Provider>
        </associateContext.Provider>
      </updatedAssociateContext.Provider>
    </>
  );
};

export default AssociateDetails;
