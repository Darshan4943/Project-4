import React from "react";
import style from "./Layout.module.css";
import Navbar from "../navbar/Navbar";

function Layout() {
  return (
    <div className={style.mainLayout}>
      <div className={style.image}>
        <Navbar/>
      </div>
    </div>
  );
}

export default Layout;
