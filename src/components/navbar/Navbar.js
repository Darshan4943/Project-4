// import React, { useState,useRef } from 'react';
// import style from './Navbar.module.css';
// import {FaTrello}  from 'react-icons/fa';
// import {AppBar,  Toolbar,  IconButton,  Typography,TextField,MenuItem,Menu } from '@mui/material';
// import { styled } from "@mui/material/styles";
//  import {  FiChevronDown } from 'react-icons/fi';
// import { AiOutlineStar } from 'react-icons/ai';
// import {Button} from '@mui/material';
//  import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
//  import { useNavigate } from 'react-router-dom';
//  import {  PersonOutlined,  StarBorderOutlined,  MoreVert,} from "@mui/icons-material";

//  const StyledIconButton = styled(IconButton)`
//   color: white;
// `;

// const StyledAppBar = styled(AppBar)`
//   background-color: navyBlue;
//   backdrop-filter: blur(10px);
// `;

// const StyledToolbar = styled(Toolbar)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const TitleInput = styled(TextField)`
//   ${style.titleInput}
// `;


// function Navbar() {
//   const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
//   const [showStarredMenu, setShowStarredMenu] = useState(false);
//   const [showRecentMenu, setShowRecentMenu] = useState(false);
//   const [isStarred, setIsStarred] = useState(false);
//   const [editTitle, setEditTitle] = useState(false);
//   const [title, setTitle] =useState("Todo Management");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const inputRef = useRef();
//   const open = Boolean(anchorEl);
//   const navigate = useNavigate()

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleStarClick = () => {
//     setIsStarred(!isStarred);
//   };

//   const toggleWorkspaceMenu = () => {
//     setShowWorkspaceMenu(!showWorkspaceMenu);
//   };

//   const toggleStarredMenu = () => {
//     setShowStarredMenu(!showStarredMenu);
//   };

//   const toggleRecentMenu = () => {
//     setShowRecentMenu(!showRecentMenu);
//   };

//   const handleNameClick = (name) => {
//     console.log(name);
//     handleClose();

//   };

//   const handleTitleClick = () => {
//     setEditTitle(true);
//   };

//   const handleTitleBlur = () => {
//     setEditTitle(false);
//   };

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   const handleTitleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       setEditTitle(false);
//       inputRef.current.blur();
//     }
//   };

//   return (
//     <div className={style.navbar}>
//       <div className={style.logoContainer}>
//         < FaTrello className={style.logo} /> 
//         <span className={style.logoText}>Trello</span>
//         <div className={style.name}>

//         {/* Home Management */}
//         <StyledAppBar position="static" elevation={0}/>
//       <StyledToolbar>
//         {/* <StyledIconButton edge="start" color="inherit" aria-label="menu">
//           <StarBorderOutlined />
//         </StyledIconButton> */}
//         {editTitle ? (
//           <TitleInput
            
//             inputRef={inputRef}
//             value={title}
//             onChange={handleTitleChange}
//             onBlur={handleTitleBlur}
//             onKeyPress={handleTitleKeyPress}
//             autoFocus
//           />
//         ) : (
//           <Typography  variant="h6" onClick={handleTitleClick}>
//             {title}
//           </Typography>
//         //   <StyledIconButton edge="start" color="inherit" aria-label="menu">
//         //   <StarBorderOutlined />
//         // </StyledIconButton>
//         )}
//          <StyledIconButton color="inherit" onClick={handleProfileClick}>
//           {/* <PersonOutlined /> */}
//           <img
//        className={style.userImage}

//       src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"

//            alt="User"

//            width="50px"

//            height="50px" 
//            />
//         </StyledIconButton>
//         <StyledIconButton color="inherit">
//           {/* <MoreVert /> */}
//         </StyledIconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={open}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={() => handleNameClick(" Darshan Shinde")}>
//             Darshan Shinde
//           </MenuItem>
//           <MenuItem onClick={() => handleNameClick("Naga Sai Lakshmi")}>
//           Naga Sai Lakshmi
//           </MenuItem>
//           <MenuItem onClick={() => handleNameClick("Madhumita Chaudhuri")}>
//             Madhumita Chaudhuri
//           </MenuItem>
//           <MenuItem onClick={() => handleNameClick("Himanshu Yadav")}>
//             Himanshu Yadav
//           </MenuItem>
//         </Menu>
//       </StyledToolbar>
//     <StyledAppBar/>

  
        
//          {/* <span className={`${style.icon} ${isStarred ? style.starred : ''}`} onClick={handleStarClick}>
//            <AiOutlineStar />

//         </span>       */}
//       </div>
//       </div>
      
//       {/* <div className={style.menuContainer}>
//         <div className={style.dropdown}>
//           <button className={`${style.menuButton} ${style.dropdownButton}`} onClick={toggleWorkspaceMenu}>
//             Workspaces <FiChevronDown className={style.arrowIcon} />
//           </button>
//           {showWorkspaceMenu && (
//             <div className={style.dropdownContent}>
//               <a href="#">Trello</a>
//               <a href="#">Trello</a>
//               <a href="#">Trello</a>
//             </div>
//           )}
//         </div>
//         <div className={style.dropdown}>
//           <button className={`${style.menuButton} ${style.dropdownButton}`} onClick={toggleStarredMenu}>
//             Starred <FiChevronDown className={style.arrowIcon} />
//           </button>
//           {showStarredMenu && (
//             <div className={style.dropdownContent}>
//               <a href="#">Trello</a>
//               <a href="#">Trello</a>
//               <a href="#">Trello</a>
//             </div>
//           )}
//         </div>
//         <div className={style.dropdown}>
//           <button className={`${style.menuButton} ${style.dropdownButton}`} onClick={toggleRecentMenu}>
//             Recent <FiChevronDown className={style.arrowIcon} />
//           </button>
//           {showRecentMenu && (
//             <div className={style.dropdownContent}>
//               <a href="#">Trello </a>
//               <a href="#">Trello </a>
//               <a href="#">Trello </a>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className={style.button}>
//       <Button 
//            //onClick={handleImage}
//            onClick={()=>{navigate('/template')}} 
//           variant='contained' 
//           id={style.whiteBtn} 
//           startIcon={<AddPhotoAlternateIcon />}> Change Background</Button>
//           </div> */}
//        {/* <img
//        className={style.userImage}

//       src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"

//            alt="User"

//            width="50px"

//            height="50px" 
//            />*/}

//            {/* <StyledIconButton color="inherit" onClick={handleProfileClick}>
//           <PersonOutlined />
//         </StyledIconButton>
//         <StyledIconButton color="inherit">
//           <MoreVert />
//         </StyledIconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={open}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={() => handleNameClick(" Darshan Shinde")}>
//             Darshan Shinde
//           </MenuItem>
//           <MenuItem onClick={() => handleNameClick("Naga Sai Lakshmi")}>
//           Naga Sai Lakshmi
//           </MenuItem>
//           <MenuItem onClick={() => handleNameClick("Madhumita Chaudhuri")}>
//             Madhumita Chaudhuri
//           </MenuItem>
//           <MenuItem onClick={() => handleNameClick("Himanshu Yadav")}>
//             Himanshu Yadav
//           </MenuItem>
//         </Menu>
//       <StyledToolbar>
//     <StyledAppBar/>

//    */}
        
//      </div>
  
//   );
// }

// export default Navbar; 


import React,{useState,useRef} from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import {  AppBar,  Toolbar,  IconButton,  Typography,  TextField,  MenuItem,  Menu,Button} from "@mui/material";
import {  PersonOutlined,  StarBorderOutlined,  MoreVert,} from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styles from "./Header.module.css";


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
  const navigate=useNavigate();
  
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
    
    <StyledAppBar    position="static" elevation={0}>
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
        <Button 
               //onClick={handleImage}
               onClick={()=>{navigate('/template')}} 
              variant='contained' 
              id={styles.whiteBtn} 
              startIcon={<AddPhotoAlternateIcon />}> Change Background</Button>
      </StyledToolbar>
    </StyledAppBar>
  
    // <div className={style.button}>
          
    //   </div>
  );
};

export default NavbarTwo;