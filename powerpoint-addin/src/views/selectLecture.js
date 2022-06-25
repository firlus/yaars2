import { useEffect, useState } from "react";
import Loading from "./loading";
import QueryString from "qs";
import axios from "axios";

export default function SelectLecture({ sendEvent }) {
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);

  const { jwt } = QueryString.parse(window.location.href.split("?")[1]);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_HOSTNAME}:5000/lectures`, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => {
        setLectures(res.data);
        setLoading(false);
      });
  }, []);

  function saveSelectedLecture(lectureId) {
    localStorage.setItem("lectureId", lectureId);
    sendEvent("selectedLecture");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full">
            <div className="text-2xl text-center py-12">Select lecture</div>
          </div>
          <hr className="border w-full" />
          {lectures.map((lecture) => (
            <>
              <div
                className="w-full py-4 text-lg text-center cursor-pointer"
                onClick={() => saveSelectedLecture(lecture.id)}
              >
                {lecture.name}
              </div>
              <hr className="border w-full" />
            </>
          ))}
        </>
      )}
    </>
  );
}
