import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import emptyState from "./../assets/emptyState.png";
import waiting from "./../assets/waiting.png";

const INIT = 0;
const WAITING = 1;
const POLLING = 2;
const POLLED = 3;
const LOAD_RESULT = 4;
const RESULT = 5;

export default function Lecture(props) {
  const [state, setState] = useState(INIT);
  const [pollData, setPollData] = useState({});
  const lectureId = useParams().lectureId;

  useEffect(() => {
    const socket = io(`http://${process.env.REACT_APP_HOSTNAME}:5000`, {
      cors: {
        origin: `http://${process.env.REACT_APP_HOSTNAME}:5000`,
        credentials: true,
      },
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
    socket.on(parseInt(lectureId), (data) => {
      if (data.event === "start" && (state === WAITING || state === RESULT)) {
        axios
          .get(
            `http://${
              process.env.REACT_APP_HOSTNAME
            }:5000/participate/lecture/${lectureId}?clientId=${localStorage.getItem(
              "clientId"
            )}`
          )
          .then((res) => {
            if (res.data.isRunning) {
              setPollData(res.data);
              setState(POLLING);
            } else if (res.data.info === "POLLED") {
              setState(POLLED);
            } else {
              setState(WAITING);
            }
          });
      } else if (
        data.event === "stop" &&
        (state === POLLING || state == POLLED)
      ) {
        setState(LOAD_RESULT);
      }
    });
  }, [lectureId, state]);

  useEffect(() => {
    console.log(state);
    if (state === INIT) {
      axios
        .get(
          `http://${
            process.env.REACT_APP_HOSTNAME
          }:5000/participate/lecture/${lectureId}?clientId=${localStorage.getItem(
            "clientId"
          )}`
        )
        .then((res) => {
          if (res.data.isRunning) {
            setPollData(res.data);
            setState(POLLING);
          } else if (res.data.info === "POLLED") {
            setState(POLLED);
          } else {
            setState(WAITING);
          }
        });
    } else if (state == LOAD_RESULT) {
      console.log("load result");

      axios
        .get(
          `http://${process.env.REACT_APP_HOSTNAME}:5000/participate/poll/${pollData.id}`
        )
        .then(function (res) {
          console.log("result");
          setPollData(res.data);
          setState(RESULT);
        })
        .catch(function (error) {});
    }
  }, [state, lectureId]);

  function submitAnswer(answerOptionId) {
    axios
      .post(
        `http://${process.env.REACT_APP_HOSTNAME}:5000/participate/poll/${pollData.id}`,
        {
          clientId: localStorage.getItem("clientId"),
          answerOptionId: answerOptionId,
        }
      )
      .then(() => {
        setState(POLLED);
      });
  }

  function viewForState(state, pollData) {
    if (state === INIT || state === LOAD_RESULT) {
      return (
        <>
          <svg
            role="status"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </>
      );
    } else if (state === WAITING) {
      return (
        <>
          <div className="text-lg font-bold mb-12 text-gray-600 text-center">
            There is currently no open poll in this lecture.
          </div>
          <div className="w-72 mb-12">
            <img src={emptyState} alt="" />
          </div>
          <div className="w-96 text-center text-gray-600">
            As soon as your instructor opens a poll, the page will reload and
            you will be able to participate.
          </div>
        </>
      );
    } else if (state === POLLING) {
      return (
        <>
          <div className="text-2xl w-96 text-center mb-12">
            {pollData.question}
          </div>
          {pollData.answerOptions.map((answerOption) => (
            <div className="w-96">
              <button
                onClick={() => submitAnswer(answerOption.id)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 text-white text-lg mb-4 rounded-full"
              >
                {answerOption.text}
              </button>
            </div>
          ))}
        </>
      );
    } else if (state === POLLED) {
      return (
        <>
          <div className="text-lg font-bold mb-12 text-gray-600">
            Please wait until the poll is closed.
          </div>
          <div className="w-72 mb-12">
            <img src={waiting} alt="" />
          </div>
          <div className="w-96 text-center text-gray-600">
            You will see the results as soon as your instructor closes the poll.
          </div>
        </>
      );
    } else if (state === RESULT) {
      const data = pollData.answerOptions.map((answerOption) => ({
        name: answerOption.text,
        value: answerOption._count.answers,
      }));
      console.log(data);
      return (
        <>
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </>
      );
    }
  }

  return (
    <div className="flex flex-col bg-gray-50 w-full h-screen justify-center items-center">
      {viewForState(state, pollData)}
    </div>
  );
}
