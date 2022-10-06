import Lottie from "lottie-react";
import flowline from "@/animation/flowline.json";
import { vh } from "@/utils";

const Flowline = () => {
  return (
    <Lottie
      animationData={flowline}
      style={{ height: vh(480), marginTop: vh(40), pointerEvents: "none" }}
    />
  );
};

export default Flowline;
