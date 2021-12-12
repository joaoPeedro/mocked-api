import React from "react";
import {Link, NavLink} from "react-router-dom";

const Nav = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/">schedules</NavLink>
      <NavLink to="/schedules-archived">Schedules archived</NavLink>
    </nav>
  );
};

export default Nav;
