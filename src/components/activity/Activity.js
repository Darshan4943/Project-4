import React, { useEffect, useState } from "react";
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
import { useRecoilState } from "recoil";
import { destinationState, draggableState, listId, listName, listsState, newIndex, sourceState, taskName, tasksIndex } from "../card/atom";
import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

export default function Activity() {
  const [showDetails, setShowDetails] = useState(false);
  const [watching, setWatching] = useState(false);
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [newindex, setNewIndex] = useRecoilState(newIndex);
  const [listid, setListsId] = useRecoilState(listId);
  const [comments, setComments] = useState([]);
  const [taskIndex, setTaskIndex] = useRecoilState(tasksIndex);
  const navigate = useNavigate();
  const [List, setList] = useRecoilState(listsState);
  const [TaskName, setTaskName] = useRecoilState(taskName);
  const [ListName, setListName] = useRecoilState(listName);
  const commentTime = new Date(comments.time);
  const [dragId, setDragId] = useRecoilState(draggableState);
  const [sourceId, setSourceId] = useRecoilState(sourceState);
  const [destinationId, setDestinationId] = useRecoilState(destinationState);

  const [names,setNames] =useState("")
  useEffect(() => {
    List.map((item) => {
      if (item.id === sourceId) {
        setNames(item.name);
      }
    });
  }, [sourceId]);

  useEffect(() => {
    let newList = List.map((item) => {
      if (item.id === destinationId) {
        console.log(names)
        let newTasklist = item.tasks.map((obj) => {
          if (obj.id === dragId && names) {
            console.log(dragId)
            return { ...obj, details: [...obj.details, names] };
          } else {
            return obj;
          }
        });
        return { ...item, tasks: newTasklist };
      } else {
        return item;
      }
    });
    setList(newList);
    localStorage.setItem("Lists", JSON.stringify(newList));
  }, [names, sourceId, destinationId]);

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

  const handleActivityChange = (value) => {
    setActivity(value);
  };

  const handleShowDescription = () => {
    setShowDescription(true);
  };


  const addDescription = () => {
    const newList = List.map((item) => {
      if (item.id === listid) {
        const newTaskList = item.tasks.map((obj, index) => {
          if (index === newindex) {
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
    localStorage.setItem("Lists", JSON.stringify(newList));
    setDescription("");
    setShowDescription(false)
  };

  const addActivity = () => {
    const newActivity = { comment: activity, user: "Darshan", time: new Date()  };
    const newList = List.map((item) => {
      if (item.id === listid) {
        const newTaskList = item.tasks.map((obj, index) => {
          if (index === newindex) {
            const updatedActivity = obj.activity ? [newActivity, ...obj.activity] : [newActivity];
            return { ...obj, activity: updatedActivity };
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
    localStorage.setItem("Lists", JSON.stringify(newList));
    setActivity("");
    setShowActivity(false);
  };


  const handleCancelDescription = () => {
    setShowDescription(false);
    setDescription("");
  };

  const handleCancelActivity = () => {
    setShowActivity(false);
    setActivity("");
  };

  const handleShowActive = () => {
    setShowActivity(true);
  };


  const currentTask = List.find((item) => item.id === listid)?.tasks?.[newindex];
  const currentDescription = currentTask?.description;
  const currentActivity = currentTask?.activity;
  const currentDetails =currentTask?.details;
  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.title}>
          <h2 className={styles.head}>
            <span></span>💻 {TaskName}
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
        <p className={styles.p}>from {ListName} list</p>
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
          <div className={styles.editButton}>
            <Button  variant="contained" onClick={handleShowDescription}>
              Edit
            </Button>
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
          <>
            {currentDescription ? (
              <div className={styles.currentDescription} dangerouslySetInnerHTML={{ __html: currentDescription }} />
            ) : (
              <input
                className={styles.InputBox}
                placeholder="Write a Description..."
                onClick={handleShowDescription}
              />
            )}
          </>
        )}
  
        <div className={styles.des}>
          <ReceiptLongIcon sx={{ marginRight: "1rem" }} /> <h4>Activity</h4>
          <div className={styles.editButton1}>
            <Button variant="contained" onClick={handleToggleDetails}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </div>
        {showActivity ? (
          <div className={styles.activity}>
            <ReactQuill
              value={activity}
              onChange={handleActivityChange}
              placeholder="Write a Comment..."
            />
            <div className={styles.buttonContainer}>
              <Button onClick={addActivity}>Save</Button>
              <Button
                color="neutral"
                variant="soft"
                onClick={handleCancelActivity}
                sx={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.commentInputContainer}>
              <Avatar className={styles.avatar} />
              <input
                className={styles.secondInputBox}
                placeholder="Write a Comment..."
                onClick={handleShowActive}
              />
            </div>
            <div className={styles.commentsContainer}>
            {currentActivity &&
                currentActivity.map((comment, index) => (
                  <div className={styles.comment} key={index}>
                    <div className={styles.commentHeader}>
                      <Avatar className={styles.avatar} />
                      <span className={styles.userName}>{comment.user}</span>
                      <span className={styles.time}>
                        {formatDistanceToNow(new Date(comment.time), { addSuffix: true })}
                      </span>
                    </div>
                    <div className={styles.commentText} dangerouslySetInnerHTML={{ __html: comment.comment }} />
                  </div>
                ))}
              {showDetails && currentDetails && (
              <div>
              <h4 className={styles.h3}>Other Details</h4>
              {currentDetails.map((detail, index) => (
                <p className={styles.p1} key={index}>
                  <TrendingFlatIcon className={styles.icon} />
                  <strong>{TaskName}</strong> task moved from <strong>{detail}</strong> to <strong>{ListName}</strong>
                </p>
              ))}
            </div>
              )}
            </div>
          </>
        )}
      
      </div>
    </>
  );
  
}
