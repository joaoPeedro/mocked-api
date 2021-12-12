import React from "react";
import {screen, render, cleanup, fireEvent} from "@testing-library/react";

import {jest} from "@jest/globals";

import {BrowserRouter} from "react-router-dom";
import {AppContext} from "../../../context/appContext";
import Schedules from "../Schedules";
import ScheduleLog from "../ScheduleLog";

document.scrollTo = jest.fn();

const mockedSetAppMainContext = jest.fn();

const MockSchedules = () => {
  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          appMainContext: {pageTitle: "page title"},
          setAppMainContext: mockedSetAppMainContext,
        }}
      >
        <Schedules />
      </AppContext.Provider>
    </BrowserRouter>
  );
};
const MockScheduleLog = () => {
  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          appMainContext: {pageTitle: "page title"},
          setAppMainContext: mockedSetAppMainContext,
        }}
      >
        <ScheduleLog scheduleId={"68153400"} />
      </AppContext.Provider>
    </BrowserRouter>
  );
};

// to mock API
const MockSchedulesData = {
  schedules: [
    {
      id: 68153400,
      name: "Random Schedule Name (0.1456904612718506)",
      description: "laboris cupidatat sed pariatur culpa",
      isRetired: false,
      tasksCount: 6,
      startPoint: "2021-09-06T04:58:18.192Z",
      endPoint: "2021-02-06T13:59:09.483Z",
      dayOfWeek: 2,
      dayOfMonth: 24,
      startDate: "2021-11-26T22:30:31.865Z",
      endDate: "2021-03-09T00:16:15.623Z",
      timePeriod: 23,
      intervalType: "Once",
    },
    {
      id: 41281323,
      name: "Random Schedule Name (0.28338540448547445)",
      description: "aliqua minim enim",
      isRetired: true,
      tasksCount: 5,
      startPoint: "2021-04-14T07:39:29.505Z",
      endPoint: "2021-07-04T20:15:50.145Z",
      dayOfWeek: 4,
      dayOfMonth: 14,
      startDate: "2021-03-13T10:39:32.424Z",
      endDate: "2021-03-10T17:50:10.925Z",
      timePeriod: 23,
      intervalType: "Year",
    },
    {
      id: 90586314,
      name: "Random Schedule Name (0.39851887080783555)",
      description: "adipisicing quis aliqua nostrud",
      isRetired: false,
      tasksCount: 4,
      startPoint: "2021-10-04T13:16:14.961Z",
      endPoint: "2021-05-28T20:18:11.382Z",
      dayOfWeek: 5,
      dayOfMonth: 29,
      startDate: "2021-08-28T11:51:54.362Z",
      endDate: "2021-03-18T03:02:40.250Z",
      timePeriod: 20,
      intervalType: "Year",
    },
  ],
  scheduleLogs: [
    {
      id: 23080883,
      startTime: "2021-07-01T17:22:51.898Z",
      endTime: "2021-10-29T02:22:58.034Z",
      status: "Completed",
      serverName: "voluptate non consequat do",
      scheduleId: 68153400,
    },

    {
      id: 42462899,
      startTime: "2021-09-23T11:57:15.741Z",
      endTime: "2021-10-15T09:55:01.832Z",
      status: "Exception",
      serverName: "do consequat incididunt",
      scheduleId: 68153400,
    },
    {
      id: 9231272,
      startTime: "2021-08-09T08:53:08.131Z",
      endTime: "2021-04-12T12:04:05.088Z",
      status: "Completed",
      serverName: "est nisi exercitation reprehenderit adipisicing",
      scheduleId: 68153400,
    },
    {
      id: 76144711,
      startTime: "2021-02-10T01:20:02.156Z",
      endTime: "2021-09-03T19:17:37.205Z",
      status: "Completed",
      serverName: "consectetur reprehenderit tempor aute esse",
      scheduleId: 68153400,
    },
    {
      id: 68897004,
      startTime: "2021-03-06T10:18:57.892Z",
      endTime: "2021-12-05T08:26:49.968Z",
      status: "Terminated",
      serverName: "magna quis cupidatat culpa laborum",
      scheduleId: 68153400,
    },
    {
      id: 94117572,
      startTime: "2021-07-29T12:30:29.896Z",
      endTime: "2021-05-24T07:37:10.549Z",
      status: "Exception",
      serverName: "elit id voluptate tempor",
      scheduleId: 68153400,
    },
    {
      id: 18329975,
      startTime: "2021-09-05T06:23:24.977Z",
      endTime: "2021-06-18T10:48:00.144Z",
      status: "Running",
      serverName: "esse irure commodo",
      scheduleId: 68153400,
    },
    {
      id: 22907283,
      startTime: "2021-10-03T23:36:22.760Z",
      endTime: "2021-11-05T18:46:51.997Z",
      status: "Terminated",
      serverName: "occaecat",
      scheduleId: 68153400,
    },
    {
      id: 89919285,
      startTime: "2021-03-09T15:18:20.873Z",
      endTime: "2021-06-07T18:38:47.207Z",
      status: "Pending",
      serverName: "fugiat magna exercitation ut",
      scheduleId: 68153400,
    },
  ],
};

const testMock = () =>
  jest.mock(
    "../../../customHooks/dataFetching.js",
    () => {
      const originalModule = jest.requireActual(
        "../../../customHooks/dataFetching.js"
      );
      return {
        __esModule: true,
        ...originalModule,
        useDataFetching: jest.fn(() => [
          {data: MockSchedulesData.schedules, dataState: "FULFILLED"},
          ({
            url = url,
            params = params,
            method = method,
            data = data,
            callback = callback,
          }) => {
            console.log({method, url, params, data, callback});
          },
        ]),
      };
    },
    {virtual: true}
  );

const dataFetching = require("../../../customHooks/dataFetching.js");

afterEach(() => {
  cleanup();
});

// to mock API
// return data schedules || scheduleLogs
const dataToReturn = (dataType) => {
  return [
    {data: MockSchedulesData[dataType], dataState: "FULFILLED"},
    () => {
      jest.fn();
    },
  ];
};

describe("Schedules", () => {
  test("should fetch and render the Schedules content", async () => {
    const spyDataFetching = jest.spyOn(dataFetching, "useDataFetching");
    spyDataFetching.mockImplementationOnce(() => {
      return dataToReturn("schedules");
    });

    render(<MockSchedules />);

    let ScheduleName = await screen.findByTestId(`schedule-name-${0}`);
    expect(ScheduleName.innerHTML.trim()).toEqual("Random Schedule Name");
    let ScheduleNote = await screen.findByTestId(`schedule-note-${0}`);
    expect(ScheduleNote.innerHTML.trim()).toEqual("(0.1456904612718506)");

    let Schedule;
    let ScheduleDescription;

    for (let i = 0; i < MockSchedulesData.schedules.length; i++) {
      Schedule = await screen.findByTestId(`schedule-${i}`);
      ScheduleDescription = await screen.findByTestId(
        `schedule-description-${i}`
      );
      expect(Schedule).toBeInTheDocument();
      expect(ScheduleDescription.innerHTML.trim()).toEqual(
        MockSchedulesData.schedules[i].description.trim()
      );
    }
  });

  test("should have the active class onClick", async () => {
    const spyDataFetching = jest.spyOn(dataFetching, "useDataFetching");
    spyDataFetching.mockImplementationOnce(() => {
      return dataToReturn("schedules");
    });

    render(<MockSchedules />);
    const ScheduleItem = await screen.findByTestId(`schedule-0`);
    spyDataFetching.mockImplementationOnce(() => {
      return dataToReturn("schedules");
    });
    fireEvent.click(ScheduleItem);
    expect(ScheduleItem).toHaveClass("active");
  });
});

describe("SchedulesLogs", () => {
  test("should fetch and render the SchedulesLog content", async () => {
    const spyDataFetching = jest.spyOn(dataFetching, "useDataFetching");
    spyDataFetching.mockImplementation(() => {
      return dataToReturn("scheduleLogs");
    });

    render(<MockScheduleLog />);

    let scheduleId = await screen.findByTestId(`schedule-id`);
    expect(scheduleId.innerHTML.trim()).toContain("68153400");

    let ScheduleLog;
    let ScheduleLogServerName;
    let ScheduleLogStatus;

    // screen.debug();

    for (let i = 0; i < MockSchedulesData.scheduleLogs.length; i++) {
      ScheduleLog = await screen.findByTestId(`schedule-log-${i}`);
      ScheduleLogServerName = await screen.findByTestId(
        `schedule-log-server-name-${i}`
      );
      ScheduleLogStatus = await screen.findByTestId(`schedule-log-status-${i}`);
      expect(ScheduleLog).toBeInTheDocument();

      expect(ScheduleLogServerName.innerHTML.trim()).toContain(
        MockSchedulesData.scheduleLogs[i].serverName.trim()
      );
      expect(ScheduleLogStatus.innerHTML.trim()).toContain(
        MockSchedulesData.scheduleLogs[i].status.trim()
      );
    }
  });
  // test("should order by status", async () => {
  // });
});

describe("Schedules & ScheduleLog integration", () => {
  test("should render the Schedules and when clicked on Schedule item should render scheduleLogs", async () => {
    const spyDataFetching = jest.spyOn(dataFetching, "useDataFetching");
    spyDataFetching.mockImplementationOnce(() => {
      return dataToReturn("schedules");
    });

    render(<MockSchedules />);
    const ScheduleItem = await screen.findByTestId(`schedule-0`);
    expect(ScheduleItem).toBeInTheDocument();

    spyDataFetching.mockImplementationOnce(() => {
      return dataToReturn("scheduleLogs");
    });

    fireEvent.click(ScheduleItem);

    const ScheduleLogItem = await screen.findByTestId(`schedule-log-0`);

    expect(ScheduleLogItem).toBeInTheDocument();
  });
});
