import "./approverElements.css";
import { Avatar } from "@mui/material";
import React from "react";

const ApprovalAvatar = ({
  profilePicture,
  FirstName,
  LastName,
  Title,
  comment,
}) => {
  return (
    <div className="TimelineContentAvatarContainer">
      <div className="TimelineContentAvatar">
        {profilePicture && (
          <Avatar src={profilePicture} sx={{ width: 40, height: 40 }} />
        )}
        <div className="TimelineContentAvatarDetails">
          <div className="TimelineContentDetailsAvatarName">
            {FirstName + " " + LastName}
          </div>
          {Title && (
            <div className="TimelineContentDetailsAvatarTitle">{Title}</div>
          )}
          {comment && (
            <div className="TimelineContentAvatarComments">{comment}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalAvatar;
