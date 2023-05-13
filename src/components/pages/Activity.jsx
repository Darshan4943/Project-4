import React, { useState } from "react";
import popup from "./PopUp.module.css";
// import { useRecoilState } from "recoil";
// import { toggleState } from "../../atom/Atom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import styles from "./Activity.module.css";

export default function PopUp() {
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    // Handle close dialog logic here
  };

  return (
    <>
      <div className={popup.mainDiv}>
        <div className={popup.title}>
          <h2 className={popup.head}>📻 CodeZinger</h2>
          <div>
            <IconButton
              aria-label="close dialog"
              onClick={handleCloseDialog}
              variant="plain"
              color="neutral"
              size="small"
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <span className={popup.para}>in list To Do</span>
        <div className={popup.des}>
          <MenuIcon sx={{ marginRight: "1rem" }} /> <h4>Description</h4>
          <VisibilityIcon sx={{ marginRight: "1rem" }} /> <h4>Watch</h4>
        </div>
        <input
          className={popup.firstInputBox}
          placeholder="Add a more detailed description..."
        />
        <div className={popup.des}>
          <ReceiptLongIcon sx={{ marginRight: "1rem" }} /> <h4>Activity</h4>
          <Avatar
            alt="User Avatar"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png" // Replace with the actual URL of the avatar picture
            sx={{ width: 64, height: 64, mb: 2 }}
          />
          <TextField
            id="activity-comment"
            label="Write a comment..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </div>
        <span className={popup.username}>MC</span>
        <input
          className={popup.secondInputBox}
          placeholder="Write a comment..."
        />
        <br /> <br />
        <span className={popup.username}>MC</span>
        <span className={popup.comments}>MC added this card to To Do</span>
        <p className={popup.commentsTime}>5 minutes ago</p>
      </div>
    </>
  );
}
