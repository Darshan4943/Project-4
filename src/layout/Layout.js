import React from "react";
import style from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import NavbarTwo from "../navbar/NavbarTwo";


function Layout() {
  return (
    <div className={style.mainLayout}>
      <div className={style.image}>
        <Navbar/>
        <NavbarTwo/>
      </div>
    </div>
  );
}

export default Layout;
