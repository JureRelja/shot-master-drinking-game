import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import GamePage from "../components/GamePage";
import Test from "../components/Test";
import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:4000");
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage socket={socket} />}></Route>
          <Route path="/login" element={<LoginPage socket={socket} />}></Route>
          <Route path="/game" element={<GamePage socket={socket} />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
