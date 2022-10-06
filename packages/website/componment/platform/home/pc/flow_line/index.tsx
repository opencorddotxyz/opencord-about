import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { vwPX } from "@/utils";

import dynamic from "next/dynamic";
const Animation = dynamic(() => import("./animation" as any), {
  loading: () => (
    <Box
      style={{ width: vwPX(1047), height: vwPX(793), marginRight: "-160px" }}
    />
  ),
}) as any;

const Management = () => {
  return (
    <Center w="100%">
      <Flex w="1080px" height="780px" align="center">
        <Box width={vwPX(440)} textAlign="left">
          <Text
            color="#fff"
            fontWeight="700"
            fontSize={vwPX(32)}
            lineHeight={vwPX(40)}
            textTransform="capitalize"
          >
            Make the membership management easy
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
            Create exclusive levels in your community and manage them with
            blockchain assets, or use token filter to against scams.
          </Text>
        </Box>
        <Spacer />
        <Animation />
      </Flex>
    </Center>
  );
};

export default Management;
