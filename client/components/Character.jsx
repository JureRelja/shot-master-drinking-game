import React, { useState } from "react";
import { useEffect } from "react";
import { useTransition, animated } from "react-spring";
import odmara from "../assets/odmara.svg";
import pije from "../assets/pije.svg";

const Character = ({}) => {
  const [toggle, set] = useState(false);

  const transitions = useTransition(toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 200,
    onRest: () => set(!toggle),
  });

  // useEffect(() => {
  //   socket.on("onShoot", (ukupniBAC) => {
  //     console.log(ukupniBAC);
  //   });
  // }, []);

  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        className="absolute top-40 -z-10"
        style={{
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
      >
        <img src={odmara} alt="odmara" className="w-[250px]" />
      </animated.div>
    ) : (
      <animated.div
        className="absolute top-40 -z-10"
        style={{
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
      >
        <img src={pije} alt="pije" className="w-[250px]" />
      </animated.div>
    )
  );
};

export default Character;
