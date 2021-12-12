import axios from "axios";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../context/appContext";
import {useDataFetching} from "../../customHooks/dataFetching";
import ScheduleLog from "./ScheduleLog";
import "./_schedules.scss";

const Schedules = ({isRetired = false}) => {
  const {appMainContext, setAppMainContext} = useContext(AppContext);

  const [scheduleLogId, setScheduleLogId] = useState(null);

  // const url = `http://localhost:3000/schedules`;
  const url = `https://mocked-api-server.herokuapp.com/schedules`;
  const requestGetMethodConfig = {
    url,
    params: {
      isRetired: isRetired,
    },
  };

  const [schedules, setSchedules] = useDataFetching("");

  // to set WebApp page title
  const setAppTitle = (title) => {
    setAppMainContext((currentState) => {
      return {...currentState, pageTitle: title};
    });
  };

  // to re-render component based on isRetired prop
  useEffect(() => {
    setAppTitle(isRetired ? "Schedules Archived" : "Schedules");
    setSchedules(requestGetMethodConfig);
    setScheduleLogId(null);
  }, [isRetired]);

  const displayLogs = (target, id) => {
    // to check if user clicked on retire/unRetire button
    if (target instanceof HTMLButtonElement) return;
    // set log to show
    setScheduleLogId(id);
  };

  // handler retired/unretire btn clicked
  // update schedule on API
  const handlerClick = (item) => {
    setSchedules({
      method: "PUT",
      url: `${url}/${item.id}`,
      data: {...item, isRetired: !item.isRetired},
      callback: (res, setState) => {
        if (res.status === 200) {
          alert(`Schedule ${isRetired ? "unretired" : "retired"}`);
          setSchedules(requestGetMethodConfig);
          setScheduleLogId(null);
        }
      },
    });
    setScheduleLogId(null);
  };

  return (
    <section className="schedules center-m ">
      <div className="schedules-list container-xs ">
        <div className="wrp">
          {schedules.dataState === "FULFILLED" ? (
            schedules.data.map((item, idx) => {
              // to rearrange the layout name
              let nameNumb = /[\(0.\d*\)(\))]/g;
              let name = item.name?.replace(nameNumb, "");
              nameNumb = item.name?.match(nameNumb).join("");

              return (
                <article
                  className={`schedule${
                    scheduleLogId === item.id ? " active" : ""
                  }`}
                  onClick={(e) => displayLogs(e.target, item.id)}
                  key={`schedule-${item.id}`}
                  data-testid={`schedule-${idx}`}
                >
                  <div className="wrp">
                    <div className="info">
                      <picture>
                        <img
                          loading="lazy"
                          src={`https://placebeard.it/140/140?${idx}`}
                          alt={item.name}
                          width="60"
                          height="60"
                        />
                      </picture>
                      <span>
                        <h3 data-testid={`schedule-name-${idx}`}>{name}</h3>
                        <p
                          className="note"
                          data-testid={`schedule-note-${idx}`}
                        >
                          {nameNumb}
                        </p>
                        {item.description && (
                          <div className="description margin-top">
                            <p data-testid={`schedule-description-${idx}`}>
                              {item.description}
                            </p>
                          </div>
                        )}
                      </span>
                    </div>
                    <ul className="hyperlinks alg-right">
                      <li>
                        <button
                          type="button"
                          onClick={() => handlerClick(item)}
                        >
                          {!isRetired ? "retire" : "unretire"}
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/*
                   * show log where if Mobile
                   */}
                  {appMainContext.isMobile && scheduleLogId === item.id && (
                    <ScheduleLog scheduleId={scheduleLogId} />
                  )}
                </article>
              );
            })
          ) : schedules.dataState === "PENDING" ? (
            <article className="loading-container bg-color-light">
              <div className="schedule" style={{minHeight: "160px"}}></div>
              <div className="schedule" style={{minHeight: "160px"}}></div>
              <div className="schedule" style={{minHeight: "160px"}}></div>
              <div className="schedule" style={{minHeight: "160px"}}></div>
              <div className="schedule" style={{minHeight: "160px"}}></div>
            </article>
          ) : (
            "ERROR"
          )}
        </div>
      </div>
      {/*
       * show log where if Desktop
       */}
      {!appMainContext.isMobile && scheduleLogId && (
        <ScheduleLog scheduleId={scheduleLogId} />
      )}
    </section>
  );
};

export default Schedules;
