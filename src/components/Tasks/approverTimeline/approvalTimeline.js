import React from "react";
import "./approverElements.css";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar } from "@mui/material";
import moment from "moment";

const ApprovalTimeline = ({ task, getApproverDetails }) => {
  return (
    <>
      <div className="TimelineContainer">
        <ul className="TimelineBar">
          {task &&
            task.approvers.map((approver) => {
              const { approverID, status, timestamp, comment } = approver;
              const approverDetails = getApproverDetails(approverID);
              return (
                <li>
                  <i>
                    {status === "pending" ? (
                      <CircleIcon
                        fontSize="small"
                        sx={{ mt: 1, mb: 1 }}
                        color="warning"
                      />
                    ) : status === "rejected" ? (
                      <CancelIcon
                        color="error"
                        fontSize="small"
                        sx={{ mt: 1, mb: 1 }}
                      />
                    ) : (
                      <CheckCircleIcon
                        color="success"
                        fontSize="small"
                        sx={{ mt: 1, mb: 1 }}
                      />
                    )}
                  </i>
                  <div class="TimelineContent">
                    <div class="TimelineContentStatus">
                      {timestamp === "pending" ? (
                        <>
                          <div className="TimelineContentStatusText">
                            {timestamp}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="TimelineContentStatusDate">
                            {moment.unix(timestamp).format("D MMM")}
                          </div>

                          <div className="TimelineContentStatusTime">
                            {moment.unix(timestamp).format("H:mm")}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="TimelineContentAvatarContainer">
                      <div className="TimelineContentAvatar">
                        <Avatar
                          src={approverDetails.profilePicture}
                          sx={{ width: 40, height: 40 }}
                        />
                        <div className="TimelineContentAvatarDetails">
                          <div className="TimelineContentDetailsAvatarName">
                            {approverDetails.FirstName +
                              " " +
                              approverDetails.LastName}
                          </div>
                          <div className="TimelineContentDetailsAvatarTitle">
                            {approverDetails.Title}
                          </div>
                          {comment && (
                            <div className="TimelineContentAvatarComments">
                              {comment}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ApprovalTimeline;
