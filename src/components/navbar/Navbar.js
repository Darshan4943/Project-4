import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./Navbar.module.css";

const StyledIconButton = styled(IconButton)`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.616);
  backdrop-filter: blur(10px);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearButton = styled(Button)`
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("Todo Management");
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNameClick = (name) => {
    setTitle(name);
    handleClose();
  };


  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <StyledAppBar position="static" elevation={0}>
      <StyledToolbar>
        <StyledIconButton edge="start" color="inherit" aria-label="menu">
          <FaTrello className={styles.logo} />
          <div className={styles.logoText}>Trello</div>
        </StyledIconButton>

        <Typography variant="h6" className={styles.text}>
          {title}
        </Typography>

        <Button
          onClick={() => {
            navigate("/template");
          }}
          variant="contained"
          id={styles.whiteBtn}
          startIcon={<AddPhotoAlternateIcon />}
        >
          Change Background
        </Button>

        <StyledIconButton color="inherit" onClick={handleProfileClick}>
          <img
            className={styles.userImage}
            src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
            alt="User"
            width="50px"
            height="50px"
          />
        </StyledIconButton>

      
<button onClick={handleClear} className={styles.share}>
          Clear Board
        </button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleNameClick("Darshan Shinde")}>
            Darshan Shinde
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Himanshu Yadav")}>
            Himanshu Yadav
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Madhumita Chaudhuri")}>
            Madhumita Chaudhuri
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Naga Sai Lakshmi")}>
            Naga Sai Lakshmi
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;








