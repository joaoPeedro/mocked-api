import React, {createContext, useEffect, useMemo, useState} from "react";

export const AppContext = createContext(null);

const checkIsMobile = () => {
  return window.innerWidth <= "960";
};

const AppContextProvider = (props) => {
  const [appMainContext, setAppMainContext] = useState({
    pageTitle: "",
    isMobile: checkIsMobile(),
  });

  // to check if App "isMobile" on window resize
  useEffect(() => {
    const listener = () => {
      checkIsMobile()
        ? setAppMainContext((currentState) => {
            return {...currentState, isMobile: true};
          })
        : setAppMainContext((currentState) => {
            return {...currentState, isMobile: false};
          });
    };

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  // to avoid unnecessary renders
  const providerValue = useMemo(
    () => ({appMainContext, setAppMainContext}),
    [appMainContext, setAppMainContext]
  );

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
