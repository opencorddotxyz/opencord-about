import { Box, Divider, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Community, Download, Resources } from "../../common";
import { vh, vw } from "@/utils";
export const NavigationMobile = () => {
  return (
    <Box bg="#FFFFFF" padding={vw(40)} paddingTop={vh(70)}>
      <Image src="/imgs/opencord/opencord_blue.svg" alt="" />
      <Text
        marginTop={vh(60)}
        fontWeight="400"
        fontSize={vw(24)}
        lineHeight={vw(30)}
        color="rgba(0, 0, 0, 0.7)"
      >
        The Web 3.0 social platform built for DAOs.
      </Text>
      <Divider height="1px" bg="#E6E6E6" marginTop={vh(50)} />
      <SimpleGrid columns={[1]} spacingY={vw(50)} marginTop={vw(50)}>
        <Download />
        <Community />
        <Resources />
      </SimpleGrid>
      <Text
        fontWeight="400"
        fontSize={vw(24)}
        color="#000000"
        opacity={0.3}
        marginTop={vh(50)}
      >
        © 2022 Opencord Lab LTD
      </Text>
      <Box height="70px" />
    </Box>
  );
};
