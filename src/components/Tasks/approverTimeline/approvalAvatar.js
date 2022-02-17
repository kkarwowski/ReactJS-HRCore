import "./approverElements.css";
import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
    <div className="TimelineContentAvatarContainer">
      <div className="TimelineContentAvatar">
        {profilePicture && (
          <Link
            to={`/dashboard/associates/${id}`}
            style={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Avatar
              src={profilePicture}
              sx={{ width: awidth, height: aheight }}
            />
          </Link>
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
