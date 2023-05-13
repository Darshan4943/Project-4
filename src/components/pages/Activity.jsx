import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/joy/Button";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./Activity.module.css";

export default function Activity() {
  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDialog = () => {
    console.log("Dialog closed");
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <h2 className={styles.head}>
            <span className={styles.codeZingerIcon}></span> CodeZinger
          </h2>
          <div className={styles.closeButton}>
            <IconButton
              aria-label="close dialog"
              onClick={handleCloseDialog}
              variant="plain"
              color="neutral"
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <span className={styles.para}>in list To Do</span>
        <div className={styles.notificationWatchContainer}>
          <div className={styles.notification}>
            <span className={styles.notificationText}>Notifications</span>
          </div>
          <div className={styles.watchButton}>
            <Button variant="contained">
              <VisibilityIcon />
              Watch
            </Button>
          </div>
        </div>
        <div className={styles.des}>
          <MenuIcon sx={{ marginRight: "1rem" }} /> <h4>Description</h4>
        </div>
        <input
          className={styles.firstInputBox}
          placeholder="Add a more detailed description..."
        />
        <div className={styles.des}>
          <ReceiptLongIcon sx={{ marginRight: "1rem" }} /> <h4>Activity</h4>
          <div className={styles.watchButton}>
            <Button variant="contained" onClick={handleToggleDetails}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </div>
        <span className={styles.username}>MC</span>
        <input
          className={styles.secondInputBox}
          placeholder="Write a comment..."
        />
        {showDetails && (
          <div className={styles.detailsContent}>
            <span className={styles.username}>MC</span>
            <span className={styles.comments}>MC added this card to To Do</span>
            <p className={styles.commentsTime}>5 minutes ago</p>
          </div>
        )}
        <br /> <br />
       
      </div>
    </>
  );
}
