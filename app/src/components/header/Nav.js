import React from "react";
import {Link, NavLink} from "react-router-dom";

const Nav = () => {
  return (
    <nav className="main-nav">
      <NavLink
        to="/"
        // activeClassName="active"
        // style={({isActive}) => {
        //   return {
        //     display: "block",
        //     margin: "1rem 0",
        //     color: isActive ? "red" : "",
        //   };
        // }}
      >
        schedules
      </NavLink>
      <NavLink to="/schedules-archived">Schedules archived</NavLink>
    </nav>
  );
};

export default Nav;
