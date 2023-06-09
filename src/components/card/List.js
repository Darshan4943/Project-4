import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  addingTaskIndexState,
  newTaskNameState,
  listsState,
  cardDataState,
  listId,
  tasksIndex,
  newIndex,
  taskName,
  listName,
} from "./atom";
import { Typography, TextField, Button, IconButton, Popover } from "@mui/material";

import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./list.module.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = ({ list, listIndex }) => {
  const [addingTaskIndex, setAddingTaskIndex] = useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);
  const navigate = useNavigate();
  const [, setCardData] = useRecoilState(cardDataState);
  const [, setNewIndex] = useRecoilState(newIndex);
  const [, setListsId] = useRecoilState(listId);
  const [, setTaskIndex] = useRecoilState(tasksIndex);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const cardData = useRecoilValue(cardDataState);
  const [, setTaskName] = useRecoilState(taskName);
  const [, setListName] = useRecoilState(listName);

  const handleAddTask = () => {
    setAddingTaskIndex(listIndex);
    setEditingTaskId(null);
    setNewTaskName("");
  };

  const handleConfirmTask = () => {
    if (newTaskName) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        const newTask = {
          id: editingTaskId || uuid(),
          name: newTaskName,
          description: "", 
          activity: [], 
          details:[]
        };
        if (editingTaskId) {
          const existingTaskIndex = updatedLists[addingTaskIndex].tasks.findIndex(
            (task) => task.id === editingTaskId
          );
          if (existingTaskIndex !== -1) {
            updatedLists[addingTaskIndex] = {
              ...updatedLists[addingTaskIndex],
              tasks: [
                ...updatedLists[addingTaskIndex].tasks.slice(0, existingTaskIndex),
                newTask,
                ...updatedLists[addingTaskIndex].tasks.slice(existingTaskIndex + 1),
              ],
            };
          }
        } else {
          updatedLists[addingTaskIndex] = {
            ...updatedLists[addingTaskIndex],
            tasks: [...updatedLists[addingTaskIndex].tasks, newTask],
          };
        }
        localStorage.setItem("Lists", JSON.stringify(updatedLists)); 
        return updatedLists;
      });
      setNewTaskName("");
      setAddingTaskIndex(null);
      setEditingTaskId(null);
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
      updatedLists[listIndex] = { ...updatedLists[listIndex], tasks: updatedTasks };
      localStorage.setItem("Lists", JSON.stringify(updatedLists)); 
      return updatedLists;
    });
  };

  useEffect(() => {
    if (listIndex === addingTaskIndex) {
      const newTaskInput = document.getElementById(`new-task-input-${listIndex}`);
      if (newTaskInput) {
        newTaskInput.focus();
      }
    }
  }, [listIndex, addingTaskIndex]);

  useEffect(() => {
    if (cardData.listId === list.id && cardData.taskIndex !== null) {
      navigate(`/activity/${cardData.taskIndex}`);
    }
  }, [cardData, list.id, navigate]);

  const handleTaskEdit = (taskId) => {
    setNewTaskName(lists[listIndex].tasks.find((task) => task.id === taskId).name);
    setEditingTaskId(taskId);
    setAddingTaskIndex(listIndex);
  };

  const handleTaskClick = (task, index) => {
    setCardData((prevData) => ({
      ...prevData,
      taskName: "Card Name",
    }));
    setNewIndex(index);
    setListsId(list.id);
    setTaskIndex(task.id);
    setTaskName(task.name);
    setListName(list.name);
    navigate(`/activity/${task.id}`);
  };

  return (
    <Draggable draggableId={String(list.id)} index={listIndex}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={list.id}
          className={styles.container}
        >
          <div className={styles.columnHeader}>
            <Typography className={styles.listName} variant="h6" gutterBottom>
              {list.name}
            </Typography>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <IconButton
                    size="small"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    {...bindTrigger(popupState)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <div className={styles.popover}>
                      <IconButton
                        size="small"
                        color="error"
                        aria-label="delete list"
                        onClick={() => handleListDelete(list.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
          <Droppable droppableId={String(list.id)}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={styles.taskList}>
                {list.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <div
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Typography
                          onClick={() => handleTaskClick(task, index)}
                          variant="body1"
                          gutterBottom
                        >
                          {task.name}
                        </Typography>
                        <div className={styles.taskButtons}>
                          <IconButton
                            size="small"
                            aria-label="edit task"
                            onClick={() => handleTaskEdit(task.id)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            aria-label="delete task"
                            onClick={() => handleCardDelete(task.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {listIndex === addingTaskIndex && (
                  <div className={styles.newTasks}>
                    <TextField className={styles.newTask}
                      id={`new-task-input-${listIndex}`}
                      label="New Task"
                      variant="outlined"
                      size="small"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleConfirmTask();
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      className={styles.btn}
                      onClick={handleConfirmTask}
                    >
                      Add Task
                    </Button>
                  </div>
                )}

                {listIndex !== addingTaskIndex && (
                  <div className={styles.addTaskButton}>
                    <Button variant="outlined" size="small" onClick={handleAddTask}>
                      + Add a task
                    </Button>
                  </div>
                )}

              </div>
            )}
          </Droppable>

        </div>
      )}
    </Draggable>
  );
};

export default List;
