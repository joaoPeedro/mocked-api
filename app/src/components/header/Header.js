import React, {useContext} from "react";
import {AppContext} from "../../context/appContext";
import Nav from "./Nav";
import "./_header.scss";

const Header = () => {
  const {appMainContext} = useContext(AppContext);

  return (
    <>
      <header className={"header-app"}>
        <div className="wrp container-xxl margin-auto">
          <div>
            <h1 data-testid={"id"} className="txt-color-light">
              {appMainContext.pageTitle}
            </h1>
          </div>
          <Nav />
        </div>
      </header>
    </>
  );
};

export default Header;
