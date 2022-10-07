import Lottie from "lottie-react";
import visualizer from "@/animation/visualizer.json";
import { vh } from "@/utils";

const Flowline = () => {
  return (
    <Lottie
      animationData={visualizer}
      style={{ height: vh(437), marginTop: vh(60), pointerEvents: "none" }}
    />
  );
};

export default Flowline;
