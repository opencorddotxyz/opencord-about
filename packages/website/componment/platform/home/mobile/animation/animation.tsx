import { Box, Text } from "@chakra-ui/react";
import { vh, vw } from "@/utils";

import dynamic from "next/dynamic";
const Flowline = dynamic(() => import("./lottie/flowline" as any), {
  loading: () => <Box style={{ height: vh(480), marginTop: vh(40) }} />,
}) as any;

const AnimationMobile = () => {
  return (
    <Box paddingTop={vh(120)} paddingLeft={vw(40)} paddingRight={vw(40)}>
      <Text
        fontWeight="700"
        fontSize={vw(46)}
        lineHeight={vw(58)}
        color="#FFFFFF"
        textTransform="capitalize"
      >
        Make the membership
      </Text>
      <Text
        fontWeight="700"
        fontSize={vw(46)}
        lineHeight={vw(58)}
        color="#FFFFFF"
        textTransform="capitalize"
      >
        management easy
      </Text>
      <Text
        marginTop={vh(20)}
        fontWeight="500"
        fontSize={vw(24)}
        lineHeight={vw(30)}
        color="rgba(255, 255, 255, 0.5)"
      >
        Create exclusive levels in your community and manage them with
        blockchain assets, or use token filter to against scams.
      </Text>
      <Flowline />
    </Box>
  );
};

export default AnimationMobile;
