import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { StyledColumn } from "./StyledComponents";
import { useRecoilState } from "recoil";
import {
  addingTaskIndexState,
  newTaskNameState,
  listsState,
  cardDataState,
  listId,
  tasksIndex,
} from "./atom";
import { Typography, TextField, Button, IconButton, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./List.module.css";

const List = ({ list, listIndex }) => {
  const [addingTaskIndex, setAddingTaskIndex] = useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);
  const navigate = useNavigate();
  const [, setCardData] = useRecoilState(cardDataState);
  const [, setListsId] = useRecoilState(listId);
  const [, setTaskIndex] = useRecoilState(tasksIndex);

  const handleAddTask = () => {
    setAddingTaskIndex(listIndex);
  };

  const handleConfirmTask = () => {
    if (newTaskName) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        const newTask = {
          id: uuid(),
          name: newTaskName,
          description: "",
          activity: [],
        };
        updatedLists[addingTaskIndex] = {
          ...updatedLists[addingTaskIndex],
          tasks: [...updatedLists[addingTaskIndex].tasks, newTask],
        };
        return updatedLists;
      });
      setNewTaskName("");
      setAddingTaskIndex(null);
    }
  };

  const handleListDelete = (id) => {
    const filteredList = lists.filter((list) => list.id !== id);
    setLists(filteredList);
    localStorage.setItem("Lists", JSON.stringify(filteredList));
  };

  const handleCardDelete = (cardId) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const updatedTasks = updatedLists[listIndex].tasks.filter((task) => task.id !== cardId);
      updatedLists[listIndex] = {
        ...updatedLists[listIndex],
        tasks: updatedTasks,
      };
      return updatedLists;
    });
  };

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(lists));
  }, [lists]);

  const handleTaskClick = (task, response, taskId) => {
    setCardData((prevData) => ({
      ...prevData,
      taskName: "Card Name",
    }));
    setListsId(response);
    setTaskIndex(taskId);
    navigate(`/activity/${task.id}`);
  };

  return (
    <StyledColumn className={styles.list}>
      <div className={styles.container}>
        <Typography variant="h6" className={styles.title}>
          {list.name}
        </Typography>
        <div className={styles.actions}>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
              <IconButton {...bindTrigger(popupState)} className={styles.moreIconContainer}>
                <MoreHorizIcon />
              </IconButton>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  <Button onClick={() => handleListDelete(list.id)}>
                    <DeleteIcon />
                  </Button>
                </Typography>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
    <div>
      {list.tasks.map((task, taskIndex) => (
        <StyledColumn className={styles.task} key={taskIndex}>
          <div className={styles.taskName} onClick={() => handleTaskClick(task, list.id, taskIndex)}>
            {task.name}
          </div>
          <div className={styles.taskActions}>
            <div className={styles.moreIconContainer}>
              <PopupState variant="popover" popupId={`demo-popup-popover-${taskIndex}`}>
                {(popupState) => (
                  <div>
                    <IconButton {...bindTrigger(popupState)} className={styles.moreIconButton}>
                      <MoreHorizIcon className={styles.moreIcon} />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        <Button onClick={() => handleCardDelete(task.id)}>
                          <DeleteIcon />
                        </Button>
                      </Typography>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </div>
          </div>
        </StyledColumn>
      ))}
    </div>
    {addingTaskIndex === listIndex ? (
      <div className={styles.addTaskContainer}>
        <div>
          <TextField
            className={styles.addTaskInput}
            label="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            variant="filled"
            size="small"
            autoFocus
          />
        </div>
        <div>
          <Button className={styles.addTaskButton} variant="contained" startIcon={<AddIcon />} onClick={handleConfirmTask}>
            Add
          </Button>
        </div>
      </div>
    ) : (
      <IconButton className={styles.addTaskButton} size="small" onClick={handleAddTask}>
        <AddIcon /> Add a card
      </IconButton>
    )}
  </StyledColumn>
  );
};

export default List;  