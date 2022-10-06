import Lottie from "lottie-react";
import power from "@/animation/power.json";
import { vwPX } from "@/utils";

const Animation = () => {
  return (
    <Lottie
      animationData={power}
      style={{ width: vwPX(775), height: vwPX(588), marginLeft: "-180px" }}
    />
  );
};

export default Animation;
