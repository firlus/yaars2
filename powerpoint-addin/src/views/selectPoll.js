import { useEffect, useState } from "react";
import Loading from "./loading";
import QueryString from "qs";
import axios from "axios";

export default function SelectPoll({ sendEvent }) {
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);

  const { jwt } = QueryString.parse(window.location.href.split("?")[1]);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_HOSTNAME}:5000/polls`, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => {
        setPolls(
          res.data.filter(
            (poll) => poll.lectureId !== localStorage.getItem("lectureId")
          )
        );
        setLoading(false);
      });
  }, []);

  function saveSelectedPoll(pollId) {
    localStorage.setItem("pollId", pollId);
    sendEvent("selectedPoll");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full">
            <div className="text-2xl text-center py-12">Select poll</div>
          </div>
          <hr className="border w-full" />
          {polls.map((poll) => (
            <>
              <div
                className="w-full py-4 text-lg text-center cursor-pointer"
                onClick={() => saveSelectedPoll(poll.id)}
              >
                {poll.question}
              </div>
              <hr className="border w-full" />
            </>
          ))}
        </>
      )}
    </>
  );
}
