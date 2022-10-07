import { Box, Text } from "@chakra-ui/react";
import { vh, vw } from "@/utils";

import dynamic from "next/dynamic";
const Show = dynamic(() => import("./lottie/show" as any), {
  loading: () => <Box style={{ height: vh(437), marginTop: vh(60) }} />,
}) as any;

const ShowAnimation = () => {
  return (
    <Box paddingTop={vh(120)} paddingLeft={vw(40)} paddingRight={vw(40)}>
      <Text
        fontWeight="700"
        fontSize={vw(46)}
        lineHeight={vw(58)}
        color="#FFFFFF"
        textTransform="capitalize"
      >
        Focus on what&apos;s important
      </Text>

      <Text
        marginTop={vh(20)}
        fontWeight="500"
        fontSize={vw(24)}
        lineHeight={vw(30)}
        color="rgba(255, 255, 255, 0.5)"
      >
        Simplify notifications, focus on what&apos;s important,
        <br /> and capture the good times.
      </Text>
      <Show />
    </Box>
  );
};

export default ShowAnimation;
