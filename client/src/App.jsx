import { Main } from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../components/chat/Home";
import ChatPage from "../components/chat/ChatPage";

export default function App() {
  return (
    <>
      <Main />
    </>
    // <BrowserRouter>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<Home socket={socket} />}></Route>

    //       <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}
