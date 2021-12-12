import {useState, useEffect, useRef} from "react";
import axios from "axios";

/**
 * @param {string} method - axios method
 * @param {string} url - endpoint
 * @param {obj} params - request params
 * @param {obj} data - request data
 * @returns {data, dataState : "PENDING" || "FULFILLED" || "REJECTED", request}
 */

export const useDataFetching = ({
  method = "get",
  url = null,
  params = {},
  data = {},
  callback = null,
}) => {
  //to avoid errors if the component no longer exists
  const isCurrent = useRef(true);
  const [state, setState] = useState({data: null, dataState: "PENDING"});

  const request = ({method, url, params, data, callback}) => {
    if (!url) return;

    axios({method, url, params, data})
      .then((res) => {
        if (isCurrent.current) {
          // if callback doesn't exist
          // use Get method
          callback
            ? callback(res, setState)
            : setState({data: res.data, dataState: "FULFILLED"});
        }
      })
      .catch((err) => {
        if (isCurrent.current) {
          callback
            ? callback(res, setState)
            : setState({data: null, dataState: "REJECTED"});
          alert(err);
        }
      });
  };

  useEffect(() => {
    request({url, params, method, callback});
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  return [
    state,
    ({
      url = url,
      params = params,
      method = method,
      data = data,
      callback = callback,
    }) => {
      method === "get" &&
        setState(() => ({
          data: null,
          dataState: "PENDING",
        }));
      request({method, url, params, data, callback});
    },
  ];
};
