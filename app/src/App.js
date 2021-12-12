import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
import Schedules from "./components/schedules/Schedules";
import AppContextProvider from "./context/appContext";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Header />
        <section className={"container-xxl margin-auto margin-both-2"}>
          <Routes>
            <Route path="/" element={<Schedules isRetired={false} />}></Route>
            <Route
              path="/schedules-archived"
              element={<Schedules isRetired={true} />}
            ></Route>
            <Route path="*" element={<Schedules isRetired={false} />} />
          </Routes>
        </section>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
