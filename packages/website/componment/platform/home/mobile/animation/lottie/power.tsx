import Lottie from "lottie-react";
import power from "@/animation/power.json";
import { vh } from "@/utils";

const Flowline = () => {
  return (
    <Lottie
    animationData={power}
    style={{ height: vh(437), marginTop: vh(60), pointerEvents: "none" }}
  />
  );
};

export default Flowline;
