/* eslint-disable jsx-a11y/alt-text */
import { OMenuItem } from "@/componment";
import {
  Box,
  Flex,
  Image,
  Spacer,
  Text,
  keyframes,
  Link,
} from "@chakra-ui/react";
import { useScroll, useTransform, motion } from "framer-motion";
import { vwPX, vwPx } from "../../../../../utils";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { isEmpty } from "@/utils/is";
const Background = dynamic(() => import("../../common/background") as any, {
  loading: () => <Box bg="#000" w="100%" h="100%" />,
});

export const FirstPage = () => {
  return (
    <>
      <Title />
      <Box
        height="100vh"
        maxWidth="100vw"
        bg="#000000"
        color="#FFF"
        position="relative"
        overflow="hidden"
      >
        <Background />
        <Flex
          align="center"
          justify="center"
          position="absolute"
          top={vwPX(13 + 62)}
          height={`calc(100vh - ${vwPX(13 + 62)})`}
          width="100%"
          zIndex={1}
        >
          <Box w="1080px" position="relative" h="100%">
            <Channel />
            <Start />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const Start = () => {
  return (
    <Flex
      position="absolute"
      height="100%"
      width="100%"
      top={vwPX(0)}
      zIndex={1}
    >
      <Flex width="100%" flexDirection="column" align="start">
        <Box flex={360 - 12 - 62} />
        <Text
          maxW={vwPX(664)}
          fontWeight="700"
          fontSize={vwPX(62)}
          lineHeight={vwPX(78)}
        >
          Connecting DAOs, DApps, & DAO Friends.
        </Text>
        <Text
          fontWeight="500"
          fontSize={vwPX(16)}
          lineHeight={vwPX(20)}
          color="rgba(255, 255, 255, 0.5)"
          marginTop={vwPX(40)}
        >
          The Web 3.0 social platform built for DAOs.
        </Text>
        <Flex marginTop={vwPX(40)}>
          <Link
            isExternal
            href={"./waitlist"}
            _hover={{ textDecoration: "none" }}
            _focus={{ border: "none", boxShadow: "none" }}
          >
            <Flex
              height={vwPX(36)}
              p={`${vwPX(0)} ${vwPX(20)}`}
              borderRadius={vwPX(35)}
              color="#000000"
              fontWeight="600"
              fontSize={vwPX(12)}
              bg="#FFF"
              align="center"
              justify="center"
            >
              <Text marginRight={vwPX(10)} fontWeight="600" fontSize={vwPX(12)}>
                Join Waitlist
              </Text>
              <Image
                src="/imgs/arrow/right_black.svg"
                width={vwPX(20)}
                height={vwPX(8)}
              />
            </Flex>
          </Link>
        </Flex>
        <Box flex={90} />
      </Flex>
    </Flex>
  );
};

const HeaderLink = (p: { name: string; url?: string; download?: boolean }) => {
  const { name, url, download = false } = p;
  return (
    <Link
      isExternal
      marginRight={vwPX(40)}
      opacity={0.7}
      _hover={{ opacity: 1 }}
      href={url}
      download={download}
    >
      {name}
    </Link>
  );
};

export const Title = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 13], ["13px", "0px"]);
  const background = useTransform(
    scrollY,
    [0, 13 + 62],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]
  );
  return (
    <motion.div
      style={{
        y,
        background,
        position: "fixed",
        zIndex: 10,
        width: "100%",
        top: "0px",
      }}
    >
      <Flex
        align="center"
        fontWeight="600"
        fontSize={vwPX(12)}
        h={vwPX(62)}
        padding={`${vwPX(0)} ${vwPX(30)}`}
        color="#FFF"
      >
        <Link href={router.pathname === "/" ? "#" : "/"} pb="5px">
          <Image
            width={vwPX(100)}
            height={vwPX(22)}
            alt="logo"
            src="/imgs/opencord/logo.svg"
          />
        </Link>
        <Box width={vwPX(50)} />
        <HeaderLink
          name="Download"
          url={router.pathname === "/download" ? "" : "/download"}
        />
        {/* <HeaderLink name="Docs" url={"/document"} />
        <HeaderLink name="Community" url={"/community"} />
        <HeaderLink name="About" url={"/about"} /> */}
        {/* <HeaderLink name="Terms" url={kDomains.www + "/terms"} />
        <HeaderLink name="Privacy" url={kDomains.www + "/privacy"} /> */}
        {/* <HeaderLink
          url="/Opencord_brand_assets.zip"
          name="Brand Assets"
          download
        /> */}

        <Box flex="1" />
        <Link
          isExternal
          opacity={1}
          _hover={{ opacity: 0.7 }}
          href="https://twitter.com/opencorddotxyz"
          mr="20px"
        >
          <Flex align="center">
            <Image
              alt="twitter_grey"
              width="15"
              height={vwPX(12)}
              src="/imgs/tri_party/twitter_grey.svg"
              marginRight={vwPX(10)}
            />
            <Text>Twitter</Text>
          </Flex>
        </Link>
        <Box w="1px" h="14px" bg="rgba(255,255,255,0.1)" ml="5px" mr="30px" />
        <Link
          isExternal
          opacity={1}
          _hover={{ opacity: 0.7 }}
          href={"/waitlist"}
        >
          <Flex align="center">
            <Text>Join Waitlist</Text>
            <Image
              src="/imgs/arrow/arrow_white_right.svg"
              width={vwPX(20)}
              height={vwPX(8)}
              ml={vwPX(10)}
            />
          </Flex>
        </Link>
      </Flex>
    </motion.div>
  );
};

const Channel = () => {
  const a = keyframes`
  0% {  transform: translatey(${vwPX(0)}) }
  50% { transform: translatey(${vwPX(10)}) }
  100% { transform: translatey(${vwPX(0)}) }
`;
  return (
    <Flex
      position="absolute"
      height="100%"
      width="100%"
      top={vwPX(0)}
      zIndex={1}
    >
      <Flex height="100%" width="100%">
        <Spacer />
        <Flex width={vwPx(488)} flexDirection="column" align="end">
          <Spacer flex={210 - 12 - 62} />
          <Flex width={vwPx(488)} justify="strat">
            <Box width={vwPx(960 - 748)} />
            <Image
              src="/imgs/channel/cloud.svg"
              width={vwPx(104)}
              height={vwPx(71)}
              animation="float 2s ease-in-out infinite"
              className="cloud"
              sx={{
                ".cloud": {
                  "@keyframes float": {
                    "0%": {
                      transform: "translatey(0px)",
                    },
                    "50%": {
                      transform: `translatey(${vwPX(10)})`,
                    },
                    "100%": {
                      transform: "translatey(0px)",
                    },
                  },
                },
              }}
            />
          </Flex>
          <Box height={vwPx(30)} />
          <Flex width={vwPx(488)} justify="strat">
            <Image
              width={vwPx(252)}
              height={vwPx(110)}
              src="/imgs/channel/opencord.svg"
            />
            <Box width={vwPx(86)} />
            <Image
              width={vwPx(104)}
              height={vwPx(71)}
              src="/imgs/channel/horn.svg"
              marginTop={vwPx(16)}
              animation={`${a} 2s ease-in-out infinite`}
            />
            <Box width={vwPx(46)} />
          </Flex>
          <Flex marginTop={vwPx(10)} width={vwPx(488)} justify="strat">
            <Box w={vwPx(177)} />
            <Image
              width={vwPx(104)}
              height={vwPx(71)}
              marginTop={vwPx(36 - 10)}
              src="/imgs/channel/lightning.svg"
              animation="float 2s ease-in-out infinite"
              className="lightning"
              sx={{
                ".lightning": {
                  "@keyframes float": {
                    "0%": {
                      transform: "translatey(0px)",
                    },
                    "50%": {
                      transform: `translatey(-${vwPX(10)})`,
                    },
                    "100%": {
                      transform: "translatey(0px)",
                    },
                  },
                },
              }}
            />
            <Box width={vwPx(32)} />
            <Image
              width={vwPx(175)}
              height={vwPx(225)}
              src="/imgs/channel/server.svg"
            />
          </Flex>
          <Spacer flex={130} />
        </Flex>
      </Flex>
    </Flex>
  );
};
