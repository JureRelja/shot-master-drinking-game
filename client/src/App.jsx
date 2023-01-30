import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, GamePage, Test, GamePageTest } from "../components";
import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:4000");
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage socket={socket} />}></Route>
          <Route path="/game" element={<GamePage socket={socket} />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route
            path="/gametest"
            element={<GamePageTest socket={socket} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
