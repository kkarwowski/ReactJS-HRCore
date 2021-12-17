import Page from "../components/Page";
import AddTask from "../components/Tasks/AddTask";
import { useEffect, useState } from "react";
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
const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const writeTasks = () => {
    // const dbref = rtdb.ref("Tasks");
    // dbref.on()

    push(ref(rtdb, "Tasks/3bOT8x1SBesW3l9jVQmV"), {
      name: "TitleUpdate",
      value: "",
      status: "pending",
      uid: "vJ7SMEC1Qq6WXwrKlidy",
    });
  };

  useEffect(() => {
    // const tasksRef = ref(rtdb, "Tasks");
    // onChildChanged(tasksRef, (data) => setTasks(data.val()));
    const dbRef = ref(getDatabase());
    const all = [];
    get(child(dbRef, "Tasks")).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        for (let id in snapshot.val()) {
          // console.log(`${id}: ${snapshot.val()[id].name}`);
          all.push({
            id: id,
            name: snapshot.val()[id].name,
            status: snapshot.val()[id].status,
            uid: snapshot.val()[id].uid,
          });
        }
        setTasks(all);
        // setTasks(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);
  const pendT = tasks.filter((tas) => tas.status === "pending");
  return (
    <Page title="HR Core - Tasks">
      <h1>My Tasks</h1>
      <Grid container direction="row" sx={{ p: 2 }}>
        <Grid item xs={12} md={3} lg={3}>
          <AddTask />
        </Grid>
        <Grid item xs={12} md={3} lg={3}></Grid>
      </Grid>
      <Button onClick={writeTasks}>Write</Button>
      <div>{pendT.length}</div>
      {
        (pendT ?? console.log(tasks),
        pendT.map((task) => {
          return (
            <>
              <h3>{task.id}</h3>
              <h3>{task.uid}</h3>
              <h3>{task.name}</h3>
              <h3>{task.status}</h3>
              <br></br>
            </>
          );
        }))
      }
      {/* {tasks &&
        tasks.map((d) => {
          const { name, status, uid } = d;
          console.log("aa", d.uid);
          return <p>{d.uid}</p>;
        })} */}
    </Page>
  );
};
export default MyTasks;
