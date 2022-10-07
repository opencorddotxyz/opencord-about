import Lottie from "lottie-react";
import visualizer from "@/animation/visualizer.json";
import { vwPX } from "@/utils";

const Animation = () => {
  return (
    <Lottie
      animationData={visualizer}
      style={{ width: vwPX(775), height: vwPX(588), marginRight: "-180px" }}
    />
  );
};

export default Animation;
