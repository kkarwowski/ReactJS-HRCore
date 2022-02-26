import "./approverElements.css";
import { Avatar } from "@mui/material";
import React from "react";

const ApprovalAvatar = ({
  profilePicture,
  FirstName,
  LastName,
  Title,
  comment,
  awidth = 40,
  aheight = 40,
  id,
}) => {
  return (
    <>
      <div className="TimelineContentAvatarContainer">
        <div className="TimelineContentAvatar">
          {profilePicture && (
            <Avatar
              src={profilePicture}
              sx={{ width: awidth, height: aheight }}
            />
          )}
          <div className="TimelineContentAvatarDetails">
            {FirstName && LastName && (
              <div className="TimelineContentDetailsAvatarName">
                {FirstName + " " + LastName}
              </div>
            )}
            {Title && (
              <div className="TimelineContentDetailsAvatarTitle">{Title}</div>
            )}
            {comment && (
              <div className="TimelineContentAvatarComments">{comment}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalAvatar;
