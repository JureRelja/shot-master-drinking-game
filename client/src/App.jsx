import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  GamePage,
  Test,
  JoinGamePage,
} from "../components";
import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:4000");
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage socket={socket} />}></Route>
          <Route
            path="/join"
            element={<JoinGamePage socket={socket} />}
          ></Route>
          <Route path="/login" element={<LoginPage socket={socket} />}></Route>
          <Route path="/game" element={<GamePage socket={socket} />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
