import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
import "./App.css";
import ControlPoll from "./views/controlPoll";
import InvalidJWT from "./views/invalidJWT";
import Loading from "./views/loading";
import SelectLecture from "./views/selectLecture";
import SelectPoll from "./views/selectPoll";

const LOADING = 0;
const INVALID_JWT = 1;
const SELECT_LECTURE = 2;
const SELECT_POLL = 3;
const POLLING = 4;

function App() {
  const [state, setState] = useState(LOADING);

  const { jwt } = QueryString.parse(window.location.href.split("?")[1]);

  function sendEvent(event) {
    if (event === "selectedLecture" || event === "selectedPoll") {
      setState(LOADING);
    }
  }

  const views = [
    <Loading />,
    <InvalidJWT />,
    <SelectLecture sendEvent={sendEvent} />,
    <SelectPoll sendEvent={sendEvent} />,
    <ControlPoll sendEvent={sendEvent} />,
  ];

  useEffect(() => {
    if (state === LOADING) {
      if (!jwt) {
        setState(INVALID_JWT);
      } else {
        axios
          .post(`http://${process.env.REACT_APP_HOSTNAME}:5000/auth/verify`, {
            token: jwt,
          })
          .then(() => {
            if (!localStorage.getItem("lectureId")) {
              setState(SELECT_LECTURE);
            } else if (!localStorage.getItem("pollId")) {
              setState(SELECT_POLL);
            } else {
              setState(POLLING);
            }
          })
          .catch(() => {
            setState(INVALID_JWT);
          });
      }
    }
  }, [state]);

  const view = views[state];

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center border-4">
      {view}
    </div>
  );
}

export default App;
