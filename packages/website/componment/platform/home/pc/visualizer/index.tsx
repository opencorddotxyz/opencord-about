import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { vwPX } from "@/utils";

import dynamic from "next/dynamic";
const Animation = dynamic(() => import("./animation" as any), {
  loading: () => (
    <Box
      style={{ width: vwPX(775), height: vwPX(588), marginRight: "-180px" }}
    />
  ),
}) as any;

const Visualizer = () => {
  return (
    <Center w="100%">
      <Flex w="1080px" height="586px" align="center">
        <Box width={vwPX(480)} textAlign="left">
          <Text
            color="#fff"
            fontWeight="700"
            fontSize={vwPX(32)}
            lineHeight={vwPX(40)}
            textTransform="capitalize"
          >
            Focus on what&apos;s important
          </Text>
          <Text
            color="#fff"
            fontWeight="500"
            fontSize={vwPX(16)}
            lineHeight={vwPX(20)}
            opacity={0.5}
            marginTop={vwPX(20)}
            maxW={vwPX(350)}
          >
            Simplify notifications, focus on what&apos;s important, and capture
            the good times.
          </Text>
        </Box>
        <Spacer />
        <Animation />
      </Flex>
    </Center>
  );
};

export default Visualizer;
