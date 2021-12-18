import Page from "../components/Page";
import AddTask from "../components/Tasks/AddTask";
import { useEffect, useState, useContext } from "react";
import moment from "moment";

import {
  ref,
  on,
  set,
  push,
  onValue,
  onChildAdded,
  onChildChanged,
  get,
  child,
  getDatabase,
} from "firebase/database";
import { rtdb } from "../utils/firebase";
import { Button, Grid } from "@mui/material";
import GetTasks from "../utils/firebasertdb";
import { associatesContext, myDetailsContext } from "../utils/context/contexts";
import { useAuth } from "../utils/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import TaskCard from "../components/Tasks/TaskCard";
const MyTasks = () => {
  const { userData } = useAuth();
  const { associates } = useContext(associatesContext);
  const [myDetails, setMyDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [myManager, setMyManager] = useState();
  const [tasks, setTasks] = useState([]);
  const writeTasks = () => {
    // const dbref = rtdb.ref("Tasks");
    // dbref.on()

    push(ref(rtdb, "Tasks/3bOT8x1SBesW3l9jVQmV"), {
      name: "TitleUpdate",
      value: "",
      status: "done",
      uid: "vJ7SMEC1Qq6WXwrKlidy",
    });
  };

  useEffect(() => {
    const tasksRef = ref(rtdb, `Tasks/${userData.AssociateID}`);
    onChildChanged(tasksRef, (data) => setTasks(data.val()));
    const dbRef = ref(getDatabase());
    const all = [];
    const AssociatesCollectionRef = doc(db, "Associates", userData.AssociateID);
    getDoc(AssociatesCollectionRef).then((result) => {
      setUserDetails(result.data());
      const ManagerCollectionRef = doc(db, "Associates", result.data().Manager);

      getDoc(ManagerCollectionRef).then((results) =>
        setMyManager(results.data())
      );
    });

    get(child(dbRef, `Tasks/${userData.AssociateID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        for (let id in snapshot.val()) {
          // console.log(`${id}: ${snapshot.val()[id].name}`);
          all.push({
            id: id,
            targetValue: snapshot.val()[id].TargetValue,
            taskName: snapshot.val()[id].TaskName,
            status: snapshot.val()[id].status,
            requester: snapshot.val()[id].requester,
            requesterName: snapshot.val()[id].requesterName,
            hrPerson: snapshot.val()[id].hrPerson,
            manager: snapshot.val()[id].manager,
            managerName: snapshot.val()[id].managerName,
            value: snapshot.val()[id].Value,
            timestamp: snapshot.val()[id].timestamp,
          });
        }
        setTasks(all);
        // setTasks(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);
  // {
  //   userDetails &&
  //     setMyManager(
  //       associates.filter(
  //         (associate) => associate.Manager === userDetails.Manager
  //       )
  //     );
  // }
  console.log(tasks);
  const pendT = tasks.filter((tas) => tas.status === "pending");
  return (
    <myDetailsContext.Provider value={{ myDetails, setMyDetails }}>
      <Page title="HR Core - Tasks">
        <h1>My Tasks</h1>
        <Grid
          container
          direction="row"
          sx={{ p: 2 }}
          spacing={2}
          rowSpacing={2}
        >
          <Grid item xs={12} md={4} lg={4}>
            {userDetails && (
              <AddTask userDetails={userDetails} myManager={myManager} />
            )}
          </Grid>
          {
            (tasks ?? console.log(tasks),
            tasks.map((task) => {
              return (
                <Grid item xs={12} md={4} lg={4}>
                  <TaskCard task={task} />
                </Grid>
                // <>
                //   <h3>{task.TaskName}</h3>
                //   <h3>{task.requesterName}</h3>
                //   <h3>{task.value}</h3>
                //   <h3>{task.managerName}</h3>
                //   <h3>{task.status}</h3>
                //   <h3>{moment(task.timestamp).format("ddd, MMM YYYY")}</h3>
                //   <br></br>
                // </>
              );
            }))
          }
        </Grid>
        <Button onClick={writeTasks}>Write</Button>
        <div>{pendT.length}</div>
      </Page>
    </myDetailsContext.Provider>
  );
};
export default MyTasks;
