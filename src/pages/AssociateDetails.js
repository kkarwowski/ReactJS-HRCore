import AssociateHeader from "../components/Associate/associateHeader";
import { useEffect, useState, React, useContext } from "react";
import { useParams } from "react-router-dom";
import { transform, isEqual, isObject } from "lodash";
import { Timestamp } from "firebase/firestore";

import { Grid, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  associateContext,
  loadingContext,
  updatedAssociateContext,
  updateAssociatesContext,
} from "../utils/context/contexts";
import { db } from "../utils/firebase";
import { getDoc, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useAuth } from "../utils/context/AuthContext";
import Page from "../components/Page";
const AssociateDetails = () => {
  const { userData, isDemo } = useAuth();
  const history = useNavigate();

  const { setLoadingProgress } = useContext(loadingContext);
  const { id } = useParams();
  const [associateData, setAssociateData] = useState();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [severity, setSeverity] = useState();
  const [updatedAssociate, setUpdatedAssociate] = useState();
  const { setUpdateAssociates } = useContext(updateAssociatesContext);

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
      await addDoc(collection(db, "Changes"), changesObject);
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

    !isDemo &&
      setDoc(doc(db, "Associates", `${associateData.id}`), updatedAssociate)
        .then(() => {
          setUpdateAssociates((updateAssociates) => updateAssociates + 1);
        })
        .catch((error) => {
          setAlertMessage(error.message);
          setSeverity("error");
          setAlert(true);
          // setEdited(false);
        });

    setAssociateData(updatedAssociate);
    setSeverity("success");
    setAlertMessage("Successfully updated!");
    setAlert(true);
  };

  const handleBack = () => {
    history("/dashboard/associates");
  };
  const autoCloseSnack = () => {
    setAlert(false);
  };

  return (
    <>
      <updatedAssociateContext.Provider
        value={{
          updatedAssociate,
          setUpdatedAssociate,
        }}
      >
        <associateContext.Provider value={{ associateData, setAssociateData }}>
          <Page title="HR Core - Associate details">
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
                  autoHideDuration={4000}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  onClose={() => autoCloseSnack()}
                >
                  <Alert
                    variant="filled"
                    severity={`${severity}`}
                    sx={{ width: "100%", mt: 7 }}
                  >
                    {alertMessage}
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </Page>
          {associateData && (
            <AssociateHeader
              handleBack={handleBack}
              updateFirebaseAndState={updateFirebaseAndState}
            />
          )}
        </associateContext.Provider>
      </updatedAssociateContext.Provider>
    </>
  );
};

export default AssociateDetails;
