import React, {useContext} from "react";
import {screen, render, cleanup, fireEvent} from "@testing-library/react";

import Header from "../Header";
import {BrowserRouter} from "react-router-dom";
import {AppContext} from "../../../context/appContext";

const MockHeader = () => {
  return (
    <BrowserRouter>
      <AppContext.Provider value={{appMainContext: {pageTitle: "page title"}}}>
        <Header />
      </AppContext.Provider>
    </BrowserRouter>
  );
};

describe("Header", () => {
  test("should render the page title", () => {
    render(<MockHeader />);
    const pageTitle = screen.getByRole("heading", {name: "page title"});
    // screen.debug();
    expect(pageTitle).toBeInTheDocument();
  });
});
