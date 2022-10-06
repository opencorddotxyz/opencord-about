import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { OpenLink } from "@/componment/common/item/link";
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from "@/constant/constant";
import { Menu } from "../../home/mobile/first";
import { vw } from "@/utils";
import { DownloadStore } from "../pc";

const DownloadPage = () => {
  return (
    <>
      <Box
        backgroundImage="/imgs/download/download_bg_mobile.svg"
        width="100vw"
        height="100vh"
        backgroundSize="cover"
        overflowY="scroll"
      >
        <Menu />

        <Box h={`calc(100% - ${vw(114)})`}>
          <Center h="100%" flexDir={"column"} pt={vw(150)} pb={vw(60)}>
            <Text
              color="white"
              fontWeight={700}
              fontSize={vw(76)}
              lineHeight={vw(95)}
              textAlign="center"
            >
              The Web 3.0
              <br />
              Scoical Platform
              <br />
              Built For DAOs
            </Text>
            <Text
              mt={vw(50)}
              fontWeight={400}
              color="rgba(255,255,255,0.7)"
              fontSize={vw(26)}
              p={`0 ${vw(40)}`}
              lineHeight={vw(32)}
              textAlign="center"
            >
              We are on the mission to be the open cord for connections and
              build it together with DAO friends who are looking for the perfect
              Web3 homebase for DAOs.
            </Text>
            <Box mt={vw(60)}>
              <DownloadStore height={100} isMobile={true} needQr={false} />
            </Box>
            <Spacer />
            <MobileFooter />
          </Center>
        </Box>
      </Box>
    </>
  );
};
export default DownloadPage;

const MobileFooter = () => {
  return (
    <>
      <Flex fontWeight="500" fontSize={vw(26)} lineHeight={vw(32)}>
        <OpenLink href={TERMS_OF_SERVICE}>
          <Text color="#fff">Terms of Service</Text>
        </OpenLink>
        <Box w={vw(50)} />
        <OpenLink href={PRIVACY_POLICY}>
          <Text color="#fff">Privacy Policy</Text>
        </OpenLink>
      </Flex>
      <Text
        color="rgba(255,255,255,0.5)"
        fontWeight="400"
        fontSize={vw(24)}
        lineHeight={vw(30)}
        mt={vw(40)}
      >
        © 2021- 2022 Openord.xyz
      </Text>
    </>
  );
};
