import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lecture from "./components/lecture";
import { v4 as uuidv4 } from "uuid";

function App() {
  if (!localStorage.getItem("clientId")) {
    localStorage.setItem("clientId", uuidv4());
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lectureId" element={<Lecture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
