import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const Character = () => {
  const [toggle, set] = useState(false);
  const transitions = useTransition(toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 200,
    onRest: () => set(!toggle),
  });

  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        className="absolute"
        style={{
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
      >
        😄
      </animated.div>
    ) : (
      <animated.div
        className="absolute"
        style={{
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
      >
        🤪
      </animated.div>
    )
  );
};

export default Character;
