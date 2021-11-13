import AssociateHeader from "../components/Associate/associateHeader";
import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { associateContext, editedContext } from "../utils/context/contexts";
import { db } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";

const AssociateDetails = () => {
  const { id } = useParams();
  const [associateData, setAssociateData] = useState();
  const history = useHistory();
  const [edited, setEdited] = useState(false);
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    const getAssociate = async () => {
      const associateFromServer = await fetchDetails();
      setAssociateData({ ...associateFromServer, id: id });
    };
    getAssociate();
  }, []);

  const fetchDetails = async () => {
    const associateCollectionRef = doc(db, "Associates", id);
    const data = await getDoc(associateCollectionRef);
    return data.data();
  };

  const handleBack = () => {
    if (edited) {
      setWarn(true);
    } else {
      history.push("/Associates");
    }
  };
  const handleClickOpen = () => {
    setWarn(true);
  };

  const handleClose = () => {
    setWarn(false);
  };
  return (
    <>
      <associateContext.Provider value={{ associateData, setAssociateData }}>
        <editedContext.Provider value={{ edited, setEdited }}>
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
              <Button onClick={() => history.push(`/Associates`)} color="error">
                Cancel Changes
              </Button>
            </DialogActions>
          </Dialog>
          {associateData && <AssociateHeader />}
        </editedContext.Provider>
      </associateContext.Provider>
    </>
  );
};

export default AssociateDetails;
