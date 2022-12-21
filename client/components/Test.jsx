import React from "react";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import getUserInfo from "../src/reducers/getUserInfo";

const Test = (props) => {
  const getUserInfo = useSelector((state) => state.getUserInfo);

  const { userName, r, kilaza } = getUserInfo;

  return (
    // <div className="h-[94vh] w-[90vw] border-2 border-red-900 m-auto mt-[3vh] grid grid-cols-6 grid-rows-5 gap-4 overscroll-contain">
    //   <div className="col-start-1 col-span-3 row-start-2 row-span-3 bg-[#FF7C23] grid grid-cols-4 grid-rows-4 gap-2">
    //     Player1
    //   </div>
    //   <div className="col-start-3 col-span-2 row-start-1 row-span-2 bg-[#DF5A00] z-10">
    //     Timer
    //   </div>
    //   <div className="col-start-4 col-span-3 row-start-2 row-span-3 bg-[#FF7C23] z-1">
    //     Player2
    //   </div>
    //   <div className="col-start-3 col-span-2 row-start-4 grid place-items-center">
    //     <Button>Start Game</Button>
    //   </div>
    // </div>
    <div className="grid h-[100vh] w-[100wv] place-items-center">
      {userName} {r} {kilaza}
    </div>
  );
};

export default Test;
