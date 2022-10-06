/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Flex,
  Image,
  Spacer,
  Text,
  keyframes,
  Link,
  LinkProps,
} from "@chakra-ui/react";

import { motion, useCycle } from "framer-motion";
import { isIos, vh, vw } from "@/utils";

import dynamic from "next/dynamic";
const Background = dynamic(() => import("../../common/background") as any, {
  loading: () => <Box bg="#000" w="100%" h="100%" />,
});

const Channel = () => {
  return (
    <Box marginTop={vw(100)} w="100%">
      <Image
        src="/imgs/channel/cloud.svg"
        ml={vw(358)}
        width={vw(104)}
        height={vh(71)}
        animation="float 2s ease-in-out infinite"
        className="cloud"
        sx={{
          ".cloud": {
            "@keyframes float": {
              "0%": {
                transform: "translatey(0px)",
              },
              "50%": {
                transform: `translatey(${vw(10)})`,
              },
              "100%": {
                transform: "translatey(0px)",
              },
            },
          },
        }}
      />
      <Flex marginTop={vh(33)} align="center">
        <Image
          ml={vw(147)}
          width={vw(244)}
          height={vh(106)}
          src="/imgs/channel/opencord.png"
        />
        <Image
          width={vw(104)}
          height={vh(71)}
          ml={vw(88)}
          src="/imgs/channel/horn.svg"
          marginTop={vh(10)}
          className="voice"
          animation="float-voice 2s ease-in-out infinite"
          sx={{
            ".voice": {
              "@keyframes float-voice": {
                "0%": {
                  transform: "translatey(0px)",
                },
                "50%": {
                  transform: `translatey(-${vw(10)})`,
                },
                "100%": {
                  transform: "translatey(0px)",
                },
              },
            },
          }}
        />
      </Flex>
      <Flex marginTop={vh(33)}>
        <Image
          ml={vw(324)}
          width={vw(104)}
          height={vh(71)}
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
                  transform: `translatey(${vw(10)})`,
                },
                "100%": {
                  transform: "translatey(0px)",
                },
              },
            },
          }}
        />
        <Image
          mt={vw(16)}
          ml={vw(22)}
          width={vw(205)}
          height={vh(263)}
          marginTop={vh(15)}
          src="/imgs/channel/server.png"
        />
      </Flex>
      <Box h={vh(158)} />
    </Box>
  );
};

export const First = () => {
  const body = (
    <Flex
      flexDirection="column"
      align="center"
      w="100vw"
      position="absolute"
      zIndex={1}
    >
      <Text
        fontWeight="700"
        fontSize={vw(70)}
        lineHeight={vw(96)}
        color="#FFFFFF"
        marginTop={vw(342 - 60 - 114)}
        textAlign="center"
        maxW={vw(670)}
      >
        Connecting DAOs, DApps, & DAO Friends.
      </Text>

      <Text
        fontWeight="400"
        fontSize={vw(26)}
        color="#FFFFFF"
        opacity={0.7}
        marginTop={vw(74)}
      >
        The Web 3.0 social platform built for DAOs.
      </Text>
      <Link
        isExternal
        href={"./waitlist"}
        _hover={{ textDecoration: "none" }}
        _focus={{ border: "none", boxShadow: "none" }}
      >
        <Flex
          marginTop={vh(60)}
          padding={`${vw(20)} ${vw(52)}`}
          align="center"
          justify="center"
          width={vw(270)}
          height={vw(70)}
          bg="#FFF"
          borderRadius={vh(70)}
        >
          <Text
            fontWeight="600"
            fontSize={vw(24)}
            marginRight={vw(8)}
            lineHeight={vw(30)}
          >
            Join Waitlist
          </Text>
          <Image
            src="/imgs/arrow/thin_right.svg"
            width={vw(20)}
            height={vw(8)}
          />
        </Flex>
      </Link>
      <Channel />
    </Flex>
  );
  return (
    <>
      <Box h={vw(60)} />
      <Menu />
      <Box h={vw(1624 - 60 - 114)} width="100vw" position="relative">
        <Box h={vw(1624 - 60 - 114)} width="100vw" position="absolute">
          <Background />
        </Box>
        {body}
      </Box>
    </>
  );
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    x: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 0,
    opacity: 0,
    x: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    pointerEvents: "none",
  },
};

const item = {
  open: { opacity: 1, x: vw(40) },
  closed: { opacity: 0, x: vw(40) },
};
interface IMenuLink extends LinkProps {
  name: string;
  url?: string;
  download?: boolean;
  needExternal?: boolean;
}
const MenuLink = (p: IMenuLink) => {
  const { name, url, download = false, needExternal = true } = p;
  return (
    <motion.li variants={item}>
      <Link
        isExternal={needExternal}
        href={url}
        download={download}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight="600"
          fontSize={vw(46)}
          lineHeight={vh(58)}
          color="#FFF"
          marginTop={vw(50)}
        >
          {name}
        </Text>
      </Link>
    </motion.li>
  );
};

export const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  // const { scrollY } = useScroll();
  // const y = useTransform(scrollY, [0, vw2PX(60)], [vw2PX(60) + "px", "0px"]);
  // const background = useTransform(
  //   scrollY,
  //   [0, vw2PX(114)],
  //   ["rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]
  // );

  return (
    <Box position="sticky" top="0px" bg="rgba(0,0,0,0.95)" zIndex={10}>
      <Flex
        height={vw(114)}
        align="center"
        paddingLeft={vw(40)}
        paddingRight={vw(40)}
        zIndex={9}
        position="relative"
      >
        <Spacer>
          <Flex h="100%" align="center">
            <Image
              height="20px"
              width="20px"
              onClick={() => {
                toggleOpen();
              }}
              zIndex={9}
              src={
                !isOpen
                  ? "/imgs/operator/navigation.svg"
                  : "/imgs/operator/close.svg"
              }
            />
          </Flex>
        </Spacer>
        <Image
          height="60px"
          width={vw(273)}
          src="/imgs/opencord/logo.svg"
          zIndex={9}
        />
        <Spacer />

        <motion.ul
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            height: "100vh",
            width: "100vw",
            background: "rgba(0, 0, 0, 0.95)",
            paddingTop: vw(120),
            listStyle: "none",
            overflow: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={isOpen ? "open" : "closed"}
          variants={variants as any}
        >
          <MenuLink
            name="Join Waitlist"
            needExternal={false}
            url={"/waitlist"}
          />
          <MenuLink name="Download" needExternal={false} url="/download" />
          {/* <MenuLink name="Terms" url={kDomains.www + "/terms"} />
          <MenuLink name="Privacy" url={kDomains.www + "/privacy"} /> */}
          <MenuLink
            url="/Opencord_brand_assets.zip"
            name="Brand Assets"
            download
          />

          <motion.li variants={item}>
            <Flex marginTop={vw(50)}>
              <Link
                isExternal
                href="https://twitter.com/opencorddotxyz"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Image
                  width={vw(50)}
                  height={vw(50)}
                  src="/imgs/tri_party/twitter_circle.svg"
                  marginRight={vw(30)}
                />
              </Link>
              <Link
                isExternal
                href="mailto:team@opencord.xyz"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Image
                  width={vw(50)}
                  height={vw(50)}
                  src="/imgs/tri_party/email_circle.svg"
                />
              </Link>
            </Flex>
          </motion.li>
        </motion.ul>
      </Flex>
    </Box>
  );
};
