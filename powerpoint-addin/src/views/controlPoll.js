import QueryString from "qs";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function ControlPoll({ sendEvent }) {
  const [isRunning, setRunning] = useState(false);
  const [pollData, setPollData] = useState(null);

  const { jwt } = QueryString.parse(window.location.href.split("?")[1]);

  function handleButton() {
    if (!isRunning) {
      const config = {
        method: "post",
        url: `http://${
          process.env.REACT_APP_HOSTNAME
        }:5000/present/${localStorage.getItem("pollId")}/start`,
        headers: {
          Authorization: jwt,
        },
      };

      axios(config).then(function () {
        setRunning(true);
      });
    } else {
      const config = {
        method: "post",
        url: `http://${
          process.env.REACT_APP_HOSTNAME
        }:5000/present/${localStorage.getItem("pollId")}/stop`,
        headers: {
          Authorization: jwt,
        },
      };

      axios(config).then(function () {
        setRunning(false);

        const config = {
          method: "get",
          url: `http://${
            process.env.REACT_APP_HOSTNAME
          }:5000/participate/poll/${localStorage.getItem("pollId")}`,
        };

        axios(config).then(function (res) {
          setPollData(res.data);
        });
      });
    }
  }
  const data = pollData
    ? pollData.answerOptions.map((answerOption) => ({
        name: answerOption.text,
        value: answerOption._count.answers,
      }))
    : null;
  console.log(data);

  return (
    <div class="w-full h-full flex flex-col justify-between">
      <div className="flex justify-center items-center h-full">
        {pollData ? (
          <div className="w-full h-full mr-8">
            <ResponsiveContainer width="95%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <QRCode
            value={`http://${
              process.env.REACT_APP_HOSTNAME
            }:3000/${localStorage.getItem("lectureId")}`}
          />
        )}
      </div>
      <button
        onClick={handleButton}
        className={`w-full py-2 text-white text-xl ${
          isRunning ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}
