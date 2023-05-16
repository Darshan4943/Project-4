// import React, { useState } from 'react';
// import style from './NavbarTwo.module.css';
// import { AiOutlineStar } from 'react-icons/ai';

// function NavbarTwo() {
//   const [isStarred, setIsStarred] = useState(false);

//   const handleStarClick = () => {
//     setIsStarred(!isStarred);
//   };

//   return (
//     <div className={style.navbar}>
//       <div className={style.name}>
//         Home Management
//         <span className={`${style.icon} ${isStarred ? style.starred : ''}`} onClick={handleStarClick}>
//           <AiOutlineStar />
//         </span>
//       </div>
//       <div className={style.button}>
//         <img
//           className={style.userImage}
//           src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
//           alt="User"
//           width="50px"
//           height="50px"
//         />
//         <button className={style.share}>Share</button>
//       </div>
//     </div>
//   );
// }

// export default NavbarTwo;

import Reac,{useState,useRef} from "react";
import { styled } from "@mui/material/styles";
import {  AppBar,  Toolbar,  IconButton,  Typography,  TextField,  MenuItem,  Menu,} from "@mui/material";
import {  PersonOutlined,  StarBorderOutlined,  MoreVert,} from "@mui/icons-material";
import styles from "./NavbarTwo.module.css";

const StyledIconButton = styled(IconButton)`
  color: white;
`;

const StyledAppBar = styled(AppBar)`
  background-color: navyBlue;
  backdrop-filter: blur(10px);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInput = styled(TextField)`
  ${styles.titleInput}
`;

const NavbarTwo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] =useState("Todo Management");
  const inputRef = useRef();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNameClick = (name) => {
    console.log(name);
    handleClose();
  };

  const handleTitleClick = () => {
    setEditTitle(true);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleKeyPress = (event) => {
    if (event.key === "Enter") {
      setEditTitle(false);
      inputRef.current.blur();
    }
  };

  return (
    <StyledAppBar position="static" elevation={0}>
      <StyledToolbar>
        <StyledIconButton edge="start" color="inherit" aria-label="menu">
          <StarBorderOutlined />
        </StyledIconButton>
        {editTitle ? (
          <TitleInput
            inputRef={inputRef}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            autoFocus
          />
        ) : (
          <Typography variant="h6" onClick={handleTitleClick}>
            {title}
          </Typography>
        )}
        <StyledIconButton color="inherit" onClick={handleProfileClick}>
          <PersonOutlined />
        </StyledIconButton>
        <StyledIconButton color="inherit">
          <MoreVert />
        </StyledIconButton>
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
          <MenuItem onClick={() => handleNameClick(" Darshan Shinde")}>
            Darshan Shinde
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Naga Sai Lakshmi")}>
          Naga Sai Lakshmi
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Madhumita Chaudhuri")}>
            Madhumita Chaudhuri
          </MenuItem>
          <MenuItem onClick={() => handleNameClick("Himanshu Yadav")}>
            Himanshu Yadav
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavbarTwo;
