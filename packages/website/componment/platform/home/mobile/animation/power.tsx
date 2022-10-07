import { Box, Text } from "@chakra-ui/react";
import { vh, vw } from "@/utils";

import dynamic from "next/dynamic";
const Power = dynamic(() => import("./lottie/power" as any), {
  loading: () => <Box style={{ height: vh(437), marginTop: vh(60) }} />,
}) as any;

const PowerAnimation = () => {
  return (
    <Box paddingTop={vh(120)} paddingLeft={vw(40)} paddingRight={vw(40)}>
      <Text
        fontWeight="700"
        fontSize={vw(46)}
        lineHeight={vw(58)}
        color="#FFFFFF"
        textTransform="capitalize"
      >
        Power up your community
      </Text>

      <Text
        marginTop={vh(20)}
        fontWeight="500"
        fontSize={vw(24)}
        lineHeight={vw(30)}
        color="rgba(255, 255, 255, 0.5)"
      >
        Interact directly with DAO tools and experience the endless
        possibilities that Dapps bring to decentralized community governance.
      </Text>
      <Power />
    </Box>
  );
};

export default PowerAnimation;
