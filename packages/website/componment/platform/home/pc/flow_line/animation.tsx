import Lottie from "lottie-react";
import flowline from "@/animation/flowline.json";
import { vwPX } from "@/utils";

const Animation = () => {
  return (
    <Lottie
      animationData={flowline}
      style={{
        width: vwPX(1047),
        height: vwPX(793),
        marginRight: "-160px",
      }}
    />
  );
};

export default Animation;
