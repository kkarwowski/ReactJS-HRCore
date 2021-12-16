import { ref, on, set, push, onValue, onChildAdded } from "firebase/database";
import { rtdb } from "../utils/firebase";
import { useEffect, useState } from "react";

const GetTasks = () => {
  const tasks = [];
  useEffect(() => {
    const tasksRef = ref(rtdb, "Tasks");
    // onValue(tasksRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data.name);
    //   setTasks(data.name);)
    onChildAdded(tasksRef, (data) => {
      tasks.push(data.val());
      //   console.log("value", data.val());
    });
  });

  return tasks;
};

export default GetTasks;
