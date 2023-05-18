import React, { useEffect } from "react";
import { Grid, Button, IconButton, TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import { newListNameState, showAddListState, listsState } from "../recoil/atom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuid } from "uuid";
import { StyledColumn } from "./StyledComponents";
import { FaBlackTie } from "react-icons/fa";
import style from "./AddList.module.css";

const AddList = () => {
  const [newListName, setNewListName] = useRecoilState(newListNameState);
  const [showAddList, setShowAddList] = useRecoilState(showAddListState);
  const [lists, setLists] = useRecoilState(listsState);

  const storedList = JSON.parse(localStorage.getItem("Lists"));
  useEffect(() => {
    if (storedList) {
      setLists(storedList);
    }
  }, []);
  const handleAddList = () => {
    if (newListName) {
      const newList = {
        id: uuid(), 
        name: newListName,
        tasks: [],
      };
      localStorage.setItem("Lists", JSON.stringify([...lists, newList]));
      setLists((prevLists) => [...prevLists, newList]);
      setNewListName("");
      setShowAddList(false);
    }
  };

  return (
    <Grid container spacing={4} className="main">
      {showAddList ? (
        <Grid item xs={12}>
          <StyledColumn>
            <div>
              <TextField
                label="List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                variant="filled"
                size="small"
              />
            </div>
            <Button 
                 
              startIcon={<AddIcon />}
              onClick={handleAddList}
            >
              Add List
            </Button>
            <IconButton size="small" onClick={() => setShowAddList(false)}>
              <CloseIcon />
            </IconButton>
          </StyledColumn>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <StyledColumn>
            <div className="add-list-button">
              <Button
                 id={style.Btn} 
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowAddList(true)}
              >
                Add a list
              </Button>
            </div>
          </StyledColumn>
        </Grid>
      )}
    </Grid>
  );
};
export default AddList;
