import React from "react";
import { ref, getDatabase, update, onValue } from "firebase/database";
import { db } from "../../utils/firebase";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
export function CancelTask(status, TaskPath, userID, approverComments) {
  // delete ToApprove tasks from each approver
  // delete this task
}

export async function ActOnTask(task, requesterDetails) {
  console.log(requesterDetails, "approver details");
  const categoryToUse = task.TaskName.split(" ").slice(0, 1)[0];

  const associateRef = doc(db, "Associates", task.TargetValue);
  await updateDoc(associateRef, { categoryToUse: task.Value });
  const changesObject = {
    ChangedBy: requesterDetails.FirstName + " " + requesterDetails.LastName,
    Timestamp: Timestamp.fromDate(new Date()),
    Category: categoryToUse,
    Value: task.Value,
    AssociateID: task.TargetValue,
  };
  await addDoc(collection(db, "Changes"), changesObject);

  // delete To Approve
  //   const dbrt = getDatabase();
}

export function ApproveTask(
  status,
  task,
  requesterDetails,
  userID,
  approverComments
) {
  const dbrt = getDatabase();
  const ApproveRef = ref(dbrt, `Tasks/${task.TaskPath}/approvers/${userID}`);
  update(ApproveRef, {
    status: status,
    comment: approverComments ? approverComments : "",
    timestamp: Math.round(new Date().getTime() / 1000),
  }).then(() => {
    const ApproversRef = ref(dbrt, `Tasks/${task.TaskPath}/approvers`);
    onValue(
      ApproversRef,
      (snapshot) => {
        const approversObj = snapshot.val();
        Object.entries(approversObj).map(([key, value]) => {
          if (key != userID) {
            // both approved
            if ((value.status === "approved") & (status === "approved")) {
              const WholeTaskRef = ref(dbrt, `Tasks/${task.TaskPath}`);
              update(WholeTaskRef, {
                status: "approved",
              });
              ActOnTask(task, requesterDetails);
              // I approved he recjected
            } else if (
              (value.status === "approved") &
              (status === "recjected")
            ) {
              const WholeTaskRef = ref(dbrt, `Tasks/${task.TaskPath}`);
              update(WholeTaskRef, {
                status: "rejected",
              });
              // he recected I approved
            } else if (
              (value.status === "rejected") &
              (status === "approved")
            ) {
              const WholeTaskRef = ref(dbrt, `Tasks/${task.TaskPath}`);
              update(WholeTaskRef, {
                status: "rejected",
              });
              //Both recjected
            } else if (
              (value.status === "rejected") &
              (status === "rejected")
            ) {
              const WholeTaskRef = ref(dbrt, `Tasks/${task.TaskPath}`);
              update(WholeTaskRef, {
                status: "rejected",
              });
            }
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  });
}
