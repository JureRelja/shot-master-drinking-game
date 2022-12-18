import { Main } from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
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
