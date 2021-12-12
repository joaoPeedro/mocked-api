# mocked-api

This is a simple reactApp to connect to a Node js api hosted in heroku.
This front-end application render schedules and the schedule log details.

## Tree Structure

```
└── app
     └── src
          ├── components
          │   ├── header
          │   └── schedules
          ├── context
          ├── customHooks
          └── styles
```

### Getting started

First clone this repository, and run the install command:

```
npm install
```

to start use the commands:

```
npm start
// or to test
npm run test:watch
```

## Main Components

### Schedules.js

this component render the schedules based on the route application - schedules / schedules archived

```
/**
 * @param {boolean} isRetired - to render component with schedules retired/unRetired
 * @returns schedules component and <ScheduleLog /> if one schedule is active/selected
 */
```

### SchedulesLog.js

this component render the log's detail of the schedule selected

```
/**
 * @param {string} scheduleId - id of schedule to render logs
 * @returns render logs component
 */
```

## context

### appContext.js

to define the main context of the application:

```
{
  pageTitle: "",
  isMobile: checkIsMobile(), // function that set if isMobile on windowResize
}
```

## customHooks

### dataFetching.js

to make requests to an API (uses Axios):

```
/**
 * @param {string} method - axios method
 * @param {string} url - endpoint
 * @param {obj} params - request params
 * @param {obj} data - request data
 * @returns {data, dataState : "PENDING" || "FULFILLED" || "REJECTED", request}
 */
```

## #TODO

- create the burger Menu
- add loading and disabled on retire button wen users click
- add animation to collapse (open/close) scheduleLog in mobile
- add test for order by:
- add test to put Method

## Application Demo

<a href="https://joaopeedro.github.io/mocked-api/">APP LINK</a>
