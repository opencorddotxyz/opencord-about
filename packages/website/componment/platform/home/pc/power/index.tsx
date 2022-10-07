import { Flex, Spacer, Box, Text, Center } from "@chakra-ui/react";
import { vwPX } from "@/utils";

import dynamic from "next/dynamic";
const Animation = dynamic(() => import("./animation" as any), {
  loading: () => (
    <Box
      style={{ width: vwPX(775), height: vwPX(588), marginLeft: "-180px" }}
    />
  ),
}) as any;

const Power = () => {
  return (
    <Center w="100%">
      <Flex w="1080px" height="586px" align="center">
        <Animation />
        <Spacer />
        <Box width={vwPX(440)} textAlign="left">
          <Text
            color="#fff"
            fontWeight="700"
            fontSize={vwPX(32)}
            lineHeight={vwPX(40)}
            textTransform="capitalize"
          >
            Power up your community
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
            Interact directly with DAO tools and experience the endless
            possibilities that Dapps bring to decentralized community
            governance.
          </Text>
        </Box>
      </Flex>
    </Center>
  );
};

export default Power;
