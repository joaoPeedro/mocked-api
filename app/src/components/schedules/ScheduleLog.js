import React, {useEffect, useState} from "react";
import {useDataFetching} from "../../customHooks/dataFetching";

const ScheduleLog = ({scheduleId}) => {
  // const url = "http://localhost:3000/scheduleLogs";
  const url = `https://mocked-api-server.herokuapp.com/scheduleLogs`;
  const [scheduleLogs, setScheduleLogs] = useDataFetching("");
  const [logsToShow, setLogsToShow] = useState(null);
  const [orderLogs, setOrderLogs] = useState(null);

  // request all Schedule logs
  useEffect(() => {
    setOrderLogs(null);
    setScheduleLogs({
      url,
      params: {
        scheduleId: scheduleId,
      },
    });
  }, [scheduleId]);

  useEffect(() => {
    scheduleLogs.dataState === "FULFILLED"
      ? (setLogsToShow(scheduleLogs.data),
        setTimeout(() => {
          const HtmlTag = document.querySelector("HTML");
          HtmlTag.scrollTo({
            top:
              HtmlTag.scrollTop +
              document
                .querySelector(".schedule-logs")
                .parentElement.getBoundingClientRect().y,
            behavior: "smooth",
          });
        }, 200))
      : "";
  }, [scheduleLogs]);

  //to order logsToShow by input value
  const handlerChangeOrder = (target) => {
    if (target.checked) {
      let sortOrder = [...logsToShow];
      sortOrder.sort(function (a, b) {
        let x = a[target.value].toLowerCase();
        let y = b[target.value].toLowerCase();

        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      setOrderLogs(target.value);
      setLogsToShow(sortOrder);
    } else {
      setOrderLogs(null);
      setLogsToShow(scheduleLogs.data);
    }
  };

  return (
    <section className="schedule-logs">
      <div className="wrp">
        <div className="info">
          <p className="note txt-right" data-testid="schedule-id">
            schedule id : {scheduleId}
          </p>
          {logsToShow && (
            <p className="note txt-right margin-top">
              order by:
              <input
                type="checkbox"
                name="status"
                onClick={(e) => handlerChangeOrder(e.target)}
                checked={orderLogs === "status" ? true : false}
                value="status"
                readOnly
              />
              <label htmlFor="status"> status</label>
            </p>
          )}
        </div>
        <div className="list">
          {logsToShow &&
            logsToShow.map((item, idx) => {
              return (
                <article
                  className="log"
                  data-testid={`schedule-log-${idx}`}
                  key={`schedule-log-${item.id}`}
                >
                  <div className="wrp">
                    <div className="info">
                      <h4 data-testid={`schedule-log-server-name-${idx}`}>
                        {item.serverName}
                      </h4>
                      <h6 data-testid={`schedule-log-status-${idx}`}>
                        status : {item.status}
                      </h6>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ScheduleLog;
