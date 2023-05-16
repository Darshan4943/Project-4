import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/joy/Button";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Activity.module.css";
import { useNavigate } from "react-router-dom";

import DescriptionEditor from "./DescriptionEditor";
import { useRecoilState } from "recoil";
import { listId, listsState, tasksIndex } from "../card/atom";

export default function Activity() {
  const [showDetails, setShowDetails] = useState(false);
  const [watching, setWatching] = useState(false);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showActivityDescription, setShowActivityDescription] = useState(false);

  const [listsid, setlistsId] = useRecoilState(listId);
  const [editingDescription, setEditingDescription] = useState(false);
  const [taskIndex, setTaskIndex] = useRecoilState(tasksIndex);
  const navigate = useNavigate();
  const [List, setList] = useRecoilState(listsState);
  const handleCloseDialog = () => {
    console.log("Dialog closed");
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleWatching = () => {
    setWatching(!watching);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleCommentChange = (value) => {
    setComment(value);
  };

  const handleShowDescription = () => {
    setShowDescription(true);
  };
  
  const handleShowActive = () => {
    setShowActivityDescription(true);
  };

  function addDescription() {
    const newList = List.map((item) => {
      if (item.id === listsid) {
        const newTaskList = item.tasks.map((obj, index) => {
          if (index === taskIndex) {
            return { ...obj, description: description };
          } else {
            return obj;
          }
        });
        return { ...item, tasks: newTaskList };
      } else {
        return item;
      }
    });
    setList(newList);
    console.log(description);
    localStorage.setItem("Lists", JSON.stringify(newList));
    setDescription("");
  }

  const handleCancelDescription = () => {
    setEditingDescription(false);
    setShowDescription(false);
    setDescription("");
  };

  const handleCancelActivityDescription = () => {
    setShowActivityDescription(false);
    setComment("");
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <h2 className={styles.head}>
            <span className={styles.codeZingerIcon}></span>💻 CodeZinger
          </h2>
          <div className={styles.closeButton}>
            <IconButton
              aria-label="close dialog"
              onClick={handleCloseDialog}
              variant="plain"
              color="neutral"
              size="small"
            >
              <CloseIcon onClick={() => navigate("/")} />
            </IconButton>
          </div>
        </div>
        <span className={styles.para}>in list To Do</span>
        <div className={styles.notificationWatchContainer}>
        <div className={styles.notification}>
          <span className={styles.notificationText}>Notifications</span>
        </div>
        <div className={styles.watchButton}>
          <Button variant="contained" onClick={handleToggleWatching}>
            <VisibilityIcon />
            {watching ? "Watching" : "Watch"}
          </Button>
        </div>
      </div>
      <div className={styles.des}>
        <MenuIcon sx={{ marginRight: "1rem" }} /> <h4>Description</h4>
        <div className={styles.watchButton1}>
           <Button variant="contained" onClick={handleShowDescription}>Edit</Button>
            
          </div>
      </div>
      {showDescription ? (
        <div className={styles.descriptionBox}>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add a more detailed description..."
          />
          <div className={styles.buttonContainer}>
            <Button onClick={addDescription}>Save</Button>
            <Button
              color="neutral"
              variant="soft"
              onClick={handleCancelDescription}
              sx={{ marginLeft: "0.5rem" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <input
          className={styles.firstInputBox}
          placeholder="Add a more detailed description..."
          onClick={handleShowDescription}
        />
      )}

      <div className={styles.des}>
        <ReceiptLongIcon sx={{ marginRight: "1rem" }} /> <h4>Activity</h4>
        <div className={styles.watchButton1}>
          <Button variant="contained" onClick={handleToggleDetails}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </div>
      <span className={styles.username}>MC</span>
      {showActivityDescription ? (
        <div className={styles.activity}>
          <ReactQuill
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a Comment..."
          />
          <div className={styles.buttonContainer}>
            <Button onClick={addDescription}>Save</Button>
            <Button
              color="neutral"
              variant="soft"
              onClick={handleCancelActivityDescription}
              sx={{ marginLeft: "0.5rem" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <input
          className={styles.secondInputBox}
          placeholder="Write a Comment..."
          onClick={handleShowActive}
        />
      )}

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

