import React from "react";
import { ref, getDatabase, update, onValue } from "firebase/database";

export function ApproveTask(status, TaskPath, userID, approverComments) {
  const dbrt = getDatabase();
  const ApproveRef = ref(dbrt, `Tasks/${TaskPath}/approvers/${userID}`);
  update(ApproveRef, {
    status: status,
    comment: approverComments ? approverComments : "",
    timestamp: Math.round(new Date().getTime() / 1000),
  }).then(() => {
    const ApproversRef = ref(dbrt, `Tasks/${TaskPath}/approvers`);
    onValue(
      ApproversRef,
      (snapshot) => {
        const approversObj = snapshot.val();
        Object.entries(approversObj).map(([key, value]) => {
          if (key != userID) {
            // both approved
            if ((value.status === "approved") & (status === "approved")) {
              const WholeTaskRef = ref(dbrt, `Tasks/${TaskPath}`);
              update(WholeTaskRef, {
                status: "approved",
              });
              // I approved he recjected
            } else if (
              (value.status === "approved") &
              (status === "recjected")
            ) {
              const WholeTaskRef = ref(dbrt, `Tasks/${TaskPath}`);
              update(WholeTaskRef, {
                status: "rejected",
              });
              // he recected I approved
            } else if (
              (value.status === "rejected") &
              (status === "approved")
            ) {
              const WholeTaskRef = ref(dbrt, `Tasks/${TaskPath}`);
              update(WholeTaskRef, {
                status: "rejected",
              });
              //Both recjected
            } else if (
              (value.status === "rejected") &
              (status === "rejected")
            ) {
              const WholeTaskRef = ref(dbrt, `Tasks/${TaskPath}`);
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
